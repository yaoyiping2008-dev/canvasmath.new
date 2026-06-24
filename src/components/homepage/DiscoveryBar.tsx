import { Search, X } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LabDifficulty } from "@/lib/labs-data";
import { headingDisplay, surfaceGlass, textEyebrow, textMetadata } from "@/lib/designSystem";
import {
  ALL_FILTER,
  DIFFICULTY_OPTIONS,
  type DiscoveryFilters,
  hasActiveDiscoveryFilters,
} from "./homepage-utils";

type DiscoveryBarProps = {
  filters: DiscoveryFilters;
  resultCount: number;
  totalCount: number;
  subjects: string[];
  grades: string[];
  onFiltersChange: (filters: DiscoveryFilters) => void;
  onClearAll: () => void;
  headerAction?: ReactNode;
};

export function DiscoveryBar({
  filters,
  resultCount,
  totalCount,
  subjects,
  grades,
  onFiltersChange,
  onClearAll,
  headerAction,
}: DiscoveryBarProps) {
  const active = hasActiveDiscoveryFilters(filters);

  return (
    <header
      className={`${surfaceGlass} sticky top-0 z-20 border-b border-border/50`}
      role="search"
      aria-label="Module discovery"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-3 py-3 md:px-5 md:py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className={textEyebrow}>Standards-Aligned Collection</p>
            <h1 className={`${headingDisplay} text-lg md:text-xl`}>
              Visual Mathematics Learning Labs
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            {headerAction}
            <p
              className={`${textMetadata} sm:text-right`}
              aria-live="polite"
              aria-atomic="true"
            >
              {active ? (
                <>
                  Showing <span className="font-medium text-foreground">{resultCount}</span> of{" "}
                  {totalCount} modules
                </>
              ) : (
                <>
                  <span className="font-medium text-foreground">{totalCount}</span> classroom-ready
                  modules available
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <label className="depth-surface flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border/60 bg-card/70 px-3 focus-within:ring-2 focus-within:ring-ring">
            <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              value={filters.query}
              onChange={(event) => onFiltersChange({ ...filters, query: event.target.value })}
              placeholder={`Search ${totalCount} simulations...`}
              aria-label="Search simulations by title, summary, or skills"
              className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {filters.query && (
              <Button
                type="button"
                aria-label="Clear search query"
                variant="ghost"
                size="icon"
                className="size-7 shrink-0"
                onClick={() => onFiltersChange({ ...filters, query: "" })}
              >
                <X className="size-3.5" />
              </Button>
            )}
          </label>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:shrink-0 lg:items-center">
            <Select
              value={filters.subject}
              onValueChange={(value) => onFiltersChange({ ...filters, subject: value })}
            >
              <SelectTrigger
                aria-label="Filter by subject"
                className="depth-surface h-10 w-full rounded-xl border-border/60 bg-card/70 lg:w-[148px]"
              >
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_FILTER}>All subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.grade}
              onValueChange={(value) => onFiltersChange({ ...filters, grade: value })}
            >
              <SelectTrigger
                aria-label="Filter by grade band"
                className="depth-surface h-10 w-full rounded-xl border-border/60 bg-card/70 lg:w-[132px]"
              >
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_FILTER}>All grades</SelectItem>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.difficulty}
              onValueChange={(value) => onFiltersChange({ ...filters, difficulty: value })}
            >
              <SelectTrigger
                aria-label="Filter by difficulty"
                className="depth-surface col-span-2 h-10 w-full rounded-xl border-border/60 bg-card/70 sm:col-span-1 lg:w-[148px]"
              >
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_FILTER}>All levels</SelectItem>
                {DIFFICULTY_OPTIONS.map((level: LabDifficulty) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {active && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="depth-surface h-10 shrink-0 rounded-xl motion-reduce:transition-none"
              onClick={onClearAll}
            >
              Clear all
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
