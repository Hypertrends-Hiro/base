import { useState, useCallback, useEffect } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FileText, Pill, Dumbbell, Apple, Moon, Droplets, Brain, ChevronLeft, ChevronRight, ChevronRight as ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import planCtaHero from "@/assets/plan-cta-hero.png";
import useEmblaCarousel from "embla-carousel-react";
import { useScenario } from "@/contexts/ScenarioContext";

/* ── Mock Data ── */

type Priority = "MUST DO" | "ROUTINE" | "PRO TIP";

interface ActionItem {
  id: string;
  priority: Priority;
  title: string;
  description: string;
  icon: React.ElementType;
}

const actions: ActionItem[] = [
  {
    id: "1",
    priority: "MUST DO",
    title: "Take Vitamin D3 supplement",
    description: "Your levels are below optimal range. Take 5000 IU daily with a fat-containing meal.",
    icon: Pill,
  },
  {
    id: "2",
    priority: "MUST DO",
    title: "30-min strength training",
    description: "Focus on compound movements — squats, deadlifts, bench press. Track progressive overload.",
    icon: Dumbbell,
  },
  {
    id: "3",
    priority: "ROUTINE",
    title: "Eat 30g protein at breakfast",
    description: "Supports muscle synthesis and keeps blood sugar stable through the morning.",
    icon: Apple,
  },
  {
    id: "4",
    priority: "ROUTINE",
    title: "Wind-down routine by 10 PM",
    description: "Dim lights, no screens 30 min before bed. Aim for 7–8 hours of quality sleep.",
    icon: Moon,
  },
  {
    id: "5",
    priority: "PRO TIP",
    title: "Drink 3L of water today",
    description: "Spread intake across the day. Add electrolytes if exercising for over an hour.",
    icon: Droplets,
  },
  {
    id: "6",
    priority: "PRO TIP",
    title: "5-min mindfulness session",
    description: "Box breathing or guided meditation. Reduces cortisol and supports recovery.",
    icon: Brain,
  },
];

interface AgendaItem {
  time: string;
  label: string;
}

interface AgendaBlock {
  period: string;
  items: AgendaItem[];
}

const agenda: AgendaBlock[] = [
  {
    period: "MORNING",
    items: [
      { time: "7:30 AM", label: "Veggie Egg White Omelet (breakfast)" },
      { time: "7:30 AM", label: "Taurine 1g, Astaxanthin 6mg, Omega-3 1.5g (breakfast supps)" },
      { time: "8:00 AM", label: "Morning sunlight exposure (10–15 min outside)" },
      { time: "8:30 AM", label: "Upper-Body Strength (Push-ups, Rows, Band Raises)" },
      { time: "9:00 AM", label: "Creatine 5g (after breakfast/workout)" },
      { time: "10:00 AM", label: "Grapes & Almonds (snack 1)" },
      { time: "10:00 AM", label: "Collagen 10g (morning smoothie/snack)" },
    ],
  },
  {
    period: "MIDDAY",
    items: [
      { time: "12:00 PM", label: "Berberine 500mg (before lunch)" },
      { time: "12:30 PM", label: "Turkey & Avocado Wrap (lunch)" },
      { time: "2:00 PM", label: "Shoulder PT (per therapist/schedule)" },
      { time: "3:30 PM", label: "Cucumber & Tomato Salad (snack 2)" },
    ],
  },
  {
    period: "EVENING",
    items: [
      { time: "6:00 PM", label: "Berberine 500mg (before dinner)" },
      { time: "6:30 PM", label: "Grilled Chicken with Sweet Potato and Kale" },
      { time: "9:45 PM", label: "Evening wind-down: dim lights, 30 min screen-free" },
      { time: "10:00 PM", label: "Magnesium glycinate 200mg & Glycine 3g" },
      { time: "10:30 PM", label: "Target bedtime" },
    ],
  },
];

/* ── Plan Categories ── */

interface PlanCategory {
  id: string;
  title: string;
  description: string;
}

const planCategories: PlanCategory[] = [
  {
    id: "nutrition",
    title: "Nutrition optimization",
    description: "Your cardiovascular lab results indicate areas of improvement for someone aged 34, focusing on consistent.",
  },
  {
    id: "exercise",
    title: "Exercise & Movement",
    description: "Your cardiovascular lab results indicate areas of improvement for someone aged 34, focusing on consistent.",
  },
  {
    id: "sleep",
    title: "Sleep optimization",
    description: "Your cardiovascular lab results indicate areas of improvement for someone aged 34, focusing on consistent.",
  },
  {
    id: "diagnostics",
    title: "Diagnostics",
    description: "Your cardiovascular lab results indicate areas of improvement for someone aged 34, focusing on consistent.",
  },
  {
    id: "wellness",
    title: "General Wellness",
    description: "Your cardiovascular lab results indicate areas of improvement for someone aged 34, focusing on consistent.",
  },
  {
    id: "supplements",
    title: "Supplements",
    description: "Your cardiovascular lab results indicate areas of improvement for someone aged 34, focusing on consistent.",
  },
];

const genericPlanCategories: PlanCategory[] = [
  {
    id: "nutrition",
    title: "Nutrition optimization",
    description: "General guidance on balanced nutrition, macronutrient ratios, and anti-inflammatory eating patterns.",
  },
  {
    id: "exercise",
    title: "Exercise & Movement",
    description: "Foundational recommendations for strength training, cardiovascular health, and mobility.",
  },
  {
    id: "sleep",
    title: "Sleep optimization",
    description: "Best practices for sleep hygiene, circadian rhythm alignment, and recovery.",
  },
  {
    id: "diagnostics",
    title: "Diagnostics",
    description: "Recommended diagnostic screenings and preventive health checkups.",
  },
  {
    id: "wellness",
    title: "General Wellness",
    description: "Stress management, mindfulness, and lifestyle habits to support overall wellbeing.",
  },
  {
    id: "supplements",
    title: "Supplements",
    description: "Common supplement considerations for foundational health support.",
  },
];

/* ── Priority helpers ── */

const priorityDotColor: Record<Priority, string> = {
  "MUST DO": "bg-primary",
  "ROUTINE": "bg-status-optimal",
  "PRO TIP": "bg-accent",
};

const priorityBadgeBg: Record<Priority, string> = {
  "MUST DO": "bg-accent/60 text-foreground",
  "ROUTINE": "bg-accent/60 text-foreground",
  "PRO TIP": "bg-accent/60 text-foreground",
};

/* ── Sub-components ── */

function ActionCard({ item }: { item: ActionItem }) {
  const Icon = item.icon;
  return (
    <div className="card-action relative overflow-hidden border-0" style={{ backgroundColor: '#F6F1F0' }}>
      <Icon className="absolute -bottom-3 -right-3 h-20 w-20 rotate-12 text-muted/30 pointer-events-none" strokeWidth={1} />
      <div className="flex items-start gap-3 relative z-10">
        <div className="flex-1 space-y-1.5">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", priorityBadgeBg[item.priority])}>
            <span className={cn("h-1.5 w-1.5 rounded-full", priorityDotColor[item.priority])} />
            {item.priority}
          </span>
          <p className="text-base font-medium text-foreground leading-snug">{item.title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        </div>
        <Checkbox className="mt-1 h-5 w-5 rounded-sm border-muted" />
      </div>
    </div>
  );
}

/* ── Panels ── */

function TopActionsPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium text-foreground">Top actions across your six plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {actions.map((a) => (
          <ActionCard key={a.id} item={a} />
        ))}
      </div>
    </div>
  );
}

function TodaysAgendaPanel() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-normal text-foreground">Today's agenda</h2>
      {agenda.map((block) => (
        <div key={block.period} className="space-y-2">
          <div className="w-full rounded-lg bg-secondary px-4 py-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {block.period}
            </span>
          </div>
          <div className="space-y-1.5 px-4">
            {block.items.map((item, i) => (
              <p key={i} className="text-sm font-light text-foreground">
                <span className="text-muted-foreground font-light">{item.time}</span>{" "}
                {item.label}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main Page ── */

const SLIDE_LABELS = ["Top Actions", "Today's Agenda"];

export default function Plan() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const { scenario } = useScenario();
  const isBlank = scenario === "assessment-not-started";
  const isPreLab = scenario !== "none" && !isBlank && scenario !== "default-with-wizard" && scenario !== "new-rx-ordered";
  const categories = isBlank ? [] : isPreLab ? genericPlanCategories : planCategories;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);
  const canPrev = activeSlide > 0;
  const canNext = activeSlide < SLIDE_LABELS.length - 1;

  return (
    <>
      <div className="p-4 lg:p-12 space-y-6 max-w-6xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-2xl font-light lg:text-4xl">Your KWILT plan</h1>
          <button
            onClick={() => navigate("/patient-portal?tab=visit-summary")}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <FileText className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clinician's notes</span>
            <span className="sm:hidden">Notes</span>
          </button>
        </header>

        {/* Pre-lab note */}
        {isPreLab && (
          <div className="rounded-lg bg-accent/40 px-4 py-3">
            <p className="text-sm font-light text-foreground">
              Your plan will become more personalized once your lab results are available.
            </p>
          </div>
        )}

        {/* Tab bar + arrows */}
        <div className="flex items-center justify-between">
          <div className="inline-flex gap-1 rounded-full bg-white p-1 shadow-soft">
            {SLIDE_LABELS.map((label, i) => (
              <button
                key={label}
                onClick={() => scrollTo(i)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                  activeSlide === i
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-black/5"
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="p-1.5 rounded-full text-foreground disabled:opacity-30 hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="p-1.5 rounded-full text-foreground disabled:opacity-30 hover:bg-secondary transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Embla carousel */}
        {isBlank ? (
          <div className="bg-white border border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground font-light">
              Complete your health assessment to receive your personalized plan.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex">
              <div className="min-w-0 flex-[0_0_100%]">
                <div className="bg-white border border-border rounded-xl p-5 h-full">
                  <TopActionsPanel />
                </div>
              </div>
              <div className="min-w-0 flex-[0_0_100%]">
                <div className="bg-white border border-border rounded-xl p-5 h-full">
                  <TodaysAgendaPanel />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plan Category Cards */}
        {!isBlank && (
          <div className="flex flex-col gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/plan/${cat.id}`)}
                className="w-full text-left rounded-md bg-card px-4 py-4 shadow-soft md:px-6 md:py-5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2 font-heading text-xl font-medium">
                      {cat.title}
                      <ChevronRight className="h-4 w-4" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug">{cat.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* CTA Hero Card */}
        <section className="mt-4 relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "21/9" }}>
          <img
            src={planCtaHero}
            alt="Get the full picture"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-10">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-light leading-tight">
              Get the full picture.
            </h2>
            <div className="my-3 h-[1px] w-full max-w-md bg-white/60" />
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-light leading-tight">
              Take control.
            </h2>
            <div className="mt-3 h-[1px] w-full max-w-md bg-white/60" />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-6 pb-8 space-y-3">
          <p className="text-sm font-medium text-foreground">©2025 kwilthealth</p>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a risus enim consectetur varius, in facilisi eleifend magna porttitor pretium. Aenean nec bibendum felis, eget tincidunt libero. Sed ut diam in massa pretium sollicitudin eleifend nec risus. Praesent sed neque a dolor vestibulum molestie sit amet nec massa. Nunc id fringilla diam. Etiam eget volutpat enim. Donec accumsan, lectus in tristique pharetra, massa mauris rhoncus enim, vitae tempus sapien mauris id enim.
          </p>
        </footer>
      </div>
    </>
  );
}