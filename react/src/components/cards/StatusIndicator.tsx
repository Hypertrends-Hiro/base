import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  count: number;
  label: string;
  status: "optimal" | "improving" | "attention";
}

export function StatusIndicator({ count, label, status }: StatusIndicatorProps) {
  return (
    <div className="text-center">
      <p className="font-heading text-5xl font-medium">{count.toString().padStart(2, "0")}</p>
      <div className="mt-2 flex items-center justify-center gap-1.5">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            status === "optimal" && "bg-status-optimal",
            status === "improving" && "bg-status-improving",
            status === "attention" && "bg-status-attention"
          )}
        />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}

interface StatusBarProps {
  optimal: number;
  improving: number;
  attention: number;
}

export function StatusBar({ optimal, improving, attention }: StatusBarProps) {
  const total = optimal + improving + attention;
  const optimalPercent = (optimal / total) * 100;
  const improvingPercent = (improving / total) * 100;

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div className="flex h-full">
        <div
          className="progress-optimal"
          style={{ width: `${optimalPercent}%` }}
        />
        <div
          className="progress-improving"
          style={{ width: `${improvingPercent}%` }}
        />
        <div className="progress-attention flex-1" />
      </div>
    </div>
  );
}
