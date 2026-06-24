import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import logoGif from "@/assets/main-logo.gif";
import { SIDEBAR_NAV, type CategoryGroupId } from "./homepage-subjects";

type HomepageSidebarProps = {
  activeGroup: string;
  onNavigate: (target: { sectionId?: string; groupId?: CategoryGroupId }) => void;
  onLearnMore: () => void;
};

function SidebarContent({
  activeGroup,
  onNavigate,
  onLearnMore,
}: Omit<HomepageSidebarProps, "children">) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex items-center gap-3 px-1">
        <img src={logoGif} alt="" className="size-10 object-contain" />
        <div className="min-w-0">
          <p className="font-display text-sm font-bold tracking-tight">CanvasMath</p>
          <p className="text-xs text-muted-foreground">Interactive Math Labs</p>
        </div>
      </div>

      <nav aria-label="Subject navigation" className="flex-1 space-y-0.5">
        {SIDEBAR_NAV.map((item) => {
          const isActive = item.type === "group" ? activeGroup === item.groupId : false;
          return (
            <button
              key={item.id}
              type="button"
              className={[
                "w-full rounded-lg px-3 py-2 text-left text-sm outline-none transition-colors",
                "hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
                isActive ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground",
              ].join(" ")}
              onClick={() => {
                if (item.type === "group" && item.groupId) {
                  onNavigate({ groupId: item.groupId, sectionId: "all-simulations" });
                } else {
                  onNavigate({ sectionId: item.id });
                }
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-4 rounded-xl border border-border/70 bg-muted/30 p-3">
        <p className="text-sm font-semibold">Powerful Learning</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Interactive simulations that make mathematical concepts visible.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 w-full"
          onClick={onLearnMore}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}

export function HomepageSidebar({ activeGroup, onNavigate, onLearnMore }: HomepageSidebarProps) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (target: { sectionId?: string; groupId?: CategoryGroupId }) => {
    onNavigate(target);
    setOpen(false);
  };

  return (
    <>
      <aside
        className="homepage-sidebar fixed inset-y-0 left-0 z-30 hidden w-56 flex-col px-4 py-5 md:flex lg:w-60"
        aria-label="Site navigation"
      >
        <SidebarContent
          activeGroup={activeGroup}
          onNavigate={onNavigate}
          onLearnMore={onLearnMore}
        />
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
          <SheetContent side="left" className="w-[min(100vw-2rem,18rem)] p-4">
            <SheetHeader className="mb-2">
              <SheetTitle className="text-left font-display">CanvasMath</SheetTitle>
            </SheetHeader>
            <SidebarContent
              activeGroup={activeGroup}
              onNavigate={handleNavigate}
              onLearnMore={() => {
                onLearnMore();
                setOpen(false);
              }}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
