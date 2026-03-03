import { AssessmentStep } from "../AssessmentStep";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { YesNoToggle } from "../YesNoToggle";

const ACTIVITY_LEVELS = [
  { value: "sedentary", label: "Sedentary (little or no exercise)" },
  { value: "lightly_active", label: "Lightly active (light exercise 1–3 days/week)" },
  { value: "moderately_active", label: "Moderately active (moderate exercise 3–5 days/week)" },
  { value: "very_active", label: "Very active (hard exercise 6–7 days/week)" },
  { value: "extremely_active", label: "Extremely active (very hard exercise & physical job)" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function Step09ActivityLevel({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const activityLevel = (answers.activityLevel as string) ?? "";
  const hasInjuries = (answers.hasInjuries as "yes" | "no" | "") ?? "";

  return (
    <AssessmentStep
      sectionLabel="Section 9 of 16"
      sectionTitle="Physical Activity"
      sectionDescription={`Your daily activity level plays an important role in your overall health, energy, and long-term well-being. By understanding how active you are and whether you experience any injuries or physical limitations, we can better tailor recommendations that are safe, realistic, and aligned with your abilities.\n\nPlease share what best describes your activity level and any limitations you may have.`}
      questionTitle="How would you describe your overall daily activity level?"
      onBack={onBack}
      onNext={onNext}
      stepKey="step-9"
      direction={direction}
    >
      {/* Activity level dropdown */}
      <div className="space-y-2">
        <Label className="text-[10px] font-semibold uppercase tracking-widest text-foreground block">
          Activity level
        </Label>
        <Select value={activityLevel} onValueChange={(v) => onAnswer("activityLevel", v)}>
          <SelectTrigger className="w-full bg-background/50">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent
            className="w-[var(--radix-select-trigger-width)] bg-card border border-border shadow-lg z-50"
            position="popper"
            sideOffset={4}
          >
            {ACTIVITY_LEVELS.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="whitespace-normal py-2.5 leading-snug"
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Injuries YES/NO */}
      <div className="space-y-3">
        <p className="text-sm font-medium leading-snug text-foreground">
          Do you have any injuries or physical limitations that affect your ability to exercise or stay active?
        </p>
        <YesNoToggle
          value={hasInjuries}
          onChange={(v) => onAnswer("hasInjuries", v)}
        />
      </div>
    </AssessmentStep>
  );
}
