import { useCallback, useEffect, useRef, type RefObject } from "react";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ExternalLink, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LabModule } from "@/lib/labs-data";
import { depthCard } from "@/lib/designSystem";
import { cn } from "@/lib/utils";

type EmbeddedSimulationWorkspaceProps = {
  lab: LabModule;
  containerRef: RefObject<HTMLDivElement | null>;
  reloadKey: number;
  handleLoad: () => void;
  retry: () => void;
  isLoading: boolean;
  hasError: boolean;
};

export function EmbeddedSimulationWorkspace({
  lab,
  containerRef,
  reloadKey,
  handleLoad,
  retry,
  isLoading,
  hasError,
}: EmbeddedSimulationWorkspaceProps) {
  const externalUrl = lab.sourceUrl ?? lab.fallbackUrl;

  return (
    <div
      ref={containerRef}
      data-simulation-workspace
      className={cn(
        depthCard,
        "relative aspect-video w-full min-h-[280px] max-h-[55vh] overflow-hidden rounded-2xl border border-border/60 bg-card sm:min-h-[360px] sm:max-h-[62vh]",
      )}
      aria-busy={isLoading}
    >
      {isLoading && (
        <div
          role="status"
          aria-live="polite"
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/90 px-4 text-center"
        >
          <Loader2 className="size-8 animate-spin text-primary motion-reduce:animate-none" />
          <p className="text-sm font-medium">Loading simulation module…</p>
        </div>
      )}

      {hasError && (
        <div
          role="alert"
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-background px-4 text-center"
        >
          <AlertCircle className="size-10 text-muted-foreground" aria-hidden="true" />
          <div className="max-w-md space-y-2">
            <p className="font-display text-base font-semibold">Module unavailable</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This module may be unavailable or restricted in the current browser or network
              environment.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button type="button" onClick={retry}>
              <RefreshCw className="size-4" aria-hidden="true" />
              Reload Module
            </Button>
            {externalUrl && (
              <Button asChild variant="outline">
                <a href={externalUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" aria-hidden="true" />
                  Open External Source
                </a>
              </Button>
            )}
            <Button asChild variant="ghost">
              <Link to="/">Back to All Simulations</Link>
            </Button>
          </div>
        </div>
      )}

      <iframe
        key={`${lab.slug}-${reloadKey}`}
        data-simulation-iframe
        src={lab.moduleEndpoint}
        title={`${lab.title} simulation`}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-forms allow-popups allow-modals allow-presentation allow-fullscreen allow-same-origin"
        onLoad={handleLoad}
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}

export function useLabSimulationContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = useCallback(async () => {
    const target = containerRef.current;
    if (!target) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await target.requestFullscreen?.();
  }, []);

  return { containerRef, handleFullscreen };
}
