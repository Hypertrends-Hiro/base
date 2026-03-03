import { AssessmentStep } from "../AssessmentStep";
import { SingleSelect } from "../SingleSelect";

const REPRODUCTIVE_STATUS = [
  { value: "premenopausal", label: "Pre-menopausal (regular cycles)" },
  { value: "perimenopausal", label: "Peri-menopausal (irregular cycles)" },
  { value: "postmenopausal", label: "Post-menopausal" },
  { value: "not_sure", label: "Not sure" },
  { value: "other", label: "Other / Prefer not to say" },
];

const LAST_CYCLE = [
  { value: "within_month", label: "Within the last month" },
  { value: "1_3_months", label: "1–3 months ago" },
  { value: "3_6_months", label: "3–6 months ago" },
  { value: "6_12_months", label: "6–12 months ago" },
  { value: "over_12_months", label: "More than 12 months ago" },
  { value: "na", label: "N/A" },
];

const CYCLE_DESCRIPTION = [
  { value: "regular", label: "Regular (every 21–35 days)" },
  { value: "irregular", label: "Irregular (varies significantly)" },
  { value: "heavy", label: "Heavy or prolonged periods" },
  { value: "light", label: "Very light or short periods" },
  { value: "painful", label: "Painful periods (cramping, discomfort)" },
  { value: "absent", label: "Absent (no period for 3+ months)" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function SectionHormonalHealth({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const reproductiveStatus = (answers.reproductiveStatus as string) ?? "";
  const lastCycle = (answers.lastCycle as string) ?? "";
  const cycleDescription = (answers.cycleDescription as string) ?? "";

  const showCycleQuestions = ["premenopausal", "perimenopausal", "not_sure", "other"].includes(reproductiveStatus);

  return (
    <AssessmentStep
      sectionLabel="Hormonal Health"
      sectionTitle="Your hormonal health"
      sectionDescription={`Hormones regulate nearly every system in your body — from energy and mood to metabolism and sleep. Understanding your reproductive and hormonal status helps us provide more accurate insights and personalize treatment options.\n\nPlease answer as honestly as you can. All information is confidential.`}
      questionTitle="What best describes your current reproductive / menopause status?"
      onBack={onBack}
      onNext={onNext}
      stepKey="section-hormonal"
      direction={direction}
    >
      {/* Q19: Reproductive status */}
      <SingleSelect
        options={REPRODUCTIVE_STATUS}
        value={reproductiveStatus}
        onChange={(v) => onAnswer("reproductiveStatus", v)}
      />

      {/* Q20: Last menstrual cycle */}
      <div className="space-y-2">
        <p className="text-base font-medium leading-snug text-foreground">
          When was your last menstrual cycle?
        </p>
        <SingleSelect options={LAST_CYCLE} value={lastCycle} onChange={(v) => onAnswer("lastCycle", v)} />
      </div>

      {/* Q21: Cycle description (conditional) */}
      {showCycleQuestions && (
        <div className="space-y-2 animate-fade-in">
          <p className="text-base font-medium leading-snug text-foreground">
            How would you describe your menstrual cycle?
          </p>
          <SingleSelect options={CYCLE_DESCRIPTION} value={cycleDescription} onChange={(v) => onAnswer("cycleDescription", v)} />
        </div>
      )}
    </AssessmentStep>
  );
}
