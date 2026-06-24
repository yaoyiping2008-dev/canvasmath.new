import type { LabDifficulty, LabModule } from "./labs-data";
import { labsData } from "./labs-data";

const DIFFICULTY_RANK: Record<LabDifficulty, number> = {
  Introductory: 0,
  Intermediate: 1,
  Advanced: 2,
};

function matchesSubjectOrCategory(lab: LabModule, current: LabModule): boolean {
  if (current.subject && lab.subject === current.subject) return true;
  if (lab.category === current.category) return true;
  return false;
}

function difficultyDistance(lab: LabModule, current: LabModule): number {
  if (!current.difficulty || !lab.difficulty) return 1;
  return Math.abs(DIFFICULTY_RANK[lab.difficulty] - DIFFICULTY_RANK[current.difficulty]);
}

function labsDataIndex(slug: string): number {
  return labsData.findIndex((lab) => lab.slug === slug);
}

function sortAlternatives(alternatives: LabModule[], current: LabModule): LabModule[] {
  const sameSubject = alternatives.filter((item) => matchesSubjectOrCategory(item, current));
  const sameSubjectSlugs = new Set(sameSubject.map((item) => item.slug));
  const otherModules = alternatives.filter((item) => !sameSubjectSlugs.has(item.slug));

  sameSubject.sort((a, b) => {
    const diff = difficultyDistance(a, current) - difficultyDistance(b, current);
    if (diff !== 0) return diff;
    return labsDataIndex(a.slug) - labsDataIndex(b.slug);
  });

  return [...sameSubject, ...otherModules];
}

export function getAlternatives(currentLab: LabModule): LabModule[] {
  const alternatives = labsData.filter((item) => item.slug !== currentLab.slug);
  return sortAlternatives(alternatives, currentLab);
}

export function getRightRecommendations(currentLab: LabModule, limit = 8): LabModule[] {
  return getAlternatives(currentLab).slice(0, limit);
}

export function getBottomRecommendations(
  currentLab: LabModule,
  rightRecommendations: LabModule[],
  limit = 16,
): LabModule[] {
  const usedSlugs = new Set([currentLab.slug, ...rightRecommendations.map((item) => item.slug)]);
  return getAlternatives(currentLab)
    .filter((item) => !usedSlugs.has(item.slug))
    .slice(0, limit);
}
