import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import canvasMathLogo from "@/assets/CanvasMath-NEW.jpg";

const NAV_ITEMS = [
  { id: "recently-added", label: "Recently Added" },
  { id: "all-simulations", label: "All Simulations" },
] as const;

type HomepageSidebarProps = {
  onNavigate: (sectionId: string) => void;
};

function SidebarLogo({ compact = false }: { compact?: boolean }) {
  return (
    <img
      src={canvasMathLogo}
      alt="CanvasMath"
      className={
        compact ? "mb-4 max-h-14 w-full object-contain object-left" : "mb-5 w-full object-contain"
      }
    />
  );
}

function SidebarContent({
  onNavigate,
  compactLogo = false,
}: HomepageSidebarProps & { compactLogo?: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <a
        href="/"
        className="block rounded-lg px-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <SidebarLogo compact={compactLogo} />
      </a>

      <nav aria-label="Page sections" className="space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export function HomepageSidebar({ onNavigate }: HomepageSidebarProps) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    setOpen(false);
  };

  return (
    <>
      <aside
        className="homepage-sidebar fixed inset-y-0 left-0 z-30 hidden w-52 flex-col px-4 py-5 md:flex"
        aria-label="Site navigation"
      >
        <SidebarContent onNavigate={onNavigate} />
      </aside>

      <div className="fixed left-3 top-3 z-40 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="bg-white shadow-sm"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[min(100vw-2rem,17rem)] p-4"
            aria-label="Site navigation"
          >
            <SidebarContent onNavigate={handleNavigate} compactLogo />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
