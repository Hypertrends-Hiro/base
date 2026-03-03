import { AssessmentStep } from "../AssessmentStep";
import { CheckboxGrid } from "../CheckboxGrid";
import { SingleSelect } from "../SingleSelect";
import { YesNoToggle } from "../YesNoToggle";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const DIET_TYPES = [
  { id: "no_special", label: "No special diet" },
  { id: "mediterranean", label: "Mediterranean" },
  { id: "keto", label: "Low-carb / Keto" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "paleo", label: "Paleo" },
  { id: "gluten_free", label: "Gluten-free" },
  { id: "dairy_free", label: "Dairy-free" },
  { id: "other", label: "Other" },
];

const FRUIT_VEG_FREQ = [
  { value: "rarely", label: "Rarely (0–1 servings/day)" },
  { value: "sometimes", label: "Sometimes (2–3 servings/day)" },
  { value: "often", label: "Often (4–5 servings/day)" },
  { value: "daily", label: "Daily (5+ servings/day)" },
];

const BEVERAGE_OPTIONS = [
  { id: "water", label: "Water" },
  { id: "coffee", label: "Coffee" },
  { id: "tea", label: "Tea" },
  { id: "juice", label: "Juice" },
  { id: "soda", label: "Soda / soft drinks" },
  { id: "energy_drinks", label: "Energy drinks" },
  { id: "smoothies", label: "Smoothies" },
  { id: "other", label: "Other" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function SectionNutrition({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const dietTypes = (answers.nutritionDietTypes as string[]) ?? [];
  const hasOtherDiet = (answers.hasOtherDietPref as "yes" | "no" | "") ?? "";
  const otherDietText = (answers.otherDietText as string) ?? "";
  const fruitVegFreq = (answers.fruitVegFrequency as string) ?? "";
  const beverages = (answers.beverageTypes as string[]) ?? [];
  const nutritionNotes = (answers.nutritionNotes as string) ?? "";

  const toggleDiet = (id: string) => {
    const next = dietTypes.includes(id) ? dietTypes.filter((d) => d !== id) : [...dietTypes, id];
    onAnswer("nutritionDietTypes", next);
  };

  const toggleBeverage = (id: string) => {
    const next = beverages.includes(id) ? beverages.filter((b) => b !== id) : [...beverages, id];
    onAnswer("beverageTypes", next);
  };

  return (
    <AssessmentStep
      sectionLabel="Nutrition"
      sectionTitle="Nutrition & Diet"
      sectionDescription={`Your eating habits play a major role in your energy levels, weight, digestion, and overall health. Understanding your typical diet, any restrictions, and how often you consume nutrient-rich foods helps us provide more accurate insights.\n\nPlease share a bit about how you usually eat.`}
      questionTitle="How would you describe your typical diet?"
      onBack={onBack}
      onNext={onNext}
      stepKey="section-nutrition"
      direction={direction}
    >
      {/* Q32: Diet type */}
      <div className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
        <CheckboxGrid options={DIET_TYPES} selected={dietTypes} onToggle={toggleDiet} />
      </div>

      {/* Q33: Other dietary preferences */}
      <div className="space-y-3">
        <p className="text-base font-medium leading-snug text-foreground">
          Do you have any other dietary preferences or restrictions?
        </p>
        <YesNoToggle value={hasOtherDiet} onChange={(v) => onAnswer("hasOtherDietPref", v)} />
        {hasOtherDiet === "yes" && (
          <div className="animate-fade-in">
            <Input
              value={otherDietText}
              onChange={(e) => onAnswer("otherDietText", e.target.value)}
              placeholder="Please describe..."
              className="bg-background/50"
            />
          </div>
        )}
      </div>

      {/* Q34: Fruits & veg frequency */}
      <div className="space-y-2">
        <p className="text-base font-medium leading-snug text-foreground">
          How often do you eat fruits and vegetables?
        </p>
        <SingleSelect options={FRUIT_VEG_FREQ} value={fruitVegFreq} onChange={(v) => onAnswer("fruitVegFrequency", v)} />
      </div>

      {/* Q35: Non-alcoholic beverages */}
      <div className="space-y-3">
        <p className="text-base font-medium leading-snug text-foreground">
          What non-alcoholic beverages do you regularly drink?
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
        <CheckboxGrid options={BEVERAGE_OPTIONS} selected={beverages} onToggle={toggleBeverage} />
      </div>

      {/* Q36: Anything else */}
      <div className="space-y-2">
        <p className="text-base font-medium leading-snug text-foreground">
          Anything else you'd like us to know about your nutrition?{" "}
          <span className="text-foreground/60 font-normal">(optional)</span>
        </p>
        <Textarea
          value={nutritionNotes}
          onChange={(e) => onAnswer("nutritionNotes", e.target.value)}
          placeholder="Anything else about your eating habits..."
          className="min-h-[80px] resize-none bg-background/50"
        />
      </div>
    </AssessmentStep>
  );
}
