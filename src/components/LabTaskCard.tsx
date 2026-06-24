import { Link } from "@tanstack/react-router";
import { Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LabModule } from "@/lib/labs-data";
import {
  depthCard,
  depthCardHero,
  depthCardSecondary,
  textMetadata,
} from "@/lib/designSystem";
import { ModuleThumbnail } from "@/components/ui/ModuleThumbnail";

import type { LearningStatus } from "@/lib/learningStorage";

/** Shared image ratio across card tiers for visual consistency. */
const IMAGE_RATIO = "aspect-[4/3]";

export type LabTaskCardVariant = "hero" | "secondary" | "standard" | "compact";

type LabTaskCardProps = {
  lab: LabModule;
  index: number;
  variant?: LabTaskCardVariant;
  className?: string;
  learningStatus?: LearningStatus;
  isContinueTarget?: boolean;
};

function CardMeta({ lab, variant }: { lab: LabModule; variant: LabTaskCardVariant }) {
  const isCompact = variant === "compact";
  const isHero = variant === "hero";

  const detailParts = [
    lab.gradeBand,
    lab.difficulty,
    lab.estimatedMinutes != null ? `${lab.estimatedMinutes} min` : null,
  ].filter(Boolean);

  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", isHero ? "mt-3" : "mt-2")}>
      {lab.subject && (
        <span
          className={cn(
            "w-fit rounded-md border border-border/50 bg-muted/40 font-medium",
            textMetadata,
            isHero ? "px-2 py-0.5 text-[11px]" : "px-1.5 py-0.5 text-[10px]",
          )}
        >
          {lab.subject}
        </span>
      )}

      {!isCompact && detailParts.length > 0 && (
        <p className={cn("flex flex-wrap items-center gap-x-2 gap-y-0.5 leading-relaxed", textMetadata)}>
          {detailParts.map((part, index) => (
            <span key={part} className="inline-flex items-center gap-1">
              {index > 0 && <span aria-hidden="true">·</span>}
              {typeof part === "string" && part.endsWith(" min") ? (
                <>
                  <Clock3 className="size-3 shrink-0" aria-hidden="true" />
                  {part}
                </>
              ) : (
                part
              )}
            </span>
          ))}
        </p>
      )}

      {!isCompact && lab.skills?.[0] && (
        <p className={cn("truncate", textMetadata)}>{lab.skills[0]}</p>
      )}
    </div>
  );
}

const cardShell = cn(
  "group/card relative flex h-full w-full min-w-0 overflow-hidden text-left outline-none",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100",
);

export function LabTaskCard({
  lab,
  index,
  variant = "standard",
  className,
  learningStatus,
  isContinueTarget,
}: LabTaskCardProps) {
  const isHero = variant === "hero";
  const isSecondary = variant === "secondary";
  const isCompact = variant === "compact";

  return (
    <article className={cn("min-w-0", className)}>
      <Link
        to="/labs/$slug"
        params={{ slug: lab.slug }}
        aria-label={`Open ${lab.title} simulation module`}
        className={cn(
          cardShell,
          isHero &&
            cn(
              depthCardHero,
              "flex-col rounded-2xl border border-primary/25",
              "md:min-h-[280px] md:flex-row md:items-stretch",
            ),
          isSecondary &&
            cn(depthCardSecondary, "flex-col rounded-xl border border-border/70 bg-card/95"),
          !isHero &&
            !isSecondary &&
            cn(depthCard, "flex-col rounded-xl border border-border/60 bg-card"),
        )}
      >
        <ModuleThumbnail
          src={lab.image}
          variant={variant}
          eager={index < 6}
          className={cn(
            "relative shrink-0",
            isHero
              ? cn(IMAGE_RATIO, "w-full md:aspect-auto md:w-[54%] md:min-h-[280px]")
              : IMAGE_RATIO,
          )}
        >
          <div
            className={cn(
              "module-thumb__scrim pointer-events-none absolute inset-0 z-10",
              isHero && "module-thumb__scrim--hero",
            )}
          />
          {learningStatus && (
            <span
              className={cn(
                "absolute right-2 top-2 z-20 size-2 rounded-full border border-background/80",
                learningStatus === "completed" && "bg-primary",
                learningStatus === "explored" && "bg-primary/60",
                learningStatus === "visited" && "bg-muted-foreground/70",
              )}
              aria-label={`Module ${learningStatus}`}
              title={`Module ${learningStatus}`}
            />
          )}
          {isContinueTarget && (
            <span className="absolute left-2 top-2 z-20 rounded-md border border-primary/30 bg-background/90 px-1.5 py-0.5 text-[10px] font-medium text-primary shadow-sm">
              Continue
            </span>
          )}
          {isHero && (
            <span className="absolute left-3 top-3 z-20 rounded-md border border-primary/30 bg-background/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary shadow-sm">
              Featured
            </span>
          )}
        </ModuleThumbnail>

        <div
          className={cn(
            "relative z-10 flex min-w-0 flex-1 flex-col justify-end bg-card/80",
            isHero && "p-4 md:justify-center md:p-6 lg:p-7",
            isSecondary && "p-3.5",
            isCompact && "p-2.5",
            !isHero && !isSecondary && !isCompact && "p-3",
          )}
        >
          <h3
            className={cn(
              "line-clamp-2 font-display font-semibold leading-snug tracking-tight text-foreground",
              isHero && "text-lg md:text-xl lg:text-2xl",
              isSecondary && "text-sm md:text-base",
              isCompact && "text-xs",
              !isHero && !isSecondary && !isCompact && "text-sm",
            )}
          >
            {lab.title}
          </h3>

          {isHero && lab.summary && (
            <p className="text-subtitle mt-2 line-clamp-3 text-sm md:line-clamp-2 md:text-[15px]">
              {lab.summary}
            </p>
          )}

          <CardMeta lab={lab} variant={variant} />
        </div>
      </Link>
    </article>
  );
}
