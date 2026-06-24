import { cn } from "@/lib/utils";
import type { LabModule } from "@/lib/labs-data";
import { LabTaskCard } from "@/components/LabTaskCard";

type RelatedSimulationGridProps = {
  title: string;
  labs: LabModule[];
  layout: "sidebar" | "bottom";
  className?: string;
};

export function RelatedSimulationGrid({
  title,
  labs,
  layout,
  className,
}: RelatedSimulationGridProps) {
  if (!labs.length) return null;

  return (
    <section aria-labelledby={`${layout}-related-heading`} className={cn("min-w-0", className)}>
      <h2
        id={`${layout}-related-heading`}
        className="homepage-section-title mb-3 text-sm font-semibold md:text-base"
      >
        {title}
      </h2>
      <div
        className={cn(
          layout === "sidebar"
            ? "lab-related-sidebar-grid"
            : "homepage-catalog-grid lab-related-bottom-grid",
        )}
      >
        {labs.map((lab, index) => (
          <LabTaskCard
            key={lab.slug}
            lab={lab}
            index={index}
            mode="image"
            className="lab-related-card"
          />
        ))}
      </div>
    </section>
  );
}
