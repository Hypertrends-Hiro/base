import { AssessmentStep } from "../AssessmentStep";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const COACHING_STYLES = [
  { id: "gentle", label: "Gentle encouragement" },
  { id: "cheerful", label: "Cheerful and positive" },
  { id: "direct", label: "Direct & no-nonsense" },
  { id: "data_driven", label: "Data-driven with detailed explanations" },
  { id: "holistic", label: "Holistic and supportive" },
];

const ENGAGEMENT_CHANNELS = [
  { id: "in_app", label: "In-app messages" },
  { id: "push", label: "Push notifications to phone" },
  { id: "email", label: "Email summaries" },
  { id: "phone_video", label: "Occasional phone or video check-ins" },
  { id: "minimal", label: "Minimal notifications – I'll check the app on my own" },
];

const CHECKIN_FREQUENCY = [
  { id: "daily", label: "Daily" },
  { id: "few_week", label: "A few times a week" },
  { id: "weekly", label: "Weekly" },
  { id: "biweekly", label: "Bi-weekly" },
  { id: "monthly", label: "Monthly" },
];

const DATA_VISIBILITY = [
  { id: "only_me", label: "Only me" },
  { id: "provider", label: "Me and my healthcare provider" },
  { id: "family", label: "Me and selected family/friends" },
];

const HEALTH_PLAN_PREFS = [
  { id: "lifestyle", label: "Prefer lifestyle changes over medications" },
  { id: "open_rx", label: "Open to taking prescription medications if beneficial" },
  { id: "supplements", label: "Interested in supplements/vitamins as part of plan" },
  { id: "open_hormones", label: "Open to hormone therapy if needed" },
  { id: "avoid_hormones", label: "Prefer to avoid hormone therapy" },
  { id: "advanced", label: "Interested in advanced therapies like cold/heat therapy" },
  { id: "none", label: "None of the above" },
];

function MultiSelectGrid({
  options,
  selected,
  onToggle,
  mutuallyExclusiveId,
  cols = 2,
}: {
  options: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
  mutuallyExclusiveId?: string;
  cols?: number;
}) {
  return (
    <div className={cn("grid gap-x-4 gap-y-2.5", cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1")}>
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

function SingleSelectRow({
  options,
  selected,
  onSelect,
}: {
  options: { id: string; label: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const active = selected === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            className={cn(
              "flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-background/50 text-foreground/70 hover:border-primary/50 hover:bg-background"
            )}
          >
            <span
              className={cn(
                "h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0",
                active ? "border-primary" : "border-foreground/30"
              )}
            >
              {active && <span className="h-2 w-2 rounded-full bg-primary" />}
            </span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function Step15CoachingPrefs({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const coachingStyles = (answers.coachingStyles as string[]) ?? [];
  const engagementChannels = (answers.engagementChannels as string[]) ?? [];
  const checkinFrequency = (answers.checkinFrequency as string) ?? "";
  const dataVisibility = (answers.dataVisibility as string) ?? "";
  const healthPlanPrefs = (answers.healthPlanPrefs as string[]) ?? [];
  const additionalNotes = (answers.additionalNotes as string) ?? "";

  const toggleMulti = (key: string, id: string, current: string[], mutualExclId?: string) => {
    if (mutualExclId && id === mutualExclId) {
      onAnswer(key, current.includes(mutualExclId) ? [] : [mutualExclId]);
      return;
    }
    const filtered = mutualExclId ? current.filter((s) => s !== mutualExclId) : current;
    const next = filtered.includes(id)
      ? filtered.filter((s) => s !== id)
      : [...filtered, id];
    onAnswer(key, next);
  };

  return (
    <AssessmentStep
      sectionLabel="Section 15 of 16"
      sectionTitle="Your coaching preferences or how should we bug you"
      sectionDescription={`Everyone responds differently to coaching, reminders, and motivation. By understanding your preferences, we can tailor your experience so it feels supportive — not overwhelming.\n\nTell us how you like to receive guidance, what tone works best for you, and how often you'd like us to check in. This helps us personalize your journey in a way that actually keeps you moving forward.`}
      questionTitle="What coaching style do you prefer to keep you motivated?"
      onBack={onBack}
      onNext={onNext}
      nextLabel="Continue"
      stepKey="step-15"
      direction={direction}
    >
      {/* Q1: Coaching style */}
      <MultiSelectGrid
        options={COACHING_STYLES}
        selected={coachingStyles}
        onToggle={(id) => toggleMulti("coachingStyles", id, coachingStyles)}
      />

      {/* Q2: Engagement channels */}
      <div className="space-y-3">
        <p className="text-sm font-medium leading-snug text-foreground">
          How would you like the app to engage with you?
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
          Check all that apply
        </p>
        <MultiSelectGrid
          options={ENGAGEMENT_CHANNELS}
          selected={engagementChannels}
          onToggle={(id) => toggleMulti("engagementChannels", id, engagementChannels)}
        />
      </div>

      {/* Q3: Check-in frequency */}
      <div className="space-y-3">
        <p className="text-sm font-medium leading-snug text-foreground">
          How often would you like to receive progress check-ins or guidance updates?
        </p>
        <SingleSelectRow
          options={CHECKIN_FREQUENCY}
          selected={checkinFrequency}
          onSelect={(id) => onAnswer("checkinFrequency", id)}
        />
      </div>

      {/* Q4: Data visibility */}
      <div className="space-y-3">
        <p className="text-sm font-medium leading-snug text-foreground">
          Who can view your plan progress data?
        </p>
        <SingleSelectRow
          options={DATA_VISIBILITY}
          selected={dataVisibility}
          onSelect={(id) => onAnswer("dataVisibility", id)}
        />
      </div>

      {/* Q5: Health plan preferences */}
      <div className="space-y-3">
        <p className="text-sm font-medium leading-snug text-foreground">
          Do you have any preferences or limits for your health plan?
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
          Check all that apply
        </p>
        <MultiSelectGrid
          options={HEALTH_PLAN_PREFS}
          selected={healthPlanPrefs}
          onToggle={(id) => toggleMulti("healthPlanPrefs", id, healthPlanPrefs, "none")}
          mutuallyExclusiveId="none"
        />
      </div>

      {/* Q6: Free text */}
      <div className="space-y-3">
        <p className="text-sm font-medium leading-snug text-foreground">
          Anything else you'd like your coach or our system to know to personalize your longevity plan for you?
        </p>
        <Textarea
          value={additionalNotes}
          onChange={(e) => onAnswer("additionalNotes", e.target.value)}
          placeholder="Share anything that would help us support you better..."
          className="bg-background/50 min-h-[100px] resize-none"
        />
      </div>
    </AssessmentStep>
  );
}
