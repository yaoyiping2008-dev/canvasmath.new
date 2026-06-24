import { Link } from "@tanstack/react-router";
import { BookOpenCheck, RotateCcw } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import type { LabModule } from "@/lib/labs-data";
import { LearningWorkflowSteps } from "./LearningWorkflowSteps";
import { getReflectionConcept } from "./LearningWorkflowState";

type ReflectionPanelProps = {
  lab: LabModule;
  onReplay: () => void;
};

export function ReflectionPanel({ lab, onReplay }: ReflectionPanelProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const concept = getReflectionConcept(lab);

  useEffect(() => {
    headingRef.current?.focus();
  }, [lab.slug]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="border-b border-border/80 bg-card/40">
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-4 md:px-6">
          <LearningWorkflowSteps current="reflect" />
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-10 md:px-6 md:py-14">
        <div
          role="status"
          className="w-full max-w-lg space-y-6 rounded-2xl border border-border/70 bg-card p-6 shadow-sm md:p-8"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <BookOpenCheck className="size-6 text-primary" aria-hidden="true" />
            </div>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-xl font-bold tracking-tight outline-none md:text-2xl"
            >
              Module session complete
            </h1>
            <p className="text-sm text-muted-foreground">{lab.title}</p>
          </div>

          <div className="space-y-2 rounded-lg border border-border/60 bg-muted/15 px-4 py-3 text-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Key concept studied
            </p>
            <p className="leading-relaxed text-foreground">{concept}</p>
          </div>

          {(lab.skills?.length ?? 0) > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Skills practiced
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {lab.skills!.map((skill) => (
                  <li
                    key={skill}
                    className="rounded border border-border/60 bg-background px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            Consider how the classroom-ready simulation supported your learning objectives. You may
            review the module again or return to browse other standards-aligned activities.
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild className="flex-1">
              <Link to="/" aria-label="Return to learning labs catalog">
                Return to Learning Labs
              </Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              aria-label={`Review ${lab.title} simulation again`}
              onClick={onReplay}
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Review Simulation Again
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
