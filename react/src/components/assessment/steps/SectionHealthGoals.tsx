import { AssessmentStep } from "../AssessmentStep";
import { CheckboxGrid } from "../CheckboxGrid";
import { Textarea } from "@/components/ui/textarea";

const FOCUS_AREAS = [
  { id: "weight_management", label: "Weight management" },
  { id: "hormone_optimization", label: "Hormone optimization" },
  { id: "energy_vitality", label: "Energy & vitality" },
  { id: "longevity_aging", label: "Longevity & aging" },
  { id: "mental_clarity", label: "Mental clarity & focus" },
  { id: "sleep", label: "Sleep improvement" },
  { id: "fitness", label: "Fitness & performance" },
  { id: "stress", label: "Stress reduction" },
  { id: "skin_health", label: "Skin health & appearance" },
  { id: "sexual_health", label: "Sexual health" },
  { id: "gut_health", label: "Gut health & digestion" },
  { id: "other", label: "Other" },
];

const WELLNESS_GOALS = [
  { id: "lose_weight", label: "Lose weight" },
  { id: "build_muscle", label: "Build muscle / tone up" },
  { id: "more_energy", label: "Have more energy" },
  { id: "better_sleep", label: "Sleep better" },
  { id: "reduce_stress", label: "Reduce stress & anxiety" },
  { id: "balance_hormones", label: "Balance hormones" },
  { id: "improve_skin", label: "Improve skin quality" },
  { id: "boost_libido", label: "Boost libido" },
  { id: "slow_aging", label: "Slow biological aging" },
  { id: "improve_digestion", label: "Improve digestion" },
  { id: "prevent_disease", label: "Prevent chronic disease" },
  { id: "other", label: "Other" },
];

const CURRENT_SYMPTOMS = [
  { id: "fatigue", label: "Fatigue / low energy" },
  { id: "weight_gain", label: "Unexplained weight gain" },
  { id: "brain_fog", label: "Brain fog / poor concentration" },
  { id: "mood_swings", label: "Mood swings / irritability" },
  { id: "hot_flashes", label: "Hot flashes / night sweats" },
  { id: "low_libido", label: "Low libido" },
  { id: "joint_pain", label: "Joint pain or stiffness" },
  { id: "hair_loss", label: "Hair thinning or loss" },
  { id: "bloating", label: "Bloating or digestive issues" },
  { id: "insomnia", label: "Insomnia or poor sleep" },
  { id: "anxiety", label: "Anxiety" },
  { id: "none", label: "None of the above" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function SectionHealthGoals({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const focusAreas = (answers.focusAreas as string[]) ?? [];
  const wellnessGoals = (answers.wellnessGoals as string[]) ?? [];
  const currentSymptoms = (answers.currentSymptoms as string[]) ?? [];
  const motivation = (answers.motivationText as string) ?? "";

  const makeToggle = (key: string, arr: string[], exclusiveId?: string) => (id: string) => {
    if (exclusiveId && id === exclusiveId) {
      onAnswer(key, arr.includes(exclusiveId) ? [] : [exclusiveId]);
      return;
    }
    const filtered = exclusiveId ? arr.filter((x) => x !== exclusiveId) : arr;
    const next = filtered.includes(id) ? filtered.filter((x) => x !== id) : [...filtered, id];
    onAnswer(key, next);
  };

  return (
    <AssessmentStep
      sectionLabel="Health Goals"
      sectionTitle="What matters most to you?"
      sectionDescription={`Everyone's health journey is unique. Understanding what matters most to you helps us personalize your recommendations and focus on the areas that will make the biggest difference in your daily life.\n\nWhether you're looking to boost energy, manage weight, reduce stress, or simply feel healthier overall — tell us what's on your mind.`}
      questionTitle="What are your top health focus areas?"
      onBack={onBack}
      onNext={onNext}
      stepKey="section-health-goals"
      direction={direction}
    >
      {/* Q14: Focus areas */}
      <div className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
        <CheckboxGrid options={FOCUS_AREAS} selected={focusAreas} onToggle={makeToggle("focusAreas", focusAreas)} />
      </div>

      {/* Q15: Wellness goals */}
      <div className="space-y-3">
        <p className="text-base font-medium leading-snug text-foreground">What specific wellness goals are you working toward?</p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
        <CheckboxGrid options={WELLNESS_GOALS} selected={wellnessGoals} onToggle={makeToggle("wellnessGoals", wellnessGoals)} />
      </div>

      {/* Q16: Current symptoms */}
      <div className="space-y-3">
        <p className="text-base font-medium leading-snug text-foreground">Are you currently experiencing any of these symptoms?</p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
        <CheckboxGrid options={CURRENT_SYMPTOMS} selected={currentSymptoms} onToggle={makeToggle("currentSymptoms", currentSymptoms, "none")} />
      </div>

      {/* Q17: Motivation text */}
      <div className="space-y-2">
        <p className="text-base font-medium leading-snug text-foreground">
          What is your primary motivation for starting this health journey?
        </p>
        <Textarea
          value={motivation}
          onChange={(e) => onAnswer("motivationText", e.target.value)}
          placeholder="Tell us what's driving you..."
          className="min-h-[100px] resize-none bg-background/50"
        />
      </div>
    </AssessmentStep>
  );
}
