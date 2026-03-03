import { AssessmentStep } from "../AssessmentStep";

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  stepNumber: number;
  sectionLabel: string;
  sectionTitle: string;
  sectionDescription: string;
  questionTitle: string;
  direction?: "forward" | "back";
}

export function PlaceholderStep({
  answers: _answers,
  onAnswer: _onAnswer,
  onNext,
  onBack,
  stepNumber,
  sectionLabel,
  sectionTitle,
  sectionDescription,
  questionTitle,
  direction,
}: Props) {
  return (
    <AssessmentStep
      sectionLabel={sectionLabel}
      sectionTitle={sectionTitle}
      sectionDescription={sectionDescription}
      questionTitle={questionTitle}
      onBack={onBack}
      onNext={onNext}
      stepKey={`step-${stepNumber}`}
      direction={direction}
    >
      <div className="rounded-lg border border-dashed border-border bg-background/50 px-4 py-8 text-center">
        <p className="text-sm text-foreground">
          Questions for this section coming soon.
        </p>
      </div>
    </AssessmentStep>
  );
}
