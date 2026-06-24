import type { LabModule } from "@/lib/labs-data";

export function matchesDiscoverySearch(lab: LabModule, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const haystack = [
    lab.title,
    lab.summary,
    lab.seoDescription,
    lab.subject,
    lab.category,
    ...(lab.skills ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalized);
}

export function getRecentlyAddedLabs(labs: LabModule[], limit = 5): LabModule[] {
  const result: LabModule[] = [];
  const seen = new Set<string>();

  for (const lab of labs) {
    if (lab.recentlyAdded && result.length < limit) {
      result.push(lab);
      seen.add(lab.slug);
    }
  }

  for (let i = labs.length - 1; i >= 0 && result.length < limit; i--) {
    const lab = labs[i];
    if (!seen.has(lab.slug)) {
      result.push(lab);
      seen.add(lab.slug);
    }
  }

  return result;
}
