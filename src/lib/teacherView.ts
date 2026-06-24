import type { LabModule } from "@/lib/labs-data";
import { labsData } from "@/lib/labs-data";
import { getPathForModule } from "@/lib/learningRecommendations";

export type TeachingSequence = {
  pathTitle: string;
  modules: LabModule[];
  currentIndex: number;
};

export function getTeachingSequenceForModule(lab: LabModule): TeachingSequence | null {
  const path = getPathForModule(lab);
  if (!path) return null;

  const modules = path.moduleSlugs
    .map((slug) => labsData.find((item) => item.slug === slug))
    .filter((item): item is LabModule => Boolean(item));

  return {
    pathTitle: path.title,
    modules,
    currentIndex: path.moduleSlugs.indexOf(lab.slug),
  };
}

export const TEACHER_VIEW_RECOMMENDED_STEPS = [
  "Review learning objectives and academic relevance with students.",
  "Model one guided example before independent investigation.",
  "Pause for structured discussion before the reflection phase.",
  "Connect outcomes to the recommended learning path sequence.",
] as const;
