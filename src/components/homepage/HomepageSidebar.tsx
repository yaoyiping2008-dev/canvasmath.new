import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import logoGif from "@/assets/main-logo.gif";

const NAV_ITEMS = [
  { id: "recently-added", label: "Recently Added" },
  { id: "all-simulations", label: "All Simulations" },
] as const;

type HomepageSidebarProps = {
  onNavigate: (sectionId: string) => void;
};

function SidebarContent({ onNavigate }: HomepageSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <a
        href="/"
        className="mb-5 flex items-center gap-3 px-1 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
      >
        <img src={logoGif} alt="" className="size-10 object-contain" />
        <div className="min-w-0">
          <p className="font-display text-sm font-bold tracking-tight">CanvasMath</p>
          <p className="text-xs text-muted-foreground">Interactive Math Labs</p>
        </div>
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
          <SheetContent side="left" className="w-[min(100vw-2rem,17rem)] p-4">
            <SheetHeader className="mb-2">
              <SheetTitle className="text-left font-display">CanvasMath</SheetTitle>
            </SheetHeader>
            <SidebarContent onNavigate={handleNavigate} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
