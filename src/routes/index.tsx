import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Mail } from "lucide-react";
import { AcademicHero } from "@/components/AcademicHero";
import { Button } from "@/components/ui/button";
import { CanvasBackground } from "@/components/ui/CanvasBackground";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EducationSafetyNotice } from "@/components/EducationSafetyNotice";
import { TeacherViewToggle } from "@/components/TeacherViewToggle";
import { DiscoveryBar } from "@/components/homepage/DiscoveryBar";
import { HomepageSection } from "@/components/homepage/HomepageSection";
import {
  ALL_FILTER,
  filterLabsByCategory,
  getUniqueGrades,
  getUniqueSubjects,
  hasActiveDiscoveryFilters,
  matchesDiscoveryFilters,
  type DiscoveryFilters,
} from "@/components/homepage/homepage-utils";
import { SimulationGrid } from "@/components/SimulationGrid";
import { ContinueLearning } from "@/components/ContinueLearning";
import { LearningPaths } from "@/components/LearningPaths";
import { useLearningHistory } from "@/hooks/useLearningHistory";
import { useTeacherView } from "@/hooks/useTeacherView";
import type { LearningStatus } from "@/lib/learningStorage";
import { labsData } from "@/lib/labs-data";
import { EDUCATION_SAFETY_POLICY, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/siteMeta";
import { canvasBgRoot, canvasContentLayer, homepageSections, surfaceGlass } from "@/lib/designSystem";
import logoGif from "@/assets/main-logo.gif";

const INITIAL_FILTERS: DiscoveryFilters = {
  query: "",
  subject: ALL_FILTER,
  grade: ALL_FILTER,
  difficulty: ALL_FILTER,
};

const legalContent = {
  privacy: {
    title: "Privacy Policy",
    body: (
      <div className="space-y-4 text-xs leading-relaxed">
        <p>
          <strong>Last updated: June 14, 2026.</strong> CanvasMath ("we", "our") is fully committed
          to protecting the privacy of pupils, educators, and users.
        </p>
        <p>
          <strong>1. Data Collection:</strong> CanvasMath does not require user registration. The
          platform does not load third-party advertising, analytics, or social media tracking
          scripts. Learning continuity data is stored locally on the device only.
        </p>
        <p>
          <strong>2. Education Safety Policy:</strong> CanvasMath is designed for K-12 classroom
          use without external tracking, ads, social embeds, or user-generated content uploads.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          {EDUCATION_SAFETY_POLICY.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p>
          <strong>3. K-12 Student Protection (COPPA & GDPR):</strong> We strictly adhere to COPPA
          and GDPR frameworks. CanvasMath does NOT knowingly or intentionally collect, track, or
          harvest personal identifiable information (PII) from children under the age of 13.
          Interactive modules are safely sandbox-embedded from verified independent educational
          publishers. If you believe any child data has been inadvertently processed, contact us
          immediately for permanent deletion.
        </p>
        <p>
          <strong>4. Data Rights:</strong> GDPR/CCPA users retain absolute rights to access,
          restrict, or delete telemetry caches. For inquiries, email:{" "}
          <span className="text-primary font-semibold">privacy@canvasmath.org</span>.
        </p>
      </div>
    ),
  },
  terms: {
    title: "Terms of Service",
    body: (
      <div className="space-y-4 text-xs leading-relaxed">
        <p>
          <strong>1. Acceptable Educational Use:</strong> CanvasMath grants a limited,
          non-commercial, revocable license to schools, teachers, and individual students to utilize
          our workspace. Web-scraping, automated scraping, denial-of-service attempts, or any
          malicious interference with network infrastructure are strictly prohibited.
        </p>
        <p>
          <strong>2. Intellectual Property & Embedded Modules:</strong> All interactive mathematical
          simulations, engines, and codebeds are the exclusive property of their respective
          third-party publishers or licensors. CanvasMath hosts these under operational sandbox
          agreements and claims no ownership over external educational assets.
        </p>
        <p>
          <strong>3. LIMITATION OF LIABILITY:</strong> TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE
          LAW, CANVASMATH AND ITS PARTNERS PROVIDE THESE SERVICES "AS IS" WITHOUT ANY WARRANTY. WE
          SHALL NOT BE HELD LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES,
          INCLUDING BUT NOT LIMITED TO OPERATIONAL INTERRUPTIONS, DATA LOSS, DEVICE MALFUNCTIONS, OR
          EXTERNAL EMBED DISRUPTIONS RELEVANT TO SCHOOL NETWORKS.
        </p>
        <p>
          <strong>4. Governing Law:</strong> These terms shall be governed by and construed in
          accordance with standard international internet statutes, without regard to conflict of
          law principles.
        </p>
      </div>
    ),
  },
  about: {
    title: "About & Contact",
    body: (
      <div className="space-y-4 text-xs leading-relaxed">
        <p>
          <strong>About CanvasMath:</strong> CanvasMath is a curated visual mathematics learning
          workspace dedicated to K-12 learners and standards-aligned STEM curriculum support. We
          focus on conceptual understanding, geometric reasoning, and classroom-ready accessibility
          for Chromebooks and school network environments.
        </p>
        <p>
          <strong>Publisher & Content Partnership:</strong> We highly respect intellectual property.
          If you are a publisher looking to integrate or audit the license of any simulation module
          showcased in our catalog, please contact our curriculum clearing desk.
        </p>
        <p className="flex items-center gap-2 font-medium bg-muted p-2 rounded border border-border w-fit">
          <Mail className="size-4 text-primary" /> General & Legal Desk: hello@canvasmath.org
        </p>
        <p className="text-muted-foreground text-[11px]">
          Entity Operations: CanvasMath Academic Distribution Platform. Inquiries are generally
          audited and answered within 48 business hours.
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

function Index() {
  const [filters, setFilters] = useState<DiscoveryFilters>(INITIAL_FILTERS);
  const [legal, setLegal] = useState<keyof typeof legalContent | null>(null);
  const { recentModules, getBadge, mostRecentSlug, records } = useLearningHistory();
  const { teacherView, toggleTeacherView } = useTeacherView();

  const learningStatusMap = useMemo(() => {
    const map: Record<string, LearningStatus | undefined> = {};
    for (const record of records) {
      map[record.slug] = record.status;
    }
    return map;
  }, [records]);

  const gridHistoryProps = {
    learningStatusMap,
    continueSlug: mostRecentSlug,
  };

  const subjects = useMemo(() => getUniqueSubjects(labsData), []);
  const grades = useMemo(() => getUniqueGrades(labsData), []);

  const filteredLabs = useMemo(
    () => labsData.filter((lab) => matchesDiscoveryFilters(lab, filters)),
    [filters],
  );

  const isFiltered = hasActiveDiscoveryFilters(filters);

  const featuredLabs = useMemo(() => labsData.filter((lab) => lab.featured), []);
  const recentlyAddedLabs = useMemo(() => labsData.filter((lab) => lab.recentlyAdded), []);
  const numberAlgebraLabs = useMemo(
    () => filterLabsByCategory(labsData, ["Number & Operations", "Algebra"]),
    [],
  );
  const geometryLabs = useMemo(() => filterLabsByCategory(labsData, ["Geometry"]), []);
  const probabilityLabs = useMemo(() => filterLabsByCategory(labsData, ["Probability & Data"]), []);
  const logicLabs = useMemo(() => filterLabsByCategory(labsData, ["Logic & Reasoning"]), []);
  const physicsLabs = useMemo(() => filterLabsByCategory(labsData, ["Physics & Motion"]), []);

  const clearAllFilters = () => setFilters(INITIAL_FILTERS);

  return (
    <div className={`${canvasBgRoot} min-h-screen overflow-x-hidden text-foreground`}>
      <CanvasBackground />

      <aside
        aria-label="Site navigation"
        className={`${surfaceGlass} fixed inset-y-0 left-0 z-30 flex w-[4.75rem] flex-col border-r border-border/60 px-2 py-3 md:w-44 md:px-3`}
      >
        <div className="mb-4 flex items-center justify-center md:justify-start">
          <a
            href="/"
            className="group flex h-11 w-full items-center justify-center motion-safe:transition-opacity motion-safe:duration-200 motion-safe:hover:opacity-90 motion-reduce:transition-none md:justify-start"
          >
            <img
              src={logoGif}
              alt="CanvasMath home"
              className="h-11 w-11 object-contain md:h-12 md:w-full md:object-contain"
            />
          </a>
        </div>
        <nav
          aria-label="Quick section links"
          className="hidden flex-1 flex-col gap-1 text-xs md:flex"
        >
          {[
            ["featured", "Featured"],
            ["continue", "Continue"],
            ["paths", "Paths"],
            ["number-algebra", "Number & Algebra"],
            ["geometry", "Geometry"],
            ["probability", "Probability"],
            ["logic", "Logic"],
            ["physics", "Physics & STEM"],
            ["recent", "Recently Added"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-lg px-2 py-1.5 text-muted-foreground outline-none transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      <div className={`${canvasContentLayer} ml-[4.75rem] flex min-w-0 flex-col md:ml-44`}>
        <DiscoveryBar
          filters={filters}
          resultCount={filteredLabs.length}
          totalCount={labsData.length}
          subjects={subjects}
          grades={grades}
          onFiltersChange={setFilters}
          onClearAll={clearAllFilters}
          headerAction={
            <TeacherViewToggle enabled={teacherView} onToggle={toggleTeacherView} />
          }
        />

        <main className="mx-auto w-full max-w-7xl flex-1 px-3 py-4 md:px-5 md:py-6">
          {isFiltered ? (
            <HomepageSection
              id="search-results"
              title="Search Results"
              description="Modules matching your current discovery filters."
            >
              <SimulationGrid
                labs={filteredLabs}
                {...gridHistoryProps}
                emptyMessage="No simulations match your current filters. Adjust search terms or clear all filters."
              />
            </HomepageSection>
          ) : (
            <div className={homepageSections}>
              <AcademicHero moduleCount={labsData.length} />

              {featuredLabs.length > 0 && (
                <HomepageSection
                  id="featured"
                  title="Featured Learning Labs"
                  description="Standards-aligned simulations selected for classroom introduction and guided study."
                  tone="featured"
                >
                  <SimulationGrid labs={featuredLabs} layout="featured" {...gridHistoryProps} />
                </HomepageSection>
              )}

              {recentModules.length > 0 && (
                <HomepageSection
                  id="continue"
                  title="Continue Learning"
                  description="Pick up where you left off with recently visited modules."
                  tone="subtle"
                >
                  <ContinueLearning
                    modules={recentModules}
                    getBadge={getBadge}
                    continueSlug={mostRecentSlug}
                  />
                </HomepageSection>
              )}

              <HomepageSection
                id="paths"
                title="Learning Paths"
                description="Soft-ordered module sequences to guide structured visual mathematics learning. No locking or prerequisites."
              >
                <LearningPaths />
              </HomepageSection>

              {numberAlgebraLabs.length > 0 && (
                <HomepageSection
                  id="number-algebra"
                  title="Number & Algebra"
                  description="Foundational numeracy, operations, expressions, and algebraic reasoning modules."
                  tone="subtle"
                >
                  <SimulationGrid
                    labs={numberAlgebraLabs}
                    layout="scroll"
                    variant="compact"
                    {...gridHistoryProps}
                  />
                </HomepageSection>
              )}

              {geometryLabs.length > 0 && (
                <HomepageSection
                  id="geometry"
                  title="Geometry & Spatial Reasoning"
                  description="Area, shape construction, and spatial visualization activities."
                >
                  <SimulationGrid
                    labs={geometryLabs}
                    layout="split"
                    variant="standard"
                    {...gridHistoryProps}
                  />
                </HomepageSection>
              )}

              {probabilityLabs.length > 0 && (
                <HomepageSection
                  id="probability"
                  title="Probability & Data"
                  description="Data distributions, probability models, and statistical reasoning."
                  tone="subtle"
                >
                  <SimulationGrid
                    labs={probabilityLabs}
                    layout="scroll"
                    variant="standard"
                    {...gridHistoryProps}
                  />
                </HomepageSection>
              )}

              {logicLabs.length > 0 && (
                <HomepageSection
                  id="logic"
                  title="Logic & Reasoning"
                  description="Deductive reasoning, constraints, and structured problem solving."
                >
                  <SimulationGrid
                    labs={logicLabs}
                    layout="grid"
                    variant="compact"
                    {...gridHistoryProps}
                  />
                </HomepageSection>
              )}

              {physicsLabs.length > 0 && (
                <HomepageSection
                  id="physics"
                  title="Physics & Applied STEM"
                  description="Motion, forces, and applied science simulations for STEM pathways."
                  tone="muted"
                >
                  <SimulationGrid
                    labs={physicsLabs}
                    layout="split"
                    variant="standard"
                    {...gridHistoryProps}
                  />
                </HomepageSection>
              )}

              {recentlyAddedLabs.length > 0 && (
                <HomepageSection
                  id="recent"
                  title="Recently Added Modules"
                  description="Newly catalogued activities for your learning workspace."
                  tone="subtle"
                >
                  <SimulationGrid
                    labs={recentlyAddedLabs}
                    layout="scroll"
                    variant="standard"
                    {...gridHistoryProps}
                  />
                </HomepageSection>
              )}
            </div>
          )}
        </main>

        <footer className="relative z-10 border-t border-border/40 px-4 py-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-3">
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
        <DialogContent className="max-h-[82vh] overflow-y-auto border-border bg-popover">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-primary">
              {legal ? legalContent[legal].title : "Legal"}
            </DialogTitle>
            <DialogDescription>CanvasMath policies and information.</DialogDescription>
          </DialogHeader>
          <div className="text-sm leading-6 text-secondary-foreground">
            {legal ? legalContent[legal].body : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
