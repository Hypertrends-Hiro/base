import { AssessmentStep } from "../AssessmentStep";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VoiceMicButton } from "../VoiceMicButton";
import { cn } from "@/lib/utils";

const GOAL_OPTIONS = [
  { id: "energy", label: "Improve energy levels" },
  { id: "weight", label: "Manage weight/body composition" },
  { id: "fitness", label: "Enhance fitness/strength" },
  { id: "nutrition", label: "Better nutrition/eating habits" },
  { id: "sleep", label: "Improve sleep quality" },
  { id: "stress", label: "Reduce stress/improve mental well-being" },
  { id: "hormones", label: "Balance hormones/menopausal symptoms" },
  { id: "prevention", label: "Prevent health problems" },
  { id: "cognitive", label: "Improve cognitive function" },
  { id: "longevity", label: "Increase longevity/healthy lifespan" },
  { id: "other", label: "Other" },
];

const MOTIVATION_OPTIONS = [
  { value: "very", label: "Very motivated — I'm ready to make significant changes" },
  { value: "somewhat", label: "Somewhat motivated — I'm open to making some changes" },
  { value: "not_very", label: "Not very motivated — I'm just exploring options" },
  { value: "unsure", label: "Unsure — I need more information" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function Step02HealthGoals({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const selected = (answers.healthGoals as string[]) ?? [];
  const details = (answers.healthGoalsDetails as string) ?? "";
  const motivation = (answers.motivation as string) ?? "";

  const toggle = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((g) => g !== id)
      : [...selected, id];
    onAnswer("healthGoals", next);
  };

  return (
    <AssessmentStep
      sectionLabel="Section 2 of 16"
      sectionTitle="What's your main health goal?"
      sectionDescription={`Everyone's health journey is unique. Understanding what matters most to you helps us personalize your recommendations and focus on the areas that will make the biggest difference in your daily life.\n\nWhether you're looking to boost energy, manage weight, reduce stress, or simply feel healthier overall, choose the goals that best reflect what you want to work on. You can select as many as you like.`}
      questionTitle="What are your top health goals or areas you want to focus on improving?"
      onBack={onBack}
      onNext={onNext}
      stepKey="step-2"
      direction={direction}
    >
      {/* Checkbox grid */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground mb-3">
          Check all that apply
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
          {GOAL_OPTIONS.map((opt) => {
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

      {/* Details textarea with shared VoiceMicButton */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
            Please provide more details
          </Label>
          <VoiceMicButton
            onResult={(text) =>
              onAnswer("healthGoalsDetails", details ? `${details} ${text}` : text)
            }
          />
        </div>
        <Textarea
          value={details}
          onChange={(e) => onAnswer("healthGoalsDetails", e.target.value)}
          placeholder="Briefly describe any other health goal"
          className="min-h-[100px] resize-none bg-background/50"
        />
      </div>

      {/* Motivation dropdown */}
      <div className="space-y-2">
        <h3 className="font-heading text-base font-medium leading-snug text-foreground lg:text-lg">
          How motivated are you to make changes to improve your healthspan (long-term health)?
        </h3>
        <Label className="text-[10px] font-semibold uppercase tracking-widest text-foreground block">
          Please select
        </Label>
        <Select value={motivation} onValueChange={(v) => onAnswer("motivation", v)}>
          <SelectTrigger className="w-full bg-background/50">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent
            className="w-[var(--radix-select-trigger-width)] bg-card border border-border shadow-lg z-50"
            position="popper"
            sideOffset={4}
          >
            {MOTIVATION_OPTIONS.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="whitespace-normal py-3 leading-snug"
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </AssessmentStep>
  );
}
