import type { LabModule, LabModuleCategory } from "@/lib/labs-data";

export type CategoryGroupId =
  | "number-algebra"
  | "geometry"
  | "probability"
  | "logic"
  | "physics"
  | "all";

export type SubjectGroupDefinition = {
  id: CategoryGroupId;
  label: string;
  shortLabel: string;
  categories: LabModuleCategory[];
  accent: string;
  scrollTarget: string;
};

export const SUBJECT_GROUPS: SubjectGroupDefinition[] = [
  {
    id: "number-algebra",
    label: "Number & Algebra",
    shortLabel: "Number & Algebra",
    categories: ["Number & Operations", "Algebra"],
    accent: "violet",
    scrollTarget: "all-simulations",
  },
  {
    id: "geometry",
    label: "Geometry & Spatial",
    shortLabel: "Geometry & Spatial",
    categories: ["Geometry"],
    accent: "blue",
    scrollTarget: "all-simulations",
  },
  {
    id: "probability",
    label: "Probability & Data",
    shortLabel: "Probability & Data",
    categories: ["Probability & Data"],
    accent: "green",
    scrollTarget: "all-simulations",
  },
  {
    id: "logic",
    label: "Logic & Reasoning",
    shortLabel: "Logic & Reasoning",
    categories: ["Logic & Reasoning"],
    accent: "orange",
    scrollTarget: "all-simulations",
  },
  {
    id: "physics",
    label: "Physics & STEM",
    shortLabel: "Physics & STEM",
    categories: ["Physics & Motion"],
    accent: "pink",
    scrollTarget: "all-simulations",
  },
  {
    id: "all",
    label: "All Simulations",
    shortLabel: "All Simulations",
    categories: [],
    accent: "violet",
    scrollTarget: "all-simulations",
  },
];

export const SIDEBAR_NAV: Array<{
  id: string;
  label: string;
  type: "group" | "section";
  groupId?: CategoryGroupId;
}> = [
  { id: "number-algebra", label: "Number & Algebra", type: "group", groupId: "number-algebra" },
  { id: "geometry", label: "Geometry & Spatial", type: "group", groupId: "geometry" },
  { id: "probability", label: "Probability & Data", type: "group", groupId: "probability" },
  { id: "logic", label: "Logic & Reasoning", type: "group", groupId: "logic" },
  { id: "physics", label: "Physics & STEM", type: "group", groupId: "physics" },
  { id: "recently-added", label: "Recently Added", type: "section" },
  { id: "all-simulations", label: "All Simulations", type: "section" },
];

export function countLabsInGroup(labs: LabModule[], groupId: CategoryGroupId): number {
  if (groupId === "all") return labs.length;
  const group = SUBJECT_GROUPS.find((g) => g.id === groupId);
  if (!group) return 0;
  return labs.filter((lab) => group.categories.includes(lab.category)).length;
}

export function filterLabsByGroup(labs: LabModule[], groupId: CategoryGroupId): LabModule[] {
  if (groupId === "all") return labs;
  const group = SUBJECT_GROUPS.find((g) => g.id === groupId);
  if (!group) return labs;
  return labs.filter((lab) => group.categories.includes(lab.category));
}
