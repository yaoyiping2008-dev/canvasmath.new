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

const PSEUDO_FULLSCREEN_CLASS = "canvasmath-pseudo-fullscreen";

type EmbeddedSimulationWorkspaceProps = {
  lab: LabModule;
  containerRef: RefObject<HTMLDivElement | null>;
  reloadKey: number;
  handleLoad: () => void;
  retry: () => void;
  isLoading: boolean;
  hasError: boolean;
  isLandscapeActive: boolean;
  isPseudoFullscreen: boolean;
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
  isLandscapeActive,
  isPseudoFullscreen,
  orientationMessage,
  onEnterLandscape,
  onExitLandscape,
}: EmbeddedSimulationWorkspaceProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const externalUrl = lab.sourceUrl ?? lab.fallbackUrl;

  useEffect(() => {
    if (isLandscapeActive) {
      requestAnimationFrame(() => {
        iframeRef.current?.focus();
      });
    }
  }, [isLandscapeActive]);

  const handleIframePointerDown = () => {
    iframeRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      data-simulation-workspace
      data-pseudo-fullscreen={isPseudoFullscreen ? "true" : undefined}
      className={cn(
        depthCard,
        "relative aspect-video w-full min-h-[280px] max-h-[55vh] overflow-hidden rounded-2xl border border-border/60 bg-card sm:min-h-[360px] sm:max-h-[62vh]",
      )}
      aria-busy={isLoading}
    >
      <div className="mobile-landscape-control absolute z-30 flex items-center gap-2">
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
          onClick={() => void (isLandscapeActive ? onExitLandscape() : onEnterLandscape())}
          aria-label={isLandscapeActive ? "Exit landscape mode" : "Enter landscape mode"}
        >
          {isLandscapeActive ? (
            <Minimize2 className="size-4" aria-hidden="true" />
          ) : (
            <RotateCw className="size-4" aria-hidden="true" />
          )}
          <span>{isLandscapeActive ? "Exit Landscape" : "Landscape"}</span>
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

function removePseudoFullscreenClasses() {
  document.documentElement.classList.remove(PSEUDO_FULLSCREEN_CLASS);
  document.body.classList.remove(PSEUDO_FULLSCREEN_CLASS);
}

export function useLabSimulationContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPseudoFullscreen, setIsPseudoFullscreen] = useState(false);
  const [isLandscapeLocked, setIsLandscapeLocked] = useState(false);
  const [orientationMessage, setOrientationMessage] = useState<string | null>(null);
  const orientationMessageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLandscapeActive = isFullscreen || isPseudoFullscreen;

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

  const tryNativeFullscreen = useCallback(async (): Promise<boolean> => {
    const target = containerRef.current;
    if (!target) return false;

    if (typeof target.requestFullscreen !== "function" || document.fullscreenEnabled === false) {
      return false;
    }

    try {
      if (!document.fullscreenElement) {
        await target.requestFullscreen();
      }
      return document.fullscreenElement === target;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      const target = containerRef.current;

      if (!document.fullscreenElement) {
        setIsFullscreen(false);
        setIsLandscapeLocked(false);
        unlockOrientationSafely();
        if (!isPseudoFullscreen) {
          clearOrientationMessage();
        }
        return;
      }

      if (target && document.fullscreenElement === target) {
        setIsFullscreen(true);
      }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);

    const webkitFullscreenChange =
      "onwebkitfullscreenchange" in document ? "webkitfullscreenchange" : null;
    if (webkitFullscreenChange) {
      document.addEventListener(webkitFullscreenChange, onFullscreenChange);
    }

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      if (webkitFullscreenChange) {
        document.removeEventListener(webkitFullscreenChange, onFullscreenChange);
      }
    };
  }, [clearOrientationMessage, isPseudoFullscreen, unlockOrientationSafely]);

  useEffect(() => {
    return () => {
      if (orientationMessageTimeoutRef.current) {
        clearTimeout(orientationMessageTimeoutRef.current);
      }
      removePseudoFullscreenClasses();
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
    const nativeOk = await tryNativeFullscreen();

    if (!nativeOk) {
      setIsPseudoFullscreen(true);
      document.documentElement.classList.add(PSEUDO_FULLSCREEN_CLASS);
      document.body.classList.add(PSEUDO_FULLSCREEN_CLASS);
      showOrientationMessage("Rotate your iPhone to landscape.");
      return;
    }

    try {
      const orientation = screen.orientation as LockableScreenOrientation;

      if (typeof orientation?.lock === "function") {
        await orientation.lock("landscape");
        setIsLandscapeLocked(true);
        clearOrientationMessage();
      } else {
        showOrientationMessage("Rotate your device to landscape.");
      }
    } catch {
      setIsLandscapeLocked(false);
      showOrientationMessage("Rotate your device to landscape.");
    }
  }, [clearOrientationMessage, showOrientationMessage, tryNativeFullscreen]);

  const exitLandscape = useCallback(async () => {
    clearOrientationMessage();

    try {
      const orientation = screen.orientation as LockableScreenOrientation;
      orientation?.unlock?.();
    } catch {
      // Ignore unsupported orientation unlock.
    }

    setIsLandscapeLocked(false);

    if (isPseudoFullscreen) {
      setIsPseudoFullscreen(false);
      removePseudoFullscreenClasses();
      return;
    }

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      showOrientationMessage("Use the browser controls to exit fullscreen.");
    }
  }, [clearOrientationMessage, isPseudoFullscreen, showOrientationMessage]);

  return {
    containerRef,
    handleFullscreen,
    isFullscreen,
    isPseudoFullscreen,
    isLandscapeActive,
    isLandscapeLocked,
    orientationMessage,
    enterLandscape,
    exitLandscape,
  };
}
