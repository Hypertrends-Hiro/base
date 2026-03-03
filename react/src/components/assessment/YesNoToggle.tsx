import { cn } from "@/lib/utils";

interface YesNoToggleProps {
  value: "yes" | "no" | "";
  onChange: (v: "yes" | "no") => void;
}

export function YesNoToggle({ value, onChange }: YesNoToggleProps) {
  const base =
    "flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm transition-colors cursor-pointer";
  const active = "border-primary bg-primary/10 text-foreground";
  const inactive =
    "border-border bg-background/50 text-foreground hover:border-primary/50 hover:bg-background";

  return (
    <div className="flex gap-3">
      {(["yes", "no"] as const).map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(base, value === opt ? active : inactive)}
        >
          <span
            className={cn(
              "h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0",
              value === opt ? "border-primary" : "border-foreground/30"
            )}
          >
            {value === opt && (
              <span className="h-2 w-2 rounded-full bg-primary" />
            )}
          </span>
          {opt.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
