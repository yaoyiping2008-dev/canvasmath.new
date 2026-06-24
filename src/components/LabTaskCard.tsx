import { Link } from "@tanstack/react-router";
import { Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LabModule } from "@/lib/labs-data";
import { depthCard, depthCardHero, depthCardSecondary, textMetadata } from "@/lib/designSystem";
import { ModuleThumbnail } from "@/components/ui/ModuleThumbnail";

/** Shared image ratio across card tiers for visual consistency. */
const IMAGE_RATIO = "aspect-[4/3]";

export type LabTaskCardVariant = "hero" | "secondary" | "standard" | "compact";
export type LabTaskCardMode = "default" | "catalog";

type LabTaskCardProps = {
  lab: LabModule;
  index: number;
  variant?: LabTaskCardVariant;
  mode?: LabTaskCardMode;
  className?: string;
  showNewLabel?: boolean;
};

function CatalogMeta({ lab }: { lab: LabModule }) {
  const parts = [
    lab.subject ?? lab.category,
    lab.gradeBand,
    lab.estimatedMinutes != null ? `${lab.estimatedMinutes} min` : null,
  ].filter(Boolean);

  if (!parts.length) return null;

  return (
    <p className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-muted-foreground">
      {parts.map((part, i) => (
        <span key={part} className="inline-flex items-center gap-1">
          {i > 0 && <span aria-hidden="true">·</span>}
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
  mode = "default",
  className,
  showNewLabel,
}: LabTaskCardProps) {
  const isHero = variant === "hero";
  const isSecondary = variant === "secondary";
  const isCompact = variant === "compact";
  const isCatalog = mode === "catalog";

  if (isCatalog) {
    return (
      <article className={cn("min-w-0", className)}>
        <Link
          to="/labs/$slug"
          params={{ slug: lab.slug }}
          aria-label={`Open ${lab.title} module`}
          className={cn(cardShell, "homepage-card flex flex-col overflow-hidden rounded-[14px]")}
        >
          <ModuleThumbnail
            src={lab.image}
            variant="standard"
            eager={index < 8}
            className="aspect-[4/3]"
          >
            {showNewLabel && lab.recentlyAdded && (
              <span className="absolute left-2 top-2 z-20 rounded-md border border-primary/25 bg-white/95 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                New
              </span>
            )}
          </ModuleThumbnail>
          <div className="p-3">
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight">
              {lab.title}
            </h3>
            <CatalogMeta lab={lab} />
          </div>
        </Link>
      </article>
    );
  }

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

          {!isCompact && lab.subject && (
            <span
              className={cn(
                "mt-2 w-fit rounded-md border border-border/50 bg-muted/40 font-medium",
                textMetadata,
                "px-1.5 py-0.5",
              )}
            >
              {lab.subject}
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}
