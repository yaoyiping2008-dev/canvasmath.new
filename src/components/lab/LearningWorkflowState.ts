import type { LabDifficulty, LabModule, LabModuleCategory } from "@/lib/labs-data";

export type LearningStage = "understand" | "explore" | "reflect";

export type CognitiveLoad = "Low" | "Medium" | "High";

export type SkillDomain =
  | "Algebraic thinking"
  | "Spatial reasoning"
  | "Data interpretation"
  | "Logical deduction";

export type LearningContext = {
  purpose: string;
  understanding: string;
  relevance: string;
};

const CATEGORY_RELEVANCE: Record<LabModuleCategory, string> = {
  "Number & Operations":
    "Supports numeracy fluency used across science measurements, finance literacy, and daily estimation.",
  Algebra:
    "Builds symbolic reasoning applied in science formulas, coding logic, and problem modeling.",
  Geometry:
    "Develops spatial reasoning used in design, engineering diagrams, and map interpretation.",
  "Probability & Data":
    "Strengthens statistical literacy for interpreting charts, surveys, and research summaries.",
  "Physics & Motion":
    "Connects mathematical models to observable motion, forces, and physical systems.",
  "Logic & Reasoning":
    "Reinforces structured reasoning used in proofs, debugging, and evidence-based decisions.",
};

const SKILL_DOMAIN_KEYWORDS: Record<SkillDomain, string[]> = {
  "Algebraic thinking": [
    "algebra",
    "equation",
    "expression",
    "polynomial",
    "linear",
    "quadratic",
    "calculus",
    "variable",
    "function",
    "graph",
  ],
  "Spatial reasoning": [
    "spatial",
    "geometry",
    "area",
    "perimeter",
    "vector",
    "grid",
    "shape",
    "orientation",
    "tessellation",
  ],
  "Data interpretation": [
    "data",
    "probability",
    "distribution",
    "statistical",
    "graph",
    "chart",
    "binomial",
  ],
  "Logical deduction": [
    "logic",
    "deductive",
    "reasoning",
    "constraint",
    "sudoku",
    "pattern",
    "strategy",
    "planning",
  ],
};

export function getCognitiveLoad(lab: LabModule): CognitiveLoad {
  const minutes = lab.estimatedMinutes ?? 20;

  if (lab.difficulty === "Advanced" || minutes >= 30) return "High";
  if (lab.difficulty === "Introductory" && minutes <= 15) return "Low";
  return "Medium";
}

export function getSkillDomains(lab: LabModule): SkillDomain[] {
  const corpus = [
    lab.category,
    lab.subject,
    ...(lab.skills ?? []),
    ...(lab.learningObjectives ?? []),
    lab.summary,
    lab.seoDescription,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (Object.entries(SKILL_DOMAIN_KEYWORDS) as [SkillDomain, string[]][])
    .filter(([, keywords]) => keywords.some((keyword) => corpus.includes(keyword)))
    .map(([domain]) => domain);
}

export function getLearningContext(lab: LabModule): LearningContext {
  const purpose =
    lab.summary ??
    lab.seoDescription ??
    `This module supports ${lab.category.toLowerCase()} practice within the CanvasMath K-12 workspace.`;

  const understanding =
    lab.learningObjectives?.[0] ??
    `Students will examine core ideas related to ${lab.subject ?? lab.category}.`;

  const relevance =
    CATEGORY_RELEVANCE[lab.category] ??
    "Supports transferable mathematical reasoning used across STEM coursework and daily decision-making.";

  return { purpose, understanding, relevance };
}

export function getModuleFocus(lab: LabModule): string {
  return lab.summary ?? lab.learningObjectives?.[0] ?? lab.seoDescription;
}

export function getSessionHint(lab: LabModule): string | undefined {
  if (lab.learningObjectives && lab.learningObjectives.length > 1) {
    return lab.learningObjectives[1];
  }
  if (lab.summary) {
    return `Focus on the central idea: ${lab.summary}`;
  }
  return undefined;
}

export function getReflectionConcept(lab: LabModule): string {
  return (
    lab.learningObjectives?.[0] ?? lab.summary ?? `Core ideas from ${lab.subject ?? lab.category}`
  );
}

export const DIFFICULTY_STEPS: LabDifficulty[] = ["Introductory", "Intermediate", "Advanced"];

export function getDifficultyIndex(difficulty?: LabDifficulty): number {
  if (!difficulty) return 0;
  return DIFFICULTY_STEPS.indexOf(difficulty);
}

export const STAGE_LABELS: Record<LearningStage, string> = {
  understand: "Understand",
  explore: "Learn",
  reflect: "Reflect",
};

export const STAGE_DESCRIPTIONS: Record<LearningStage, string> = {
  understand: "Review objectives and module purpose before launching.",
  explore: "Investigate the classroom-ready simulation in the workspace.",
  reflect: "Summarize conceptual understanding and choose next steps.",
};
