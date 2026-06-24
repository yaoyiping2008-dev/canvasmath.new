import { useCallback, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, ExternalLink, Loader2, Maximize2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LabModule } from "@/lib/labs-data";
import { useIframeReliability } from "./useModuleState";

type SimulationWorkspaceProps = {
  lab: LabModule;
};

export function SimulationWorkspace({ lab }: SimulationWorkspaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);

  const { reloadKey, handleLoad, retry, isLoading, hasError } = useIframeReliability(
    lab.moduleEndpoint,
  );

  useEffect(() => {
    backButtonRef.current?.focus();
  }, [lab.slug]);

  const handleReload = useCallback(() => {
    retry();
  }, [retry]);

  const handleFullscreen = useCallback(async () => {
    const target = containerRef.current;
    if (!target) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await target.requestFullscreen?.();
  }, []);

  const externalUrl = lab.sourceUrl ?? lab.fallbackUrl;

  return (
    <div className="flex h-[100dvh] min-h-0 flex-col overflow-hidden bg-background text-foreground">
      <header className="shrink-0 border-b border-border/80 bg-card/80">
        <div className="flex flex-wrap items-center gap-2 px-3 py-2 md:gap-3 md:px-4">
          <Button ref={backButtonRef} asChild variant="ghost" size="sm" className="shrink-0">
            <Link to="/" aria-label="Back to all simulations">
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">All Simulations</span>
            </Link>
          </Button>

          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-semibold md:text-base">{lab.title}</p>
            <p className="truncate text-[11px] text-muted-foreground">
              {lab.subject ?? lab.category}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Reload module"
              onClick={handleReload}
            >
              <RefreshCw className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Enter fullscreen"
              onClick={() => void handleFullscreen()}
            >
              <Maximize2 className="size-4" />
            </Button>
            {externalUrl && (
              <Button asChild variant="outline" size="sm" className="h-8 hidden sm:inline-flex">
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open external source"
                >
                  <ExternalLink className="size-4" aria-hidden="true" />
                  External Source
                </a>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div ref={containerRef} className="relative min-h-0 flex-1 bg-muted/20" aria-busy={isLoading}>
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
              <Button type="button" onClick={handleReload}>
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
          key={reloadKey}
          src={lab.moduleEndpoint}
          title={`${lab.title} simulation`}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-forms allow-popups allow-modals allow-presentation allow-fullscreen allow-same-origin"
          onLoad={handleLoad}
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
