import { AssessmentStep } from "../AssessmentStep";
import { YesNoToggle } from "../YesNoToggle";

const QUESTIONS: { key: string; label: string }[] = [
  {
    key: "prescriptionMeds",
    label: "Are you currently taking any prescription medications?",
  },
  {
    key: "otcSupplements",
    label:
      "Are you regularly taking any over-the-counter vitamins, supplements, or herbal products?",
  },
  {
    key: "hormoneTherapy",
    label:
      "Are you currently on any hormone therapy (e.g., estrogen, progesterone, thyroid medication, etc.)?",
  },
  {
    key: "sideEffects",
    label:
      "Do you have any side effects or issues with your current medications or supplements?",
  },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function Step06Medications({ answers, onAnswer, onNext, onBack, direction }: Props) {
  return (
    <AssessmentStep
      sectionLabel="Section 6 of 16"
      sectionTitle="Any medications & supplements?"
      sectionDescription={`Knowing which medications and supplements you currently take helps us understand factors that may influence your health, symptoms, or lab results.\n\nSome prescriptions, vitamins, and herbal products can affect metabolism, hormones, energy levels, or overall wellness. Please share anything you take regularly so we can provide the most accurate and personalized insights.`}
      questionTitle="Please answer the following about your current medications and supplements."
      onBack={onBack}
      onNext={onNext}
      stepKey="step-6"
      direction={direction}
    >
      <div className="space-y-6">
        {QUESTIONS.map(({ key, label }) => (
          <div key={key} className="space-y-3">
            <p className="text-sm font-medium leading-snug text-foreground">{label}</p>
            <YesNoToggle
              value={(answers[key] as "yes" | "no" | "") ?? ""}
              onChange={(v) => onAnswer(key, v)}
            />
          </div>
        ))}
      </div>
    </AssessmentStep>
  );
}
