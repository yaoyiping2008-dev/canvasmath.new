import { Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Maximize2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LabModule } from "@/lib/labs-data";

type LabPageHeaderProps = {
  lab: LabModule;
  onReload: () => void;
  onFullscreen: () => void;
};

export function LabPageHeader({ lab, onReload, onFullscreen }: LabPageHeaderProps) {
  const externalUrl = lab.sourceUrl ?? lab.fallbackUrl;

  return (
    <header
      className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-border/50 bg-card/95 px-3 py-2 shadow-sm md:gap-3"
      aria-label="Module workspace controls"
    >
      <Button asChild variant="ghost" size="sm" className="shrink-0">
        <Link to="/" aria-label="Back to all simulations">
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Back to All Simulations</span>
        </Link>
      </Button>

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm font-semibold md:text-base">{lab.title}</p>
        <p className="truncate text-xs text-muted-foreground">{lab.subject ?? lab.category}</p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 px-2"
          aria-label="Reload module"
          onClick={onReload}
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          <span className="hidden md:inline">Reload Module</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 px-2"
          aria-label="Enter fullscreen"
          onClick={() => void onFullscreen()}
        >
          <Maximize2 className="size-4" aria-hidden="true" />
          <span className="hidden md:inline">Fullscreen</span>
        </Button>
        {externalUrl && (
          <Button asChild variant="outline" size="sm" className="h-8 hidden sm:inline-flex">
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open external source"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              External Source
            </a>
          </Button>
        )}
      </div>
    </header>
  );
}
