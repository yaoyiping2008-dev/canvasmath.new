import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { EducationSafetyNotice } from "@/components/EducationSafetyNotice";
import { TeacherViewToggle } from "@/components/TeacherViewToggle";
import type { LearningStage } from "@/components/lab/LearningWorkflowState";
import { useLearningHistory } from "@/hooks/useLearningHistory";
import { useTeacherView } from "@/hooks/useTeacherView";
import { getLabBySlug } from "@/lib/labs-data";
import { buildModuleHeadMeta } from "@/lib/moduleSeo";
import { SITE_DESCRIPTION } from "@/lib/siteMeta";

const LearningOverviewPanel = lazy(() =>
  import("@/components/lab/LearningOverviewPanel").then((module) => ({
    default: module.LearningOverviewPanel,
  })),
);
const SimulationWorkspace = lazy(() =>
  import("@/components/lab/SimulationWorkspace").then((module) => ({
    default: module.SimulationWorkspace,
  })),
);
const ReflectionPanel = lazy(() =>
  import("@/components/lab/ReflectionPanel").then((module) => ({
    default: module.ReflectionPanel,
  })),
);
const RecommendedNext = lazy(() =>
  import("@/components/RecommendedNext").then((module) => ({
    default: module.RecommendedNext,
  })),
);

type LabView = LearningStage;

type LabSearch = {
  view?: LabView;
};

function LabPageFallback() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background px-4"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm text-muted-foreground">Loading module workspace…</p>
    </div>
  );
}

export const Route = createFileRoute("/labs/$slug")({
  validateSearch: (search: Record<string, unknown>): LabSearch => {
    const view = search.view;
    if (view === "explore" || view === "simulation") return { view: "explore" };
    if (view === "reflect") return { view: "reflect" };
    return { view: "understand" };
  },
  head: ({ params }) => {
    const lab = getLabBySlug(params.slug);
    if (!lab) {
      return {
        meta: [
          { title: "Module Not Found — CanvasMath" },
          { name: "description", content: SITE_DESCRIPTION },
        ],
      };
    }

    return { meta: buildModuleHeadMeta(lab) };
  },
  component: LabDetailPage,
});

function normalizeView(view: LabView | "overview" | "simulation" | undefined): LabView {
  if (view === "explore" || view === "simulation") return "explore";
  if (view === "reflect") return "reflect";
  return "understand";
}

function LabDetailPage() {
  const { slug } = Route.useParams();
  const rawSearch = Route.useSearch();
  const navigate = useNavigate();
  const previousSlugRef = useRef(slug);
  const trackedStageRef = useRef<string | null>(null);
  const [focusLaunchButton, setFocusLaunchButton] = useState(false);
  const { markVisited, markExplored, markCompleted } = useLearningHistory();
  const { teacherView, toggleTeacherView } = useTeacherView();

  const view = normalizeView(rawSearch.view as LabView | "overview" | "simulation" | undefined);
  const lab = getLabBySlug(slug);

  useEffect(() => {
    if (previousSlugRef.current !== slug) {
      previousSlugRef.current = slug;
      trackedStageRef.current = null;
      setFocusLaunchButton(false);
      if (view !== "understand") {
        void navigate({
          to: "/labs/$slug",
          params: { slug },
          search: { view: "understand" },
          replace: true,
        });
      }
    }
  }, [slug, view, navigate]);

  useEffect(() => {
    if (!lab) return;

    const stageKey = `${slug}:${view}`;
    if (trackedStageRef.current === stageKey) return;
    trackedStageRef.current = stageKey;

    if (view === "understand") markVisited(slug);
    if (view === "explore") markExplored(slug);
    if (view === "reflect") markCompleted(slug);
  }, [lab, slug, view, markVisited, markExplored, markCompleted]);

  const launchSimulation = () => {
    setFocusLaunchButton(false);
    void navigate({
      to: "/labs/$slug",
      params: { slug },
      search: { view: "explore" },
    });
  };

  const exitToReflection = () => {
    void navigate({
      to: "/labs/$slug",
      params: { slug },
      search: { view: "reflect" },
    });
  };

  const reviewSimulation = () => {
    void navigate({
      to: "/labs/$slug",
      params: { slug },
      search: { view: "explore" },
    });
  };

  if (!lab) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-foreground">
        <h1 className="font-display text-2xl font-bold">Module not found</h1>
        <p className="text-sm text-muted-foreground">
          The requested simulation module does not exist or has been moved.
        </p>
        <Button asChild variant="default">
          <Link to="/">Return to Visual Mathematics Learning Labs</Link>
        </Button>
      </div>
    );
  }

  if (view === "explore") {
    return (
      <Suspense fallback={<LabPageFallback />}>
        <SimulationWorkspace lab={lab} onExitToReflection={exitToReflection} />
      </Suspense>
    );
  }

  if (view === "reflect") {
    return (
      <Suspense fallback={<LabPageFallback />}>
        <ReflectionPanel lab={lab} onReplay={reviewSimulation} />
        <RecommendedNext lab={lab} />
        <footer className="border-t border-border px-4 py-4">
          <EducationSafetyNotice compact />
        </footer>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<LabPageFallback />}>
      <LearningOverviewPanel
        lab={lab}
        onLaunch={launchSimulation}
        focusOnMount={focusLaunchButton}
        teacherView={teacherView}
        teacherViewToggle={
          <TeacherViewToggle enabled={teacherView} onToggle={toggleTeacherView} />
        }
      />
      <RecommendedNext lab={lab} />
      <footer className="border-t border-border px-4 py-4">
        <EducationSafetyNotice compact />
      </footer>
    </Suspense>
  );
}
