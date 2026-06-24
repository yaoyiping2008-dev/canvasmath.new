import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { LabModule } from "@/lib/labs-data";
import { ModuleThumbnail } from "@/components/ui/ModuleThumbnail";

type RecentlyAddedSectionProps = {
  labs: LabModule[];
};

export function RecentlyAddedSection({ labs }: RecentlyAddedSectionProps) {
  if (!labs.length) return null;

  return (
    <section id="recently-added" aria-labelledby="recently-added-heading" className="scroll-mt-24">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 id="recently-added-heading" className="homepage-section-title text-lg md:text-xl">
            Recently Added
          </h2>
          <p className="homepage-section-subtitle mt-1 text-sm">
            Newly catalogued learning modules.
          </p>
        </div>
        <a
          href="#all-simulations"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          View all
        </a>
      </div>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:thin] md:grid md:snap-none md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
        {labs.map((lab, index) => (
          <article
            key={lab.slug}
            className="w-[78vw] shrink-0 snap-start sm:w-[42vw] md:w-auto md:shrink"
          >
            <Link
              to="/labs/$slug"
              params={{ slug: lab.slug }}
              className={cn(
                "homepage-card group/card flex flex-col overflow-hidden outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
              aria-label={`Open ${lab.title}`}
            >
              <ModuleThumbnail
                src={lab.image}
                variant="standard"
                eager={index < 4}
                className="aspect-[4/3]"
              >
                {lab.recentlyAdded && (
                  <span className="absolute left-2 top-2 z-20 rounded-md border border-primary/25 bg-white/95 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                    New
                  </span>
                )}
              </ModuleThumbnail>
              <div className="space-y-0.5 p-3">
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{lab.title}</h3>
                <p className="text-xs text-muted-foreground">{lab.subject ?? lab.category}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
