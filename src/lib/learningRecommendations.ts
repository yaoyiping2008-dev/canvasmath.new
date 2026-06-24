import type { LabDifficulty, LabModule } from "@/lib/labs-data";
import { labsData } from "@/lib/labs-data";

const DIFFICULTY_ORDER: Record<LabDifficulty, number> = {
  Introductory: 0,
  Intermediate: 1,
  Advanced: 2,
};

export type LearningPathDefinition = {
  id: string;
  title: string;
  description: string;
  moduleSlugs: string[];
};

function sortByDifficulty(modules: LabModule[]): LabModule[] {
  return [...modules].sort((a, b) => {
    const diffA = DIFFICULTY_ORDER[a.difficulty ?? "Introductory"];
    const diffB = DIFFICULTY_ORDER[b.difficulty ?? "Introductory"];
    if (diffA !== diffB) return diffA - diffB;
    return a.title.localeCompare(b.title);
  });
}

function slugsFromCategories(categories: LabModule["category"][]): string[] {
  return sortByDifficulty(labsData.filter((lab) => categories.includes(lab.category))).map(
    (lab) => lab.slug,
  );
}

export const LEARNING_PATHS: LearningPathDefinition[] = [
  {
    id: "algebra-foundations",
    title: "Algebra Foundations Path",
    description:
      "Build number fluency and algebraic reasoning through expressions, equations, and graphing modules.",
    moduleSlugs: slugsFromCategories(["Number & Operations", "Algebra"]),
  },
  {
    id: "geometry-visualization",
    title: "Geometry Visualization Path",
    description:
      "Develop spatial reasoning with area models, shape construction, and coordinate visualization.",
    moduleSlugs: slugsFromCategories(["Geometry"]),
  },
  {
    id: "logic-reasoning",
    title: "Logic Reasoning Path",
    description:
      "Strengthen deductive reasoning, constraints, and structured problem-solving activities.",
    moduleSlugs: slugsFromCategories(["Logic & Reasoning"]),
  },
  {
    id: "data-probability",
    title: "Data & Probability Path",
    description:
      "Learn distributions, probability models, and data interpretation through standards-aligned simulations.",
    moduleSlugs: slugsFromCategories(["Probability & Data"]),
  },
];

export function getPathForModule(lab: LabModule): LearningPathDefinition | undefined {
  return LEARNING_PATHS.find((path) => path.moduleSlugs.includes(lab.slug));
}

export function getRelatedConcepts(lab: LabModule): string[] {
  const concepts = new Set<string>();
  if (lab.subject) concepts.add(lab.subject);
  lab.skills?.slice(0, 2).forEach((skill) => concepts.add(skill));
  if (lab.category) concepts.add(lab.category);
  return [...concepts].slice(0, 4);
}

export function getRecommendedModules(lab: LabModule, limit = 4): LabModule[] {
  const candidates = labsData.filter((candidate) => candidate.slug !== lab.slug);
  const sameCategory = candidates.filter((candidate) => candidate.category === lab.category);
  const sameDifficulty = candidates.filter(
    (candidate) => candidate.difficulty === lab.difficulty && candidate.category !== lab.category,
  );
  const recentlyAdded = candidates.filter((candidate) => candidate.recentlyAdded);

  const ordered: LabModule[] = [];
  const seen = new Set<string>();

  for (const group of [sameCategory, sameDifficulty, recentlyAdded, candidates]) {
    for (const item of group) {
      if (seen.has(item.slug)) continue;
      seen.add(item.slug);
      ordered.push(item);
      if (ordered.length >= limit) return ordered;
    }
  }

  return ordered.slice(0, limit);
}

export function getPathSuggestion(lab: LabModule): string {
  const path = getPathForModule(lab);
  if (path) return path.title;
  return `${lab.category} learning sequence`;
}
