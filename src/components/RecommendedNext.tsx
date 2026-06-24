import { Link } from "@tanstack/react-router";
import type { LabModule } from "@/lib/labs-data";
import { getRecommendedModules } from "@/lib/learningRecommendations";

type RecommendedNextProps = {
  lab: LabModule;
};

export function RecommendedNext({ lab }: RecommendedNextProps) {
  const recommendations = getRecommendedModules(lab, 4);
  if (!recommendations.length) return null;

  return (
    <section
      aria-labelledby="recommended-next-heading"
      className="border-t border-border/60 bg-muted/10 px-4 py-6 md:px-6 md:py-8"
    >
      <div className="mx-auto max-w-5xl space-y-4">
        <div>
          <h2
            id="recommended-next-heading"
            className="font-display text-base font-semibold md:text-lg"
          >
            Recommended next modules
          </h2>
          <p className="mt-1 text-xs text-muted-foreground md:text-sm">
            Suggested based on subject area, difficulty level, and recent catalog additions.
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {recommendations.map((item) => (
            <li key={item.slug}>
              <Link
                to="/labs/$slug"
                params={{ slug: item.slug }}
                className="flex h-full flex-col rounded-lg border border-border/60 bg-card p-3 outline-none transition-colors hover:border-border focus-visible:ring-2 focus-visible:ring-ring"
              >
                <p className="line-clamp-2 text-sm font-medium leading-snug">{item.title}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{item.category}</p>
                {item.difficulty && (
                  <p className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground/80">
                    {item.difficulty}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
