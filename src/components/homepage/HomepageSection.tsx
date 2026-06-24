import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  headingSection,
  sectionHeader,
  sectionPadding,
  sectionPaddingLg,
  sectionSurfaceFeatured,
  sectionSurfaceMuted,
  sectionSurfaceSubtle,
  textSubtitle,
} from "@/lib/designSystem";

export type HomepageSectionTone = "plain" | "muted" | "subtle" | "featured";

type HomepageSectionProps = {
  id: string;
  title: string;
  description?: string;
  tone?: HomepageSectionTone;
  children: ReactNode;
};

const toneStyles: Record<HomepageSectionTone, string> = {
  plain: "",
  muted: cn(sectionSurfaceMuted, sectionPadding),
  subtle: cn(sectionSurfaceSubtle, sectionPadding),
  featured: cn(sectionSurfaceFeatured, sectionPaddingLg),
};

export function HomepageSection({
  id,
  title,
  description,
  tone = "plain",
  children,
}: HomepageSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("scroll-mt-28", toneStyles[tone])}
    >
      <div className={`${sectionHeader} space-y-0`}>
        <h2 id={`${id}-heading`} className={cn(headingSection, "text-base md:text-lg")}>
          {title}
        </h2>
        {description && (
          <p className={cn(textSubtitle, "max-w-2xl text-xs md:text-sm")}>{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
