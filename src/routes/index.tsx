import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  FlaskConical, Grid2X2, Search, Sigma, Puzzle, Sparkles,
  Layers, X, Mail, UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { SimulationGrid } from "@/components/SimulationGrid";
import { LAB_CATEGORIES, labsData, type LabCategory } from "@/lib/labs-data";

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
      <div className="space-y-4">
        <p><strong>Last updated: June 13, 2026.</strong> CanvasMath uses essential cookies to operate the site and analytics cookies to measure performance and improve learning experiences.</p>
        <p><strong>Google Ads & cookies.</strong> Google and its partners may use cookies or similar technologies to serve and measure ads based on visits to this and other sites. You may manage ad personalization through Google Ads Settings and your browser controls.</p>
        <p><strong>Third-party simulations.</strong> Interactive modules are provided by independent publishers and may collect device, usage, or technical data under their own privacy policies. CanvasMath does not control that collection. We require partners to observe applicable privacy laws, including GDPR and COPPA. Children under 13 should use the service only with verified parental consent; we do not knowingly collect personal information from children.</p>
        <p>GDPR users may request access, correction, deletion, restriction, or portability of personal data and may withdraw consent at any time. Contact us at privacy@canvasmath.edu.</p>
      </div>
    ),
  },
  terms: {
    title: "Terms of Service",
    body: (
      <div className="space-y-4">
        <p>CanvasMath is provided for personal, non-commercial educational use. You must use the site lawfully and may not interfere with its operation or attempt unauthorized access.</p>
        <p>Third-party simulations and links are supplied “as is.” CanvasMath does not own or control them and makes no warranty regarding availability, accuracy, safety, compatibility, or fitness for a particular purpose.</p>
        <p>To the fullest extent permitted by law, CanvasMath is not liable for data loss, device damage, software errors, malware, interruption, or any direct or indirect hardware or software loss arising from third-party modules or services.</p>
      </div>
    ),
  },
  about: {
    title: "About & Contact",
    body: (
      <div className="space-y-4">
        <p>CanvasMath is a curated interactive mathematics workspace for K-12 learners. We focus on visual simulations, structured discovery, and STEM-ready practice without downloads.</p>
        <p className="flex items-center gap-2"><Mail className="size-4 text-primary" /> hello@canvasmath.edu</p>
        <p>For publisher, curriculum, copyright, or privacy inquiries, include the relevant module title and page details so we can respond efficiently.</p>
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
        <div className="mb-3 flex items-center justify-center gap-2 px-1 md:justify-start">
          <FlaskConical className="size-6 shrink-0 text-primary" />
          <span className="hidden font-display text-xl font-bold tracking-tight text-primary md:block">CanvasMath</span>
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
