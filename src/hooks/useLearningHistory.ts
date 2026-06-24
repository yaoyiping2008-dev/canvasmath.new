import { useCallback, useState } from "react";
import type { LabModule } from "@/lib/labs-data";
import { labsData } from "@/lib/labs-data";
import {
  endLearningSession,
  getAllLearningRecords,
  getLearningRecord,
  getMostRecentSlug,
  getProgressBadge,
  getRecentLearningRecords,
  recordLearningEvent,
  startLearningSession,
  type LearningRecord,
  type LearningStatus,
  type ProgressBadgeLabel,
} from "@/lib/learningStorage";

export function useLearningHistory() {
  const [records, setRecords] = useState(() => getAllLearningRecords());

  const refresh = useCallback(() => {
    setRecords(getAllLearningRecords());
  }, []);

  const recentRecords = getRecentLearningRecords(6);
  const mostRecentSlug = getMostRecentSlug();

  const getRecord = useCallback((slug: string) => getLearningRecord(slug), []);

  const getBadge = useCallback(
    (slug: string): ProgressBadgeLabel | null => getProgressBadge(getLearningRecord(slug)),
    [records],
  );

  const markVisited = useCallback(
    (slug: string) => {
      recordLearningEvent(slug, "visited", { incrementVisit: true });
      refresh();
    },
    [refresh],
  );

  const markExplored = useCallback(
    (slug: string) => {
      recordLearningEvent(slug, "explored", { incrementVisit: false });
      startLearningSession(slug);
      refresh();
    },
    [refresh],
  );

  const markCompleted = useCallback(
    (slug: string) => {
      endLearningSession(slug);
      recordLearningEvent(slug, "completed", { incrementVisit: false });
      refresh();
    },
    [refresh],
  );

  const resolveRecentModules = (): LabModule[] => {
    return getRecentLearningRecords(6)
      .map((record) => labsData.find((lab) => lab.slug === record.slug))
      .filter((lab): lab is LabModule => Boolean(lab));
  };

  return {
    records,
    recentRecords,
    recentModules: resolveRecentModules(),
    mostRecentSlug,
    getRecord,
    getBadge,
    getStatus: (slug: string): LearningStatus | undefined => getLearningRecord(slug)?.status,
    markVisited,
    markExplored,
    markCompleted,
    refresh,
  };
}

export type { LearningRecord, LearningStatus, ProgressBadgeLabel };
