import { useState } from "react";
import { AssessmentStep } from "../AssessmentStep";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
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

function UnitToggle({
  unit,
  onToggle,
}: {
  unit: "lbs" | "kg";
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center rounded-full border border-border bg-background/60 overflow-hidden text-[11px] font-semibold"
    >
      <span
        className={cn(
          "px-2.5 py-1 transition-colors",
          unit === "lbs"
            ? "bg-primary text-primary-foreground"
            : "text-foreground/40 hover:text-foreground/70"
        )}
      >
        lbs
      </span>
      <span
        className={cn(
          "px-2.5 py-1 transition-colors",
          unit === "kg"
            ? "bg-primary text-primary-foreground"
            : "text-foreground/40 hover:text-foreground/70"
        )}
      >
        kg
      </span>
    </button>
  );
}

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function Step13Biometrics({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const heightFeet = (answers.heightFeet as string) ?? "";
  const heightInches = (answers.heightInches as string) ?? "";
  const currentWeight = (answers.currentWeight as string) ?? "";
  const goalWeight = (answers.goalWeight as string) ?? "";
  const bloodPressure = (answers.bloodPressure as string) ?? "";
  const restingHeartRate = (answers.restingHeartRate as string) ?? "";

  const [currentWeightUnit, setCurrentWeightUnit] = useState<"lbs" | "kg">("lbs");
  const [goalWeightUnit, setGoalWeightUnit] = useState<"lbs" | "kg">("lbs");

  return (
    <AssessmentStep
      sectionLabel="Section 13 of 16"
      sectionTitle="We need your bio metrics and measurements but if you don't know, no stress"
      sectionDescription={`Your height, weight, and basic measurements help us understand where you are today and how your wellness journey is progressing. These numbers give us important context for interpreting your results — but don't worry if you're not exactly sure. Just provide your best estimate.\n\nOur goal is to support you, not stress you. Every bit of information helps us personalize your experience.`}
      questionTitle="What is your height? (ft and inches or cm)"
      onBack={onBack}
      onNext={onNext}
      stepKey="step-13"
      direction={direction}
    >
      {/* Q1: Height — two dropdowns side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
            Feet
          </p>
          <Select value={heightFeet} onValueChange={(v) => onAnswer("heightFeet", v)}>
            <SelectTrigger className="w-full bg-background/50">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent
              className="w-[var(--radix-select-trigger-width)] bg-card border border-border shadow-lg z-50"
              position="popper"
              sideOffset={4}
            >
              {FEET_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="py-2.5">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
            Inches
          </p>
          <Select value={heightInches} onValueChange={(v) => onAnswer("heightInches", v)}>
            <SelectTrigger className="w-full bg-background/50">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent
              className="w-[var(--radix-select-trigger-width)] bg-card border border-border shadow-lg z-50"
              position="popper"
              sideOffset={4}
            >
              {INCHES_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="py-2.5">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Q2: Current weight with unit toggle */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium leading-snug text-foreground">
            What is your current weight?
          </p>
          <UnitToggle
            unit={currentWeightUnit}
            onToggle={() => setCurrentWeightUnit((u) => (u === "lbs" ? "kg" : "lbs"))}
          />
        </div>
        <Input
          value={currentWeight}
          onChange={(e) => onAnswer("currentWeight", e.target.value)}
          placeholder={`Current weight in ${currentWeightUnit}`}
          className="bg-background/50 placeholder:uppercase placeholder:text-[11px] placeholder:tracking-wider"
        />
      </div>

      {/* Q3: Goal weight with unit toggle */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium leading-snug text-foreground">
            What is your goal weight?
          </p>
          <UnitToggle
            unit={goalWeightUnit}
            onToggle={() => setGoalWeightUnit((u) => (u === "lbs" ? "kg" : "lbs"))}
          />
        </div>
        <Input
          value={goalWeight}
          onChange={(e) => onAnswer("goalWeight", e.target.value)}
          placeholder={`Goal weight in ${goalWeightUnit}`}
          className="bg-background/50 placeholder:uppercase placeholder:text-[11px] placeholder:tracking-wider"
        />
      </div>

      {/* Q4: Blood pressure (optional) */}
      <div className="space-y-2">
        <p className="text-sm font-medium leading-snug text-foreground">
          Do you know your most recent blood pressure reading?{" "}
          <span className="text-foreground font-normal">(optional)</span>
        </p>
        <Input
          value={bloodPressure}
          onChange={(e) => onAnswer("bloodPressure", e.target.value)}
          placeholder="Example: 120/80"
          className="bg-background/50"
        />
      </div>

      {/* Q5: Resting heart rate (optional) */}
      <div className="space-y-2">
        <p className="text-sm font-medium leading-snug text-foreground">
          What is your resting heart rate?{" "}
          <span className="text-foreground font-normal">(optional)</span>
        </p>
        <Input
          value={restingHeartRate}
          onChange={(e) => onAnswer("restingHeartRate", e.target.value)}
          placeholder="Example: 65 bpm"
          className="bg-background/50"
        />
      </div>
    </AssessmentStep>
  );
}
