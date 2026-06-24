import type { LabDifficulty, LabModule, LabModuleCategory } from "@/lib/labs-data";

export type DiscoveryFilters = {
  query: string;
  subject: string;
  grade: string;
  difficulty: string;
};

export const ALL_FILTER = "all";

export function matchesDiscoverySearch(lab: LabModule, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const haystack = [lab.title, lab.summary, lab.seoDescription, ...(lab.skills ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalized);
}

export function matchesDiscoveryFilters(lab: LabModule, filters: DiscoveryFilters): boolean {
  if (!matchesDiscoverySearch(lab, filters.query)) return false;

  if (filters.subject !== ALL_FILTER) {
    const subjectMatch = lab.subject === filters.subject || lab.category === filters.subject;
    if (!subjectMatch) return false;
  }

  if (filters.grade !== ALL_FILTER && lab.gradeBand !== filters.grade) {
    return false;
  }

  if (filters.difficulty !== ALL_FILTER && lab.difficulty !== filters.difficulty) {
    return false;
  }

  return true;
}

export function hasActiveDiscoveryFilters(filters: DiscoveryFilters): boolean {
  return (
    filters.query.trim().length > 0 ||
    filters.subject !== ALL_FILTER ||
    filters.grade !== ALL_FILTER ||
    filters.difficulty !== ALL_FILTER
  );
}

export function getUniqueSubjects(labs: LabModule[]): string[] {
  return [...new Set(labs.map((lab) => lab.subject ?? lab.category))].sort();
}

export function getUniqueGrades(labs: LabModule[]): string[] {
  return [...new Set(labs.map((lab) => lab.gradeBand).filter(Boolean) as string[])].sort();
}

export const DIFFICULTY_OPTIONS: LabDifficulty[] = ["Introductory", "Intermediate", "Advanced"];

export function filterLabsByCategory(
  labs: LabModule[],
  categories: LabModuleCategory[],
): LabModule[] {
  return labs.filter((lab) => categories.includes(lab.category));
}
