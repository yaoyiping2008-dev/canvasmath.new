/**
 * CanvasMath batch lab preview generator.
 * Local dev utility — not used in production builds or client runtime.
 */
import { chromium } from "playwright";
import { spawn, execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG_PATH = join(ROOT, "scripts/preview-generator.config.json");
const ACTIONS_PATH = join(ROOT, "scripts/preview-actions.json");
const PREVIEWS_DIR = join(ROOT, "public/previews");
const TMP_ROOT = join(ROOT, ".tmp/lab-preview-generator");
const GENERATED_MAP_PATH = join(ROOT, "src/lib/lab-previews.generated.ts");
const REPORT_PATH = join(ROOT, "preview-generation-report.json");

const FAILED_STATUSES = new Set([
  "no-iframe",
  "load-timeout",
  "capture-failed",
  "encode-failed",
  "restricted",
  "manual-profile-recommended",
]);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseArgs(argv) {
  const args = {
    all: false,
    limit: null,
    slug: null,
    overwrite: false,
    failedOnly: false,
    baseUrl: null,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--all") args.all = true;
    else if (arg === "--overwrite") args.overwrite = true;
    else if (arg === "--failed-only") args.failedOnly = true;
    else if (arg === "--limit") args.limit = Number(argv[++i]);
    else if (arg === "--slug") args.slug = argv[++i];
    else if (arg === "--base-url") args.baseUrl = argv[++i];
  }

  if (!args.all && !args.slug && args.limit == null) {
    args.limit = 3;
  }

  return args;
}

function loadJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function checkFfmpeg() {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

async function checkServer(baseUrl) {
  try {
    const res = await fetch(baseUrl, { method: "GET", redirect: "follow" });
    return res.ok || res.status < 500;
  } catch {
    return false;
  }
}

async function startVite(config) {
  const child = spawn(config.viteCommand, config.viteArgs, {
    cwd: ROOT,
    stdio: "ignore",
    shell: false,
  });

  for (let i = 0; i < 60; i++) {
    if (await checkServer(config.baseUrl)) return child;
    await sleep(1000);
  }

  child.kill();
  throw new Error("Timed out waiting for Vite dev server to start.");
}

function slugFromHref(href) {
  try {
    const path = href.startsWith("http") ? new URL(href).pathname : href;
    const match = path.match(/^\/labs\/([^/?#]+)/);
    if (!match) return null;
    const slug = match[1].trim();
    if (!slug || slug.includes("/")) return null;
    return slug;
  } catch {
    return null;
  }
}

async function discoverSlugs(page, baseUrl) {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(800);

  const hrefs = await page.$$eval("a[href*='/labs/']", (links) =>
    links.map((a) => a.getAttribute("href")).filter(Boolean),
  );

  const seen = new Set();
  const slugs = [];
  for (const href of hrefs) {
    const slug = slugFromHref(href);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    slugs.push(slug);
  }
  return slugs;
}

function resolveActionProfile(slug, actionsConfig, genericConfig) {
  const entry = actionsConfig[slug];
  if (entry && typeof entry === "object" && !Array.isArray(entry)) {
    if (entry.disabled) return { disabled: true, actions: [], label: "disabled" };
    if (Array.isArray(entry.actions)) return { disabled: false, actions: entry.actions, label: "custom" };
    return { disabled: false, actions: [], label: "passive" };
  }
  if (Array.isArray(entry)) {
    return { disabled: false, actions: entry, label: "custom" };
  }

  const flat = [
    { type: "wait", milliseconds: genericConfig.initialWaitMs },
    { type: "clickCenter" },
  ];
  for (const key of genericConfig.keys) {
    flat.push({ type: "keys", value: [key], interval: 0 });
    flat.push({ type: "wait", milliseconds: genericConfig.betweenActionsMs });
  }
  flat.push({ type: "wait", milliseconds: genericConfig.finalWaitMs });

  return { disabled: false, actions: flat, label: "generic" };
}

function pointFromPercent(box, xPercent, yPercent) {
  return {
    x: box.x + (box.width * xPercent) / 100,
    y: box.y + (box.height * yPercent) / 100,
  };
}

async function executeAction(page, box, action, frame) {
  switch (action.type) {
    case "wait":
      await sleep(action.milliseconds ?? 500);
      break;

    case "clickCenter":
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      break;

    case "click":
      const pt = pointFromPercent(box, action.xPercent ?? 50, action.yPercent ?? 50);
      await page.mouse.click(pt.x, pt.y);
      break;

    case "keys":
      const keys = action.value ?? [];
      const interval = action.interval ?? 200;
      for (const key of keys) {
        if (frame) {
          try {
            await frame.press("body", key, { timeout: 2000 });
          } catch {
            await page.keyboard.press(key);
          }
        } else {
          await page.keyboard.press(key);
        }
        if (interval > 0) await sleep(interval);
      }
      break;

    case "drag":
      const from = pointFromPercent(box, action.fromPercent[0], action.fromPercent[1]);
      const to = pointFromPercent(box, action.toPercent[0], action.toPercent[1]);
      const duration = action.duration ?? 500;
      await page.mouse.move(from.x, from.y);
      await page.mouse.down();
      const steps = Math.max(4, Math.floor(duration / 50));
      for (let s = 1; s <= steps; s++) {
        const t = s / steps;
        await page.mouse.move(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t);
        await sleep(duration / steps);
      }
      await page.mouse.up();
      break;

    case "scroll":
      const scrollPt = pointFromPercent(box, action.xPercent ?? 50, action.yPercent ?? 50);
      await page.mouse.move(scrollPt.x, scrollPt.y);
      await page.mouse.wheel(action.deltaX ?? 0, action.deltaY ?? 120);
      break;

    case "repeat":
      const count = action.count ?? 1;
      const nested = action.actions ?? [];
      for (let i = 0; i < count; i++) {
        for (const nestedAction of nested) {
          await executeAction(page, box, nestedAction, frame);
        }
      }
      break;

    default:
      break;
  }
}

async function executeActions(page, box, actions, frame) {
  for (const action of actions) {
    await executeAction(page, box, action, frame);
  }
}

async function getWorkspaceBox(page, timeoutMs) {
  const workspace = page.locator("[data-simulation-workspace]");
  await workspace.waitFor({ state: "visible", timeout: timeoutMs });

  const loading = page.getByText("Loading simulation module", { exact: false });
  try {
    await loading.waitFor({ state: "hidden", timeout: timeoutMs });
  } catch {
    // loading overlay may already be gone
  }

  const errorAlert = page.getByText("Module unavailable", { exact: false });
  if (await errorAlert.isVisible()) {
    return { box: null, restricted: true };
  }

  const box = await workspace.boundingBox();
  if (!box || box.width < 40 || box.height < 40) {
    return { box: null, restricted: false };
  }

  const iframe = page.locator("[data-simulation-iframe]");
  await iframe.waitFor({ state: "attached", timeout: 5000 });

  return { box, restricted: false };
}

async function captureFrames(page, box, tempDir, captureConfig) {
  const { durationSeconds, fps, jpegQuality } = captureConfig;
  const frameCount = Math.round(durationSeconds * fps);
  const intervalMs = 1000 / fps;

  mkdirSync(tempDir, { recursive: true });

  const startTime = Date.now();
  for (let i = 0; i < frameCount; i++) {
    const targetTime = startTime + i * intervalMs;
    const waitMs = targetTime - Date.now();
    if (waitMs > 0) await sleep(waitMs);

    const framePath = join(tempDir, `frame-${String(i + 1).padStart(4, "0")}.jpg`);
    await page.screenshot({
      path: framePath,
      type: "jpeg",
      quality: jpegQuality,
      clip: {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      },
      animations: "disabled",
    });
  }

  return frameCount;
}

function encodeWebm(tempDir, outputPath, captureConfig) {
  const { fps, width, height } = captureConfig;
  const tempOut = `${outputPath}.tmp.webm`;

  if (existsSync(tempOut)) rmSync(tempOut);

  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-framerate",
      String(fps),
      "-i",
      join(tempDir, "frame-%04d.jpg"),
      "-vf",
      `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=0x111827`,
      "-an",
      "-c:v",
      "libvpx-vp9",
      "-crf",
      "38",
      "-b:v",
      "0",
      "-row-mt",
      "1",
      tempOut,
    ],
    { stdio: "pipe" },
  );

  if (existsSync(outputPath)) rmSync(outputPath);
  renameSync(tempOut, outputPath);
}

function cleanupTemp(tempDir) {
  if (existsSync(tempDir)) rmSync(tempDir, { recursive: true, force: true });
}

async function processModule(browser, slug, options) {
  const { config, actionsConfig, overwrite, baseUrl } = options;
  const route = `/labs/${slug}`;
  const outputPath = join(PREVIEWS_DIR, `${slug}.webm`);
  const tempDir = join(TMP_ROOT, slug);
  const profile = resolveActionProfile(slug, actionsConfig, config.genericActions);

  const result = {
    slug,
    route,
    status: "capture-failed",
    outputFile: null,
    fileSize: null,
    durationSeconds: config.capture.durationSeconds,
    actionsUsed: profile.label,
    retryCount: 0,
    failureReason: null,
  };

  if (existsSync(outputPath) && !overwrite) {
    result.status = "skipped-existing";
    result.outputFile = `/previews/${slug}.webm`;
    result.fileSize = statSync(outputPath).size;
    return result;
  }

  cleanupTemp(tempDir);

  let lastError = null;

  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) {
      result.retryCount = 1;
      cleanupTemp(tempDir);
      await sleep(1500);
    }

    const context = await browser.newContext({
      viewport: config.viewport,
      deviceScaleFactor: 1,
      reducedMotion: "no-preference",
    });

    await context.grantPermissions([]);
    const page = await context.newPage();

    try {
      await page.goto(`${baseUrl}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: config.timeouts.navigationMs,
      });

      const workspaceResult = await getWorkspaceBox(page, config.timeouts.workspaceVisibleMs);
      if (workspaceResult.restricted) {
        result.status = "restricted";
        result.failureReason = "Module unavailable overlay visible";
        await context.close();
        return result;
      }

      if (!workspaceResult.box) {
        lastError = "Workspace element missing or too small";
        await context.close();
        continue;
      }

      const box = workspaceResult.box;
      let frame = null;
      try {
        const iframeEl = page.locator("[data-simulation-iframe]");
        const frameHandle = await iframeEl.elementHandle();
        if (frameHandle) frame = await frameHandle.contentFrame();
      } catch {
        frame = null;
      }

      if (!profile.disabled && profile.actions.length > 0) {
        await executeActions(page, box, profile.actions, frame);
      } else if (profile.disabled) {
        await sleep(config.genericActions.initialWaitMs);
      }

      const framesCaptured = await captureFrames(page, box, tempDir, config.capture);
      if (framesCaptured < 2) {
        lastError = "Insufficient frames captured";
        await context.close();
        continue;
      }

      encodeWebm(tempDir, outputPath, config.capture);
      cleanupTemp(tempDir);

      const size = statSync(outputPath).size;
      result.status = "generated";
      result.outputFile = `/previews/${slug}.webm`;
      result.fileSize = size;
      result.failureReason = null;

      if (size > config.sizeWarningBytes) {
        result.failureReason = `Warning: file exceeds ${config.sizeWarningBytes} bytes`;
      }

      await context.close();
      return result;
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      cleanupTemp(tempDir);
      if (existsSync(`${outputPath}.tmp.webm`)) rmSync(`${outputPath}.tmp.webm`, { force: true });
      if (existsSync(outputPath) && overwrite) rmSync(outputPath, { force: true });
      await context.close();
    }
  }

  if (lastError?.includes("Timeout") || lastError?.includes("timeout")) {
    result.status = "load-timeout";
  } else if (lastError?.includes("ffmpeg") || lastError?.includes("Encode")) {
    result.status = "encode-failed";
  } else if (lastError?.includes("Workspace") || lastError?.includes("iframe")) {
    result.status = "no-iframe";
  } else {
    result.status = "capture-failed";
  }
  result.failureReason = lastError;
  return result;
}

function writeGeneratedMapping(successfulResults) {
  const entries = successfulResults
    .filter(
      (r) => r.outputFile && existsSync(join(ROOT, "public", r.outputFile.replace(/^\//, ""))),
    )
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const lines = entries.map(
    (r) => `  "${r.slug}": "${r.outputFile}",`,
  );

  const content = `// Auto-generated by scripts/generate-lab-previews.mjs — do not edit manually.\n\nexport const GENERATED_LAB_PREVIEWS: Record<string, string> = {\n${lines.join("\n")}\n};\n`;

  writeFileSync(GENERATED_MAP_PATH, content, "utf8");
}

function loadPreviousFailedSlugs() {
  if (!existsSync(REPORT_PATH)) return [];
  try {
    const report = JSON.parse(readFileSync(REPORT_PATH, "utf8"));
    return (report.modules ?? [])
      .filter((m) => FAILED_STATUSES.has(m.status))
      .map((m) => m.slug);
  } catch {
    return [];
  }
}

function printSummary(results) {
  const counts = {
    generated: 0,
    skipped: 0,
    failed: 0,
    manualRecommended: 0,
  };

  for (const r of results) {
    if (r.status === "generated") counts.generated++;
    else if (r.status === "skipped-existing") counts.skipped++;
    else if (FAILED_STATUSES.has(r.status)) {
      counts.failed++;
      if (r.status === "manual-profile-recommended") counts.manualRecommended++;
    }
  }

  console.log("");
  console.log("Preview generation summary");
  console.log(`  Generated: ${counts.generated}`);
  console.log(`  Skipped: ${counts.skipped}`);
  console.log(`  Failed: ${counts.failed}`);
  if (counts.manualRecommended > 0) {
    console.log(`  Manual profiles recommended: ${counts.manualRecommended}`);
  }
  console.log(`  Report: ${REPORT_PATH}`);
  console.log(`  Mapping: ${GENERATED_MAP_PATH}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const config = loadJson(CONFIG_PATH);
  const actionsConfig = loadJson(ACTIONS_PATH);

  if (args.baseUrl) config.baseUrl = args.baseUrl;

  if (!checkFfmpeg()) {
    console.error(
      "FFmpeg is not available. Install FFmpeg with libvpx-vp9 support and ensure `ffmpeg` is on your PATH.",
    );
    console.error("See docs/preview-generation.md for setup instructions.");
    process.exit(1);
  }

  mkdirSync(PREVIEWS_DIR, { recursive: true });
  mkdirSync(TMP_ROOT, { recursive: true });

  let viteChild = null;
  const serverOk = await checkServer(config.baseUrl);

  if (!serverOk) {
    if (config.startViteIfMissing) {
      console.log("Starting Vite dev server…");
      viteChild = await startVite(config);
    } else {
      console.error(`Local app is not reachable at ${config.baseUrl}`);
      console.error("Start the dev server first: npm run dev");
      process.exit(1);
    }
  }

  const browser = await chromium.launch({ headless: true });

  const discoveryPage = await browser.newPage({
    viewport: config.viewport,
  });

  let slugs = [];
  if (args.slug) {
    slugs = [args.slug];
  } else {
    slugs = await discoverSlugs(discoveryPage, config.baseUrl);
  }
  await discoveryPage.close();

  if (args.failedOnly) {
    const failed = new Set(loadPreviousFailedSlugs());
    slugs = slugs.filter((s) => failed.has(s));
  }

  if (args.limit != null && !args.all && !args.slug) {
    slugs = slugs.slice(0, args.limit);
  }

  if (slugs.length === 0) {
    console.log("No modules to process.");
    await browser.close();
    if (viteChild) viteChild.kill();
    process.exit(0);
  }

  console.log(`Processing ${slugs.length} module(s)…`);

  const results = [];
  for (const slug of slugs) {
    console.log(`→ ${slug}`);
    const result = await processModule(browser, slug, {
      config,
      actionsConfig,
      overwrite: args.overwrite,
      baseUrl: config.baseUrl,
    });
    results.push(result);
    console.log(`   ${result.status}${result.failureReason ? ` — ${result.failureReason}` : ""}`);
  }

  await browser.close();
  if (viteChild) viteChild.kill();

  const successfulForMap = results.filter(
    (r) =>
      (r.status === "generated" || r.status === "skipped-existing") &&
      r.outputFile &&
      existsSync(join(ROOT, "public", r.outputFile.replace(/^\//, ""))),
  );

  writeGeneratedMapping(successfulForMap);

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl: config.baseUrl,
    capture: config.capture,
    modules: results,
  };
  writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), "utf8");

  printSummary(results);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
