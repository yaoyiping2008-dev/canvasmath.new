import type { LabModule } from "@/lib/labs-data";
import { LabTaskCard } from "@/components/LabTaskCard";

type SimulationGridProps = {
  labs: LabModule[];
  emptyMessage?: string;
};

export function SimulationGrid({ labs, emptyMessage }: SimulationGridProps) {
  if (!labs.length) {
    return (
      <div className="grid min-h-64 place-items-center border border-dashed border-border text-sm text-muted-foreground">
        {emptyMessage ?? "No simulations match your search."}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
      {labs.map((lab, index) => (
        <LabTaskCard key={lab.slug} lab={lab} index={index} />
      ))}
    </div>
  );
}
