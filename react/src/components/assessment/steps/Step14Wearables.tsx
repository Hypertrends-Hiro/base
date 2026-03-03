import { AssessmentStep } from "../AssessmentStep";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SUPPORTED_DEVICES = [
  { value: "fitbit", label: "Fitbit" },
  { value: "apple_watch", label: "Apple Watch" },
  { value: "oura_ring", label: "Oura Ring" },
  { value: "garmin", label: "Garmin" },
  { value: "whoop", label: "Whoop" },
  { value: "other", label: "Other" },
  { value: "none", label: "No, I don't use any wearables" },
];

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

export function Step14Wearables({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const wearableDevice = (answers.wearableDevice as string) ?? "";
  const wearableConsent = (answers.wearableConsent as boolean) ?? false;

  return (
    <AssessmentStep
      sectionLabel="Section 14 of 16"
      sectionTitle="We connect to devices and apps you use to make it extra personal"
      sectionDescription={`Connecting your wearable devices or health apps allows us to give you even more accurate and personalized insights. With your permission, we can automatically track things like activity, sleep, heart rate, and recovery — so you don't have to enter anything manually.\n\nThis step is completely optional, and you're always in control of what you choose to share.`}
      questionTitle="Would you like to connect wearable devices or apps to track your health (e.g., Fitbit, Apple Watch, Oura Ring)?"
      onBack={onBack}
      onNext={onNext}
      stepKey="step-14"
      direction={direction}
    >
      {/* Device dropdown */}
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
          Supported Devices
        </p>
        <Select value={wearableDevice} onValueChange={(v) => onAnswer("wearableDevice", v)}>
          <SelectTrigger className="w-full bg-background/50">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent
            className="w-[var(--radix-select-trigger-width)] bg-card border border-border shadow-lg z-50"
            position="popper"
            sideOffset={4}
          >
            {SUPPORTED_DEVICES.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="py-2.5">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Consent checkbox */}
      <button
        type="button"
        onClick={() => onAnswer("wearableConsent", !wearableConsent)}
        className={cn(
          "flex items-start gap-3 w-full rounded-lg border px-4 py-3 text-left transition-colors",
          wearableConsent
            ? "border-primary bg-primary/10"
            : "border-border bg-background/50 hover:border-primary/50 hover:bg-background"
        )}
      >
        <Checkbox
          checked={wearableConsent}
          onCheckedChange={() => onAnswer("wearableConsent", !wearableConsent)}
          className="pointer-events-none shrink-0 mt-0.5"
          aria-hidden
        />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground leading-relaxed">
          I agree to giving access to my wearable or app data to this program for personalized feedback
        </span>
      </button>
    </AssessmentStep>
  );
}
