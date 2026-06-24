import { cn } from "@/lib/utils";
import type { LabModule } from "@/lib/labs-data";
import type { LearningStatus } from "@/lib/learningStorage";
import { featuredHeroZone, featuredHeroZoneContent } from "@/lib/designSystem";
import { LabTaskCard, type LabTaskCardVariant } from "@/components/LabTaskCard";

export type SimulationGridLayout = "grid" | "scroll" | "featured" | "split";

type SimulationGridProps = {
  labs: LabModule[];
  layout?: SimulationGridLayout;
  variant?: LabTaskCardVariant;
  emptyMessage?: string;
  className?: string;
  learningStatusMap?: Record<string, LearningStatus | undefined>;
  continueSlug?: string;
};

const GRID_STANDARD =
  "grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

const GRID_SPLIT = "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3";

export function SimulationGrid({
  labs,
  layout = "grid",
  variant = "standard",
  emptyMessage,
  className,
  learningStatusMap,
  continueSlug,
}: SimulationGridProps) {
  if (!labs.length) {
    return (
      <div
        role="status"
        className="depth-surface grid min-h-40 place-items-center rounded-xl border border-dashed border-border/70 bg-muted/10 px-4 py-10 text-center text-sm text-muted-foreground"
      >
        {emptyMessage ?? "No simulations match your search."}
      </div>
    );
  }

  const cardProps = (lab: LabModule, index: number, cardVariant = variant) => ({
    lab,
    index,
    variant: cardVariant,
    learningStatus: learningStatusMap?.[lab.slug],
    isContinueTarget: continueSlug === lab.slug,
  });

  if (layout === "featured") {
    const [primary, ...rest] = labs;
    const secondaryCards = rest.slice(0, 2);
    const remainder = rest.slice(2);

    return (
      <div className={cn("space-y-6 md:space-y-8", className)}>
        <div className={featuredHeroZone}>
          <div className={cn(featuredHeroZoneContent, "grid gap-5 lg:grid-cols-12 lg:gap-6")}>
            <LabTaskCard {...cardProps(primary, 0, "hero")} className="lg:col-span-8" />
            {secondaryCards.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:gap-5">
                {secondaryCards.map((lab, index) => (
                  <LabTaskCard key={lab.slug} {...cardProps(lab, index + 1, "secondary")} />
                ))}
              </div>
            )}
          </div>
        </div>

        {remainder.length > 0 && (
          <div className="space-y-4 pt-2">
            <p className="text-eyebrow text-[11px] tracking-[0.18em] text-muted-foreground">
              More featured modules
            </p>
            <div className={GRID_STANDARD}>
              {remainder.map((lab, index) => (
                <LabTaskCard
                  key={lab.slug}
                  {...cardProps(lab, index + secondaryCards.length + 1)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (layout === "scroll") {
    return (
      <div
        className={cn(
          "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:thin]",
          "md:grid md:snap-none md:overflow-visible md:pb-0",
          GRID_STANDARD,
          className,
        )}
      >
        {labs.map((lab, index) => (
          <LabTaskCard
            key={lab.slug}
            {...cardProps(lab, index)}
            className="w-[82vw] shrink-0 snap-start min-[480px]:w-[46vw] md:w-auto md:shrink"
          />
        ))}
      </div>
    );
  }

  if (layout === "split") {
    return (
      <div className={cn(GRID_SPLIT, className)}>
        {labs.map((lab, index) => (
          <LabTaskCard key={lab.slug} {...cardProps(lab, index)} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn(GRID_STANDARD, className)}>
      {labs.map((lab, index) => (
        <LabTaskCard key={lab.slug} {...cardProps(lab, index)} />
      ))}
    </div>
  );
}
