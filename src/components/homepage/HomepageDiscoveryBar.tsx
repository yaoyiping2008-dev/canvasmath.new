import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LabDifficulty } from "@/lib/labs-data";
import {
  ALL_FILTER,
  DIFFICULTY_OPTIONS,
  type DiscoveryFilters,
  hasActiveDiscoveryFilters,
} from "./homepage-utils";

type HomepageDiscoveryBarProps = {
  filters: DiscoveryFilters;
  resultCount: number;
  totalCount: number;
  subjects: string[];
  grades: string[];
  onFiltersChange: (filters: DiscoveryFilters) => void;
  onClearAll: () => void;
};

export function HomepageDiscoveryBar({
  filters,
  resultCount,
  totalCount,
  subjects,
  grades,
  onFiltersChange,
  onClearAll,
}: HomepageDiscoveryBarProps) {
  const active = hasActiveDiscoveryFilters(filters);

  return (
    <div
      className="homepage-discovery-input mx-auto flex w-full max-w-3xl flex-col gap-2 p-2 md:flex-row md:items-center md:gap-2"
      role="search"
      aria-label="Simulation discovery"
    >
      <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border/80 bg-white px-3 py-0">
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <input
          type="search"
          value={filters.query}
          onChange={(e) => onFiltersChange({ ...filters, query: e.target.value })}
          placeholder="Search simulations and concepts..."
          aria-label="Search simulations and concepts"
          className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {filters.query && (
          <Button
            type="button"
            aria-label="Clear search"
            variant="ghost"
            size="icon"
            className="size-7 shrink-0"
            onClick={() => onFiltersChange({ ...filters, query: "" })}
          >
            <X className="size-3.5" />
          </Button>
        )}
      </label>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:flex md:shrink-0">
        <Select
          value={filters.subject}
          onValueChange={(value) => onFiltersChange({ ...filters, subject: value })}
        >
          <SelectTrigger aria-label="Filter by subject" className="h-10 rounded-xl bg-white">
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
          <SelectTrigger aria-label="Filter by grade" className="h-10 rounded-xl bg-white">
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
            className="col-span-2 h-10 rounded-xl bg-white sm:col-span-1"
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
          className="h-10 shrink-0 rounded-xl"
          onClick={onClearAll}
        >
          Clear filters
        </Button>
      )}

      <p className="text-center text-xs text-muted-foreground md:hidden" aria-live="polite">
        {active ? `${resultCount} of ${totalCount} modules` : `${totalCount} modules`}
      </p>
    </div>
  );
}
