import { AssessmentStep } from "../AssessmentStep";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VoiceMicButton } from "../VoiceMicButton";
import { cn } from "@/lib/utils";

const FAMILY_CONDITIONS = [
  { id: "heart_disease", label: "Heart disease before age 60" },
  { id: "stroke", label: "Stroke" },
  { id: "type2_diabetes", label: "Type 2 diabetes" },
  { id: "dementia", label: "Dementia/Alzheimer's" },
  { id: "cancer", label: "Cancer" },
  { id: "osteoporosis", label: "Osteoporosis" },
  { id: "other", label: "Other" },
  { id: "no_history", label: "No significant history" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function Step03MedicalHistory({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const selected = (answers.familyConditions as string[]) ?? [];
  const details = (answers.familyHistoryDetails as string) ?? "";

  const toggle = (id: string) => {
    // "No significant history" is mutually exclusive with everything else
    if (id === "no_history") {
      onAnswer("familyConditions", selected.includes("no_history") ? [] : ["no_history"]);
      return;
    }
    const filtered = selected.filter((s) => s !== "no_history");
    const next = filtered.includes(id)
      ? filtered.filter((s) => s !== id)
      : [...filtered, id];
    onAnswer("familyConditions", next);
  };

  return (
    <AssessmentStep
      sectionLabel="Section 3 of 16"
      sectionTitle="What's your medical history?"
      sectionDescription={`Understanding your family's health history helps us identify potential risks and give you more personalized insights. Conditions that run in families can influence your long-term health, so sharing this information allows us to better interpret your results and highlight areas to pay attention to.\n\nPlease let us know if any close relatives have experienced major health issues.`}
      questionTitle="Do any of your close relatives (parents or siblings) have a history of major health issues?"
      onBack={onBack}
      onNext={onNext}
      stepKey="step-3"
      direction={direction}
    >
      {/* Checkbox grid */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground mb-3">
          Check all that apply
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
          {FAMILY_CONDITIONS.map((opt) => {
            const checked = selected.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggle(opt.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors w-full",
                  checked
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-background/50 text-foreground/70 hover:border-primary/50 hover:bg-background"
                )}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggle(opt.id)}
                  className="pointer-events-none shrink-0"
                  aria-hidden
                />
                <span className="text-sm leading-snug">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Details textarea with voice input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
            Please provide more details on relevant family health history
          </Label>
          <VoiceMicButton
            onResult={(text) =>
              onAnswer("familyHistoryDetails", details ? `${details} ${text}` : text)
            }
          />
        </div>
        <Textarea
          value={details}
          onChange={(e) => onAnswer("familyHistoryDetails", e.target.value)}
          placeholder="Relative, cancer type, year diagnosed"
          className="min-h-[110px] resize-none bg-background/50"
        />
      </div>
    </AssessmentStep>
  );
}
