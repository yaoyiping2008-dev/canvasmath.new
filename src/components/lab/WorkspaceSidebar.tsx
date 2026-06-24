import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LabModule } from "@/lib/labs-data";
import { getModuleFocus, getSessionHint } from "./LearningWorkflowState";

type WorkspaceSidebarProps = {
  lab: LabModule;
  panelOpen: boolean;
  focusMode: boolean;
  onClosePanel: () => void;
};

export function WorkspaceSidebar({
  lab,
  panelOpen,
  focusMode,
  onClosePanel,
}: WorkspaceSidebarProps) {
  const [checkedObjectives, setCheckedObjectives] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState("");
  const moduleFocus = getModuleFocus(lab);
  const hint = getSessionHint(lab);

  if (focusMode) return null;

  return (
    <aside
      className={cn(
        "flex min-h-0 w-full shrink-0 flex-col border-border/80 bg-card/95 md:w-64 md:border-l lg:w-72",
        panelOpen
          ? "absolute inset-x-0 bottom-0 top-[53px] z-30 border-t md:static md:z-auto md:border-t-0"
          : "hidden md:flex",
      )}
      aria-label="Learning reference panel"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5 md:hidden">
        <p className="text-sm font-medium">Learning panel</p>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8"
          aria-label="Close learning panel"
          onClick={onClosePanel}
        >
          <X className="size-4" />
        </Button>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        <section aria-labelledby="workspace-focus">
          <h2
            id="workspace-focus"
            className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Current focus
          </h2>
          <p className="text-xs leading-relaxed text-foreground">{moduleFocus}</p>
        </section>

        {(lab.learningObjectives?.length ?? 0) > 0 && (
          <section aria-labelledby="workspace-checklist">
            <h2
              id="workspace-checklist"
              className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Objectives checklist
            </h2>
            <ul className="space-y-2">
              {lab.learningObjectives!.map((objective) => {
                const checked = checkedObjectives[objective] ?? false;
                return (
                  <li key={objective}>
                    <label className="flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) =>
                          setCheckedObjectives((prev) => ({
                            ...prev,
                            [objective]: event.target.checked,
                          }))
                        }
                        className="mt-0.5 size-3.5 rounded border-border accent-primary"
                        aria-label={`Mark objective complete: ${objective}`}
                      />
                      <span className={checked ? "line-through opacity-70" : undefined}>
                        {objective}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {hint && (
          <section aria-labelledby="workspace-hint">
            <h2
              id="workspace-hint"
              className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Hint
            </h2>
            <p className="rounded-lg border border-border/50 bg-muted/20 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              {hint}
            </p>
          </section>
        )}

        <section aria-labelledby="workspace-notes">
          <h2
            id="workspace-notes"
            className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Session notes
          </h2>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            aria-label="Session notes for this simulation"
            placeholder="Observations, questions, or next steps…"
            className="min-h-24 w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-xs leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <p className="mt-1 text-[10px] text-muted-foreground">
            Stored locally for this session only.
          </p>
        </section>
      </div>
    </aside>
  );
}
