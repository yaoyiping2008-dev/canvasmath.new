import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ExternalLink,
  Eye,
  EyeOff,
  Loader2,
  Maximize2,
  PanelRight,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LabModule } from "@/lib/labs-data";
import { LearningWorkflowSteps } from "./LearningWorkflowSteps";
import { useIframeReliability } from "./useModuleState";
import { WorkspaceSidebar } from "./WorkspaceSidebar";

type SimulationWorkspaceProps = {
  lab: LabModule;
  onExitToReflection: () => void;
};

export function SimulationWorkspace({ lab, onExitToReflection }: SimulationWorkspaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const returnButtonRef = useRef<HTMLButtonElement>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  const { reloadKey, handleLoad, retry, isLoading, hasError } = useIframeReliability(
    lab.moduleEndpoint,
  );

  useEffect(() => {
    returnButtonRef.current?.focus();
  }, []);

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

  const externalUrl = lab.sourceUrl ?? lab.fallbackUrl ?? lab.moduleEndpoint;

  return (
    <div className="flex h-[100dvh] min-h-0 flex-col overflow-hidden bg-background text-foreground">
      <header className="shrink-0 border-b border-border/80 bg-card/60">
        <div className="hidden border-b border-border/40 px-3 py-2 md:block md:px-4">
          <LearningWorkflowSteps current="explore" />
        </div>
        <div className="flex items-center gap-2 px-3 py-2 md:gap-3 md:px-4">
          <Button
            ref={returnButtonRef}
            type="button"
            variant="ghost"
            size="sm"
            className="shrink-0"
            aria-label="Exit simulation and continue to reflection"
            onClick={onExitToReflection}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Exit session</span>
          </Button>

          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-semibold md:text-base">{lab.title}</p>
            <p className="truncate text-[11px] text-muted-foreground">
              Interactive phase · Simulation workspace
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <Button
              type="button"
              variant={focusMode ? "secondary" : "ghost"}
              size="sm"
              className="hidden h-8 gap-1.5 px-2 md:inline-flex"
              aria-label={focusMode ? "Disable focus mode" : "Enable focus mode"}
              aria-pressed={focusMode}
              onClick={() => {
                setFocusMode((mode) => !mode);
                setPanelOpen(false);
              }}
            >
              {focusMode ? (
                <EyeOff className="size-3.5" aria-hidden="true" />
              ) : (
                <Eye className="size-3.5" aria-hidden="true" />
              )}
              <span className="text-xs">Focus Mode</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 md:hidden"
              aria-label={panelOpen ? "Close learning panel" : "Open learning panel"}
              aria-expanded={panelOpen}
              onClick={() => setPanelOpen((open) => !open)}
            >
              <PanelRight className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Reload simulation module"
              onClick={handleReload}
            >
              <RefreshCw className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Enter fullscreen simulation"
              onClick={() => void handleFullscreen()}
            >
              <Maximize2 className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div
          ref={containerRef}
          className="relative min-h-0 min-w-0 flex-1 bg-muted/20"
          aria-busy={isLoading}
        >
          {isLoading && (
            <div
              role="status"
              aria-live="polite"
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/85 px-4 text-center"
            >
              <Loader2 className="size-8 animate-spin text-primary motion-reduce:animate-none" />
              <p className="text-sm font-medium text-foreground">Loading simulation module…</p>
              <p className="max-w-sm text-xs text-muted-foreground">
                This may take a few seconds depending on your connection.
              </p>
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
                  This module may be restricted or unavailable in your current environment.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button type="button" aria-label="Retry loading simulation" onClick={handleReload}>
                  <RefreshCw className="size-4" aria-hidden="true" />
                  Retry
                </Button>
                <Button asChild variant="outline" type="button">
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${lab.title} external source`}
                  >
                    <ExternalLink className="size-4" aria-hidden="true" />
                    Open external source
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  aria-label="Exit simulation and continue to reflection"
                  onClick={onExitToReflection}
                >
                  Exit session
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

        <WorkspaceSidebar
          lab={lab}
          panelOpen={panelOpen}
          focusMode={focusMode}
          onClosePanel={() => setPanelOpen(false)}
        />
      </div>
    </div>
  );
}
