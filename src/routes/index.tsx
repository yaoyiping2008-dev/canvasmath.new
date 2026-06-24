import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EducationSafetyNotice } from "@/components/EducationSafetyNotice";
import { EducationalTrustFooter } from "@/components/homepage/EducationalTrustFooter";
import { HomepageDiscoveryBar } from "@/components/homepage/HomepageDiscoveryBar";
import { HomepageHero } from "@/components/homepage/HomepageHero";
import { HomepageSidebar } from "@/components/homepage/HomepageSidebar";
import { RecentlyAddedSection } from "@/components/homepage/RecentlyAddedSection";
import { SubjectExplorer } from "@/components/homepage/SubjectExplorer";
import type { CategoryGroupId } from "@/components/homepage/homepage-subjects";
import {
  ALL_FILTER,
  getUniqueGrades,
  getUniqueSubjects,
  hasActiveDiscoveryFilters,
  matchesDiscoveryFilters,
  type DiscoveryFilters,
} from "@/components/homepage/homepage-utils";
import { SimulationGrid } from "@/components/SimulationGrid";
import { labsData } from "@/lib/labs-data";
import { EDUCATION_SAFETY_POLICY, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/siteMeta";

const INITIAL_FILTERS: DiscoveryFilters = {
  query: "",
  subject: ALL_FILTER,
  grade: ALL_FILTER,
  difficulty: ALL_FILTER,
  categoryGroup: ALL_FILTER,
};

const legalContent = {
  privacy: {
    title: "Privacy Policy",
    body: (
      <div className="space-y-4 text-xs leading-relaxed">
        <p>
          <strong>Last updated: June 14, 2026.</strong> CanvasMath is committed to protecting the
          privacy of pupils, educators, and users.
        </p>
        <p>
          CanvasMath does not require user registration and does not load third-party advertising,
          analytics, or social media tracking scripts.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          {EDUCATION_SAFETY_POLICY.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    ),
  },
  terms: {
    title: "Terms of Service",
    body: (
      <div className="space-y-4 text-xs leading-relaxed">
        <p>
          CanvasMath grants a limited, non-commercial license for educational use in K-12
          environments.
        </p>
      </div>
    ),
  },
  about: {
    title: "About & Contact",
    body: (
      <div className="space-y-4 text-xs leading-relaxed">
        <p>
          CanvasMath is a curated visual mathematics learning workspace for K-12 learners and
          standards-aligned STEM curriculum support.
        </p>
        <p className="flex items-center gap-2 rounded border border-border bg-muted p-2 font-medium">
          <Mail className="size-4 text-primary" /> hello@canvasmath.org
        </p>
      </div>
    ),
  },
} as const;

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
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Index() {
  const [filters, setFilters] = useState<DiscoveryFilters>(INITIAL_FILTERS);
  const [legal, setLegal] = useState<keyof typeof legalContent | null>(null);

  const subjects = useMemo(() => getUniqueSubjects(labsData), []);
  const grades = useMemo(() => getUniqueGrades(labsData), []);

  const filteredLabs = useMemo(
    () => labsData.filter((lab) => matchesDiscoveryFilters(lab, filters)),
    [filters],
  );

  const recentlyAddedLabs = useMemo(() => {
    const marked = labsData.filter((lab) => lab.recentlyAdded);
    if (marked.length >= 4) return marked.slice(0, 8);
    const tail = labsData.slice(-Math.max(4, 8 - marked.length));
    const seen = new Set(marked.map((lab) => lab.slug));
    return [...marked, ...tail.filter((lab) => !seen.has(lab.slug))].slice(0, 8);
  }, []);

  const clearAllFilters = () => setFilters(INITIAL_FILTERS);

  const handleSidebarNavigate = (target: { sectionId?: string; groupId?: CategoryGroupId }) => {
    if (target.groupId) {
      setFilters((current) => ({ ...current, categoryGroup: target.groupId! }));
    }
    if (target.sectionId) scrollToSection(target.sectionId);
  };

  const handleSubjectSelect = (groupId: CategoryGroupId) => {
    setFilters((current) => ({ ...current, categoryGroup: groupId }));
    scrollToSection("all-simulations");
  };

  return (
    <div className="homepage-shell min-h-screen overflow-x-hidden">
      <HomepageSidebar
        activeGroup={filters.categoryGroup}
        onNavigate={handleSidebarNavigate}
        onLearnMore={() => setLegal("about")}
      />

      <div className="flex min-w-0 flex-col md:ml-56 lg:ml-60">
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10 pt-14 md:px-6 md:pt-6">
          <div className="space-y-10 md:space-y-12">
            <HomepageHero moduleCount={labsData.length} />

            <HomepageDiscoveryBar
              filters={filters}
              resultCount={filteredLabs.length}
              totalCount={labsData.length}
              subjects={subjects}
              grades={grades}
              onFiltersChange={setFilters}
              onClearAll={clearAllFilters}
            />

            <SubjectExplorer
              labs={labsData}
              activeGroup={filters.categoryGroup}
              onSelectGroup={handleSubjectSelect}
            />

            <RecentlyAddedSection labs={recentlyAddedLabs} />

            <section
              id="all-simulations"
              aria-labelledby="all-simulations-heading"
              className="scroll-mt-24"
            >
              <div className="mb-4">
                <h2
                  id="all-simulations-heading"
                  className="homepage-section-title text-lg md:text-xl"
                >
                  All Simulations
                </h2>
                <p className="homepage-section-subtitle mt-1 text-sm">
                  {hasActiveDiscoveryFilters(filters)
                    ? `${filteredLabs.length} modules match your current filters.`
                    : `Browse all ${labsData.length} classroom-ready modules.`}
                </p>
              </div>
              <SimulationGrid
                labs={filteredLabs}
                layout="catalog"
                mode="catalog"
                emptyMessage="No simulations match your current filters. Adjust search or clear filters."
              />
            </section>

            <EducationalTrustFooter />
          </div>
        </main>

        <footer className="border-t border-border/60 px-4 py-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-3">
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
        <DialogContent className="max-h-[82vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{legal ? legalContent[legal].title : "Legal"}</DialogTitle>
            <DialogDescription>CanvasMath policies and information.</DialogDescription>
          </DialogHeader>
          <div className="text-sm leading-6">{legal ? legalContent[legal].body : null}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
