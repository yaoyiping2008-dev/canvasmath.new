import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLearningHistory } from "@/hooks/useLearningHistory";
import { getLabBySlug } from "@/lib/labs-data";
import { buildModuleHeadMeta } from "@/lib/moduleSeo";
import { SITE_DESCRIPTION } from "@/lib/siteMeta";

const LabDetailLayout = lazy(() =>
  import("@/components/labs/LabDetailLayout").then((module) => ({
    default: module.LabDetailLayout,
  })),
);

function LabPageFallback() {
  return (
    <div
      className="homepage-shell flex min-h-screen items-center justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm text-muted-foreground">Loading interactive workspace…</p>
    </div>
  );
}

export const Route = createFileRoute("/labs/$slug")({
  validateSearch: () => ({}),
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

function LabDetailPage() {
  const { slug } = Route.useParams();
  const lab = getLabBySlug(slug);
  const { markExplored } = useLearningHistory();

  useEffect(() => {
    if (lab) markExplored(slug);
  }, [lab, slug, markExplored]);

  if (!lab) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-foreground">
        <h1 className="font-display text-2xl font-bold">Module not found</h1>
        <p className="text-sm text-muted-foreground">
          The requested simulation module does not exist or has been moved.
        </p>
        <Button asChild variant="default">
          <Link to="/">Back to All Simulations</Link>
        </Button>
      </div>
    );
  }

  return (
    <Suspense fallback={<LabPageFallback />}>
      <LabDetailLayout lab={lab} />
    </Suspense>
  );
}
