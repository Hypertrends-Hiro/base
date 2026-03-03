import { AssessmentStep } from "../AssessmentStep";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const FREQUENCY_OPTIONS = [
  { value: "never", label: "Never" },
  { value: "rarely", label: "Rarely" },
  { value: "sometimes", label: "Sometimes" },
  { value: "often", label: "Often" },
  { value: "always", label: "Always" },
];

const STRESS_LEVELS = [
  { value: "low", label: "Low – I rarely feel stressed" },
  { value: "moderate", label: "Moderate – I feel stressed sometimes" },
  { value: "high", label: "High – I feel stressed often" },
  { value: "very_high", label: "Very high – I feel stressed most of the time" },
];

const MOOD_CHALLENGES = [
  { id: "anxiety", label: "Anxiety or constant worry" },
  { id: "low_mood", label: "Low mood or depression" },
  { id: "mood_swings", label: "Mood swings/irritability" },
  { id: "none", label: "None of these" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function Step12WellBeing({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const fatigueFrequency = (answers.fatigueFrequency as string) ?? "";
  const brainFogFrequency = (answers.brainFogFrequency as string) ?? "";
  const stressLevel = (answers.stressLevel as string) ?? "";
  const moodChallenges = (answers.moodChallenges as string[]) ?? [];

  const toggleMood = (id: string) => {
    if (id === "none") {
      onAnswer("moodChallenges", moodChallenges.includes("none") ? [] : ["none"]);
      return;
    }
    const filtered = moodChallenges.filter((s) => s !== "none");
    const next = filtered.includes(id)
      ? filtered.filter((s) => s !== id)
      : [...filtered, id];
    onAnswer("moodChallenges", next);
  };

  return (
    <AssessmentStep
      sectionLabel="Section 12 of 16"
      sectionTitle="How do you usually feel yourself?"
      sectionDescription={`Your daily well-being — your energy, focus, stress levels, and emotional balance — provides important clues about your overall health. Understanding how you typically feel helps us identify patterns, uncover potential contributing factors, and offer more meaningful, personalized guidance.\n\nPlease share how you've been feeling lately so we can get a clearer picture of your everyday health.`}
      questionTitle="How often do you feel fatigued or low on energy?"
      onBack={onBack}
      onNext={onNext}
      stepKey="step-12"
      direction={direction}
    >
      {/* Q1: Fatigue frequency */}
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
          Current Status
        </p>
        <Select value={fatigueFrequency} onValueChange={(v) => onAnswer("fatigueFrequency", v)}>
          <SelectTrigger className="w-full bg-background/50">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent
            className="w-[var(--radix-select-trigger-width)] bg-card border border-border shadow-lg z-50"
            position="popper"
            sideOffset={4}
          >
            {FREQUENCY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="py-2.5">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Q2: Brain fog frequency */}
      <div className="space-y-2">
        <p className="text-sm font-medium leading-snug text-foreground">
          How often do you experience "brain fog" (difficulty concentrating or mental fogginess)?
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
          Please Select
        </p>
        <Select value={brainFogFrequency} onValueChange={(v) => onAnswer("brainFogFrequency", v)}>
          <SelectTrigger className="w-full bg-background/50">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent
            className="w-[var(--radix-select-trigger-width)] bg-card border border-border shadow-lg z-50"
            position="popper"
            sideOffset={4}
          >
            {FREQUENCY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="py-2.5">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Q3: Stress level */}
      <div className="space-y-2">
        <p className="text-sm font-medium leading-snug text-foreground">
          How would you rate your typical stress level?
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
          Please Select
        </p>
        <Select value={stressLevel} onValueChange={(v) => onAnswer("stressLevel", v)}>
          <SelectTrigger className="w-full bg-background/50">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent
            className="w-[var(--radix-select-trigger-width)] bg-card border border-border shadow-lg z-50"
            position="popper"
            sideOffset={4}
          >
            {STRESS_LEVELS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="py-2.5">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Q4: Mood challenges checkboxes */}
      <div className="space-y-3">
        <p className="text-sm font-medium leading-snug text-foreground">
          Do you frequently experience any of the following mood or emotional challenges?
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
          Check all that apply
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
          {MOOD_CHALLENGES.map((opt) => {
            const checked = moodChallenges.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleMood(opt.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors w-full",
                  checked
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-background/50 text-foreground/70 hover:border-primary/50 hover:bg-background"
                )}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggleMood(opt.id)}
                  className="pointer-events-none shrink-0"
                  aria-hidden
                />
                <span className="text-sm leading-snug">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </AssessmentStep>
  );
}
