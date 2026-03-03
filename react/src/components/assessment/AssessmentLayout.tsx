import { Link } from "react-router-dom";
import kwiltLogo from "@/assets/kwilt-logo-dark.png";
import { cn } from "@/lib/utils";

const SECTION_NAMES = [
  "Biometrics",
  "Health Goals",
  "Pregnancy",
  "Hormonal Health",
  "Medical History",
  "Preventive Screening",
  "Medications",
  "Family History",
  "Nutrition",
  "Physical Activity",
  "Sleep",
  "Substance Use",
  "Informed Consent",
];

interface AssessmentLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

export function AssessmentLayout({ children, currentStep, totalSteps }: AssessmentLayoutProps) {
  const sectionName = SECTION_NAMES[currentStep - 1] ?? "";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4 lg:px-12 bg-card">
        <Link to="/">
          <img src={kwiltLogo} alt="KWILT" className="h-7 w-auto" />
        </Link>
        <Link
          to="/dashboard"
          className="text-xs font-semibold uppercase tracking-widest text-foreground hover:text-foreground transition-colors"
        >
          Exit
        </Link>
      </header>

      {/* Segmented progress bar */}
      <div className="bg-card border-b border-border px-6 py-3 lg:px-12">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-foreground">
            {sectionName}
          </span>
          <span className="text-[11px] font-semibold text-foreground">
            {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-500 ease-out",
                i < currentStep ? "bg-primary" : "bg-border"
              )}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6 lg:px-12">
        <p className="text-[10px] leading-relaxed text-foreground max-w-3xl">
          KWILT Health Intake Form — The information collected here is used solely to personalize your health assessment and recommendations. All data is encrypted and stored securely in accordance with HIPAA guidelines. KWILT does not sell or share your personal health information with third parties. ©2025 KWILT Health, Inc.
        </p>
      </footer>
    </div>
  );
}
