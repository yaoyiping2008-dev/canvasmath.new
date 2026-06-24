import { ShieldCheck } from "lucide-react";
import { EDUCATION_SAFETY_FOOTER } from "@/lib/siteMeta";

type EducationSafetyNoticeProps = {
  compact?: boolean;
};

export function EducationSafetyNotice({ compact }: EducationSafetyNoticeProps) {
  if (compact) {
    return (
      <p className="w-full text-center text-[11px] leading-relaxed text-muted-foreground">
        {EDUCATION_SAFETY_FOOTER}
      </p>
    );
  }

  return (
    <div className="flex items-start gap-2 rounded-lg border border-border/50 bg-muted/15 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <p>{EDUCATION_SAFETY_FOOTER}</p>
    </div>
  );
}
