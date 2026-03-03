import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, ClipboardList, Bell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import kwiltLogoSvg from "@/assets/kwilt-logo-dark.png";
import { useScenario } from "@/contexts/ScenarioContext";

export default function AssessmentComplete() {
  const navigate = useNavigate();
  const { setScenario } = useScenario();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div
        className="w-full max-w-[560px] mb-10 animate-fade-in"
        style={{ animationDelay: "0ms", animationFillMode: "both" }}
      >
        <Link to="/">
          <img src={kwiltLogoSvg} alt="KWILT" className="h-7 w-auto" />
        </Link>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-[560px] bg-card rounded-2xl px-8 py-10 md:px-10 animate-[scale-in_0.35s_ease-out,fade-in_0.35s_ease-out]"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        {/* Success badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 mb-6 animate-fade-in"
          style={{ animationDelay: "150ms", animationFillMode: "both" }}
        >
          <CheckCircle2
            size={14}
            className="shrink-0"
            style={{ color: "hsl(var(--status-optimal))" }}
          />
          <span className="text-xs font-semibold tracking-wide text-foreground">
            Assessment complete
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="font-heading text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-3 animate-fade-in"
          style={{ animationDelay: "200ms", animationFillMode: "both" }}
        >
          Thank you for completing your health profile.
        </h1>

        {/* Supporting copy */}
        <p
          className="text-sm leading-relaxed text-foreground mb-6 animate-fade-in"
          style={{ animationDelay: "260ms", animationFillMode: "both" }}
        >
          Your answers give our team everything they need to build a health plan that's
          truly yours — not a template, not a guess. You've taken a meaningful step.
        </p>

        {/* Divider */}
        <div
          className="border-t border-border mb-6 animate-fade-in"
          style={{ animationDelay: "300ms", animationFillMode: "both" }}
        />

        {/* What's next label */}
        <div
          className="animate-fade-in"
          style={{ animationDelay: "340ms", animationFillMode: "both" }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground mb-4">
            What's next
          </p>

          {/* Step tiles */}
          <div className="grid grid-cols-2 gap-3 mb-7">
            {/* Tile 1 */}
            <div className="flex flex-col gap-2.5 rounded-xl border border-border bg-background p-4">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: "hsl(var(--status-optimal) / 0.12)" }}
              >
                <ClipboardList size={16} style={{ color: "hsl(var(--status-optimal))" }} />
              </div>
              <p className="font-heading text-sm font-semibold text-foreground leading-snug">
                Expert review
                <span className="block text-xs font-normal text-foreground mt-0.5">1–2 business days</span>
              </p>
              <p className="text-xs leading-relaxed text-foreground">
                Our health professionals will carefully review your responses and craft a personalized plan built specifically for you.
              </p>
            </div>

            {/* Tile 2 */}
            <div className="flex flex-col gap-2.5 rounded-xl border border-border bg-background p-4">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: "hsl(var(--primary) / 0.10)" }}
              >
                <Bell size={16} style={{ color: "hsl(var(--primary))" }} />
              </div>
              <p className="font-heading text-sm font-semibold text-foreground leading-snug">
                We'll notify you
                <span className="block text-xs font-normal text-foreground mt-0.5">Email &amp; SMS</span>
              </p>
              <p className="text-xs leading-relaxed text-foreground">
                You'll hear from us the moment your custom health plan is ready, with clear next steps to get started.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="flex flex-col gap-3 animate-fade-in"
          style={{ animationDelay: "420ms", animationFillMode: "both" }}
        >
          <Button
            onClick={() => { setScenario("preparing-lab-requisition"); navigate("/dashboard"); }}
            className="h-12 w-full rounded-md bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:bg-primary/90 flex items-center justify-center gap-2"
          >
            Go to My Dashboard
            <ArrowRight size={16} />
          </Button>

          <p className="text-center text-[11px] text-foreground mt-1">
            Your profile is saved. You can always update it from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
