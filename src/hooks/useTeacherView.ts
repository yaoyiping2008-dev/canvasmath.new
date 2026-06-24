import { useCallback, useState } from "react";

const STORAGE_KEY = "canvasmath-teacher-view";

function readTeacherView(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function writeTeacherView(enabled: boolean): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");
  } catch {
    // Ignore storage failures in restricted environments.
  }
}

export function useTeacherView() {
  const [teacherView, setTeacherView] = useState(readTeacherView);

  const toggleTeacherView = useCallback(() => {
    setTeacherView((current) => {
      const next = !current;
      writeTeacherView(next);
      return next;
    });
  }, []);

  const setTeacherViewEnabled = useCallback((enabled: boolean) => {
    writeTeacherView(enabled);
    setTeacherView(enabled);
  }, []);

  return { teacherView, toggleTeacherView, setTeacherViewEnabled };
}
