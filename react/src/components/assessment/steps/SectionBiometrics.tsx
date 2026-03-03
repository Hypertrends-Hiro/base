import { AssessmentStep } from "../AssessmentStep";
import { Input } from "@/components/ui/input";
import { SingleSelect } from "../SingleSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FEET_OPTIONS = Array.from({ length: 5 }, (_, i) => ({
  value: String(i + 4),
  label: `${i + 4} ft`,
}));

const INCHES_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  value: String(i),
  label: `${i} in`,
}));

const BP_OPTIONS = [
  { value: "normal", label: "Normal (below 120/80)" },
  { value: "elevated", label: "Elevated (120-129 / less than 80)" },
  { value: "high_stage1", label: "High – Stage 1 (130-139 / 80-89)" },
  { value: "high_stage2", label: "High – Stage 2 (140+ / 90+)" },
  { value: "dont_know", label: "I don't know" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function SectionBiometrics({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const heightFeet = (answers.heightFeet as string) ?? "";
  const heightInches = (answers.heightInches as string) ?? "";
  const currentWeight = (answers.currentWeight as string) ?? "";
  const goalWeight = (answers.goalWeight as string) ?? "";
  const bloodPressure = (answers.bloodPressure as string) ?? "";

  return (
    <AssessmentStep
      sectionLabel="Biometrics"
      sectionTitle="Let's get your measurements"
      sectionDescription={`Your height, weight, and basic measurements help us understand where you are today and how your wellness journey is progressing. These numbers give us important context for interpreting your results — but don't worry if you're not exactly sure. Just provide your best estimate.\n\nOur goal is to support you, not stress you. Every bit of information helps us personalize your experience.`}
      questionTitle="What is your height?"
      onBack={onBack}
      onNext={onNext}
      stepKey="section-biometrics"
      direction={direction}
    >
      {/* Q10: Height */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">Feet</p>
          <Select value={heightFeet} onValueChange={(v) => onAnswer("heightFeet", v)}>
            <SelectTrigger className="w-full bg-background/50"><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent className="w-[var(--radix-select-trigger-width)] bg-card border border-border shadow-lg z-50" position="popper" sideOffset={4}>
              {FEET_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value} className="py-2.5">{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">Inches</p>
          <Select value={heightInches} onValueChange={(v) => onAnswer("heightInches", v)}>
            <SelectTrigger className="w-full bg-background/50"><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent className="w-[var(--radix-select-trigger-width)] bg-card border border-border shadow-lg z-50" position="popper" sideOffset={4}>
              {INCHES_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value} className="py-2.5">{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Q11: Current weight */}
      <div className="space-y-2">
        <p className="text-base font-medium leading-snug text-foreground">What is your current weight? (lbs)</p>
        <Input
          value={currentWeight}
          onChange={(e) => onAnswer("currentWeight", e.target.value)}
          placeholder="Current weight in lbs"
          className="bg-background/50"
          type="number"
        />
      </div>

      {/* Q12: Goal weight */}
      <div className="space-y-2">
        <p className="text-base font-medium leading-snug text-foreground">What is your goal weight? (lbs)</p>
        <Input
          value={goalWeight}
          onChange={(e) => onAnswer("goalWeight", e.target.value)}
          placeholder="Goal weight in lbs"
          className="bg-background/50"
          type="number"
        />
      </div>

      {/* Q13: Blood pressure */}
      <div className="space-y-2">
        <p className="text-base font-medium leading-snug text-foreground">
          Do you know your most recent blood pressure reading?
        </p>
        <SingleSelect options={BP_OPTIONS} value={bloodPressure} onChange={(v) => onAnswer("bloodPressure", v)} />
      </div>
    </AssessmentStep>
  );
}
