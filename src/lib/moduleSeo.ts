import type { LabModule } from "@/lib/labs-data";
import { SITE_ORIGIN } from "./siteMeta";

export type ModuleSeoMeta = {
  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;
};

export function buildModuleSeo(lab: LabModule): ModuleSeoMeta {
  const concept = lab.subject ?? lab.category;
  const title = `CanvasMath - ${lab.title} Interactive Learning Simulation`;
  const description =
    lab.seoDescription ||
    `A standards-aligned interactive simulation for understanding ${concept.toLowerCase()} concepts in K-12 mathematics education. Supports visual mathematics learning and conceptual understanding through classroom-ready modules.`;

  const keywordParts = [
    lab.title,
    concept,
    lab.category,
    lab.difficulty,
    lab.gradeBand,
    "K-12 mathematics",
    "standards-aligned",
    "interactive simulation",
    "visual mathematics learning",
    "classroom-ready",
    ...(lab.skills ?? []),
  ].filter(Boolean);

  const keywords = [...new Set(keywordParts)].join(", ");

  return {
    title,
    description,
    keywords,
    ogUrl: `${SITE_ORIGIN}/labs/${lab.slug}`,
    ogImage: `${SITE_ORIGIN}${lab.image.startsWith("/") ? lab.image : `/${lab.image}`}`,
  };
}

export function buildModuleHeadMeta(lab: LabModule) {
  const seo = buildModuleSeo(lab);

  return [
    { title: seo.title },
    { name: "description", content: seo.description },
    { name: "keywords", content: seo.keywords },
    { name: "robots", content: "index, follow" },
    { property: "og:title", content: seo.title },
    { property: "og:description", content: seo.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: seo.ogUrl },
    { property: "og:image", content: seo.ogImage },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: seo.title },
    { name: "twitter:description", content: seo.description },
    { name: "twitter:image", content: seo.ogImage },
  ];
}
