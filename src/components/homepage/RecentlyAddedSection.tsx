import type { LabModule } from "@/lib/labs-data";
import { SimulationGrid } from "@/components/SimulationGrid";

type RecentlyAddedSectionProps = {
  labs: LabModule[];
};

export function RecentlyAddedSection({ labs }: RecentlyAddedSectionProps) {
  if (!labs.length) return null;

  return (
    <section id="recently-added" aria-labelledby="recently-added-heading" className="scroll-mt-4">
      <h2
        id="recently-added-heading"
        className="homepage-section-title mb-3 text-base font-semibold md:text-lg"
      >
        Recently Added
      </h2>
      <SimulationGrid labs={labs} layout="recent" mode="image" />
    </section>
  );
}
