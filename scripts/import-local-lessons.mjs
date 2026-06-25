/**
 * Batch import local lesson modules into CanvasMath.
 *
 * Usage:
 *   node scripts/import-local-lessons.mjs --dry-run
 *   node scripts/import-local-lessons.mjs --import
 *   node scripts/import-local-lessons.mjs --import --overwrite
 */

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, normalize, posix } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const DEFAULT_LESSONS_SRC = join(root, "import-source/lessons");
const DEFAULT_ICONS_SRC = join(root, "import-source/icons");
const DEFAULT_LESSONS_DEST = join(root, "public/games/lessons");
const DEFAULT_ICONS_DEST = join(root, "public/thumbnails/lessons");
const GENERATED_TS = join(root, "src/lib/generated-lessons.ts");
const REPORT_PATH = join(root, "lesson-import-report.json");

const LESSON_COUNT = 169;
const LESSON_PATTERN = /^lesson(\d{3})$/i;
const ICON_PATTERN = /^lesson(\d{3})\.png$/i;

const NON_MEANINGFUL_TITLES = new Set([
  "game",
  "player",
  "index",
  "untitled",
  "document",
  "home",
  "main",
  "page",
  "loading",
  "welcome",
]);

const EXTERNAL_PATTERNS = [
  /https?:\/\//gi,
  /<script\s+src=/gi,
  /<iframe/gi,
  /analytics/gi,
  /tracking/gi,
  /advert/gi,
  /doubleclick/gi,
  /googletag/gi,
  /serviceworker/gi,
];

const RELATIVE_ATTR_PATTERN =
  /<(script|link|img|audio|video|source)\b[^>]*\b(?:src|href)\s*=\s*["']([^"']+)["']/gi;

const TEXT_EXTENSIONS = new Set([
  ".html",
  ".htm",
  ".js",
  ".mjs",
  ".cjs",
  ".css",
  ".json",
  ".svg",
  ".xml",
  ".txt",
]);

function parseArgs(argv) {
  const dryRun = argv.includes("--dry-run");
  const importMode = argv.includes("--import");
  const overwrite = argv.includes("--overwrite");

  if (!dryRun && !importMode) {
    console.error("Specify --dry-run or --import");
    process.exit(1);
  }

  if (dryRun && importMode) {
    console.error("Use only one of --dry-run or --import");
    process.exit(1);
  }

  return { dryRun, importMode, overwrite };
}

function padLessonNum(n) {
  return String(n).padStart(3, "0");
}

function expectedLessonIds() {
  return Array.from({ length: LESSON_COUNT }, (_, i) => `lesson${padLessonNum(i + 1)}`);
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function sanitizeTitle(raw) {
  let title = decodeHtmlEntities(raw);
  title = title.replace(/[\r\n]+/g, " ").replace(/[\x00-\x1f\x7f]/g, "");
  title = title.replace(/\s+/g, " ").trim();
  if (title.length > 120) {
    title = title.slice(0, 117).trimEnd() + "...";
  }
  return title;
}

function isMeaningfulTitle(title) {
  if (!title) return false;
  const normalized = title.toLowerCase().trim();
  if (NON_MEANINGFUL_TITLES.has(normalized)) return false;
  if (/^\d+$/.test(normalized)) return false;
  if (normalized.length < 2) return false;
  return true;
}

function extractTitleFromHtml(html, lessonId) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (match) {
    const candidate = sanitizeTitle(match[1]);
    if (isMeaningfulTitle(candidate)) {
      return candidate;
    }
  }
  const num = lessonId.replace(/^lesson/i, "");
  return `Lesson ${num}`;
}

function escapeTsString(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function formatTsStringField(key, value, baseIndent = 4) {
  const indent = " ".repeat(baseIndent);
  const innerIndent = " ".repeat(baseIndent + 2);
  const singleLine = `${indent}${key}: "${escapeTsString(value)}",`;
  if (singleLine.length <= 100) {
    return singleLine;
  }
  return `${indent}${key}:\n${innerIndent}"${escapeTsString(value)}",`;
}

function isAccessible(path) {
  try {
    statSync(path);
    return true;
  } catch {
    return false;
  }
}

function isZeroByte(path) {
  try {
    return statSync(path).size === 0;
  } catch {
    return false;
  }
}

function isRelativeLocalRef(ref) {
  const trimmed = ref.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("#")) return false;
  if (trimmed.startsWith("data:")) return false;
  if (trimmed.startsWith("blob:")) return false;
  if (trimmed.startsWith("javascript:")) return false;
  if (/^https?:\/\//i.test(trimmed)) return false;
  if (trimmed.startsWith("//")) return false;
  return true;
}

function resolveRelativePath(baseDir, ref) {
  const withoutQuery = ref.split(/[?#]/)[0];
  const normalized = normalize(join(baseDir, withoutQuery));
  return normalized;
}

function scanRelativeResources(html, lessonDir) {
  const missing = [];
  const checked = new Set();

  for (const match of html.matchAll(RELATIVE_ATTR_PATTERN)) {
    const ref = match[2];
    if (!isRelativeLocalRef(ref)) continue;

    const resolved = resolveRelativePath(lessonDir, ref);
    const key = `${ref} -> ${resolved}`;
    if (checked.has(key)) continue;
    checked.add(key);

    if (!existsSync(resolved)) {
      missing.push(ref);
    }
  }

  return missing;
}

function auditExternalDependencies(filePath, content) {
  const findings = [];
  for (const pattern of EXTERNAL_PATTERNS) {
    pattern.lastIndex = 0;
    const matches = content.match(pattern);
    if (matches) {
      for (const m of matches) {
        findings.push(m);
      }
    }
  }

  // Collect full URLs
  const urlPattern = /https?:\/\/[^\s"'<>]+/gi;
  const urls = [...content.matchAll(urlPattern)].map((m) => m[0]);
  return { snippets: [...new Set(findings)], urls: [...new Set(urls)] };
}

function walkTextFiles(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkTextFiles(full, files);
    } else if (entry.isFile()) {
      const ext = entry.name.includes(".")
        ? entry.name.slice(entry.name.lastIndexOf(".")).toLowerCase()
        : "";
      if (TEXT_EXTENSIONS.has(ext)) {
        files.push(full);
      }
    }
  }
  return files;
}

function discoverUnexpected(entries, pattern) {
  const unexpected = [];
  for (const name of entries) {
    if (!pattern.test(name)) {
      unexpected.push(name);
    }
  }
  return unexpected;
}

function findDuplicates(names) {
  const seen = new Map();
  const duplicates = [];
  for (const name of names) {
    const key = name.toLowerCase();
    if (seen.has(key)) {
      duplicates.push(name);
    } else {
      seen.set(key, true);
    }
  }
  return duplicates;
}

function generateTypeScript(records) {
  const lines = [
    "// Auto-generated by scripts/import-local-lessons.mjs — do not edit manually.",
    "// Run: npm run lessons:import",
    "",
    'import type { LabModule } from "./labs-data";',
    "",
    "export const generatedLessonLabs: LabModule[] = [",
  ];

  for (const record of records) {
    lines.push("  {");
    lines.push(`    id: "${escapeTsString(record.id)}",`);
    lines.push(formatTsStringField("title", record.title, 4));
    lines.push(`    slug: "${escapeTsString(record.slug)}",`);
    lines.push(`    moduleEndpoint: "${escapeTsString(record.moduleEndpoint)}",`);
    lines.push(`    image: "${escapeTsString(record.image)}",`);
    lines.push(`    category: "${escapeTsString(record.category)}",`);
    lines.push(formatTsStringField("seoTitle", record.seoTitle, 4));
    lines.push(`    seoDescription:`);
    lines.push(`      "${escapeTsString(record.seoDescription)}",`);
    lines.push(`    subject: "${escapeTsString(record.subject)}",`);
    lines.push(`    summary:`);
    lines.push(`      "${escapeTsString(record.summary)}",`);
    lines.push(`    embedMode: "local",`);
    lines.push(`    fallbackUrl: "${escapeTsString(record.fallbackUrl)}",`);
    lines.push("  },");
  }

  lines.push("];");
  lines.push("");
  return lines.join("\n");
}

function copyLessonFolder(src, dest, overwrite) {
  if (existsSync(dest)) {
    if (!overwrite) {
      return "skipped-existing";
    }
    rmSync(dest, { recursive: true, force: true });
  }
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest, { recursive: true, force: true });
  return "copied";
}

function copyIcon(src, dest, overwrite) {
  if (existsSync(dest) && !overwrite) {
    return "skipped-existing";
  }
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest, { force: overwrite });
  return "copied";
}

function main() {
  const { dryRun, importMode, overwrite } = parseArgs(process.argv.slice(2));
  const lessonsSrc = DEFAULT_LESSONS_SRC;
  const iconsSrc = DEFAULT_ICONS_SRC;
  const lessonsDest = DEFAULT_LESSONS_DEST;
  const iconsDest = DEFAULT_ICONS_DEST;

  const expectedIds = expectedLessonIds();
  const report = {
    generatedAt: new Date().toISOString(),
    mode: dryRun ? "dry-run" : "import",
    overwrite,
    summary: {},
    lessons: [],
    validationErrors: [],
  };

  // Discover source folders and icons
  const lessonFolderNames = existsSync(lessonsSrc)
    ? readdirSync(lessonsSrc, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name)
    : [];

  const iconFileNames = existsSync(iconsSrc)
    ? readdirSync(iconsSrc, { withFileTypes: true })
        .filter((e) => e.isFile() && !e.name.startsWith("."))
        .map((e) => e.name)
    : [];

  const missingFolders = [];
  const missingIndex = [];
  const missingIcons = [];
  const zeroByteFiles = [];
  const caseMismatches = [];
  const malformedNumbering = [];

  const unexpectedFolders = discoverUnexpected(lessonFolderNames, LESSON_PATTERN);
  const unexpectedIcons = discoverUnexpected(iconFileNames, ICON_PATTERN);
  const duplicateFolders = findDuplicates(lessonFolderNames);
  const duplicateIcons = findDuplicates(iconFileNames);

  const folderSet = new Map();
  for (const name of lessonFolderNames) {
    const match = LESSON_PATTERN.exec(name);
    if (!match) continue;
    const canonical = `lesson${match[1]}`;
    if (name !== canonical) {
      caseMismatches.push(`folder: ${name} (expected ${canonical})`);
    }
    folderSet.set(canonical, name);
  }

  const iconSet = new Map();
  for (const name of iconFileNames) {
    const match = ICON_PATTERN.exec(name);
    if (!match) continue;
    const canonical = `lesson${match[1]}.png`;
    if (name !== canonical) {
      caseMismatches.push(`icon: ${name} (expected ${canonical})`);
    }
    iconSet.set(`lesson${match[1]}`, name);
  }

  for (const lessonId of expectedIds) {
    const actualFolder = folderSet.get(lessonId);
    const folderPath = join(lessonsSrc, lessonId);
    const indexPath = join(folderPath, "index.html");
    const iconPath = join(iconsSrc, `${lessonId}.png`);

    if (!actualFolder || !existsSync(folderPath)) {
      missingFolders.push(lessonId);
      continue;
    }

    if (!existsSync(indexPath) || !isAccessible(indexPath)) {
      missingIndex.push(lessonId);
    } else if (isZeroByte(indexPath)) {
      zeroByteFiles.push(indexPath);
    }

    if (!iconSet.has(lessonId) || !existsSync(iconPath) || !isAccessible(iconPath)) {
      missingIcons.push(lessonId);
    } else if (isZeroByte(iconPath)) {
      zeroByteFiles.push(iconPath);
    }

    const num = Number(lessonId.replace("lesson", ""));
    if (num < 1 || num > LESSON_COUNT) {
      malformedNumbering.push(lessonId);
    }
  }

  const indexFound = expectedIds.length - missingIndex.length;
  const iconsFound = expectedIds.length - missingIcons.length;
  const foldersFound = expectedIds.length - missingFolders.length;

  const readyToImport =
    missingFolders.length === 0 &&
    missingIndex.length === 0 &&
    missingIcons.length === 0 &&
    zeroByteFiles.length === 0 &&
    malformedNumbering.length === 0;

  console.log("=== Lesson Import Validation ===");
  console.log(`Lesson folders found: ${foldersFound}`);
  console.log(`Index files found: ${indexFound}`);
  console.log(`Icons found: ${iconsFound}`);
  console.log(`Missing folders: ${missingFolders.length}`);
  console.log(`Missing index files: ${missingIndex.length}`);
  console.log(`Missing icons: ${missingIcons.length}`);
  if (zeroByteFiles.length) {
    console.log(`Zero-byte files: ${zeroByteFiles.length}`);
  }
  if (unexpectedFolders.length) {
    console.log(`Unexpected folders: ${unexpectedFolders.join(", ")}`);
  }
  if (unexpectedIcons.length) {
    console.log(`Unexpected icons: ${unexpectedIcons.join(", ")}`);
  }
  if (duplicateFolders.length) {
    console.log(`Duplicate folder names: ${duplicateFolders.join(", ")}`);
  }
  if (duplicateIcons.length) {
    console.log(`Duplicate icon names: ${duplicateIcons.join(", ")}`);
  }
  if (caseMismatches.length) {
    console.log(`Case mismatches: ${caseMismatches.join("; ")}`);
  }
  console.log(`Ready to import: ${readyToImport ? "yes" : "no"}`);

  report.summary = {
    lessonFoldersFound: foldersFound,
    indexFilesFound: indexFound,
    iconsFound,
    missingFolders: missingFolders.length,
    missingIndexFiles: missingIndex.length,
    missingIcons: missingIcons.length,
    unexpectedFolders,
    unexpectedIcons,
    duplicateFolders,
    duplicateIcons,
    caseMismatches,
    zeroByteFiles,
    malformedNumbering,
    readyToImport,
  };

  if (!readyToImport) {
    report.validationErrors = [
      ...missingFolders.map((id) => `Missing folder: ${id}`),
      ...missingIndex.map((id) => `Missing index.html: ${id}`),
      ...missingIcons.map((id) => `Missing icon: ${id}`),
      ...zeroByteFiles.map((p) => `Zero-byte file: ${p}`),
      ...malformedNumbering.map((id) => `Malformed numbering: ${id}`),
    ];
    writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
    console.error("\nValidation failed. Fix missing files before importing.");
    process.exit(1);
  }

  if (dryRun) {
    console.log("\nDry run complete — no files copied.");
    writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
    return;
  }

  // Import mode
  let copiedLessons = 0;
  let skippedLessons = 0;
  let copiedIcons = 0;
  let skippedIcons = 0;
  const records = [];

  for (const lessonId of expectedIds) {
    const srcFolder = join(lessonsSrc, lessonId);
    const destFolder = join(lessonsDest, lessonId);
    const srcIcon = join(iconsSrc, `${lessonId}.png`);
    const destIcon = join(iconsDest, `${lessonId}.png`);
    const indexPath = join(srcFolder, "index.html");

    const lessonReport = {
      slug: lessonId,
      indexFound: true,
      iconFound: true,
      copied: false,
      iconCopied: false,
      externalUrls: [],
      externalSnippets: [],
      missingRelativeResources: [],
      warnings: [],
    };

    const html = readFileSync(indexPath, "utf8");
    const title = extractTitleFromHtml(html, lessonId);

    // External dependency audit
    const textFiles = walkTextFiles(srcFolder);
    const allUrls = new Set();
    const allSnippets = new Set();

    for (const filePath of textFiles) {
      try {
        const content = readFileSync(filePath, "utf8");
        const audit = auditExternalDependencies(filePath, content);
        for (const url of audit.urls) allUrls.add(url);
        for (const snippet of audit.snippets) allSnippets.add(snippet);
      } catch {
        lessonReport.warnings.push(`Could not read for audit: ${filePath}`);
      }
    }

    lessonReport.externalUrls = [...allUrls].sort();
    lessonReport.externalSnippets = [...allSnippets].sort();

    // Relative resource scan (index.html only)
    const missingRelative = scanRelativeResources(html, srcFolder);
    lessonReport.missingRelativeResources = missingRelative;
    if (missingRelative.length) {
      lessonReport.warnings.push(
        `Missing relative resources in index.html: ${missingRelative.join(", ")}`,
      );
    }

    const folderResult = copyLessonFolder(srcFolder, destFolder, overwrite);
    if (folderResult === "copied") {
      copiedLessons += 1;
      lessonReport.copied = true;
    } else {
      skippedLessons += 1;
      lessonReport.warnings.push("Lesson folder skipped (already exists)");
    }

    const iconResult = copyIcon(srcIcon, destIcon, overwrite);
    if (iconResult === "copied") {
      copiedIcons += 1;
      lessonReport.iconCopied = true;
    } else {
      skippedIcons += 1;
      lessonReport.warnings.push("Icon skipped (already exists)");
    }

    records.push({
      id: `local-lesson-${lessonId.replace("lesson", "")}`,
      title,
      slug: lessonId,
      moduleEndpoint: `/games/lessons/${lessonId}/index.html`,
      image: `/thumbnails/lessons/${lessonId}.png`,
      category: "Interactive Learning",
      seoTitle: `${title} - Interactive Module | CanvasMath`,
      seoDescription:
        "Open this locally hosted interactive learning module in the CanvasMath workspace.",
      subject: "Interactive Learning",
      summary:
        "A locally hosted interactive module available through the CanvasMath learning workspace.",
      fallbackUrl: `/games/lessons/${lessonId}/index.html`,
    });

    report.lessons.push(lessonReport);
  }

  const tsContent = generateTypeScript(records);
  writeFileSync(GENERATED_TS, tsContent);

  report.summary.importedLessons = copiedLessons;
  report.summary.skippedLessons = skippedLessons;
  report.summary.importedIcons = copiedIcons;
  report.summary.skippedIcons = skippedIcons;
  report.summary.generatedRecords = records.length;
  report.summary.externalUrlLessonCount = report.lessons.filter(
    (l) => l.externalUrls.length > 0,
  ).length;

  writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

  console.log("\n=== Import Complete ===");
  console.log(`Lessons copied: ${copiedLessons}`);
  console.log(`Lessons skipped: ${skippedLessons}`);
  console.log(`Icons copied: ${copiedIcons}`);
  console.log(`Icons skipped: ${skippedIcons}`);
  console.log(`Generated records: ${records.length}`);
  console.log(`Written: ${posix.normalize(GENERATED_TS.replace(root + "/", ""))}`);
  console.log(`Report: lesson-import-report.json`);
  console.log(`Lessons with external URLs: ${report.summary.externalUrlLessonCount}`);
}

main();
