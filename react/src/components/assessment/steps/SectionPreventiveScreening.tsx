import { AssessmentStep } from "../AssessmentStep";
import { SingleSelect } from "../SingleSelect";

const SCREENING_OPTIONS = [
  { value: "within_1_year", label: "Within the last year" },
  { value: "1_3_years", label: "1–3 years ago" },
  { value: "3_5_years", label: "3–5 years ago" },
  { value: "over_5_years", label: "More than 5 years ago" },
  { value: "never", label: "Never had one" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function SectionPreventiveScreening({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const papSmear = (answers.lastPapSmear as string) ?? "";
  const mammogram = (answers.lastMammogram as string) ?? "";
  const colonScreening = (answers.lastColonScreening as string) ?? "";
  const dexaScan = (answers.lastDexaScan as string) ?? "";

  return (
    <AssessmentStep
      sectionLabel="Preventive Screening"
      sectionTitle="Your preventive screenings"
      sectionDescription={`Staying up to date on preventive screenings is one of the most important things you can do for your long-term health. These tests help catch potential issues early, when they're most treatable.\n\nPlease let us know when you last completed each of the following screenings. If you've never had one, that's okay — just let us know.`}
      questionTitle="When was your last Pap smear?"
      onBack={onBack}
      onNext={onNext}
      stepKey="section-preventive"
      direction={direction}
    >
      {/* Q25: Pap smear */}
      <SingleSelect options={SCREENING_OPTIONS} value={papSmear} onChange={(v) => onAnswer("lastPapSmear", v)} />

      {/* Q26: Mammogram */}
      <div className="space-y-2">
        <p className="text-base font-medium leading-snug text-foreground">When was your last mammogram?</p>
        <SingleSelect options={SCREENING_OPTIONS} value={mammogram} onChange={(v) => onAnswer("lastMammogram", v)} />
      </div>

      {/* Q27: Colon cancer screening */}
      <div className="space-y-2">
        <p className="text-base font-medium leading-snug text-foreground">When was your last colon cancer screening?</p>
        <SingleSelect options={SCREENING_OPTIONS} value={colonScreening} onChange={(v) => onAnswer("lastColonScreening", v)} />
      </div>

      {/* Q28: DEXA scan */}
      <div className="space-y-2">
        <p className="text-base font-medium leading-snug text-foreground">When was your last DEXA scan (bone density)?</p>
        <SingleSelect options={SCREENING_OPTIONS} value={dexaScan} onChange={(v) => onAnswer("lastDexaScan", v)} />
      </div>
    </AssessmentStep>
  );
}
