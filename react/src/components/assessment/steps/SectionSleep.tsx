import { AssessmentStep } from "../AssessmentStep";
import { CheckboxGrid } from "../CheckboxGrid";
import { SingleSelect } from "../SingleSelect";
import { Textarea } from "@/components/ui/textarea";

const SLEEP_HOURS = [
  { value: "lt5", label: "Less than 5 hours" },
  { value: "5_6", label: "5–6 hours" },
  { value: "7_8", label: "7–8 hours" },
  { value: "gt8", label: "More than 8 hours" },
];

const RESTED_OPTIONS = [
  { value: "yes", label: "Yes, I usually feel rested" },
  { value: "sometimes", label: "Sometimes" },
  { value: "rarely", label: "Rarely" },
  { value: "never", label: "No, I never feel rested" },
];

const SLEEP_CONCERNS = [
  { id: "falling_asleep", label: "Difficulty falling asleep" },
  { id: "staying_asleep", label: "Difficulty staying asleep" },
  { id: "waking_early", label: "Waking up too early" },
  { id: "snoring", label: "Snoring / sleep apnea" },
  { id: "restless_legs", label: "Restless legs" },
  { id: "night_sweats", label: "Night sweats" },
  { id: "none", label: "No sleep concerns" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function SectionSleep({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const hours = (answers.sleepHoursNew as string) ?? "";
  const rested = (answers.feelsRested as string) ?? "";
  const concerns = (answers.sleepConcerns as string[]) ?? [];
  const notes = (answers.sleepNotes as string) ?? "";

  const toggleConcern = (id: string) => {
    if (id === "none") {
      onAnswer("sleepConcerns", concerns.includes("none") ? [] : ["none"]);
      return;
    }
    const filtered = concerns.filter((c) => c !== "none");
    const next = filtered.includes(id) ? filtered.filter((c) => c !== id) : [...filtered, id];
    onAnswer("sleepConcerns", next);
  };

  return (
    <AssessmentStep
      sectionLabel="Sleep"
      sectionTitle="Sleep & recovery"
      sectionDescription={`Quality sleep is essential for energy, mood, metabolism, and overall recovery. Understanding your sleep habits and any challenges you experience helps us identify patterns that may be impacting your health.\n\nPlease share details about your typical sleep.`}
      questionTitle="On average, how many hours do you sleep per night?"
      onBack={onBack}
      onNext={onNext}
      stepKey="section-sleep"
      direction={direction}
    >
      {/* Q41: Hours */}
      <SingleSelect options={SLEEP_HOURS} value={hours} onChange={(v) => onAnswer("sleepHoursNew", v)} />

      {/* Q42: Feel rested? */}
      <div className="space-y-2">
        <p className="text-base font-medium leading-snug text-foreground">Do you generally wake up feeling rested?</p>
        <SingleSelect options={RESTED_OPTIONS} value={rested} onChange={(v) => onAnswer("feelsRested", v)} />
      </div>

      {/* Q43: Sleep concerns */}
      <div className="space-y-3">
        <p className="text-base font-medium leading-snug text-foreground">Do you have any sleep concerns?</p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
        <CheckboxGrid options={SLEEP_CONCERNS} selected={concerns} onToggle={toggleConcern} columns={1} />
      </div>

      {/* Q44: Notes */}
      <div className="space-y-2">
        <p className="text-base font-medium leading-snug text-foreground">
          Anything else about your sleep?{" "}
          <span className="text-foreground/60 font-normal">(optional)</span>
        </p>
        <Textarea
          value={notes}
          onChange={(e) => onAnswer("sleepNotes", e.target.value)}
          placeholder="Any other details about your sleep..."
          className="min-h-[80px] resize-none bg-background/50"
        />
      </div>
    </AssessmentStep>
  );
}
