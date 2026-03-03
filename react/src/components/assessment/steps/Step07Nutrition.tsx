import { AssessmentStep } from "../AssessmentStep";
import { Checkbox } from "@/components/ui/checkbox";
import { YesNoToggle } from "../YesNoToggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const MEAL_FREQUENCY_OPTIONS = [
  { value: "mostly_home", label: "Mostly home-cooked (5+ times/week)" },
  { value: "balanced_mix", label: "Balanced mix (3–4 times/week)" },
  { value: "mostly_takeout", label: "Mostly takeout/restaurant (5+ times/week)" },
  { value: "rarely_cook", label: "Rarely cook at home" },
];

const DIET_TYPES = [
  { id: "no_special", label: "No special diet" },
  { id: "mediterranean", label: 'Balanced/"Mediterranean"-style' },
  { id: "low_carb", label: "Low-carb/Keto" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "other", label: "Other" },
];

const RESTRICTIONS = [
  { id: "gluten_free", label: "Gluten-free" },
  { id: "dairy_free", label: "Dairy-free" },
  { id: "low_salt", label: "Low salt" },
  { id: "low_fat", label: "Low fat" },
  { id: "other", label: "Other" },
  { id: "none", label: "None" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

function CheckboxGrid({
  options,
  selected,
  onToggle,
  exclusiveId,
}: {
  options: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
  exclusiveId?: string; // this id clears all others when selected
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
      {options.map((opt) => {
        const checked = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onToggle(opt.id)}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors w-full",
              checked
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-background/50 text-foreground/70 hover:border-primary/50 hover:bg-background"
            )}
          >
            <Checkbox
              checked={checked}
              onCheckedChange={() => onToggle(opt.id)}
              className="pointer-events-none shrink-0"
              aria-hidden
            />
            <span className="text-sm leading-snug">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Step07Nutrition({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const dietTypes = (answers.dietTypes as string[]) ?? [];
  const fruitsVeg = (answers.fruitsVeg as "yes" | "no" | "") ?? "";
  const restrictions = (answers.dietRestrictions as string[]) ?? [];
  const mealFrequency = (answers.mealFrequency as string) ?? "";

  const toggleDiet = (id: string) => {
    const next = dietTypes.includes(id)
      ? dietTypes.filter((d) => d !== id)
      : [...dietTypes, id];
    onAnswer("dietTypes", next);
  };

  const toggleRestriction = (id: string) => {
    if (id === "none") {
      onAnswer("dietRestrictions", restrictions.includes("none") ? [] : ["none"]);
      return;
    }
    const filtered = restrictions.filter((r) => r !== "none");
    const next = filtered.includes(id)
      ? filtered.filter((r) => r !== id)
      : [...filtered, id];
    onAnswer("dietRestrictions", next);
  };

  return (
    <AssessmentStep
      sectionLabel="Section 7 of 16"
      sectionTitle="Nutrition & Diet"
      sectionDescription={`Your eating habits play a major role in your energy levels, weight, digestion, and overall health. Understanding your typical diet, any restrictions, and how often you consume nutrient-rich foods helps us provide more accurate insights and recommendations tailored to your lifestyle.\n\nPlease share a bit about how you usually eat.`}
      questionTitle="How would you describe your typical diet?"
      onBack={onBack}
      onNext={onNext}
      stepKey="step-7"
      direction={direction}
    >
      {/* Q1: Diet type */}
      <div className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
          Check all that apply
        </p>
        <CheckboxGrid options={DIET_TYPES} selected={dietTypes} onToggle={toggleDiet} />
      </div>

      {/* Q2: Fruits & veg YES/NO */}
      <div className="space-y-3">
        <p className="text-sm font-medium leading-snug text-foreground">
          Do you eat at least 5 servings of fruits and vegetables on most days?
        </p>
        <YesNoToggle
          value={fruitsVeg}
          onChange={(v) => onAnswer("fruitsVeg", v)}
        />
      </div>

      {/* Q3: Dietary restrictions */}
      <div className="space-y-3">
        <p className="text-sm font-medium leading-snug text-foreground">
          Do you have any dietary restrictions or food intolerances?
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
          Check all that apply
        </p>
        <CheckboxGrid
          options={RESTRICTIONS}
          selected={restrictions}
          onToggle={toggleRestriction}
          exclusiveId="none"
        />
      </div>
      {/* Q4: Meal frequency dropdown */}
      <div className="space-y-2">
        <p className="text-sm font-medium leading-snug text-foreground">
          How often do you eat home-cooked meals vs. takeout or restaurant meals?
        </p>
        <Label className="text-[10px] font-semibold uppercase tracking-widest text-foreground block">
          Type of meal
        </Label>
        <Select value={mealFrequency} onValueChange={(v) => onAnswer("mealFrequency", v)}>
          <SelectTrigger className="w-full bg-background/50">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent
            className="w-[var(--radix-select-trigger-width)] bg-card border border-border shadow-lg z-50"
            position="popper"
            sideOffset={4}
          >
            {MEAL_FREQUENCY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="whitespace-normal py-2.5 leading-snug">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </AssessmentStep>
  );
}
