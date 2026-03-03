import { AssessmentStep } from "../AssessmentStep";
import { CheckboxGrid } from "../CheckboxGrid";
import { SingleSelect } from "../SingleSelect";
import { Textarea } from "@/components/ui/textarea";

const ACTIVITY_FREQUENCY = [
  { value: "none", label: "I don't exercise regularly" },
  { value: "1_2", label: "1–2 times per week" },
  { value: "3_4", label: "3–4 times per week" },
  { value: "5_plus", label: "5 or more times per week" },
];

const ACTIVITY_TYPES = [
  { id: "walking", label: "Walking / hiking" },
  { id: "running", label: "Running / jogging" },
  { id: "strength", label: "Strength / weight training" },
  { id: "yoga", label: "Yoga / Pilates" },
  { id: "cycling", label: "Cycling" },
  { id: "swimming", label: "Swimming" },
  { id: "group_fitness", label: "Group fitness classes" },
  { id: "sports", label: "Sports (tennis, golf, etc.)" },
  { id: "other", label: "Other" },
];

const BARRIERS = [
  { id: "time", label: "Lack of time" },
  { id: "motivation", label: "Lack of motivation" },
  { id: "pain", label: "Physical limitations or pain" },
  { id: "how_to_start", label: "Not sure how to start" },
  { id: "no_facilities", label: "No access to facilities" },
  { id: "fatigue", label: "Too tired / fatigue" },
  { id: "none", label: "No barriers" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function SectionPhysicalActivity({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const frequency = (answers.activityFrequency as string) ?? "";
  const types = (answers.activityTypes as string[]) ?? [];
  const barriers = (answers.activityBarriers as string[]) ?? [];
  const notes = (answers.activityNotes as string) ?? "";

  const toggleType = (id: string) => {
    const next = types.includes(id) ? types.filter((t) => t !== id) : [...types, id];
    onAnswer("activityTypes", next);
  };

  const toggleBarrier = (id: string) => {
    if (id === "none") {
      onAnswer("activityBarriers", barriers.includes("none") ? [] : ["none"]);
      return;
    }
    const filtered = barriers.filter((b) => b !== "none");
    const next = filtered.includes(id) ? filtered.filter((b) => b !== id) : [...filtered, id];
    onAnswer("activityBarriers", next);
  };

  return (
    <AssessmentStep
      sectionLabel="Physical Activity"
      sectionTitle="Physical activity & exercise"
      sectionDescription={`Regular movement plays a key role in supporting your energy, mood, weight, and overall health. Understanding your activity level — and any challenges you may face — helps us tailor recommendations that fit your lifestyle.\n\nPlease tell us about your typical exercise habits.`}
      questionTitle="How often do you exercise per week?"
      onBack={onBack}
      onNext={onNext}
      stepKey="section-physical-activity"
      direction={direction}
    >
      {/* Q37: Frequency */}
      <SingleSelect options={ACTIVITY_FREQUENCY} value={frequency} onChange={(v) => onAnswer("activityFrequency", v)} />

      {/* Q38: Activity types */}
      <div className="space-y-3">
        <p className="text-base font-medium leading-snug text-foreground">What types of physical activity do you do?</p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
        <CheckboxGrid options={ACTIVITY_TYPES} selected={types} onToggle={toggleType} />
      </div>

      {/* Q39: Barriers */}
      <div className="space-y-3">
        <p className="text-base font-medium leading-snug text-foreground">Do you face any barriers or challenges to exercising?</p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
        <CheckboxGrid options={BARRIERS} selected={barriers} onToggle={toggleBarrier} />
      </div>

      {/* Q40: Notes */}
      <div className="space-y-2">
        <p className="text-base font-medium leading-snug text-foreground">
          Anything else about your activity level?{" "}
          <span className="text-foreground/60 font-normal">(optional)</span>
        </p>
        <Textarea
          value={notes}
          onChange={(e) => onAnswer("activityNotes", e.target.value)}
          placeholder="Any other details about your exercise habits..."
          className="min-h-[80px] resize-none bg-background/50"
        />
      </div>
    </AssessmentStep>
  );
}
