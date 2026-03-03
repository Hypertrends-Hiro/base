import { AssessmentStep } from "../AssessmentStep";
import { YesNoToggle } from "../YesNoToggle";
import { SingleSelect } from "../SingleSelect";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SMOKING_FREQUENCY = [
  { value: "daily", label: "Daily" },
  { value: "several_week", label: "Several times a week" },
  { value: "occasionally", label: "Occasionally (a few times a month)" },
  { value: "rarely", label: "Rarely (social / special occasions)" },
];

const ALCOHOL_FREQUENCY = [
  { value: "daily", label: "Daily" },
  { value: "several_week", label: "Several times a week" },
  { value: "weekly", label: "About once a week" },
  { value: "occasionally", label: "Occasionally (a few times a month)" },
  { value: "rarely", label: "Rarely (social / special occasions)" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function SectionSubstanceUse({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const smokes = (answers.smokesNicotine as "yes" | "no" | "") ?? "";
  const smokeType = (answers.smokeType as string) ?? "";
  const smokeFreq = (answers.smokeFrequency as string) ?? "";
  const drinks = (answers.drinksAlcohol as "yes" | "no" | "") ?? "";
  const drinkType = (answers.drinkType as string) ?? "";
  const drinkFreq = (answers.drinkFrequency as string) ?? "";
  const substanceNotes = (answers.substanceNotes as string) ?? "";

  return (
    <AssessmentStep
      sectionLabel="Substance Use"
      sectionTitle="Substance use"
      sectionDescription={`Lifestyle habits such as smoking and alcohol use can have a meaningful impact on your overall health, energy levels, and long-term wellness. Understanding your current habits helps us interpret your results more accurately and provide the best recommendations.\n\nPlease answer honestly — this information is confidential.`}
      questionTitle="Do you currently smoke or use nicotine products?"
      onBack={onBack}
      onNext={onNext}
      stepKey="section-substance"
      direction={direction}
    >
      {/* Q45: Smoke/nicotine */}
      <YesNoToggle value={smokes} onChange={(v) => onAnswer("smokesNicotine", v)} />
      {smokes === "yes" && (
        <div className="animate-fade-in space-y-4">
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">What do you use?</p>
            <Input
              value={smokeType}
              onChange={(e) => onAnswer("smokeType", e.target.value)}
              placeholder="e.g. Cigarettes, Vape, Chewing tobacco"
              className="bg-background/50"
            />
          </div>
          {/* Q46: Smoking frequency */}
          <div className="space-y-2">
            <p className="text-base font-medium leading-snug text-foreground">How often?</p>
            <SingleSelect options={SMOKING_FREQUENCY} value={smokeFreq} onChange={(v) => onAnswer("smokeFrequency", v)} />
          </div>
        </div>
      )}

      {/* Q47: Alcohol */}
      <div className="space-y-3">
        <p className="text-base font-medium leading-snug text-foreground">Do you drink alcohol?</p>
        <YesNoToggle value={drinks} onChange={(v) => onAnswer("drinksAlcohol", v)} />
        {drinks === "yes" && (
          <div className="animate-fade-in space-y-4">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">What do you typically drink?</p>
              <Input
                value={drinkType}
                onChange={(e) => onAnswer("drinkType", e.target.value)}
                placeholder="e.g. Wine, Beer, Cocktails"
                className="bg-background/50"
              />
            </div>
            {/* Q48: Alcohol frequency */}
            <div className="space-y-2">
              <p className="text-base font-medium leading-snug text-foreground">How often?</p>
              <SingleSelect options={ALCOHOL_FREQUENCY} value={drinkFreq} onChange={(v) => onAnswer("drinkFrequency", v)} />
            </div>
          </div>
        )}
      </div>

      {/* Q49: Notes */}
      <div className="space-y-2">
        <p className="text-base font-medium leading-snug text-foreground">
          Anything else about substance use?{" "}
          <span className="text-foreground/60 font-normal">(optional)</span>
        </p>
        <Textarea
          value={substanceNotes}
          onChange={(e) => onAnswer("substanceNotes", e.target.value)}
          placeholder="Any other details..."
          className="min-h-[80px] resize-none bg-background/50"
        />
      </div>
    </AssessmentStep>
  );
}
