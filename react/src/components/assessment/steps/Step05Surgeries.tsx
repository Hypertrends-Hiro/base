import { AssessmentStep } from "../AssessmentStep";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { YesNoToggle } from "../YesNoToggle";

interface SurgeryEntry {
  description: string;
  year: string;
}

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 60 }, (_, i) => String(CURRENT_YEAR - i));

export function Step05Surgeries({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const hasSurgeries = (answers.hasSurgeries as "yes" | "no" | "") ?? "";
  const entries = (answers.surgeries as SurgeryEntry[]) ?? [{ description: "", year: "" }];

  const updateEntry = (index: number, field: keyof SurgeryEntry, value: string) => {
    const next = entries.map((e, i) => (i === index ? { ...e, [field]: value } : e));
    onAnswer("surgeries", next);
  };

  const addEntry = () => {
    onAnswer("surgeries", [...entries, { description: "", year: "" }]);
  };

  const removeEntry = (index: number) => {
    const next = entries.filter((_, i) => i !== index);
    onAnswer("surgeries", next.length ? next : [{ description: "", year: "" }]);
  };

  return (
    <AssessmentStep
      sectionLabel="Section 5 of 16"
      sectionTitle="What's your medical history?"
      sectionDescription={`Information about past surgeries or hospitalizations helps us understand important events in your health history. These experiences can impact your current wellness, recovery patterns, and how your body responds to certain treatments or recommendations.\n\nPlease let us know if you've had any major procedures or hospital stays.`}
      questionTitle="Have you had any major surgeries or hospitalizations?"
      onBack={onBack}
      onNext={onNext}
      stepKey="step-5"
      direction={direction}
    >
      <YesNoToggle
        value={hasSurgeries}
        onChange={(v) => onAnswer("hasSurgeries", v)}
      />

      {hasSurgeries === "yes" && (
        <div className="space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
            List your surgeries or hospitalizations history
          </p>

          {entries.map((entry, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Input
                value={entry.description}
                onChange={(e) => updateEntry(i, "description", e.target.value)}
                placeholder="Provide description"
                className="flex-1 bg-background/50"
              />

              <Select
                value={entry.year}
                onValueChange={(v) => updateEntry(i, "year", v)}
              >
                <SelectTrigger className="w-[4.5rem] shrink-0 bg-background/50 px-2 text-xs">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent
                  className="bg-card border border-border shadow-lg z-50 max-h-60 overflow-y-auto"
                  position="popper"
                  sideOffset={4}
                >
                  {YEARS.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {entries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry(i)}
                  className="text-foreground/50 hover:text-destructive transition-colors shrink-0"
                  title="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addEntry}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors mt-1"
          >
            <Plus className="h-3.5 w-3.5" />
            Add another
          </button>
        </div>
      )}
    </AssessmentStep>
  );
}
