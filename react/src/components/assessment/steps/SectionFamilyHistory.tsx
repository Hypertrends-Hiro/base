import { AssessmentStep } from "../AssessmentStep";
import { YesNoToggle } from "../YesNoToggle";
import { TagInput } from "../TagInput";

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function SectionFamilyHistory({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const hasFamilyConditions = (answers.hasFamilyConditions as "yes" | "no" | "") ?? "";
  const familyTags = (answers.familyConditionTags as string[]) ?? [];

  return (
    <AssessmentStep
      sectionLabel="Family History"
      sectionTitle="Family health history"
      sectionDescription={`Family health history provides important clues about your genetic predispositions and risk factors. Understanding conditions that run in your family helps us proactively identify areas to monitor and manage.\n\nPlease share any significant health conditions in your immediate family (parents, siblings, grandparents).`}
      questionTitle="Do any close relatives have significant health conditions?"
      onBack={onBack}
      onNext={onNext}
      stepKey="section-family-history"
      direction={direction}
    >
      <YesNoToggle value={hasFamilyConditions} onChange={(v) => onAnswer("hasFamilyConditions", v)} />
      {hasFamilyConditions === "yes" && (
        <div className="animate-fade-in space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
            Please list conditions and the relation (press Enter after each)
          </p>
          <TagInput
            tags={familyTags}
            onChange={(t) => onAnswer("familyConditionTags", t)}
            placeholder="e.g. Heart disease – Father, Diabetes – Mother"
          />
        </div>
      )}
    </AssessmentStep>
  );
}
