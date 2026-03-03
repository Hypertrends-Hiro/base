import { Link, useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import kwiltLogoSvg from "@/assets/kwilt-logo-dark.png";

export default function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { firstName?: string } | null;
  const firstName = state?.firstName;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      {/* Logo — fades in first */}
      <div className="w-full max-w-[560px] mb-10 animate-fade-in" style={{ animationDelay: "0ms" }}>
        <Link to="/">
          <img src={kwiltLogoSvg} alt="KWILT" className="h-7 w-auto" />
        </Link>
      </div>

      {/* Card — scales + fades in */}
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
            Payment successful
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="font-heading text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-3 animate-fade-in"
          style={{ animationDelay: "200ms", animationFillMode: "both" }}
        >
          You're officially a KWILT™ member
          {firstName ? `, ${firstName}` : ""}.
        </h1>

        {/* Confirmation */}
        <p
          className="text-sm leading-relaxed text-foreground mb-6 animate-fade-in"
          style={{ animationDelay: "260ms", animationFillMode: "both" }}
        >
          Your annual membership is now active. Welcome to a healthier you.
        </p>

        {/* Divider */}
        <div
          className="border-t border-border mb-6 animate-fade-in"
          style={{ animationDelay: "300ms", animationFillMode: "both" }}
        />

        {/* What's next section */}
        <div
          className="animate-fade-in"
          style={{ animationDelay: "340ms", animationFillMode: "both" }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground mb-3">
            What's next
          </p>

          <h2 className="font-heading text-xl font-medium text-foreground leading-snug mb-4">
            Every person is unique. Help us get to know you.
          </h2>

          <p className="text-sm leading-relaxed text-foreground mb-5">
            To build your personalized health plan, we'll ask you a series of simple questions
            about your health history and lifestyle. Your answers let us tailor everything —
            from your biomarker panel to your recommendations — specifically to you.
          </p>

          {/* Time & resume row */}
          <div className="flex items-center gap-1.5 mb-8">
            <Clock size={12} className="text-foreground shrink-0" />
            <span className="text-xs text-foreground">~10 min · Save &amp; resume anytime</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div
          className="flex flex-col gap-3 animate-fade-in"
          style={{ animationDelay: "420ms", animationFillMode: "both" }}
        >
          <Button
            onClick={() => navigate("/assessment")}
            className="h-12 w-full rounded-md bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:bg-primary/90 flex items-center justify-center gap-2"
          >
            Start My Health Assessment
            <ArrowRight size={16} />
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="h-12 w-full rounded-md border border-border bg-transparent text-sm font-medium text-foreground hover:bg-background hover:text-foreground"
          >
            I'll do this later — take me to my dashboard
          </Button>

          <p className="text-center text-[11px] text-foreground mt-1">
            You can always start your assessment from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
