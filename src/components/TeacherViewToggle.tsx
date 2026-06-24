import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

type TeacherViewToggleProps = {
  enabled: boolean;
  onToggle: () => void;
  className?: string;
};

export function TeacherViewToggle({ enabled, onToggle, className }: TeacherViewToggleProps) {
  return (
    <Button
      type="button"
      variant={enabled ? "secondary" : "outline"}
      size="sm"
      className={className}
      aria-pressed={enabled}
      aria-label={enabled ? "Disable teacher view mode" : "Enable teacher view mode"}
      onClick={onToggle}
    >
      <GraduationCap className="size-4" aria-hidden="true" />
      <span className="hidden sm:inline">Teacher View</span>
      <span className="sm:hidden">Teacher</span>
    </Button>
  );
}
