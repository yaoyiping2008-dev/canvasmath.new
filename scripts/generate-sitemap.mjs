import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function extractSlugsFromFile(filePath) {
  const content = readFileSync(filePath, "utf8");
  return [...content.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
}

const coreSlugs = extractSlugsFromFile(join(root, "src/lib/labs-data.ts"));
const generatedSlugs = extractSlugsFromFile(join(root, "src/lib/generated-lessons.ts"));

const slugSet = new Set();
for (const slug of [...coreSlugs, ...generatedSlugs]) {
  slugSet.add(slug);
}

const slugs = [...slugSet].sort((a, b) => {
  const aLesson = /^lesson(\d+)$/.exec(a);
  const bLesson = /^lesson(\d+)$/.exec(b);
  if (aLesson && bLesson) {
    return Number(aLesson[1]) - Number(bLesson[1]);
  }
  if (aLesson) return 1;
  if (bLesson) return -1;
  return a.localeCompare(b);
});

const origin = "https://canvasmath.org";
const lastmod = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: `${origin}/`, priority: "1.0", changefreq: "weekly" },
  ...slugs.map((slug) => ({
    loc: `${origin}/labs/${slug}`,
    priority: "0.8",
    changefreq: "weekly",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(
  `Generated sitemap with ${urls.length} URLs (${slugs.length} lab routes from ${coreSlugs.length} core + ${generatedSlugs.length} generated, deduplicated).`,
);
