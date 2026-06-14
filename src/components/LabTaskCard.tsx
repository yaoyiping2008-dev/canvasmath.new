import { useNavigate } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import type { LabModule } from "@/lib/labs-data";

type LabTaskCardProps = {
  lab: LabModule;
  index: number;
};

export function LabTaskCard({ lab, index }: LabTaskCardProps) {
  const navigate = useNavigate();

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    void navigate({ to: "/labs/$slug", params: { slug: lab.slug } });
  };

  return (
    <Button
      key={lab.title}
      variant="ghost"
      onClick={handleOpen}
      className="lab-glow group relative h-auto aspect-square cursor-pointer overflow-hidden rounded-md bg-card p-0 text-left transition duration-200 hover:scale-[1.02] hover:bg-card focus-visible:ring-2"
    >
      <img
        src={lab.coverUrl}
        alt={`${lab.title} simulation preview`}
        width={768}
        height={768}
        loading={index < 6 ? "eager" : "lazy"}
        className="h-full w-full object-cover transition duration-300 group-hover:brightness-110"
      />
      <span className="absolute inset-x-0 bottom-0 truncate bg-background/80 px-2.5 py-2 text-xs font-semibold backdrop-blur-sm">
        {lab.title}
      </span>
    </Button>
  );
}
