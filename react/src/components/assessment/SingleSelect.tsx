import { cn } from "@/lib/utils";

interface SingleSelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function SingleSelect({ options, value, onChange }: SingleSelectProps) {
  return (
    <div className="grid grid-cols-1 gap-2.5">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-4 py-2.5 text-left transition-colors w-full text-sm",
              active
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-background/50 text-foreground hover:border-primary/50 hover:bg-background"
            )}
          >
            <span
              className={cn(
                "h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0",
                active ? "border-primary" : "border-foreground/30"
              )}
            >
              {active && <span className="h-2 w-2 rounded-full bg-primary" />}
            </span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
