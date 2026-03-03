import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface WizardStep {
  targetSelector: string | null; // null = centered card (no spotlight)
  title: string;
  description: string;
  mobileTargetSelector?: string; // fallback for mobile bottom nav
}

const WIZARD_STEPS: WizardStep[] = [
  {
    targetSelector: null,
    title: "Welcome to KWILT™",
    description: "Let us show you around your personalized health dashboard. This quick tour will walk you through the key sections.",
  },
  {
    targetSelector: "#wizard-scores",
    title: "Longevity Scores",
    description: "These are your longevity and biological age scores — calculated from your lab biomarkers.",
  },
  {
    targetSelector: "#wizard-actions",
    title: "Your Actions",
    description: "Your upcoming tasks and daily actions appear here. Stay on top of appointments, meals, and more.",
  },
  {
    targetSelector: "#wizard-health-scores",
    title: "Health Pillars",
    description: "Dive into your five health pillars. Each is scored out of 20, giving you a total longevity score out of 100.",
  },
  {
    targetSelector: "#wizard-biomarkers",
    title: "Biomarkers",
    description: "Track all your lab biomarkers in detail — see what's in range, improving, or needs attention.",
  },
  {
    targetSelector: "#nav-results",
    title: "Results",
    description: "View detailed lab results and biomarker trends over time.",
    mobileTargetSelector: "#mobile-nav-results",
  },
  {
    targetSelector: "#nav-plan",
    title: "Your Plan",
    description: "Your personalized health plan lives here — nutrition, supplements, exercise, and more.",
    mobileTargetSelector: "#mobile-nav-plan",
  },
  {
    targetSelector: "#nav-treatments",
    title: "Treatments",
    description: "Browse and manage your treatments and prescriptions.",
    mobileTargetSelector: "#mobile-nav-treatments",
  },
  {
    targetSelector: "#nav-lifestyle",
    title: "Lifestyle",
    description: "Log meals, track habits, and monitor your daily wellness activities.",
    mobileTargetSelector: "#mobile-nav-lifestyle",
  },
  {
    targetSelector: null,
    title: "You're all set!",
    description: "Explore your dashboard and take control of your health journey. You can always revisit any section from the sidebar.",
  },
];

const STORAGE_KEY = "kwilt-wizard-seen-count";

interface WizardOverlayProps {
  onComplete: () => void;
}

export function WizardOverlay({ onComplete }: WizardOverlayProps) {
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const current = WIZARD_STEPS[step];
  const isFirst = step === 0;
  const isLast = step === WIZARD_STEPS.length - 1;

  const finish = useCallback(() => {
    const count = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    localStorage.setItem(STORAGE_KEY, String(count + 1));
    onComplete();
  }, [onComplete]);

  // Measure target element position
  useEffect(() => {
    const selector = isMobile && current.mobileTargetSelector
      ? current.mobileTargetSelector
      : current.targetSelector;

    if (!selector) {
      setTargetRect(null);
      return;
    }

    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      const timer = setTimeout(() => {
        setTargetRect(el.getBoundingClientRect());
      }, 350);
      return () => clearTimeout(timer);
    } else {
      setTargetRect(null);
    }
  }, [step, isMobile, current]);

  const next = () => {
    if (isLast) {
      finish();
    } else {
      setStep(step + 1);
    }
  };

  const padding = 12;

  // Compute tooltip position
  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect) {
      // Centered card
      return {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
    }

    const spaceBelow = window.innerHeight - targetRect.bottom;
    const spaceAbove = targetRect.top;

    if (spaceBelow > 200) {
      // Show below
      return {
        position: "fixed",
        top: targetRect.bottom + padding,
        left: Math.max(16, Math.min(targetRect.left, window.innerWidth - 340)),
      };
    } else if (spaceAbove > 200) {
      // Show above
      return {
        position: "fixed",
        bottom: window.innerHeight - targetRect.top + padding,
        left: Math.max(16, Math.min(targetRect.left, window.innerWidth - 340)),
      };
    }
    // Fallback: center
    return {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };
  };

  // Spotlight cutout via box-shadow
  const getBackdropStyle = (): React.CSSProperties => {
    if (!targetRect) {
      return { boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)" };
    }
    return {
      position: "fixed",
      top: targetRect.top - padding,
      left: targetRect.left - padding,
      width: targetRect.width + padding * 2,
      height: targetRect.height + padding * 2,
      borderRadius: "12px",
      boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)",
      pointerEvents: "none" as const,
      zIndex: 60,
      transition: "all 0.4s ease-in-out",
    };
  };

  return (
    <div className="fixed inset-0 z-[200]" style={{ pointerEvents: "auto" }}>
      {/* Backdrop click to skip */}
      <div
        className="absolute inset-0"
        onClick={(e) => e.stopPropagation()}
        style={{ background: targetRect ? "transparent" : "rgba(0,0,0,0.55)" }}
      />

      {/* Spotlight cutout */}
      {targetRect && <div style={getBackdropStyle()} />}

      {/* Tooltip card */}
      <div
        ref={tooltipRef}
        style={{ ...getTooltipStyle(), zIndex: 70 }}
        className="w-[320px] rounded-xl bg-card p-5 pt-4 shadow-xl animate-fade-in"
      >
        {/* Close / Skip — text link above progress */}
        <div className="flex justify-end mb-3">
          <button
            onClick={finish}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
            aria-label="Skip tour"
          >
            Skip
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex gap-1 mb-4">
          {WIZARD_STEPS.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-colors duration-300"
              style={{
                background: i <= step ? "hsl(var(--primary))" : "hsl(var(--muted))",
              }}
            />
          ))}
        </div>

        <h3 className="font-heading text-lg font-medium text-foreground mb-2">
          {current.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {current.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {step + 1} of {WIZARD_STEPS.length}
          </span>
          <button
            onClick={next}
            className="flex items-center gap-1 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {isLast ? "Get Started" : isFirst ? "Start Tour" : "Next"}
            {!isLast && <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
