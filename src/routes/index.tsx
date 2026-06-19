import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Grid2X2, Search, Sigma, Puzzle, Sparkles,
  Layers, X, Mail, UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { SimulationGrid } from "@/components/SimulationGrid";
import { LAB_CATEGORIES, labsData, type LabCategory } from "@/lib/labs-data";
import logoGif from "@/assets/main-logo.gif";

const SITE_TITLE = "CanvasMath - Interactive Mathematics Workspace & Simulations for K-12";
const SITE_DESCRIPTION =
  "An advanced interactive mathematical workspace and visual simulation platform designed for K-12 student engagement and STEM training.";

const categoryIcons = {
  All: Grid2X2,
  Matrix: Sigma,
  Logic: Puzzle,
  Applied: Layers,
  Interactive: Sparkles,
};

const legalContent = {
  privacy: {
    title: "Privacy Policy",
    body: (
      <div className="space-y-4 text-xs leading-relaxed">
        <p><strong>Last updated: June 14, 2026.</strong> CanvasMath ("we", "our") is fully committed to protecting the privacy of pupils, educators, and users.</p>
        <p><strong>1. Data Collection & Analytics:</strong> We do not require user registration. We use industry-standard, privacy-compliant essential and analytics cookies (such as Google Analytics) solely to measure site performance. These tools collect non-personally identifiable technical telemetry (browser type, anonymous usage vectors).</p>
        <p><strong>2. Google Ads & Third-Party Vendors:</strong> Google and third-party vendors use cookies to serve ads based on prior visits. Users may completely opt out of personalized advertising by visiting the <a href="https://tools.google.com/dlpage/gaoptout/" target="_blank" rel="noreferrer" className="text-primary underline">Google Analytics Opt-out Browser Add-on</a> and managing settings via <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-primary underline">Google Ads Settings</a>.</p>
        <p><strong>3. K-12 Student Protection (COPPA & GDPR):</strong> We strictly adhere to COPPA and GDPR frameworks. CanvasMath does NOT knowingly or intentionally collect, track, or harvest personal identifiable information (PII) from children under the age of 13. Interactive modules are safely sandbox-embedded from verified independent educational publishers. If you believe any child data has been inadvertently processed, contact us immediately for permanent deletion.</p>
        <p><strong>4. Data Rights:</strong> GDPR/CCPA users retain absolute rights to access, restrict, or delete telemetry caches. For inquiries, email: <span className="text-primary font-semibold">privacy@canvasmath.org</span>.</p>
      </div>
    ),
  },
  terms: {
    title: "Terms of Service",
    body: (
      <div className="space-y-4 text-xs leading-relaxed">
        <p><strong>1. Acceptable Educational Use:</strong> CanvasMath grants a limited, non-commercial, revocable license to schools, teachers, and individual students to utilize our workspace. Web-scraping, automated scraping, denial-of-service attempts, or any malicious interference with network infrastructure are strictly prohibited.</p>
        <p><strong>2. Intellectual Property & Embedded Modules:</strong> All interactive mathematical simulations, engines, and codebeds are the exclusive property of their respective third-party publishers or licensors. CanvasMath hosts these under operational sandbox agreements and claims no ownership over external educational assets.</p>
        <p><strong>3. LIMITATION OF LIABILITY:</strong> TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CANVASMATH AND ITS PARTNERS PROVIDE THESE SERVICES "AS IS" WITHOUT ANY WARRANTY. WE SHALL NOT BE HELD LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING BUT NOT LIMITED TO OPERATIONAL INTERRUPTIONS, DATA LOSS, DEVICE MALFUNCTIONS, OR EXTERNAL EMBED DISRUPTIONS RELEVANT TO SCHOOL NETWORKS.</p>
        <p><strong>4. Governing Law:</strong> These terms shall be governed by and construed in accordance with standard international internet statutes, without regard to conflict of law principles.</p>
      </div>
    ),
  },
  about: {
    title: "About & Contact",
    body: (
      <div className="space-y-4 text-xs leading-relaxed">
        <p><strong>About CanvasMath:</strong> CanvasMath is an open, premium curated interactive mathematics workspace dedicated to K-12 learners and STEM curriculum enhancement. We focus on visual execution, geometric processing, and zero-download accessibility for Chromebooks and classroom infrastructure.</p>
        <p><strong>Publisher & Content Partnership:</strong> We highly respect intellectual property. If you are a publisher looking to integrate or audit the license of any simulation module showcased in our catalog, please contact our curriculum clearing desk.</p>
        <p className="flex items-center gap-2 font-medium bg-muted p-2 rounded border border-border w-fit">
          <Mail className="size-4 text-primary" /> General & Legal Desk: hello@canvasmath.org
        </p>
        <p className="text-muted-foreground text-[11px]">Entity Operations: CanvasMath Academic Distribution Platform. Inquiries are generally audited and answered within 48 business hours.</p>
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
    ],
  }),
  component: Index,
});

function Index() {
  const [category, setCategory] = useState<LabCategory>("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [legal, setLegal] = useState<keyof typeof legalContent | null>(null);

  const filteredLabs = useMemo(
    () =>
      labsData.filter((lab) => {
        const matchesCategory = category === "All" || lab.category === category;
        return matchesCategory && lab.title.toLowerCase().includes(query.toLowerCase());
      }),
    [category, query],
  );

  const sectionHeading =
    category === "All" ? "Interactive Math Labs" : `${category} Simulations`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-20 flex-col overflow-x-hidden overflow-y-auto border-r border-border bg-card px-2 py-3 md:w-48 md:px-3">
        
        <div className="mb-4 flex items-center justify-center px-1 md:justify-start">
          <a href="/" className="group flex h-12 w-full items-center transition-opacity duration-200 hover:opacity-90 md:justify-start">
            <img
              src={logoGif}
              alt="CanvasMath Logo"
              className="h-full w-full object-fill scale-150"
            />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2 border-b border-border pb-3">
          <Button
            aria-label="Search simulations"
            variant={searchOpen ? "default" : "secondary"}
            size="icon"
            onClick={() => setSearchOpen((open) => !open)}
          >
            <Search />
          </Button>
          <Button aria-label="Profile and settings" variant="secondary" size="icon">
            <UserRound />
          </Button>
        </div>
        <nav aria-label="Simulation categories" className="flex flex-1 flex-col gap-1 pt-3">
          {LAB_CATEGORIES.map((item) => {
            const Icon = categoryIcons[item];
            return (
              <Button
                key={item}
                variant={category === item ? "default" : "ghost"}
                className="h-9 justify-center px-2 md:justify-start"
                onClick={() => setCategory(item)}
              >
                <Icon className="shrink-0" />
                <span className="hidden md:inline">{item === "All" ? "All Simulations" : item}</span>
              </Button>
            );
          })}
        </nav>
      </aside>

      <main className="ml-20 min-w-0 md:ml-48">
        {searchOpen && (
          <div className="sticky top-0 z-20 border-b border-border bg-background/95 p-3 backdrop-blur">
            <label className="mx-auto flex max-w-xl items-center gap-2 rounded-md border border-primary/50 bg-card px-3 focus-within:ring-2 focus-within:ring-ring">
              <Search className="size-4 text-primary" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search 24 simulations..."
                className="h-9 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {query && (
                <Button
                  aria-label="Clear search"
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={() => setQuery("")}
                >
                  <X />
                </Button>
              )}
            </label>
          </div>
        )}

        <section aria-label="Interactive Math Labs" className="p-3 md:p-4">
          <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                Instant Learning Collection
              </p>
              <h1 className="truncate font-display text-xl font-bold md:text-2xl">{sectionHeading}</h1>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">{filteredLabs.length} modules</span>
          </div>
          <SimulationGrid
            labs={filteredLabs}
            emptyMessage={query ? `No simulations match “${query}”.` : "No simulations in this category."}
          />
        </section>

        <footer className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-border px-4 py-6 text-xs text-muted-foreground">
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
        </footer>
      </main>

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
