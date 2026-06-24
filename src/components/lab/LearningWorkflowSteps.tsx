import { cn } from "@/lib/utils";
import type { LearningStage } from "./LearningWorkflowState";
import { STAGE_DESCRIPTIONS, STAGE_LABELS } from "./LearningWorkflowState";

const STAGES: LearningStage[] = ["understand", "explore", "reflect"];

type LearningWorkflowStepsProps = {
  current: LearningStage;
  className?: string;
};

export function LearningWorkflowSteps({ current, className }: LearningWorkflowStepsProps) {
  const currentIndex = STAGES.indexOf(current);

  return (
    <nav aria-label="Learning workflow" className={cn("space-y-2", className)}>
      <ol className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0">
        {STAGES.map((stage, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = stage === current;

          return (
            <li
              key={stage}
              className={cn(
                "flex min-w-0 flex-1 items-start gap-2 sm:flex-col sm:items-stretch sm:px-2",
                index > 0 && "sm:border-l sm:border-border/50",
              )}
            >
              <div className="flex items-center gap-2 sm:mb-1">
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                    isCurrent && "bg-primary text-primary-foreground",
                    isComplete && "bg-muted text-foreground",
                    !isCurrent &&
                      !isComplete &&
                      "border border-border bg-background text-muted-foreground",
                  )}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    "text-xs font-semibold sm:text-[11px]",
                    isCurrent ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {STAGE_LABELS[stage]}
                </span>
              </div>
              <p className="hidden pl-8 text-[11px] leading-relaxed text-muted-foreground sm:block sm:pl-0">
                {STAGE_DESCRIPTIONS[stage]}
              </p>
            </li>
          );
        })}
      </ol>
      <p className="text-[11px] leading-relaxed text-muted-foreground sm:hidden">
        {STAGE_DESCRIPTIONS[current]}
      </p>
    </nav>
  );
}
