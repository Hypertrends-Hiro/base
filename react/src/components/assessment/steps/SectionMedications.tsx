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

export function SectionMedications({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const hasPrescription = (answers.hasPrescriptionMeds as "yes" | "no" | "") ?? "";
  const prescriptionTags = (answers.prescriptionMedTags as string[]) ?? [];
  const hasOtc = (answers.hasOtcSupplements as "yes" | "no" | "") ?? "";
  const otcTags = (answers.otcSupplementTags as string[]) ?? [];

  return (
    <AssessmentStep
      sectionLabel="Medications & Supplements"
      sectionTitle="Current medications & supplements"
      sectionDescription={`Knowing which medications and supplements you currently take helps us understand factors that may influence your health, symptoms, or lab results.\n\nSome prescriptions, vitamins, and herbal products can affect metabolism, hormones, energy levels, or overall wellness. Please share anything you take regularly.`}
      questionTitle="Are you currently taking any prescription medications?"
      onBack={onBack}
      onNext={onNext}
      stepKey="section-medications"
      direction={direction}
    >
      {/* Q29: Prescription meds */}
      <YesNoToggle value={hasPrescription} onChange={(v) => onAnswer("hasPrescriptionMeds", v)} />
      {hasPrescription === "yes" && (
        <div className="animate-fade-in space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
            Please list your medications (press Enter after each)
          </p>
          <TagInput tags={prescriptionTags} onChange={(t) => onAnswer("prescriptionMedTags", t)} placeholder="e.g. Metformin, Levothyroxine" />
        </div>
      )}

      {/* Q30: OTC supplements */}
      <div className="space-y-3">
        <p className="text-base font-medium leading-snug text-foreground">
          Are you regularly taking any over-the-counter vitamins, supplements, or herbal products?
        </p>
        <YesNoToggle value={hasOtc} onChange={(v) => onAnswer("hasOtcSupplements", v)} />
        {hasOtc === "yes" && (
          <div className="animate-fade-in space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
              Please list your supplements (press Enter after each)
            </p>
            <TagInput tags={otcTags} onChange={(t) => onAnswer("otcSupplementTags", t)} placeholder="e.g. Vitamin D, Fish Oil, Magnesium" />
          </div>
        )}
      </div>
    </AssessmentStep>
  );
}
