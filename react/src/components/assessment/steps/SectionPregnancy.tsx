import { AssessmentStep } from "../AssessmentStep";
import { SingleSelect } from "../SingleSelect";

const PREGNANCY_OPTIONS = [
  { value: "not_pregnant", label: "No" },
  { value: "pregnant", label: "Yes, I am currently pregnant" },
  { value: "breastfeeding", label: "Yes, I am currently breastfeeding" },
  { value: "trying", label: "I am trying to conceive" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function SectionPregnancy({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const pregnancyStatus = (answers.pregnancyStatus as string) ?? "";

  return (
    <AssessmentStep
      sectionLabel="Pregnancy"
      sectionTitle="Pregnancy & breastfeeding status"
      sectionDescription={`Certain treatments and medications may not be appropriate during pregnancy or while breastfeeding. This question helps us ensure your safety and tailor our recommendations accordingly.\n\nIf you are pregnant, breastfeeding, or trying to conceive, some prescription treatments may be restricted.`}
      questionTitle="Are you currently pregnant or breastfeeding?"
      onBack={onBack}
      onNext={onNext}
      stepKey="section-pregnancy"
      direction={direction}
    >
      <SingleSelect
        options={PREGNANCY_OPTIONS}
        value={pregnancyStatus}
        onChange={(v) => onAnswer("pregnancyStatus", v)}
      />

      {(pregnancyStatus === "pregnant" || pregnancyStatus === "breastfeeding") && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 animate-fade-in">
          <p className="text-sm text-foreground leading-relaxed">
            <strong>Please note:</strong> Some prescription treatments may not be available during pregnancy or while breastfeeding.
            Our medical team will review your assessment and ensure all recommendations are safe for you.
          </p>
        </div>
      )}
    </AssessmentStep>
  );
}
