import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface ScoreCardProps {
  title: string;
  subtitle: string;
  score: string;
  subscript?: string;
  description: string;
  highlight?: string;
  highlightAccent?: string;
  backgroundImage?: string;
  style?: React.CSSProperties;
  className?: string;
  blank?: boolean;
}

export function ScoreCard({
  title,
  subtitle,
  score,
  subscript,
  description,
  highlight,
  highlightAccent,
  backgroundImage,
  style,
  className,
  blank = false,
}: ScoreCardProps) {
  return (
    <div
      className={cn(
        "card-hero relative flex flex-col justify-between overflow-hidden p-6 text-white",
        className
      )}
      style={{
        aspectRatio: "580 / 534",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />

      {/* Header — top left */}
      <div className="relative z-10">
        <div className="flex items-center gap-1.5">
          <h3 className="font-heading text-xl sm:text-3xl lg:text-4xl font-medium leading-tight text-white">{title}</h3>
          {!blank && <ChevronRight className="hidden sm:block h-5 w-5 lg:h-6 lg:w-6 text-white" />}
        </div>
        <p className="mt-1 text-sm sm:text-base lg:text-lg font-light text-white" style={{ maxWidth: blank ? "80%" : "40%" }}>
          {blank ? "Complete your assessment to unlock this score." : subtitle}
        </p>
      </div>

      {/* Score — bottom right */}
      <div className="relative z-10 self-end text-right">
        {blank ? (
          <div className="flex items-baseline justify-end gap-1">
            <span className="font-heading text-6xl sm:text-8xl lg:text-[9rem] font-light leading-none text-white/40">--</span>
          </div>
        ) : (
          <div className="flex items-baseline justify-end gap-1">
            <span className="font-heading text-6xl sm:text-8xl lg:text-[9rem] font-light leading-none text-white">{score}</span>
            {subscript && (
              <span className="font-heading text-3xl sm:text-4xl lg:text-6xl font-light leading-none text-white">{subscript}</span>
            )}
          </div>
        )}
        <p className="mt-3 max-w-[220px] lg:max-w-[280px] text-sm lg:text-base font-light leading-relaxed text-white ml-auto text-right">
          {blank
            ? "Your score total will be based on an analysis of all screened biomarkers across the five health pillars."
            : (
              <>
                {description}
                {highlightAccent && (
                  <span className="font-light" style={{ color: "hsl(30, 100%, 84%)" }}> {highlightAccent}</span>
                )}
                {highlight && (
                  <span className="font-light text-white"> {highlight}</span>
                )}
              </>
            )
          }
        </p>
      </div>
    </div>
  );
}

type ActionUrgency = "urgent" | "info" | "routine";

interface ActionCardProps {
  variant?: "primary" | "secondary" | "warning" | "danger";
  label: string;
  title: string;
  action: string;
  icon?: React.ElementType;
  urgency?: ActionUrgency;
  urgencyLabel?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export function ActionCard({
  variant = "secondary",
  label,
  title,
  action,
  icon: Icon,
  urgency,
  urgencyLabel,
  onClick,
}: ActionCardProps) {
  const urgencyClasses: Record<ActionUrgency, string> = {
    urgent: variant === "primary"
      ? "bg-white/90 text-foreground"
      : "bg-accent/60 text-foreground",
    info: variant === "primary"
      ? "bg-white/90 text-foreground"
      : "bg-accent/60 text-foreground",
    routine: variant === "primary"
      ? "bg-white/30 text-white"
      : "bg-accent/60 text-foreground",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "card-action relative flex h-full flex-col justify-between overflow-hidden",
        onClick && "cursor-pointer",
        variant === "primary" ? "bg-primary text-foreground" : 
        variant === "warning" ? "bg-[hsl(45,90%,65%)] text-foreground" :
        variant === "danger" ? "bg-[#FF816B] text-foreground" :
        "bg-card"
      )}
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-current opacity-10" />

      <div>
        <div className="flex items-start justify-between gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[10px] font-medium leading-tight whitespace-nowrap inline-block",
              urgency ? urgencyClasses[urgency] : (
                variant === "primary" ? "bg-white/20 text-white" : "bg-accent/60 text-foreground"
              )
            )}
          >
            {label}
          </span>
        </div>
        <h4 className="mt-1 font-heading text-2xl sm:text-xl font-light">{title}</h4>
      </div>
      <span
        className={cn(
          "link-arrow mt-4",
          variant === "primary" ? "text-foreground hover:text-white" : "text-foreground"
        )}
      >
        {action}
        <ChevronRight className="h-4 w-4" />
      </span>

      {/* Watermark icon */}
      {Icon && (
        <Icon
          className="pointer-events-none absolute bottom-2 right-2 h-20 w-20 text-current opacity-[0.08]"
          style={{ transform: "rotate(-12deg)" }}
          strokeWidth={1}
        />
      )}
    </div>
  );
}

interface HealthScoreRowProps {
  title: string;
  subtitle?: string;
  score: number;
  maxScore: number;
  status: "optimal" | "improving" | "attention";
  expanded?: boolean;
  description?: string;
  onToggle?: () => void;
  blank?: boolean;
}

export function HealthScoreRow({
  title,
  subtitle,
  score,
  maxScore,
  status,
  expanded = false,
  description,
  onToggle,
  blank = false,
}: HealthScoreRowProps) {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="rounded-md bg-card px-4 py-4 shadow-soft md:px-6 md:py-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5">
          <button
            onClick={blank ? undefined : onToggle}
            className="flex items-center gap-2 font-heading text-xl font-medium self-start"
            style={blank ? { cursor: "default" } : {}}
          >
            {title}
            {!blank && (
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  expanded && "rotate-90"
                )}
              />
            )}
          </button>
          {subtitle && (
            <p className="text-sm text-muted-foreground leading-snug">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 min-w-[120px] max-w-[160px] overflow-hidden rounded-full bg-muted sm:w-40 sm:flex-none">
            {!blank && (
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${percentage}%`,
                  background: "hsl(var(--kwilt-blue))",
                }}
              />
            )}
          </div>
          <span className="min-w-[52px] text-right font-heading text-lg text-muted-foreground">
            {blank ? "--/--" : `${score}/${maxScore}`}
          </span>
        </div>
      </div>
      {!blank && expanded && description && (
        <div className="mt-4 animate-fade-in">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
          <a href="/plan" className="link-arrow mt-3 text-primary">
            View your plan
          </a>
        </div>
      )}
    </div>
  );
}
