import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { LabTaskCardVariant } from "@/components/LabTaskCard";

type ModuleThumbnailProps = {
  src: string;
  variant?: LabTaskCardVariant;
  eager?: boolean;
  className?: string;
  children?: ReactNode;
};

const variantClass: Partial<Record<LabTaskCardVariant, string>> = {
  hero: "module-thumb--hero",
  compact: "module-thumb--compact",
};

export function ModuleThumbnail({
  src,
  variant = "standard",
  eager = false,
  className,
  children,
}: ModuleThumbnailProps) {
  return (
    <div className={cn("module-thumb", variantClass[variant], className)}>
      <div className="module-thumb__stage">
        <div className="module-thumb__float">
          <div className="module-thumb__floor-shadow" aria-hidden="true" />
          <img
            src={src}
            alt=""
            width={640}
            height={480}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="module-thumb__image"
            onError={(event) => {
              (event.target as HTMLImageElement).style.opacity = "0.35";
            }}
          />
          <div className="module-thumb__highlight" aria-hidden="true" />
        </div>
      </div>
      {children}
    </div>
  );
}
