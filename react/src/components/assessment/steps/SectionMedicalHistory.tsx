import { AssessmentStep } from "../AssessmentStep";
import { YesNoToggle } from "../YesNoToggle";
import { TagInput } from "../TagInput";
import { CheckboxGrid } from "../CheckboxGrid";
import { Input } from "@/components/ui/input";

const ALLERGY_OPTIONS = [
  { id: "medications", label: "Medications" },
  { id: "food", label: "Food allergies" },
  { id: "environmental", label: "Environmental (pollen, dust, etc.)" },
  { id: "latex", label: "Latex" },
  { id: "none", label: "No known allergies" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function SectionMedicalHistory({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const hasDiagnosed = (answers.hasDiagnosedConditions as "yes" | "no" | "") ?? "";
  const diagnosedTags = (answers.diagnosedConditionTags as string[]) ?? [];
  const allergies = (answers.allergyTypes as string[]) ?? [];
  const allergyDetails = (answers.allergyDetails as string) ?? "";
  const hasSurgeries = (answers.hasSurgeries as "yes" | "no" | "") ?? "";
  const surgeryTags = (answers.surgeryTags as string[]) ?? [];

  const toggleAllergy = (id: string) => {
    if (id === "none") {
      onAnswer("allergyTypes", allergies.includes("none") ? [] : ["none"]);
      return;
    }
    const filtered = allergies.filter((a) => a !== "none");
    const next = filtered.includes(id) ? filtered.filter((a) => a !== id) : [...filtered, id];
    onAnswer("allergyTypes", next);
  };

  return (
    <AssessmentStep
      sectionLabel="Medical History"
      sectionTitle="Your medical history"
      sectionDescription={`Understanding your medical history — including any diagnosed conditions, allergies, and past surgeries — helps us provide safer, more accurate recommendations.\n\nPlease share what's relevant. If you're unsure about anything, just provide your best recollection.`}
      questionTitle="Have you been diagnosed with any medical conditions?"
      onBack={onBack}
      onNext={onNext}
      stepKey="section-medical-history"
      direction={direction}
    >
      {/* Q22: Diagnosed conditions */}
      <YesNoToggle value={hasDiagnosed} onChange={(v) => onAnswer("hasDiagnosedConditions", v)} />
      {hasDiagnosed === "yes" && (
        <div className="animate-fade-in space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
            Please list your conditions (press Enter after each)
          </p>
          <TagInput tags={diagnosedTags} onChange={(t) => onAnswer("diagnosedConditionTags", t)} placeholder="e.g. Diabetes, Hypertension" />
        </div>
      )}

      {/* Q23: Allergies / intolerances */}
      <div className="space-y-3">
        <p className="text-base font-medium leading-snug text-foreground">
          Do you have any known allergies or intolerances?
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
        <CheckboxGrid options={ALLERGY_OPTIONS} selected={allergies} onToggle={toggleAllergy} />
        {allergies.length > 0 && !allergies.includes("none") && (
          <div className="animate-fade-in space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
              Please specify
            </p>
            <Input
              value={allergyDetails}
              onChange={(e) => onAnswer("allergyDetails", e.target.value)}
              placeholder="List specific allergies"
              className="bg-background/50"
            />
          </div>
        )}
      </div>

      {/* Q24: Surgeries */}
      <div className="space-y-3">
        <p className="text-base font-medium leading-snug text-foreground">
          Have you had any major surgeries?
        </p>
        <YesNoToggle value={hasSurgeries} onChange={(v) => onAnswer("hasSurgeries", v)} />
        {hasSurgeries === "yes" && (
          <div className="animate-fade-in space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
              Please list your surgeries (press Enter after each)
            </p>
            <TagInput tags={surgeryTags} onChange={(t) => onAnswer("surgeryTags", t)} placeholder="e.g. Appendectomy, Knee replacement" />
          </div>
        )}
      </div>
    </AssessmentStep>
  );
}
