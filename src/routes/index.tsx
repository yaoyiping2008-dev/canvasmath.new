import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [legal, setLegal] = useState<LegalContentKey | null>(null);

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

  return (
    <div className="homepage-shell min-h-screen overflow-x-hidden">
      <div
        className="homepage-atmosphere pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      />

      <HomepageSidebar onNavigate={scrollToSection} />

      <div className="relative z-[1] flex min-w-0 flex-col md:ml-52">
        <main className="mx-auto w-full max-w-[1600px] flex-1 px-3 pb-8 pt-14 md:px-5 md:pt-5">
          <div className="space-y-8 md:space-y-10">
            <HomepageSearch value={searchQuery} onChange={setSearchQuery} />

            {filteredRecentlyAdded.length > 0 && (
              <RecentlyAddedSection labs={filteredRecentlyAdded} />
            )}

            <section
              id="all-simulations"
              aria-labelledby="all-simulations-heading"
              className="scroll-mt-20"
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
          </div>
        </main>

        <footer className="border-t border-border/50 px-4 py-5">
          <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-3">
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
