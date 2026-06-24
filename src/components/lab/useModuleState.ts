import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_TIMEOUT_MS = 10_000;

export type IframeLoadStatus = "idle" | "loading" | "ready" | "error";

export function useIframeReliability(src: string, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const [status, setStatus] = useState<IframeLoadStatus>("idle");
  const [reloadKey, setReloadKey] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const beginLoad = useCallback(() => {
    clearTimer();
    setStatus("loading");
    timeoutRef.current = setTimeout(() => {
      setStatus((current) => (current === "loading" ? "error" : current));
    }, timeoutMs);
  }, [clearTimer, timeoutMs]);

  useEffect(() => {
    beginLoad();
    return clearTimer;
  }, [src, reloadKey, beginLoad, clearTimer]);

  const handleLoad = useCallback(() => {
    clearTimer();
    setStatus("ready");
  }, [clearTimer]);

  const retry = useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []);

  return {
    status,
    reloadKey,
    handleLoad,
    retry,
    isLoading: status === "loading",
    hasError: status === "error",
  };
}

export type ModuleView = "overview" | "simulation";

export function useModuleView(initialView: ModuleView = "overview") {
  const [view, setView] = useState<ModuleView>(initialView);

  const showOverview = useCallback(() => setView("overview"), []);
  const showSimulation = useCallback(() => setView("simulation"), []);

  return { view, showOverview, showSimulation, setView };
}
