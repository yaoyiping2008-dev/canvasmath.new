import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EducationSafetyNotice } from "@/components/EducationSafetyNotice";
import { HomepageSearch } from "@/components/homepage/HomepageSearch";
import { HomepageSidebar } from "@/components/homepage/HomepageSidebar";
import { RecentlyAddedSection } from "@/components/homepage/RecentlyAddedSection";
import { getRecentlyAddedLabs, matchesDiscoverySearch } from "@/components/homepage/homepage-utils";
import { useHomepageScrollLock } from "@/hooks/useHomepageScrollLock";
import { legalContent, type LegalContentKey } from "@/lib/legalContent";
import { SimulationGrid } from "@/components/SimulationGrid";
import { labsData } from "@/lib/labs-data";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/siteMeta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function scrollToSection(container: HTMLElement, sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const containerTop = container.getBoundingClientRect().top;
  const targetTop = target.getBoundingClientRect().top;
  const offset = container.scrollTop + targetTop - containerTop - 8;

  container.scrollTo({ top: offset, behavior: "smooth" });
}

function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [legal, setLegal] = useState<LegalContentKey | null>(null);
  const mainScrollRef = useRef<HTMLDivElement>(null);

  useHomepageScrollLock();

  const recentlyAddedPool = useMemo(() => getRecentlyAddedLabs(labsData, 5), []);

  const filteredRecentlyAdded = useMemo(
    () => recentlyAddedPool.filter((lab) => matchesDiscoverySearch(lab, searchQuery)),
    [recentlyAddedPool, searchQuery],
  );

  const filteredLabs = useMemo(
    () => labsData.filter((lab) => matchesDiscoverySearch(lab, searchQuery)),
    [searchQuery],
  );

  const hasSearch = searchQuery.trim().length > 0;

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash || !mainScrollRef.current) return;

    requestAnimationFrame(() => {
      if (mainScrollRef.current) scrollToSection(mainScrollRef.current, hash);
    });
  }, []);

  const handleSidebarNavigate = (sectionId: string) => {
    if (mainScrollRef.current) scrollToSection(mainScrollRef.current, sectionId);
  };

  return (
    <div className="homepage-shell">
      <div className="homepage-atmosphere homepage-background-layer" aria-hidden="true" />

      <HomepageSidebar onNavigate={handleSidebarNavigate} />

      <div ref={mainScrollRef} className="homepage-main-scroll">
        <div className="homepage-floating-stack">
          <HomepageSearch value={searchQuery} onChange={setSearchQuery} />

          {filteredRecentlyAdded.length > 0 && (
            <RecentlyAddedSection labs={filteredRecentlyAdded} />
          )}

          <section
            id="all-simulations"
            aria-labelledby="all-simulations-heading"
            className="homepage-floating-section scroll-mt-4"
          >
            <h2
              id="all-simulations-heading"
              className="homepage-section-title mb-3 text-base font-semibold md:text-lg"
            >
              All Simulations
            </h2>
            <SimulationGrid
              labs={filteredLabs}
              layout="catalog"
              mode="image"
              emptyMessage={
                hasSearch ? "No simulations match your search." : "No simulations available."
              }
            />
          </section>

          <footer className="homepage-footer-surface">
            <div className="flex flex-col items-center gap-3">
              <EducationSafetyNotice compact />
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                {(["privacy", "terms", "about"] as const).map((key) => (
                  <Button
                    key={key}
                    variant="link"
                    className="h-auto p-0 text-muted-foreground"
                    onClick={() => setLegal(key)}
                  >
                    {legalContent[key].title}
                  </Button>
                ))}
                <span>© 2026 CanvasMath</span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <Dialog open={Boolean(legal)} onOpenChange={(open) => !open && setLegal(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{legal ? legalContent[legal].title : "Legal"}</DialogTitle>
            <DialogDescription>{legal ? legalContent[legal].description : ""}</DialogDescription>
          </DialogHeader>
          <div className="mt-2">{legal ? legalContent[legal].body : null}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
