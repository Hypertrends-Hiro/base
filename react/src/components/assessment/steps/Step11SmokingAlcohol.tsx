import { AssessmentStep } from "../AssessmentStep";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SMOKING_STATUS = [
  { value: "never", label: "Never smoked" },
  { value: "former", label: "Former smoker" },
  { value: "current", label: "Yes, currently smoke" },
];

const ALCOHOL_FREQUENCY = [
  { value: "never", label: "Never" },
  { value: "rarely", label: "Rarely (few times per year)" },
  { value: "occasionally", label: "Occasionally (1-2 times per month)" },
  { value: "regularly", label: "Regularly (1-2 times per week)" },
  { value: "frequently", label: "Frequently (3-4 times per week)" },
  { value: "daily", label: "Daily" },
];

const CAFFEINE_INTAKE = [
  { value: "none", label: "None" },
  { value: "1", label: "1 drink" },
  { value: "2", label: "2 drinks" },
  { value: "3", label: "3 drinks" },
  { value: "4", label: "4 drinks" },
  { value: "5plus", label: "5 or more drinks" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function Step11SmokingAlcohol({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const smokingStatus = (answers.smokingStatus as string) ?? "";
  const alcoholFrequency = (answers.alcoholFrequency as string) ?? "";
  const caffeineIntake = (answers.caffeineIntake as string) ?? "";

  return (
    <AssessmentStep
      sectionLabel="Section 11 of 16"
      sectionTitle="Smoking & Alcohol"
      sectionDescription={`Lifestyle habits such as smoking and alcohol use can have a meaningful impact on your overall health, energy levels, and long-term wellness. Understanding your current and past habits helps us interpret your results more accurately and provide recommendations that support your goals.\n\nPlease answer honestly — this information is confidential and used only to personalize your health insights.`}
      questionTitle="Do you currently smoke or use tobacco products?"
      onBack={onBack}
      onNext={onNext}
      stepKey="step-11"
      direction={direction}
    >
      {/* Q1: Smoking status */}
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
          Current Status
        </p>
        <Select value={smokingStatus} onValueChange={(v) => onAnswer("smokingStatus", v)}>
          <SelectTrigger className="w-full bg-background/50">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent
            className="w-[var(--radix-select-trigger-width)] bg-card border border-border shadow-lg z-50"
            position="popper"
            sideOffset={4}
          >
            {SMOKING_STATUS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="py-2.5">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Q2: Alcohol frequency */}
      <div className="space-y-2">
        <p className="text-sm font-medium leading-snug text-foreground">
          How often do you drink alcohol?
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
          Please Select
        </p>
        <Select value={alcoholFrequency} onValueChange={(v) => onAnswer("alcoholFrequency", v)}>
          <SelectTrigger className="w-full bg-background/50">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent
            className="w-[var(--radix-select-trigger-width)] bg-card border border-border shadow-lg z-50"
            position="popper"
            sideOffset={4}
          >
            {ALCOHOL_FREQUENCY.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="py-2.5">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Q3: Caffeine intake */}
      <div className="space-y-2">
        <p className="text-sm font-medium leading-snug text-foreground">
          How many caffeinated drinks (coffee, tea, soda, energy drinks) do you typically consume per day?
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
          Please Select
        </p>
        <Select value={caffeineIntake} onValueChange={(v) => onAnswer("caffeineIntake", v)}>
          <SelectTrigger className="w-full bg-background/50">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent
            className="w-[var(--radix-select-trigger-width)] bg-card border border-border shadow-lg z-50"
            position="popper"
            sideOffset={4}
          >
            {CAFFEINE_INTAKE.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="py-2.5">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </AssessmentStep>
  );
}
