import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Gamepad2, Grid2X2, Search, Sword, Puzzle, Sparkles,
  Crosshair, Car, X, Mail, UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import cyberRunner from "@/assets/cyber-runner.jpg";
import neonBlocks from "@/assets/neon-blocks.jpg";
import velocityRush from "@/assets/velocity-rush.jpg";
import orbitGarden from "@/assets/orbit-garden.jpg";
import shadowStrike from "@/assets/shadow-strike.jpg";
import quantumChess from "@/assets/quantum-chess.jpg";

type GameCategory = "All" | "Action" | "Puzzle" | "Casual" | "Arcade" | "Racing";
type Game = { title: string; coverUrl: string; gameUrl: string; category: Exclude<GameCategory, "All"> };

const COVERS = [cyberRunner, neonBlocks, velocityRush, orbitGarden, shadowStrike, quantumChess];
const TITLES = [
  "Cyber Runner", "Neon Blocks", "Velocity Rush", "Orbit Garden", "Shadow Strike", "Quantum Chess",
  "Skyline Drift", "Crystal Stack", "Turbo Circuit", "Cosmic Sprout", "Night Blade", "Grid Tactics",
  "Metro Dash", "Prism Merge", "Hyper Drive", "Moon Colony", "Silent Edge", "Logic Core",
  "Laser Leap", "Gem Reactor", "Nitro Pulse", "Pocket Planet", "Phantom Ops", "Signal Match",
] as const;
const CATEGORIES: GameCategory[] = ["All", "Action", "Puzzle", "Casual", "Arcade", "Racing"];
const CATEGORY_TYPES: Game["category"][] = ["Arcade", "Puzzle", "Racing", "Casual", "Action", "Puzzle"];

export const GAMES_DATA: Game[] = TITLES.map((title, index) => ({
  title,
  coverUrl: COVERS[index % COVERS.length],
  gameUrl: `https://example.com/games/${title.toLowerCase().replaceAll(" ", "-")}`,
  category: CATEGORY_TYPES[index % CATEGORY_TYPES.length],
}));

const categoryIcons = { All: Grid2X2, Action: Sword, Puzzle, Casual: Sparkles, Arcade: Crosshair, Racing: Car };

const legalContent = {
  privacy: {
    title: "Privacy Policy",
    body: (
      <div className="space-y-4">
        <p><strong>Last updated: June 13, 2026.</strong> CanvasMath uses essential cookies to operate the site and advertising cookies to measure performance and personalize ads.</p>
        <p><strong>Google Ads & cookies.</strong> Google and its partners may use cookies or similar technologies to serve and measure ads based on visits to this and other sites. You may manage ad personalization through Google Ads Settings and your browser controls.</p>
        <p><strong>Third-party games.</strong> Games are provided by independent publishers and may collect device, gameplay, or technical data under their own privacy policies. CanvasMath does not control that collection. We require partners to observe applicable privacy laws, including GDPR and COPPA. Children under 13 should use the service only with verified parental consent; we do not knowingly collect personal information from children.</p>
        <p>GDPR users may request access, correction, deletion, restriction, or portability of personal data and may withdraw consent at any time. Contact us at privacy@canvasmath.games.</p>
      </div>
    ),
  },
  terms: {
    title: "Terms of Service",
    body: (
      <div className="space-y-4">
        <p>CanvasMath is provided solely for personal, non-commercial entertainment. You must use the site lawfully and may not interfere with its operation or attempt unauthorized access.</p>
        <p>Third-party games and links are supplied “as is.” CanvasMath does not own or control them and makes no warranty regarding availability, accuracy, safety, compatibility, or fitness for a particular purpose.</p>
        <p>To the fullest extent permitted by law, CanvasMath is not liable for data loss, device damage, software errors, malware, interruption, or any direct or indirect hardware or software loss arising from third-party games or services.</p>
      </div>
    ),
  },
  about: {
    title: "About & Contact",
    body: (
      <div className="space-y-4">
        <p>CanvasMath is a curated, lightweight destination for instant browser games. We focus on quick discovery, clean presentation, and play without downloads.</p>
        <p className="flex items-center gap-2"><Mail className="size-4 text-primary" /> hello@canvasmath.games</p>
        <p>For publisher, advertising, copyright, or privacy inquiries, include the relevant game title and page details so we can respond efficiently.</p>
      </div>
    ),
  },
} as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CanvasMath — Play Free H5 Games" },
      { name: "description", content: "Play 24 fast, free arcade, puzzle, racing, action and casual H5 games in your browser." },
      { property: "og:title", content: "CanvasMath — Play Free H5 Games" },
      { property: "og:description", content: "Instant, no-download browser games in one high-speed collection." },
    ],
  }),
  component: Index,
});

function Index() {
  const [category, setCategory] = useState<GameCategory>("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [legal, setLegal] = useState<keyof typeof legalContent | null>(null);

  const games = useMemo(() => GAMES_DATA.filter((game) => {
    const matchesCategory = category === "All" || game.category === category;
    return matchesCategory && game.title.toLowerCase().includes(query.toLowerCase());
  }), [category, query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-20 flex-col overflow-x-hidden overflow-y-auto border-r border-border bg-card px-2 py-3 md:w-48 md:px-3">
        <div className="mb-3 flex items-center justify-center gap-2 px-1 md:justify-start">
          <Gamepad2 className="size-6 shrink-0 text-primary" />
          <span className="hidden font-display text-xl font-bold tracking-tight text-primary md:block">CanvasMath</span>
        </div>
        <div className="grid grid-cols-2 gap-2 border-b border-border pb-3">
          <Button aria-label="Search games" variant={searchOpen ? "default" : "secondary"} size="icon" onClick={() => setSearchOpen((open) => !open)}>
            <Search />
          </Button>
          <Button aria-label="Profile and settings" variant="secondary" size="icon"><UserRound /></Button>
        </div>
        <nav aria-label="Game categories" className="flex flex-1 flex-col gap-1 pt-3">
          {CATEGORIES.map((item) => {
            const Icon = categoryIcons[item];
            return (
              <Button key={item} variant={category === item ? "default" : "ghost"} className="h-9 justify-center px-2 md:justify-start" onClick={() => setCategory(item)}>
                <Icon className="shrink-0" /><span className="hidden md:inline">{item}</span>
              </Button>
            );
          })}
        </nav>
        <div className="ad-pattern hidden h-[600px] w-[160px] shrink-0 place-items-center self-center border border-dashed border-muted-foreground/40 bg-muted text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground xl:grid">
          <span>Ad Slot<br />160 × 600</span>
        </div>
      </aside>

      <main className="ml-20 min-w-0 md:ml-48">
        {searchOpen && (
          <div className="sticky top-0 z-20 border-b border-border bg-background/95 p-3 backdrop-blur">
            <label className="mx-auto flex max-w-xl items-center gap-2 rounded-md border border-primary/50 bg-card px-3 focus-within:ring-2 focus-within:ring-ring">
              <Search className="size-4 text-primary" />
              <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search 24 games..." className="h-9 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              {query && <Button aria-label="Clear search" variant="ghost" size="icon" className="size-7" onClick={() => setQuery("")}><X /></Button>}
            </label>
          </div>
        )}

        <section aria-label="Games" className="p-3 md:p-4">
          <div className="ad-pattern mx-auto mb-4 grid h-[90px] w-full max-w-[728px] place-items-center border border-dashed border-muted-foreground/40 bg-muted text-xs uppercase tracking-[0.22em] text-muted-foreground">Ad Slot · 728 × 90</div>
          <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">Instant play collection</p>
              <h1 className="truncate font-display text-xl font-bold md:text-2xl">{category} Games</h1>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">{games.length} titles</span>
          </div>
          {games.length ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
              {games.map((game, index) => (
                <Button key={game.title} variant="ghost" onClick={() => setActiveGame(game)} className="game-glow group relative h-auto aspect-square cursor-pointer overflow-hidden rounded-md bg-card p-0 text-left transition duration-200 hover:scale-[1.02] hover:bg-card focus-visible:ring-2">
                  <img src={game.coverUrl} alt={`${game.title} game cover`} width={768} height={768} loading={index < 6 ? "eager" : "lazy"} className="h-full w-full object-cover transition duration-300 group-hover:brightness-110" />
                  <span className="absolute inset-x-0 bottom-0 truncate bg-background/80 px-2.5 py-2 text-xs font-semibold backdrop-blur-sm">{game.title}</span>
                </Button>
              ))}
            </div>
          ) : (
            <div className="grid min-h-64 place-items-center border border-dashed border-border text-sm text-muted-foreground">No games match “{query}”.</div>
          )}
        </section>

        <footer className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-border px-4 py-6 text-xs text-muted-foreground">
          {(["privacy", "terms", "about"] as const).map((key) => <Button key={key} variant="link" className="h-auto p-0 text-muted-foreground" onClick={() => setLegal(key)}>{legalContent[key].title}</Button>)}
          <span>© 2026 CanvasMath</span>
        </footer>
      </main>

      <Dialog open={Boolean(activeGame)} onOpenChange={(open) => !open && setActiveGame(null)}>
        <DialogContent className="h-[92vh] max-w-[96vw] grid-rows-[auto_1fr] gap-2 border-border bg-background p-2 sm:rounded-md">
          <DialogHeader className="flex-row items-center gap-2 px-2 py-1 text-left">
            <Gamepad2 className="size-4 text-primary" />
            <DialogTitle className="font-display">{activeGame?.title}</DialogTitle>
            <DialogDescription className="sr-only">Embedded game player</DialogDescription>
          </DialogHeader>
          {activeGame && <iframe src={activeGame.gameUrl} title={`Play ${activeGame.title}`} allow="fullscreen; autoplay" className="h-full w-full rounded-sm border border-border bg-card" />}
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(legal)} onOpenChange={(open) => !open && setLegal(null)}>
        <DialogContent className="max-h-[82vh] overflow-y-auto border-border bg-popover">
          <DialogHeader><DialogTitle className="font-display text-xl text-primary">{legal ? legalContent[legal].title : "Legal"}</DialogTitle><DialogDescription>CanvasMath policies and information.</DialogDescription></DialogHeader>
          <div className="text-sm leading-6 text-secondary-foreground">{legal ? legalContent[legal].body : null}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
