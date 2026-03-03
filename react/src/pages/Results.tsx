import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { BiomarkerCategories } from "@/components/results/BiomarkerCategories";
import resultsCtaHero from "@/assets/results-cta-hero.png";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import useEmblaCarousel from "embla-carousel-react";
import { useScenario } from "@/contexts/ScenarioContext";

interface Marker {
  name: string;
  status: "above" | "below" | "out";
  value: string;
}

interface Pillar {
  title: string;
  subtitle: string;
  score: number;
  maxScore: number;
  markers: Marker[];
  loweredBy: string[];
  whyItMatters: string;
}

const pillars: Pillar[] = [
  {
    title: "Heart health",
    subtitle: "Evaluates your heart and blood vessels, including inflammation and cholesterol-related risks.",
    score: 15,
    maxScore: 20,
    markers: [
      { name: "Lipid Panel (Total Chol, LDL, HDL, Triglycerides)", status: "above", value: "264 nmol/L" },
      { name: "ApoB – Total atherogenic particles", status: "above", value: "264 nmol/L" },
      { name: "Lipoprotein(a) – Genetic cholesterol risk", status: "out", value: "" },
      { name: "Homocysteine – Vascular inflammation", status: "above", value: "264 nmol/L" },
      { name: "Omega-3 Index – Protective fatty acids", status: "below", value: "336 nmol/L" },
      { name: "hs-CRP – Arterial inflammation", status: "above", value: "264 nmol/L" },
      { name: "CMP / Urinalysis / Cortisol / Lead – Kidney, stress, toxin load", status: "above", value: "176 mg/L" },
    ],
    loweredBy: [
      "Hypertension or need for BP meds",
      "Elevated LDL/ApoB, low HDL, high triglycerides",
      "Diabetes or insulin resistance",
      "Elevated CRP",
      "Smoking (current or heavy past use)",
      "Obesity (BMI, waist circumference)",
      "Kidney dysfunction",
      "Inactivity or poor aerobic fitness",
      "Family history of early heart disease",
    ],
    whyItMatters: "High LDL, inflammation, or genetic factors like Lp(a) drive plaque buildup and cardiac risk.",
  },
  {
    title: "Metabolic health",
    subtitle: "Measures blood sugar regulation, fat metabolism, and body composition resilience.",
    score: 20,
    maxScore: 20,
    markers: [
      { name: "Fasting Glucose", status: "above", value: "92 mg/dL" },
      { name: "HbA1c – Long-term blood sugar", status: "above", value: "5.2%" },
      { name: "Insulin – Fasting level", status: "above", value: "6.4 µIU/mL" },
    ],
    loweredBy: [
      "Elevated fasting glucose or HbA1c",
      "Insulin resistance markers",
      "High triglyceride-to-HDL ratio",
      "Excess visceral fat",
    ],
    whyItMatters: "Metabolic dysfunction accelerates aging and increases risk for diabetes, cardiovascular disease, and cognitive decline.",
  },
  {
    title: "Brain health",
    subtitle: "Evaluates brain aging risk and cognitive resilience based on metabolic, vascular, and neurologic inputs.",
    score: 18,
    maxScore: 20,
    markers: [
      { name: "Homocysteine – Neurovascular risk", status: "above", value: "12 µmol/L" },
      { name: "Omega-3 Index – Neuroprotection", status: "below", value: "4.2%" },
      { name: "Vitamin B12 – Neural support", status: "above", value: "680 pg/mL" },
    ],
    loweredBy: [
      "Elevated homocysteine",
      "Low omega-3 index",
      "Poor sleep quality",
      "Chronic stress or elevated cortisol",
    ],
    whyItMatters: "Neuroinflammation and vascular damage silently erode cognitive function over decades.",
  },
  {
    title: "Cancer prevention",
    subtitle: "Gauges your risk for lifestyle- and hormone-driven cancers.",
    score: 8,
    maxScore: 20,
    markers: [
      { name: "hs-CRP – Systemic inflammation", status: "above", value: "3.8 mg/L" },
      { name: "Vitamin D – Immune modulation", status: "below", value: "22 ng/mL" },
      { name: "Ferritin – Iron & oxidative stress", status: "above", value: "310 ng/mL" },
    ],
    loweredBy: [
      "Chronic inflammation (elevated CRP)",
      "Low vitamin D levels",
      "Excess iron stores",
      "Smoking or alcohol use",
      "Family history of cancer",
    ],
    whyItMatters: "Persistent inflammation, nutrient imbalances, and oxidative stress create conditions that favor cellular damage and cancer growth.",
  },
  {
    title: "Bone and muscle care",
    subtitle: "Captures muscle and bone health, resistance to age-related decline and frailty.",
    score: 20,
    maxScore: 20,
    markers: [
      { name: "Vitamin D – Bone mineralization", status: "above", value: "48 ng/mL" },
      { name: "Calcium – Skeletal support", status: "above", value: "9.6 mg/dL" },
      { name: "Magnesium – Muscle function", status: "above", value: "2.1 mg/dL" },
    ],
    loweredBy: [
      "Low vitamin D or calcium",
      "Magnesium deficiency",
      "Sedentary lifestyle",
      "Low protein intake",
    ],
    whyItMatters: "Bone density and muscle mass decline with age. Maintaining mineral balance and resistance training prevents frailty.",
  },
];

const statusLabel: Record<string, string> = {
  above: "Above Range",
  below: "Below Range",
  out: "Out of Range",
};

function PillarExpandedContent({ pillar }: { pillar: Pillar }) {
  const isMobile = useIsMobile();
  const [emblaRef] = useEmblaCarousel({ align: "start" });

  const cards = [
    <div key="markers" className="rounded-md bg-card p-4 shadow-soft min-w-[85vw] md:min-w-0">
      <h5 className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
        Markers that influence this score
      </h5>
      <ul className="divide-y divide-border">
        {pillar.markers.map((m) => (
          <li key={m.name} className="py-3 first:pt-0 last:pb-0">
            <p className="text-sm leading-snug text-foreground">{m.name}</p>
            <p className={cn("text-xs font-medium mt-0.5",
              m.status === "above" && "text-primary",
              m.status === "below" && "text-primary",
              m.status === "out" && "text-primary"
            )}>
              {statusLabel[m.status]}
              {m.value ? ` – ${m.value}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </div>,
    <div key="lowered" className="rounded-md bg-card p-4 shadow-soft min-w-[85vw] md:min-w-0">
      <h5 className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
        Score is lowered by
      </h5>
      <ul className="divide-y divide-border">
        {pillar.loweredBy.map((item) => (
          <li key={item} className="py-2.5 first:pt-0 last:pb-0 text-sm leading-snug text-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>,
    <div key="why" className="rounded-md bg-card p-4 shadow-soft min-w-[85vw] md:min-w-0">
      <h5 className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
        Why it matters
      </h5>
      <p className="text-base leading-relaxed text-foreground font-heading">
        {pillar.whyItMatters}
      </p>
    </div>,
  ];

  return (
    <div className="animate-fade-in border-t border-border bg-background px-4 py-5 md:px-6">
      {isMobile ? (
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3">
            {cards.map((card, i) => (
              <div key={i} className="flex-[0_0_85%]">{card}</div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">{cards}</div>
      )}
    </div>
  );
}

function PillarRow({ pillar }: { pillar: Pillar }) {
  const [expanded, setExpanded] = useState(pillar.title === "Heart health");
  const pct = (pillar.score / pillar.maxScore) * 100;

  // Color the bar based on score ratio
  const barColor =
    pct >= 90 ? "hsl(var(--kwilt-blue))" :
    pct >= 50 ? "hsl(var(--kwilt-blue))" :
    "hsl(var(--status-attention))";

  return (
    <div className="rounded-md bg-card shadow-soft">
      {/* Header row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full flex-col px-4 py-4 md:px-6 md:py-5"
      >
        {/* Mobile layout */}
        <div className="flex md:hidden w-full items-center justify-between mb-2">
          <span className="font-heading text-2xl font-light text-foreground">
            {pillar.score}/{pillar.maxScore}
          </span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, background: barColor }}
              />
            </div>
            <ChevronDown
              className={cn(
                "h-5 w-5 transition-transform duration-200 -rotate-90",
                expanded && "rotate-0"
              )}
            />
          </div>
        </div>
        <div className="md:hidden text-left">
          <p className="font-heading text-lg font-medium">{pillar.title}</p>
          <p className="text-sm text-muted-foreground leading-snug mt-0.5">{pillar.subtitle}</p>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex w-full items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5 text-left">
            <span className="flex items-center gap-2 font-heading text-xl font-medium">
              {pillar.title}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  expanded && "rotate-180"
                )}
              />
            </span>
            <p className="text-sm text-muted-foreground leading-snug max-w-lg">
              {pillar.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 pt-1">
            <div className="h-2 w-40 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, background: barColor }}
              />
            </div>
            <span className="min-w-[52px] text-right font-heading text-lg text-muted-foreground">
              {pillar.score}/{pillar.maxScore}
            </span>
          </div>
        </div>
      </button>

      {/* Expanded content — 3 columns */}
      {expanded && (
        <PillarExpandedContent pillar={pillar} />
      )}
    </div>
  );
}

export default function Results() {
  const location = useLocation();
  const { scenario } = useScenario();
  const isBlank = scenario !== "none";

  useEffect(() => {
    if (location.hash === "#biomarkers") {
      const el = document.getElementById("biomarkers");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <div className="p-4 lg:p-12">
        <header className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-2xl font-light lg:text-4xl">
            KWILT<span className="text-[10px] lg:text-xs align-super">™</span> longevity pillars
          </h1>
        </header>

        {isBlank ? (
          <>
            {/* Empty pillar placeholders */}
            <section className="space-y-3">
              {["Heart health", "Metabolic health", "Brain health", "Cancer prevention", "Bone and muscle care"].map((title) => (
                <div key={title} className="rounded-md bg-card shadow-soft px-4 py-4 md:px-6 md:py-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-heading text-xl font-medium text-muted-foreground/50">{title}</p>
                      <p className="text-sm text-muted-foreground/40 mt-0.5">Awaiting lab results</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 md:w-40 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-muted-foreground/10" style={{ width: "0%" }} />
                      </div>
                      <span className="min-w-[52px] text-right font-heading text-lg text-muted-foreground/30">—/20</span>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Empty biomarker state */}
            <section className="mt-10">
              <h2 className="font-heading text-2xl font-medium lg:text-4xl mb-3">Biomarkers</h2>
              <div className="rounded-xl bg-card shadow-soft p-8 text-center">
                <p className="text-muted-foreground font-light">
                  Complete your lab work to see your biomarker results and longevity pillar scores.
                </p>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-3">
              {pillars.map((p) => (
                <PillarRow key={p.title} pillar={p} />
              ))}
            </section>

            <div id="biomarkers">
              <BiomarkerSummary />
              <BiomarkerCategories />
            </div>
          </>
        )}

        {/* CTA Hero Card */}
        <section className="mt-10 relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "21/9" }}>
          <img
            src={resultsCtaHero}
            alt="Live well today"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-10">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-light leading-tight">
              Live well today,
            </h2>
            <div className="my-3 h-[1px] w-full max-w-md bg-white/60" />
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-light leading-tight">
              for a better tomorrow.
            </h2>
            <div className="mt-3 h-[1px] w-full max-w-md bg-white/60" />
          </div>
        </section>
      </div>
    </>
  );
}

/* ── Biomarker Summary ── */

const biomarkerData = [
  { count: 88, label: "in range", color: "hsl(var(--kwilt-blue))" },
  { count: 17, label: "out of range", color: "hsl(var(--status-attention))" },
  { count: 3, label: "improving", color: "hsl(30, 100%, 84%)" },
];
const totalBiomarkers = biomarkerData.reduce((s, d) => s + d.count, 0);

function BiomarkerSummary() {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-heading text-2xl font-medium lg:text-4xl">
          {totalBiomarkers} Biomarkers
        </h2>
        <a
          href="#"
          className="flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          Download results <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
        With this comprehensive panel we can detect subtle dysfunctions early, monitor aging-related
        risk factors, and personalize your health strategy across key longevity pathways. Together,
        they provide a data-driven foundation for optimizing healthspan—not just lifespan.
      </p>

      <div className="grid grid-cols-3 gap-3">
        {biomarkerData.map((d) => (
          <div
            key={d.label}
            className="rounded-md bg-card p-4 pb-0 shadow-soft flex flex-col items-start overflow-hidden min-h-[160px]"
          >
            <p className="font-heading text-4xl lg:text-5xl font-light">
              {d.count}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground font-light">{d.label}</p>
            <div className="mt-auto w-full rounded-t-md -mx-4 px-0" style={{ marginLeft: "-1rem", marginRight: "-1rem", width: "calc(100% + 2rem)" }}>
              <div
                className="h-9 rounded-t-md"
                style={{
                  width: `${(d.count / totalBiomarkers) * 100}%`,
                  backgroundColor: d.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
