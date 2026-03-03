import { DobPicker } from "@/components/signup/DobPicker";
import { ChevronRight } from "lucide-react";
import { AssessmentStep } from "../AssessmentStep";

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export function Step01Demographics({ answers, onAnswer, onNext, onBack, direction }: Props) {
  return (
    <AssessmentStep
      sectionLabel="Section 1 of 16"
      sectionTitle="Let's start with simple demographics..."
      sectionDescription="To tailor your health insights accurately, we'll begin with a few basic questions about you. Your age and biological sex help us interpret your results correctly and provide recommendations that match your unique physiology. This section should only take a moment — just answer each question as accurately as you can."
      questionTitle="What is your age and biological sex?"
      onBack={onBack}
      onNext={onNext}
      backLabel="Back"
      stepKey="step-01"
      direction={direction}
    >
      {/* Two fields side by side on all sizes */}
      <div className="grid grid-cols-2 gap-4">
        {/* Date of Birth */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
            Date of Birth
          </label>
          <DobPicker
            value={answers.dob as Date | undefined}
            onChange={(date) => onAnswer("dob", date)}
            inputClass={inputClass}
          />
        </div>

        {/* Biological Sex */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
            Biological Sex
          </label>
          <div className="relative">
            <select
              className={inputClass + " appearance-none pr-9 cursor-pointer"}
              value={(answers.biologicalSex as string) ?? ""}
              onChange={(e) => onAnswer("biologicalSex", e.target.value)}
            >
              <option value="">Select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="intersex">Intersex</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            <ChevronRight className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-foreground/50" />
          </div>
        </div>
      </div>
    </AssessmentStep>
  );
}
