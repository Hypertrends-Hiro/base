import { AssessmentStep } from "../AssessmentStep";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VoiceMicButton } from "../VoiceMicButton";
import { cn } from "@/lib/utils";

const ALLERGY_OPTIONS = [
  { id: "medication", label: "Medication allergies" },
  { id: "food_allergy", label: "Food allergies" },
  { id: "food_intolerance", label: "Food intolerances (e.g., lactose, gluten)" },
  { id: "none", label: "None" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function Step04Allergies({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const selected = (answers.allergies as string[]) ?? [];
  const details = (answers.allergyDetails as string) ?? "";

  const toggle = (id: string) => {
    if (id === "none") {
      onAnswer("allergies", selected.includes("none") ? [] : ["none"]);
      return;
    }
    const filtered = selected.filter((s) => s !== "none");
    const next = filtered.includes(id)
      ? filtered.filter((s) => s !== id)
      : [...filtered, id];
    onAnswer("allergies", next);
  };

  return (
    <AssessmentStep
      sectionLabel="Section 4 of 16"
      sectionTitle="What's your medical history?"
      sectionDescription={`Allergies and intolerances can affect how your body responds to medications, supplements, and even certain foods. By understanding any reactions you've experienced, we can help ensure that your recommendations are safe, suitable, and tailored to your needs.\n\nPlease let us know if you have any known allergies or sensitivities.`}
      questionTitle="Do you have any allergies or intolerances to medications, supplements, or foods?"
      onBack={onBack}
      onNext={onNext}
      stepKey="step-4"
      direction={direction}
    >
      {/* Checkbox grid */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground mb-3">
          Check all that apply
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
          {ALLERGY_OPTIONS.map((opt) => {
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

      {/* Details textarea with voice */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
            Please list your specific allergies/intolerances and reactions
          </Label>
          <VoiceMicButton
            onResult={(text) =>
              onAnswer("allergyDetails", details ? `${details} ${text}` : text)
            }
          />
        </div>
        <Textarea
          value={details}
          onChange={(e) => onAnswer("allergyDetails", e.target.value)}
          placeholder="List drug and reaction"
          className="min-h-[110px] resize-none bg-background/50"
        />
      </div>
    </AssessmentStep>
  );
}
