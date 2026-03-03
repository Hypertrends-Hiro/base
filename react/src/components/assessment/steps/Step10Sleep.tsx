import { AssessmentStep } from "../AssessmentStep";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const SLEEP_HOURS = [
  { value: "lt5", label: "Less than 5 hours" },
  { value: "5_6", label: "5 – 6 hours" },
  { value: "7_8", label: "7 – 8 hours" },
  { value: "gt8", label: "More than 8 hours" },
];

const SLEEP_ISSUES = [
  { id: "falling_asleep", label: "Trouble falling asleep" },
  { id: "waking_frequently", label: "Waking up frequently" },
  { id: "snoring", label: "Snoring or sleep apnea" },
  { id: "not_rested", label: "Don't feel rested on waking" },
  { id: "none", label: "None of the above" },
];

const SLEEP_AIDS = [
  { value: "yes_prescription", label: "Yes, Prescription" },
  { value: "yes_otc", label: "Yes, over the counter" },
  { value: "no", label: "No" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function Step10Sleep({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const sleepHours = (answers.sleepHours as string) ?? "";
  const sleepIssues = (answers.sleepIssues as string[]) ?? [];
  const sleepAids = (answers.sleepAids as string) ?? "";
  const prescriptions = (answers.sleepPrescriptions as string) ?? "";

  const toggleIssue = (id: string) => {
    if (id === "none") {
      onAnswer("sleepIssues", sleepIssues.includes("none") ? [] : ["none"]);
      return;
    }
    const filtered = sleepIssues.filter((s) => s !== "none");
    const next = filtered.includes(id)
      ? filtered.filter((s) => s !== id)
      : [...filtered, id];
    onAnswer("sleepIssues", next);
  };

  return (
    <AssessmentStep
      sectionLabel="Section 10 of 16"
      sectionTitle="Sleep & Recovery"
      sectionDescription={`Quality sleep is essential for energy, mood, metabolism, and overall recovery. Understanding your sleep habits and any challenges you experience helps us identify patterns that may be impacting your health.\n\nPlease share details about your typical sleep duration, sleep quality, and whether you use any sleep aids. This allows us to provide more accurate and personalized insights.`}
      questionTitle="On average how many hours do you sleep per night?"
      onBack={onBack}
      onNext={onNext}
      stepKey="step-10"
      direction={direction}
    >
      {/* Q1: Sleep hours dropdown */}
      <Select value={sleepHours} onValueChange={(v) => onAnswer("sleepHours", v)}>
        <SelectTrigger className="w-full bg-background/50">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent
          className="w-[var(--radix-select-trigger-width)] bg-card border border-border shadow-lg z-50"
          position="popper"
          sideOffset={4}
        >
          {SLEEP_HOURS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="py-2.5">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Q2: Sleep issues checkboxes */}
      <div className="space-y-3">
        <p className="text-sm font-medium leading-snug text-foreground">
          Do you experience any sleep issues?
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
          Check all that apply
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
          {SLEEP_ISSUES.map((opt) => {
            const checked = sleepIssues.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleIssue(opt.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors w-full",
                  checked
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-background/50 text-foreground/70 hover:border-primary/50 hover:bg-background"
                )}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggleIssue(opt.id)}
                  className="pointer-events-none shrink-0"
                  aria-hidden
                />
                <span className="text-sm leading-snug">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Q3: Sleep aids dropdown */}
      <div className="space-y-3">
        <p className="text-sm font-medium leading-snug text-foreground">
          Do you regularly use sleep aids or medications to help you sleep?
        </p>
        <Select value={sleepAids} onValueChange={(v) => onAnswer("sleepAids", v)}>
          <SelectTrigger className="w-full bg-background/50">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent
            className="w-[var(--radix-select-trigger-width)] bg-card border border-border shadow-lg z-50"
            position="popper"
            sideOffset={4}
          >
            {SLEEP_AIDS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="py-2.5">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Conditional: prescription list */}
        {sleepAids === "yes_prescription" && (
          <div className="space-y-2 animate-fade-in">
            <Label className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
              Please list your prescriptions{" "}
              <span className="text-primary">*</span>
            </Label>
            <Input
              value={prescriptions}
              onChange={(e) => onAnswer("sleepPrescriptions", e.target.value)}
              placeholder="e.g. Ambien, Trazodone"
              className="bg-background/50"
            />
          </div>
        )}
      </div>
    </AssessmentStep>
  );
}
