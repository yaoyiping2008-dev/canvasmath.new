import { useEffect } from "react";

const LOCK_CLASS = "homepage-scroll-lock";

export function useHomepageScrollLock() {
  useEffect(() => {
    document.documentElement.classList.add(LOCK_CLASS);
    document.body.classList.add(LOCK_CLASS);

    return () => {
      document.documentElement.classList.remove(LOCK_CLASS);
      document.body.classList.remove(LOCK_CLASS);
    };
  }, []);
}
