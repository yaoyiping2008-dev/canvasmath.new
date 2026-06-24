import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { LabModule } from "@/lib/labs-data";
import { depthCard, textMetadata, textSubtitle } from "@/lib/designSystem";
import { ModuleThumbnail } from "@/components/ui/ModuleThumbnail";
import type { ProgressBadgeLabel } from "@/lib/learningStorage";

type ContinueLearningProps = {
  modules: LabModule[];
  getBadge: (slug: string) => ProgressBadgeLabel | null;
  continueSlug?: string;
};

function badgeStyles(label: ProgressBadgeLabel): string {
  switch (label) {
    case "Completed":
      return "border-primary/30 bg-primary/10 text-primary";
    case "Revisiting":
      return "border-border bg-muted/60 text-muted-foreground";
    default:
      return "border-border/60 bg-background text-foreground";
  }
}

export function ContinueLearning({ modules, getBadge, continueSlug }: ContinueLearningProps) {
  if (!modules.length) return null;

  return (
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:thin] md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
      {modules.map((lab, index) => {
        const badge = getBadge(lab.slug);
        const isContinue = lab.slug === continueSlug;

        return (
          <article
            key={lab.slug}
            className={cn(
              "w-[82vw] shrink-0 snap-start min-[480px]:w-[46vw] md:w-auto md:shrink",
              isContinue && "md:rounded-xl md:ring-1 md:ring-primary/25",
            )}
          >
            <Link
              to="/labs/$slug"
              params={{ slug: lab.slug }}
              aria-label={`Continue ${lab.title}`}
              className={cn(
                "group/card flex h-full flex-col overflow-hidden rounded-xl border bg-card outline-none",
                depthCard,
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isContinue ? "border-primary/30" : "border-border/60",
              )}
            >
              <ModuleThumbnail
                src={lab.image}
                variant="standard"
                eager={index < 3}
                className="relative aspect-[4/3]"
              >
                {badge && (
                  <span
                    className={cn(
                      "absolute left-2 top-2 z-20 rounded-md border px-1.5 py-0.5 text-[10px] font-medium shadow-sm",
                      badgeStyles(badge),
                    )}
                  >
                    {badge}
                  </span>
                )}
                {isContinue && (
                  <span className="absolute right-2 top-2 z-20 rounded-md border border-primary/30 bg-background/90 px-1.5 py-0.5 text-[10px] font-medium text-primary shadow-sm">
                    Continue
                  </span>
                )}
              </ModuleThumbnail>
              <div className="space-y-1 p-3">
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight text-foreground">
                  {lab.title}
                </h3>
                <p className={textMetadata}>{lab.subject ?? lab.category}</p>
                {lab.summary && (
                  <p className={cn(textSubtitle, "line-clamp-2 text-[11px]")}>{lab.summary}</p>
                )}
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
