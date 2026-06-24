import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type HomepageSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function HomepageSearch({ value, onChange }: HomepageSearchProps) {
  return (
    <div className="homepage-search-wrap mx-auto w-full px-1">
      <label className="homepage-search-bar flex items-center gap-2 rounded-2xl border border-border/80 bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-ring/40">
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search simulations and concepts..."
          aria-label="Search simulations and concepts"
          className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7 shrink-0"
            aria-label="Clear search"
            onClick={() => onChange("")}
          >
            <X className="size-3.5" />
          </Button>
        )}
      </label>
    </div>
  );
}
