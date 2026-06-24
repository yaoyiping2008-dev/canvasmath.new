import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { LabModule } from "@/lib/labs-data";
import { getLabPreviewUrl } from "@/lib/lab-previews";
import { depthCard, depthCardHero, depthCardSecondary, textMetadata } from "@/lib/designSystem";
import { ModuleThumbnail } from "@/components/ui/ModuleThumbnail";

const IMAGE_RATIO = "aspect-[4/3]";
const HOVER_PREVIEW_DELAY_MS = 250;

export type LabTaskCardVariant = "hero" | "secondary" | "standard" | "compact";
export type LabTaskCardMode = "default" | "catalog" | "image";

type LabTaskCardProps = {
  lab: LabModule;
  index: number;
  variant?: LabTaskCardVariant;
  mode?: LabTaskCardMode;
  className?: string;
};

const cardShell = cn(
  "group/card relative block h-full w-full min-w-0 overflow-hidden text-left outline-none",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100",
);

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ImageOnlyCard({ lab, index, className }: LabTaskCardProps) {
  const secondary = lab.subject ?? lab.category;
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [previewActive, setPreviewActive] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);

  const previewUrl = getLabPreviewUrl(lab.slug);
  const canAttemptPreview = Boolean(previewUrl) && !previewFailed;

  const stopPreview = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setPreviewActive(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  const failPreview = useCallback(() => {
    setPreviewFailed(true);
    setPreviewActive(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  const startPreview = useCallback(() => {
    if (!previewUrl || previewFailed || prefersReducedMotion()) return;

    const video = videoRef.current;
    if (!video) return;

    video
      .play()
      .then(() => setPreviewActive(true))
      .catch(() => {
        failPreview();
      });
  }, [previewUrl, previewFailed, failPreview]);

  const handlePointerEnter = useCallback(() => {
    if (!canAttemptPreview || prefersReducedMotion()) return;

    hoverTimerRef.current = setTimeout(() => {
      hoverTimerRef.current = null;
      startPreview();
    }, HOVER_PREVIEW_DELAY_MS);
  }, [canAttemptPreview, startPreview]);

  const handlePointerLeave = useCallback(() => {
    stopPreview();
  }, [stopPreview]);

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, []);

  const showOverlay = previewActive;

  return (
    <article className={cn("min-w-0", className)}>
      <Link
        to="/labs/$slug"
        params={{ slug: lab.slug }}
        aria-label={`Open ${lab.title}`}
        className={cn(cardShell, "homepage-image-card rounded-[14px]")}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
          <img
            src={lab.image}
            alt={lab.title}
            width={640}
            height={480}
            loading={index < 12 ? "eager" : "lazy"}
            decoding="async"
            className={cn(
              "h-full w-full object-cover transition-[opacity,transform,filter] duration-[240ms] ease-out",
              previewActive
                ? "scale-110 blur-md opacity-30"
                : cn(
                    "scale-100 blur-0 opacity-100",
                    "motion-safe:group-hover/card:scale-[1.03] motion-safe:group-focus-visible/card:scale-[1.03]",
                  ),
            )}
            onError={(e) => {
              (e.target as HTMLImageElement).style.opacity = "0.4";
            }}
          />

          {canAttemptPreview && (
            <video
              ref={videoRef}
              src={previewUrl}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-[240ms] ease-out",
                previewActive ? "opacity-100" : "opacity-0",
              )}
              onError={failPreview}
            />
          )}

          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 px-2.5 pb-2.5 pt-10",
              "bg-gradient-to-t from-black/70 via-black/35 to-transparent",
              "translate-y-1 opacity-0 transition-all duration-[240ms] ease-out",
              showOverlay && "translate-y-0 opacity-100",
              "motion-safe:group-hover/card:translate-y-0 motion-safe:group-hover/card:opacity-100",
              "motion-safe:group-focus-visible/card:translate-y-0 motion-safe:group-focus-visible/card:opacity-100",
            )}
          >
            <p className="line-clamp-2 text-xs font-semibold leading-snug text-white">
              {lab.title}
            </p>
            {secondary && (
              <p className="line-clamp-1 mt-0.5 text-[10px] text-white/85">{secondary}</p>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

export function LabTaskCard({
  lab,
  index,
  variant = "standard",
  mode = "default",
  className,
}: LabTaskCardProps) {
  if (mode === "image") {
    return <ImageOnlyCard lab={lab} index={index} className={className} />;
  }

  const isHero = variant === "hero";
  const isSecondary = variant === "secondary";
  const isCompact = variant === "compact";

  return (
    <article className={cn("min-w-0", className)}>
      <Link
        to="/labs/$slug"
        params={{ slug: lab.slug }}
        aria-label={`Open ${lab.title} simulation module`}
        className={cn(
          cardShell,
          isHero &&
            cn(
              depthCardHero,
              "flex flex-col rounded-2xl border border-primary/25",
              "md:min-h-[280px] md:flex-row md:items-stretch",
            ),
          isSecondary &&
            cn(depthCardSecondary, "flex flex-col rounded-xl border border-border/70 bg-card/95"),
          !isHero &&
            !isSecondary &&
            cn(depthCard, "flex flex-col rounded-xl border border-border/60 bg-card"),
        )}
      >
        <ModuleThumbnail
          src={lab.image}
          variant={variant}
          eager={index < 6}
          className={cn(
            "relative shrink-0",
            isHero
              ? cn(IMAGE_RATIO, "w-full md:aspect-auto md:w-[54%] md:min-h-[280px]")
              : IMAGE_RATIO,
          )}
        >
          <div
            className={cn(
              "module-thumb__scrim pointer-events-none absolute inset-0 z-10",
              isHero && "module-thumb__scrim--hero",
            )}
          />
          {isHero && (
            <span className="absolute left-3 top-3 z-20 rounded-md border border-primary/30 bg-background/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary shadow-sm">
              Featured
            </span>
          )}
        </ModuleThumbnail>

        <div
          className={cn(
            "relative z-10 flex min-w-0 flex-1 flex-col justify-end bg-card/80",
            isHero && "p-4 md:justify-center md:p-6 lg:p-7",
            isSecondary && "p-3.5",
            isCompact && "p-2.5",
            !isHero && !isSecondary && !isCompact && "p-3",
          )}
        >
          <h3
            className={cn(
              "line-clamp-2 font-display font-semibold leading-snug tracking-tight text-foreground",
              isHero && "text-lg md:text-xl lg:text-2xl",
              isSecondary && "text-sm md:text-base",
              isCompact && "text-xs",
              !isHero && !isSecondary && !isCompact && "text-sm",
            )}
          >
            {lab.title}
          </h3>

          {isHero && lab.summary && (
            <p className="text-subtitle mt-2 line-clamp-3 text-sm md:line-clamp-2 md:text-[15px]">
              {lab.summary}
            </p>
          )}

          {!isCompact && lab.subject && (
            <span
              className={cn(
                "mt-2 w-fit rounded-md border border-border/50 bg-muted/40 font-medium",
                textMetadata,
                "px-1.5 py-0.5",
              )}
            >
              {lab.subject}
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}
