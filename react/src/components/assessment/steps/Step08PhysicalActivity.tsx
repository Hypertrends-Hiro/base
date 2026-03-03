import { AssessmentStep } from "../AssessmentStep";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { YesNoToggle } from "../YesNoToggle";
import { VoiceMicButton } from "../VoiceMicButton";
import { cn } from "@/lib/utils";

const EXERCISE_CHALLENGES = [
  { id: "time", label: "Lack of time" },
  { id: "how_to_start", label: "Not sure how to start" },
  { id: "physical_pain", label: "Physical limitations or pain" },
  { id: "motivation", label: "Lack of motivation" },
  { id: "no_facilities", label: "No access to facilities" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function Step08PhysicalActivity({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const exercisesRegularly = (answers.exercisesRegularly as "yes" | "no" | "") ?? "";
  const challenges = (answers.exerciseChallenges as string[]) ?? [];
  const challengeDetails = (answers.exerciseChallengeDetails as string) ?? "";

  const toggleChallenge = (id: string) => {
    const next = challenges.includes(id)
      ? challenges.filter((c) => c !== id)
      : [...challenges, id];
    onAnswer("exerciseChallenges", next);
  };

  return (
    <AssessmentStep
      sectionLabel="Section 8 of 16"
      sectionTitle="Physical Activity"
      sectionDescription={`Regular movement plays a key role in supporting your energy, mood, weight, and overall health. Understanding your activity level — and any challenges you may face — helps us tailor recommendations that fit your lifestyle and meet you where you are.\n\nPlease tell us about your typical exercise habits.`}
      questionTitle="Do you currently exercise regularly (at least ~3 times per week)?"
      onBack={onBack}
      onNext={onNext}
      stepKey="step-8"
      direction={direction}
    >
      {/* Q1: Exercises regularly YES/NO */}
      <YesNoToggle
        value={exercisesRegularly}
        onChange={(v) => onAnswer("exercisesRegularly", v)}
      />

      {/* Conditional: show challenges when NO */}
      {exercisesRegularly === "no" && (
        <div className="space-y-4 animate-fade-in">
          {/* Challenges checkboxes */}
          <div className="space-y-3">
            <p className="text-sm font-medium leading-snug text-foreground">
              What are the main reasons you find it challenging to exercise regularly?
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
              Check all that apply
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
              {EXERCISE_CHALLENGES.map((opt) => {
                const checked = challenges.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleChallenge(opt.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors w-full",
                      checked
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background/50 text-foreground/70 hover:border-primary/50 hover:bg-background"
                    )}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleChallenge(opt.id)}
                      className="pointer-events-none shrink-0"
                      aria-hidden
                    />
                    <span className="text-sm leading-snug">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Textarea with voice */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
                Please describe the reason that keeps you from exercising
              </Label>
              <VoiceMicButton
                onResult={(text) =>
                  onAnswer(
                    "exerciseChallengeDetails",
                    challengeDetails ? `${challengeDetails} ${text}` : text
                  )
                }
              />
            </div>
            <Textarea
              value={challengeDetails}
              onChange={(e) => onAnswer("exerciseChallengeDetails", e.target.value)}
              placeholder="Briefly describe any other reason"
              className="min-h-[100px] resize-none bg-background/50"
            />
          </div>
        </div>
      )}
    </AssessmentStep>
  );
}
