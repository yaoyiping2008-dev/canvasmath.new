import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ExternalLink, Loader2, Minimize2, RefreshCw, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LabModule } from "@/lib/labs-data";
import { depthCard } from "@/lib/designSystem";
import { cn } from "@/lib/utils";

type LockableScreenOrientation = ScreenOrientation & {
  lock?: (orientation: "landscape") => Promise<void>;
  unlock?: () => void;
};

type EmbeddedSimulationWorkspaceProps = {
  lab: LabModule;
  containerRef: RefObject<HTMLDivElement | null>;
  reloadKey: number;
  handleLoad: () => void;
  retry: () => void;
  isLoading: boolean;
  hasError: boolean;
  isFullscreen: boolean;
  isLandscapeLocked: boolean;
  orientationMessage: string | null;
  onEnterLandscape: () => void | Promise<void>;
  onExitLandscape: () => void | Promise<void>;
};

export function EmbeddedSimulationWorkspace({
  lab,
  containerRef,
  reloadKey,
  handleLoad,
  retry,
  isLoading,
  hasError,
  isFullscreen,
  orientationMessage,
  onEnterLandscape,
  onExitLandscape,
}: EmbeddedSimulationWorkspaceProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const externalUrl = lab.sourceUrl ?? lab.fallbackUrl;

  useEffect(() => {
    if (isFullscreen) {
      requestAnimationFrame(() => {
        iframeRef.current?.focus();
      });
    }
  }, [isFullscreen]);

  const handleIframePointerDown = () => {
    iframeRef.current?.focus();
  };

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
      <div className="absolute right-2 top-2 z-30 flex items-center gap-2 md:hidden">
        {orientationMessage && (
          <p
            role="status"
            aria-live="polite"
            className="max-w-[10rem] rounded-md bg-background/90 px-2 py-1 text-xs text-foreground shadow-md backdrop-blur"
          >
            {orientationMessage}
          </p>
        )}
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="min-h-11 gap-1.5 bg-background/90 px-3 shadow-md backdrop-blur"
          onClick={() => void (isFullscreen ? onExitLandscape() : onEnterLandscape())}
          aria-label={isFullscreen ? "Exit landscape mode" : "Enter landscape mode"}
        >
          {isFullscreen ? (
            <Minimize2 className="size-4" aria-hidden="true" />
          ) : (
            <RotateCw className="size-4" aria-hidden="true" />
          )}
          <span>{isFullscreen ? "Exit Landscape" : "Landscape"}</span>
        </Button>
      </div>

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
        ref={iframeRef}
        key={`${lab.slug}-${reloadKey}`}
        data-simulation-iframe
        src={lab.moduleEndpoint}
        title={`${lab.title} simulation`}
        tabIndex={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gamepad; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-forms allow-popups allow-modals allow-presentation allow-pointer-lock allow-orientation-lock allow-same-origin"
        onLoad={handleLoad}
        onPointerDown={handleIframePointerDown}
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}

const ORIENTATION_MESSAGE_DURATION_MS = 5000;

export function useLabSimulationContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLandscapeLocked, setIsLandscapeLocked] = useState(false);
  const [orientationMessage, setOrientationMessage] = useState<string | null>(null);
  const orientationMessageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearOrientationMessage = useCallback(() => {
    if (orientationMessageTimeoutRef.current) {
      clearTimeout(orientationMessageTimeoutRef.current);
      orientationMessageTimeoutRef.current = null;
    }
    setOrientationMessage(null);
  }, []);

  const showOrientationMessage = useCallback((message: string) => {
    setOrientationMessage(message);
    if (orientationMessageTimeoutRef.current) {
      clearTimeout(orientationMessageTimeoutRef.current);
    }
    orientationMessageTimeoutRef.current = setTimeout(() => {
      setOrientationMessage(null);
      orientationMessageTimeoutRef.current = null;
    }, ORIENTATION_MESSAGE_DURATION_MS);
  }, []);

  const unlockOrientationSafely = useCallback(() => {
    try {
      const orientation = screen.orientation as LockableScreenOrientation;
      orientation.unlock?.();
    } catch {
      // Ignore unsupported unlock behavior.
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      const target = containerRef.current;

      if (!document.fullscreenElement) {
        setIsFullscreen(false);
        setIsLandscapeLocked(false);
        unlockOrientationSafely();
        clearOrientationMessage();
        return;
      }

      if (target && document.fullscreenElement === target) {
        setIsFullscreen(true);
      }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, [clearOrientationMessage, unlockOrientationSafely]);

  useEffect(() => {
    return () => {
      if (orientationMessageTimeoutRef.current) {
        clearTimeout(orientationMessageTimeoutRef.current);
      }
    };
  }, []);

  const handleFullscreen = useCallback(async () => {
    const target = containerRef.current;
    if (!target) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await target.requestFullscreen?.();
  }, []);

  const enterLandscape = useCallback(async () => {
    const target = containerRef.current;
    if (!target) return;

    try {
      if (!document.fullscreenElement) {
        await target.requestFullscreen();
      }
    } catch {
      showOrientationMessage("Rotate your device to landscape.");
      return;
    }

    try {
      const orientation = screen.orientation as LockableScreenOrientation;
      if (typeof orientation.lock === "function") {
        await orientation.lock("landscape");
        setIsLandscapeLocked(true);
        clearOrientationMessage();
      }
    } catch {
      setIsLandscapeLocked(false);
      showOrientationMessage("Rotate your device to landscape.");
    }
  }, [clearOrientationMessage, showOrientationMessage]);

  const exitLandscape = useCallback(async () => {
    const orientation = screen.orientation as LockableScreenOrientation;

    try {
      orientation.unlock?.();
    } catch {
      // Ignore unsupported unlock behavior.
    }

    setIsLandscapeLocked(false);
    clearOrientationMessage();

    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        // Ignore unsupported exit behavior.
      }
    }
  }, [clearOrientationMessage]);

  return {
    containerRef,
    handleFullscreen,
    isFullscreen,
    isLandscapeLocked,
    orientationMessage,
    enterLandscape,
    exitLandscape,
  };
}
