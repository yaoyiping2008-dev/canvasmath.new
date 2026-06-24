export type LearningStatus = "visited" | "explored" | "completed";

export type LearningRecord = {
  slug: string;
  lastVisitedAt: number;
  status: LearningStatus;
  visitCount: number;
  timeSpentSeconds: number;
  sessionStartedAt?: number;
};

export type LearningHistoryStore = {
  version: 1;
  records: Record<string, LearningRecord>;
};

const STORAGE_KEY = "canvasmath-learning-history";

const EMPTY_STORE: LearningHistoryStore = { version: 1, records: {} };

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function readStore(): LearningHistoryStore {
  if (!isBrowser()) return EMPTY_STORE;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_STORE, records: {} };
    const parsed = JSON.parse(raw) as LearningHistoryStore;
    if (parsed.version !== 1 || !parsed.records) return { ...EMPTY_STORE, records: {} };
    return parsed;
  } catch {
    return { ...EMPTY_STORE, records: {} };
  }
}

function writeStore(store: LearningHistoryStore): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Storage quota or privacy mode — fail silently.
  }
}

const STATUS_RANK: Record<LearningStatus, number> = {
  visited: 1,
  explored: 2,
  completed: 3,
};

function mergeStatus(current: LearningStatus | undefined, next: LearningStatus): LearningStatus {
  if (!current) return next;
  return STATUS_RANK[next] >= STATUS_RANK[current] ? next : current;
}

export function recordLearningEvent(
  slug: string,
  status: LearningStatus,
  options?: { incrementVisit?: boolean },
): LearningRecord {
  const store = readStore();
  const existing = store.records[slug];
  const now = Date.now();
  const incrementVisit = options?.incrementVisit ?? status === "visited";

  const record: LearningRecord = {
    slug,
    lastVisitedAt: now,
    status: mergeStatus(existing?.status, status),
    visitCount: (existing?.visitCount ?? 0) + (incrementVisit ? 1 : 0),
    timeSpentSeconds: existing?.timeSpentSeconds ?? 0,
    sessionStartedAt: existing?.sessionStartedAt,
  };

  store.records[slug] = record;
  writeStore(store);
  return record;
}

export function startLearningSession(slug: string): void {
  const store = readStore();
  const existing = store.records[slug];
  const now = Date.now();

  store.records[slug] = {
    slug,
    lastVisitedAt: now,
    status: mergeStatus(existing?.status, "explored"),
    visitCount: existing?.visitCount ?? 1,
    timeSpentSeconds: existing?.timeSpentSeconds ?? 0,
    sessionStartedAt: now,
  };

  writeStore(store);
}

export function endLearningSession(slug: string): void {
  const store = readStore();
  const existing = store.records[slug];
  if (!existing?.sessionStartedAt) return;

  const elapsed = Math.max(0, Math.round((Date.now() - existing.sessionStartedAt) / 1000));
  store.records[slug] = {
    ...existing,
    sessionStartedAt: undefined,
    timeSpentSeconds: existing.timeSpentSeconds + elapsed,
    lastVisitedAt: Date.now(),
  };

  writeStore(store);
}

export function getLearningRecord(slug: string): LearningRecord | undefined {
  return readStore().records[slug];
}

export function getAllLearningRecords(): LearningRecord[] {
  return Object.values(readStore().records);
}

export function getRecentLearningRecords(limit = 6): LearningRecord[] {
  return getAllLearningRecords()
    .sort((a, b) => b.lastVisitedAt - a.lastVisitedAt)
    .slice(0, limit);
}

export type ProgressBadgeLabel = "New" | "Revisiting" | "Completed";

export function getProgressBadge(record: LearningRecord | undefined): ProgressBadgeLabel | null {
  if (!record) return null;
  if (record.status === "completed") return "Completed";
  if (record.visitCount > 1) return "Revisiting";
  return "New";
}

export function hasVisited(slug: string): boolean {
  return Boolean(getLearningRecord(slug));
}

export function getMostRecentSlug(): string | undefined {
  return getRecentLearningRecords(1)[0]?.slug;
}
