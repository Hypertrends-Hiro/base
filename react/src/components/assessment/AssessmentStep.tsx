import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentStepProps {
  sectionLabel?: string;
  sectionTitle: string;
  sectionDescription: string;
  questionTitle: string;
  children: React.ReactNode;
  onBack?: () => void;
  onNext: () => void;
  backLabel?: string;
  nextLabel?: string;
  stepKey: string;
  direction?: "forward" | "back";
}

export function AssessmentStep({
  sectionLabel,
  sectionTitle,
  sectionDescription,
  questionTitle,
  children,
  onBack,
  onNext,
  backLabel = "Back",
  nextLabel = "Continue",
  stepKey,
  direction = "forward",
}: AssessmentStepProps) {
  const [expanded, setExpanded] = useState(false);

  const animClass =
    direction === "back"
      ? "animate-[step-enter-back_0.32s_cubic-bezier(0.22,1,0.36,1)]"
      : "animate-[step-enter-forward_0.32s_cubic-bezier(0.22,1,0.36,1)]";

  return (
    <div
      key={stepKey}
      className={cn("flex-1 mx-auto w-full max-w-5xl px-6 py-8 lg:px-12 lg:py-12", animClass)}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr,1.6fr] lg:gap-16 items-start">

        {/* LEFT INFO PANEL */}
        <div className="lg:pt-2">
          {sectionLabel && (
            <p className="text-[10px] font-semibold uppercase tracking-widest text-primary mb-3">
              {sectionLabel}
            </p>
          )}
          <h1 className="font-heading text-2xl font-medium leading-snug lg:text-3xl text-foreground">
            {sectionTitle}
          </h1>

          {/* Mobile: collapsible description */}
          <div className="mt-4 lg:hidden">
            <p
              className={cn(
                "text-sm leading-relaxed text-foreground transition-all",
                !expanded && "line-clamp-2"
              )}
            >
              {sectionDescription}
            </p>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-primary"
            >
              {expanded ? "Read less" : "Read more"}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  expanded && "rotate-180"
                )}
              />
            </button>
          </div>

          {/* Desktop: full description always visible */}
          <p className="mt-4 hidden lg:block text-sm leading-relaxed text-foreground">
            {sectionDescription}
          </p>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-6 lg:p-8">
          <h2 className="text-base font-medium leading-snug text-foreground mb-3">
            {questionTitle}
          </h2>

          {/* Form fields */}
          <div className="space-y-5">
            {children}
          </div>

          {/* Navigation buttons */}
          <div className="flex flex-col gap-3 pt-2 mt-5">
            <button
              type="button"
              onClick={onNext}
              className="h-12 w-full rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              {nextLabel}
            </button>
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="h-12 w-full rounded-lg border border-border bg-transparent text-foreground font-semibold text-sm hover:bg-border/40 transition-colors"
              >
                {backLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
