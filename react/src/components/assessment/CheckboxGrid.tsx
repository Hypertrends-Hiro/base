import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface CheckboxGridProps {
  options: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
  columns?: 1 | 2;
}

export function CheckboxGrid({ options, selected, onToggle, columns = 2 }: CheckboxGridProps) {
  return (
    <div className={cn(
      "grid gap-x-4 gap-y-2.5",
      columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
    )}>
      {options.map((opt) => {
        const checked = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onToggle(opt.id)}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors w-full",
              checked
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-background/50 text-foreground/70 hover:border-primary/50 hover:bg-background"
            )}
          >
            <Checkbox
              checked={checked}
              onCheckedChange={() => onToggle(opt.id)}
              className="pointer-events-none shrink-0"
              aria-hidden
            />
            <span className="text-sm leading-snug">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
