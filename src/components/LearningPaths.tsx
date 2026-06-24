import { Link } from "@tanstack/react-router";
import { ArrowRight, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEARNING_PATHS } from "@/lib/learningRecommendations";
import { labsData } from "@/lib/labs-data";
import { depthCard, headingSection, textMetadata, textSubtitle } from "@/lib/designSystem";

export function LearningPaths() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {LEARNING_PATHS.map((path) => {
        const modules = path.moduleSlugs
          .map((slug) => labsData.find((lab) => lab.slug === slug))
          .filter(Boolean);
        const startSlug = path.moduleSlugs[0];

        if (!startSlug || !modules.length) return null;

        return (
          <article
            key={path.id}
            className={`${depthCard} flex flex-col rounded-xl border border-border/60 bg-card/85 p-4 md:p-5`}
          >
            <div className="mb-3 flex items-start gap-2">
              <div className="depth-surface flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-muted/30">
                <Route className="size-4 text-primary" aria-hidden="true" />
              </div>
              <div className="min-w-0 space-y-1">
                <h3 className={`${headingSection} text-sm md:text-base`}>{path.title}</h3>
                <p className={`${textSubtitle} text-xs`}>{path.description}</p>
              </div>
            </div>

            <ol className="mb-4 space-y-1.5 border-t border-border/40 pt-3">
              {modules.slice(0, 5).map((lab, index) => (
                <li
                  key={lab!.slug}
                  className={`${textMetadata} flex items-center gap-2`}
                >
                  <span className="depth-surface flex size-5 shrink-0 items-center justify-center rounded-full bg-muted/50 text-[10px] font-medium text-foreground">
                    {index + 1}
                  </span>
                  <span className="truncate">{lab!.title}</span>
                </li>
              ))}
              {modules.length > 5 && (
                <li className={`${textMetadata} pl-7`}>
                  +{modules.length - 5} more modules in this path
                </li>
              )}
            </ol>

            <Button asChild size="sm" className="mt-auto w-full sm:w-auto">
              <Link
                to="/labs/$slug"
                params={{ slug: startSlug }}
                aria-label={`Start ${path.title}`}
              >
                Start Path
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </article>
        );
      })}
    </div>
  );
}
