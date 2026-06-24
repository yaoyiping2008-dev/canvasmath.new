import type { LabModule } from "@/lib/labs-data";
import { countLabsInGroup, SUBJECT_GROUPS, type CategoryGroupId } from "./homepage-subjects";

type SubjectExplorerProps = {
  labs: LabModule[];
  activeGroup: string;
  onSelectGroup: (groupId: CategoryGroupId) => void;
};

function SubjectIcon({ accent }: { accent: string }) {
  const base = "relative flex size-12 items-center justify-center rounded-xl shadow-sm md:size-14";
  switch (accent) {
    case "violet":
      return (
        <div
          className={`${base} bg-gradient-to-br from-violet-200 to-violet-400/70`}
          style={{ transform: "rotate(-8deg) rotateX(8deg)" }}
        >
          <span className="font-display text-lg font-bold text-violet-900/80">π</span>
        </div>
      );
    case "blue":
      return (
        <div
          className={`${base} bg-gradient-to-br from-sky-200 to-blue-400/60`}
          style={{
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
            transform: "rotate(6deg)",
          }}
        />
      );
    case "green":
      return (
        <div
          className={`${base} flex flex-col items-center justify-end gap-0.5 bg-gradient-to-br from-emerald-100 to-green-300/60 p-2`}
        >
          <div className="h-2 w-3 rounded-sm bg-emerald-500/70" />
          <div className="h-3 w-4 rounded-sm bg-emerald-600/60" />
          <div className="h-4 w-5 rounded-sm bg-emerald-700/50" />
        </div>
      );
    case "orange":
      return (
        <div
          className={`${base} bg-gradient-to-br from-orange-200 to-amber-400/60`}
          style={{ transform: "rotate(-12deg)" }}
        >
          <div
            className="size-5 rounded-sm bg-orange-500/50"
            style={{ transform: "rotate(15deg)" }}
          />
        </div>
      );
    case "pink":
      return (
        <div className={`${base} bg-gradient-to-br from-pink-200 to-rose-300/60`}>
          <div className="size-6 rounded-full border-2 border-pink-500/40" />
          <div
            className="absolute size-2 rounded-full bg-pink-500/50"
            style={{ top: "30%", left: "35%" }}
          />
        </div>
      );
    default:
      return (
        <div
          className={`${base} grid grid-cols-2 gap-1 bg-gradient-to-br from-violet-100 to-violet-300/50 p-2`}
        >
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-sm bg-violet-400/50" />
          ))}
        </div>
      );
  }
}

export function SubjectExplorer({ labs, activeGroup, onSelectGroup }: SubjectExplorerProps) {
  const groups = SUBJECT_GROUPS.filter((g) => g.id !== "all");

  return (
    <section id="browse-subject" aria-labelledby="browse-subject-heading" className="scroll-mt-24">
      <div className="homepage-panel p-5 md:p-6">
        <div className="mb-5">
          <h2 id="browse-subject-heading" className="homepage-section-title text-lg md:text-xl">
            Browse by Subject
          </h2>
          <p className="homepage-section-subtitle mt-1 text-sm">
            Choose a subject area to filter the simulation catalog.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {groups.map((group) => {
            const count = countLabsInGroup(labs, group.id);
            const isActive = activeGroup === group.id;
            return (
              <button
                key={group.id}
                type="button"
                aria-pressed={isActive}
                className={[
                  "homepage-card flex flex-col items-center gap-3 rounded-2xl p-4 text-center outline-none",
                  "focus-visible:ring-2 focus-visible:ring-ring",
                  isActive ? "border-primary/40 ring-1 ring-primary/25" : "",
                ].join(" ")}
                onClick={() => onSelectGroup(group.id)}
              >
                <SubjectIcon accent={group.accent} />
                <div className="min-w-0 space-y-0.5">
                  <p className="text-sm font-semibold leading-snug">{group.shortLabel}</p>
                  <p className="text-xs text-muted-foreground">{count} modules</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
