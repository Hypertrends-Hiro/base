import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ProductModal } from "@/components/cart/ProductModal";
import { QualificationModal } from "@/components/cart/QualificationModal";
import { WizardOverlay } from "@/components/dashboard/WizardOverlay";

import { ScoreCard, ActionCard, HealthScoreRow } from "@/components/cards/ScoreCard";
import { ChevronRight, ChevronLeft, ChevronDown, Monitor, Info, X, ClipboardList, TestTubes, UtensilsCrossed, Clock, CalendarCheck, Video, FlaskConical, Download, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScenarioProvider, useScenario, ScenarioKey } from "@/contexts/ScenarioContext";
import longevityImage from "@/assets/longevity-card.jpg";
import biologicalAgeImage from "@/assets/biological-age-card.jpg";
import productBalance from "@/assets/product-balance.png";
import productGlp1 from "@/assets/product-glp1.png";
import productSemaglutide from "@/assets/product-semaglutide.png";
import referAndEarnImage from "@/assets/refer-and-earn.png";
import howToUseImage from "@/assets/how-to-use-kwilt.png";
import { ReferralModal } from "@/components/dashboard/ReferralModal";


const healthScores = [
  {
    title: "Heart health",
    subtitle: "Evaluates your heart and blood vessels, including inflammation and cholesterol-related risks.",
    score: 14,
    maxScore: 20,
    status: "improving" as const,
    description:
      "Your cardiovascular lab results indicate areas for improvement. For someone aged 34, focusing on consistent aerobic exercise (like brisk walking, jogging, or cycling) for at least 150 minutes per week, alongside a balanced diet rich in fruits, vegetables, and whole grains, can significantly improve these markers. Additionally, managing stress and ensuring adequate sleep are crucial for overall heart well-being at your age.",
  },
  {
    title: "Metabolic health",
    subtitle: "Measures blood sugar regulation, fat metabolism, and body composition resilience.",
    score: 20,
    maxScore: 20,
    status: "optimal" as const,
    description:
      "Your metabolic markers are excellent. Your fasting glucose, insulin sensitivity, and lipid ratios are all within optimal ranges. Continue with your current nutrition habits — your body is efficiently converting energy and regulating blood sugar. Routine testing every 6 months will help maintain this trajectory.",
  },
  {
    title: "Brain health",
    subtitle: "Assesses cognitive biomarkers, neuroinflammation, and neural support nutrients.",
    score: 18,
    maxScore: 20,
    status: "optimal" as const,
    description:
      "Your cognitive biomarkers are in great shape. Inflammatory markers that affect brain function are low, and your omega-3 to omega-6 ratio supports neural health. Maintaining consistent sleep patterns and staying mentally active will help preserve these results as you age.",
  },
  {
    title: "Cancer prevention",
    subtitle: "Tracks inflammation, antioxidant levels, and early-warning biomarkers for cancer risk.",
    score: 8,
    maxScore: 20,
    status: "improving" as const,
    description:
      "Several prevention-related biomarkers warrant attention. Elevated inflammation markers and suboptimal antioxidant levels increase long-term risk. Increasing dietary fiber, reducing processed meat intake, and ensuring adequate vitamin D levels are your highest-impact next steps. A follow-up panel in 3 months is recommended.",
  },
  {
    title: "Bone and muscle care",
    subtitle: "Evaluates bone density markers, muscle health indicators, and key supporting minerals.",
    score: 20,
    maxScore: 20,
    status: "optimal" as const,
    description:
      "Your bone density markers and muscle health indicators are optimal. Vitamin D, calcium, and magnesium levels are all well-balanced. Your current strength training routine is paying off — keep it up. Continue prioritizing protein intake and resistance exercise to maintain this into your later decades.",
  },
];

const planCategories = ["Nutrition", "Supplements", "Exercises", "Sleep", "Therapy", "Medical Intervention"];

const planContent: Record<string, string[]> = {
  Nutrition: [
    "Your diet is a powerful lever for improving your cardiovascular and metabolic health. Focus on increasing your intake of omega-3 rich foods like salmon, sardines, and walnuts, which support both heart and brain function.",
    "Aim to fill half your plate with colorful vegetables at every meal. Prioritize fiber-rich whole grains like quinoa, oats, and barley to support blood sugar stability and gut health.",
  ],
  Supplements: [
    "Based on your lab results, we recommend a targeted supplement protocol. Vitamin D3 (2000 IU/day) and magnesium glycinate (300mg/day) are your top priorities given your current deficiency markers.",
    "Consider adding a high-quality omega-3 fish oil (2g EPA/DHA daily) and CoQ10 (100mg/day) to support mitochondrial function and cardiovascular health. Always consult your physician before starting new supplements.",
  ],
  Exercises: [
    "Your cardiovascular lab results indicate areas for improvement. For someone aged 34, focusing on consistent aerobic exercise (like brisk walking, jogging, or cycling) for at least 150 minutes per week, alongside a balanced diet rich in fruits, vegetables, and whole grains, can significantly improve these markers.",
    "Additionally, managing stress and ensuring adequate sleep are crucial for overall heart well-being at your age. Incorporate two strength training sessions per week to complement your cardio routine.",
  ],
  Sleep: [
    "Quality sleep is foundational to your longevity score. Aim for 7–9 hours per night with consistent sleep and wake times, even on weekends. Your wearable data suggests your deep sleep is below optimal — try reducing blue light exposure 90 minutes before bed.",
    "Consider a cool, dark sleep environment (65–68°F) and avoid caffeine after 2pm. A brief 10–20 minute nap in the early afternoon can improve alertness without disrupting nighttime sleep.",
  ],
  Therapy: [
    "Chronic stress is a significant driver of inflammation and accelerated aging. We recommend exploring mindfulness-based stress reduction (MBSR) or cognitive behavioral therapy (CBT) to build resilience and emotional regulation.",
    "Even 10 minutes of daily meditation has been shown to meaningfully reduce cortisol levels over time. Consider scheduling a virtual session with one of our partnered wellness coaches to develop a personalized stress management plan.",
  ],
  "Medical Intervention": [
    "Based on your current biomarker profile, a follow-up consultation with your physician is recommended within the next 60 days. Specifically, your LDL particle count and hsCRP warrant a closer review and possible therapeutic discussion.",
    "A mid-year comprehensive lab panel is scheduled for July 2025. Your care team may recommend a low-dose statin or blood pressure support depending on your next panel results. All interventions will be discussed during your upcoming telehealth consultation.",
  ],
};

const treatments = [
  { name: "Balance", category: "Weightloss", price: "$149/mo", image: productBalance, badge: "BEST SELLER", badgeDot: false },
  { name: "GLP-1 Assist", category: "Weightloss", price: "$299/mo", image: productGlp1, badge: null, badgeDot: false },
  { name: "NAD+", category: "Hormone Treatment", price: "$79/mo", image: productSemaglutide, badge: "LAB REQUIRED", badgeDot: true },
  { name: "Semaglutide", category: "Hormone Treatment", price: "$79/mo", image: productSemaglutide, badge: "LAB REQUIRED", badgeDot: true },
  { name: "Tirzepatide", category: "Metabolic Health", price: "$199/mo", image: productGlp1, badge: null, badgeDot: false },
];

const scenarios: { key: ScenarioKey; label: string }[] = [
  { key: "none", label: "Default View" },
  { key: "default-with-wizard", label: "Default View with Wizard" },
  { key: "new-rx-ordered", label: "Member - New Rx Ordered" },
  { key: "assessment-not-started", label: "Intake Not Started" },
  { key: "intake-complete", label: "Lab Requisition Ready" },
  { key: "preparing-lab-requisition", label: "Preparing Lab Requisition" },
  { key: "labs-ordered", label: "Labs Ordered" },
];

function DashboardContent() {
  const { scenario, setScenario } = useScenario();
  const navigate = useNavigate();
  const [expandedScore, setExpandedScore] = useState<string | null>("Heart health");
  const [activeCategory, setActiveCategory] = useState("Exercises");
  const [showScoresInfo, setShowScoresInfo] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof treatments[0] | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [qualModalOpen, setQualModalOpen] = useState(false);
  const [qualPlan, setQualPlan] = useState<{ label: string; pricePerMonth: number; months: number } | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [referralOpen, setReferralOpen] = useState(false);
  const [labReqModalOpen, setLabReqModalOpen] = useState(false);

  const [showTourBanner, setShowTourBanner] = useState(true);
  const [wizardActive, setWizardActive] = useState(false);

  const isWizard = scenario === "default-with-wizard";
  const isNewRx = scenario === "new-rx-ordered";
  const isBlank = scenario === "assessment-not-started";
  const isIntakeComplete = scenario === "intake-complete";
  const isPreparingLab = scenario === "preparing-lab-requisition";
  const isLabsOrdered = scenario === "labs-ordered";
  const isScoresBlank = isBlank || isIntakeComplete || isPreparingLab || isLabsOrdered;
  const activeScenarioLabel = scenarios.find((s) => s.key === scenario)?.label ?? "Default View";

  useEffect(() => {
    setLabReqModalOpen(isIntakeComplete);
  }, [isIntakeComplete]);

  const scrollCarousel = (dir: "left" | "right") => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="relative p-4 lg:p-12">
        {/* Demo Scenario Selector */}
        <div className="absolute top-4 right-4 lg:top-12 lg:right-12 z-50">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-full border border-border bg-popover px-3 py-1.5 text-xs font-medium text-foreground shadow-sm hover:bg-muted transition-colors focus:outline-none">
              <Monitor className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">Demo:</span>
              <span>{activeScenarioLabel}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[200px] bg-popover">
              <DropdownMenuLabel className="text-xs text-muted-foreground">Select Scenario</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {scenarios.map((s) => (
                <DropdownMenuItem
                  key={s.key}
                  onClick={() => setScenario(s.key)}
                  className={scenario === s.key ? "bg-muted font-medium" : ""}
                >
                  {s.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Header */}
        <header className="mb-8 animate-fade-in">
          <h1 className="font-heading text-2xl font-medium lg:text-5xl">Hello, Elisa</h1>
          <p className="mt-2 text-muted-foreground">14 day streak. Last updated 9:45 am.</p>
        </header>

        {/* Wizard scenario — Tour banner */}
        {isWizard && showTourBanner && !wizardActive && (
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-kwilt-red px-6 py-5 text-kwilt-bark animate-fade-in">
            <div>
              <p className="text-sm font-medium mb-1.5">🎉 Congrats — your labs are in!</p>
              <p className="text-base leading-relaxed">
                Your personalized dashboard is ready. Take a quick tour to see what's here.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-none">
              <button
                onClick={() => { setShowTourBanner(false); localStorage.setItem("kwilt-tour-banner-dismissed", "true"); }}
                className="rounded-md border border-kwilt-bark/30 px-5 py-3 text-sm font-medium text-kwilt-bark hover:bg-kwilt-bark/10 transition-colors whitespace-nowrap"
              >
                Dismiss
              </button>
              <button
                onClick={() => { setShowTourBanner(false); setWizardActive(true); }}
                className="rounded-md bg-kwilt-bark px-5 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Tour the Portal
              </button>
            </div>
          </div>
        )}

        {/* Assessment Not Started — Banner */}
        {isBlank && (
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-kwilt-red px-6 py-5 text-kwilt-bark">
            <div>
              <p className="text-sm font-medium mb-1.5">Welcome!</p>
              <p className="text-base leading-relaxed">
                To fill dashboard with your personalized insights—we just need your
                information. Get started by completing your{" "}
                <span className="font-semibold">Intake Questionnaire</span>.
              </p>
            </div>
            <button
              onClick={() => navigate("/assessment")}
              className="flex-none rounded-md bg-kwilt-bark px-7 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Start Intake
            </button>
          </div>
        )}

        {isIntakeComplete && !labReqModalOpen && (
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-kwilt-red px-6 py-5 text-kwilt-bark">
            <div>
              <p className="text-sm font-medium mb-1.5">Your Lab Requisition Is Ready</p>
              <p className="text-base leading-relaxed">
                Download your requisition and book your lab visit to get your blood work done.
              </p>
            </div>
            <button
              onClick={() => setLabReqModalOpen(true)}
              className="flex-none rounded-md bg-kwilt-bark px-7 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              View details
            </button>
          </div>
        )}

        {isPreparingLab && (
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-accent px-6 py-5 text-foreground">
            <div>
              <p className="text-sm font-medium mb-1.5">Preparing Your Lab Requisition</p>
              <p className="text-base leading-relaxed">
                We're preparing your lab requisition. Once ready, you'll receive it with instructions to visit a lab for your blood work.
              </p>
            </div>
            <div className="flex-none rounded-md bg-foreground px-7 py-3 text-sm font-medium text-background opacity-60 cursor-default whitespace-nowrap">
              In progress
            </div>
          </div>
        )}

        {isLabsOrdered && (
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-[#F5C451] px-6 py-5 text-kwilt-bark">
            <div>
              <p className="text-sm font-medium mb-1.5">Your Lab Results Are Arriving Soon</p>
              <p className="text-base leading-relaxed">
                We'll notify you when your results are ready and you can schedule your labs.
              </p>
            </div>
            <div className="flex-none rounded-md bg-kwilt-bark px-7 py-3 text-sm font-medium text-white opacity-60 cursor-default whitespace-nowrap">
              Pending
            </div>
          </div>
        )}

        {/* Main Score Cards */}
        <div id="wizard-scores" className="mb-6 grid gap-6 lg:grid-cols-2">
          <ScoreCard
            title="KWILT™ longevity score"
            subtitle="Based on the lab test from January 2025"
            score="60"
            subscript="/100"
            description="Your score total is based on an analysis of all screened biomarkers across the five health pillars."
            backgroundImage={longevityImage}
            className="animate-fade-in"
            blank={isScoresBlank}
          />
          <ScoreCard
            title="Biological age"
            subtitle="Based on the lab test from January 2025"
            score="34"
            subscript=".7"
            description="Your biological age is"
            highlightAccent="10.5 years"
            highlight="younger than your calendar age"
            backgroundImage={biologicalAgeImage}
            className="animate-fade-in"
            style={{ animationDelay: "0.1s" }}
            blank={isScoresBlank}
          />
        </div>

        {/* Action Cards Row */}
        <div id="wizard-actions" className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {isBlank ? (
            <ActionCard
              variant="primary"
              label="Assessment"
              title="Intake Questionnaire"
              action="Start Intake"
              icon={ClipboardList}
              urgency="urgent"
              urgencyLabel="Action needed"
              onClick={() => navigate("/assessment")}
            />
          ) : isIntakeComplete ? (
            <>
              <ActionCard
                variant="primary"
                label="Lab Visit Due"
                title="Lab requisition ready"
                action="Download & book visit with Quest"
                icon={FlaskConical}
                urgency="urgent"
                urgencyLabel="Action needed"
                onClick={() => setLabReqModalOpen(true)}
              />
              <ActionCard
                label="Today"
                title="Log meals"
                action="Track calorie intake"
                icon={UtensilsCrossed}
                urgency="routine"
                urgencyLabel="Daily"
                onClick={() => navigate("/lifestyle")}
              />
            </>
          ) : isPreparingLab ? (
            <>
              <ActionCard
                variant="warning"
                label="Lab requisition"
                title="Being prepared"
                action="Your lab order is being prepared"
                icon={FlaskConical}
                urgency="info"
                urgencyLabel="In progress"
              />
              <ActionCard
                label="Today"
                title="Log meals"
                action="Track calorie intake"
                icon={UtensilsCrossed}
                urgency="routine"
                urgencyLabel="Daily"
                onClick={() => navigate("/lifestyle")}
              />
            </>
          ) : isLabsOrdered ? (
            <>
              <ActionCard
                variant="warning"
                label="Your lab results are arriving soon!"
                title="Week of Feb 3"
                action="Stay tuned"
                icon={Clock}
                urgency="info"
                urgencyLabel="Coming soon"
              />
              <ActionCard
                variant="primary"
                label="Schedule"
                title="Health assessment"
                action="View schedule"
                icon={CalendarCheck}
                urgency="urgent"
                urgencyLabel="Action needed"
                onClick={() => navigate("/patient-portal")}
              />
              <ActionCard
                label="Today"
                title="Log meals"
                action="Track calorie intake"
                icon={UtensilsCrossed}
                urgency="routine"
                urgencyLabel="Daily"
                onClick={() => navigate("/lifestyle")}
              />
            </>
          ) : isNewRx ? (
            <>
              <ActionCard
                variant="primary"
                label="Tirzepatide — Virtual Visit Required"
                title="Rx consultation"
                action="Schedule virtual visit"
                icon={Video}
                urgency="urgent"
                urgencyLabel="Action needed"
                onClick={() => navigate("/treatments")}
              />
              <ActionCard
                variant="primary"
                label="Next Health Assessment"
                title="Jul 3, 6:00pm"
                action="View Schedule"
                icon={CalendarCheck}
                urgency="info"
                urgencyLabel="Coming soon"
                onClick={() => navigate("/patient-portal")}
              />
              <ActionCard
                label="Schedule"
                title="Mid-Point Lab Test"
                action="Schedule lab visit"
                icon={FlaskConical}
                urgency="info"
                urgencyLabel="Coming soon"
                onClick={() => navigate("/patient-portal")}
              />
            </>
          ) : (
            <>
              <ActionCard
                variant="primary"
                label="Next Health Assessment"
                title="Jul 3, 6:00pm"
                action="View Schedule"
                icon={CalendarCheck}
                urgency="info"
                urgencyLabel="Coming soon"
                onClick={() => navigate("/patient-portal")}
              />
              <ActionCard
                label="Schedule"
                title="Mid-Point Lab Test"
                action="Schedule lab visit"
                icon={FlaskConical}
                urgency="info"
                urgencyLabel="Coming soon"
                onClick={() => navigate("/patient-portal")}
              />
              {!isWizard && (
                <ActionCard
                  label="Schedule"
                  title="Prescription consultation"
                  action="Schedule virtual consultation"
                  icon={Video}
                  urgency="routine"
                  urgencyLabel="Schedule"
                  onClick={() => navigate("/patient-portal")}
                />
              )}
            </>
          )}
        </div>


        {/* Your Scores Section */}
        <section id="wizard-health-scores" className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-2xl font-medium">Your scores</h2>
              <button
                onClick={() => setShowScoresInfo(true)}
                className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
                aria-label="About your scores"
              >
                <Info className="h-4 w-4" />
              </button>
            </div>
            <Link to="/results" className="link-arrow text-muted-foreground">
              VIEW ALL
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Info Modal */}
          {showScoresInfo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-foreground/40" onClick={() => setShowScoresInfo(false)} />
              <div className="relative w-full max-w-md rounded-md bg-card p-6 shadow-elevated animate-fade-in">
                <button
                  onClick={() => setShowScoresInfo(false)}
                  className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <h3 className="font-heading text-xl font-medium">About your scores</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Your health scores are calculated from a comprehensive analysis of your lab biomarkers across five key health pillars. Each pillar is scored out of 20, giving you a maximum total score of 100.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Scores are updated each time new lab results are received. Tap any category to expand a detailed explanation and recommended next steps personalized to your results.
                </p>
                <ul className="mt-4 space-y-2">
                  {healthScores.map((s) => (
                    <li key={s.title} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 h-1.5 w-1.5 flex-none rounded-full bg-foreground/40 mt-2" />
                      <span><span className="font-medium">{s.title}</span> — {s.subtitle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            {healthScores.map((score) => (
              <HealthScoreRow
                key={score.title}
                title={score.title}
                subtitle={score.subtitle}
                score={score.score}
                maxScore={score.maxScore}
                status={score.status}
                expanded={!isScoresBlank && expandedScore === score.title}
                description={score.description}
                onToggle={() =>
                  setExpandedScore(expandedScore === score.title ? null : score.title)
                }
                blank={isScoresBlank}
              />
            ))}
          </div>
        </section>

        {/* Biomarkers Section */}
        <section id="wizard-biomarkers" className="mb-12">
          <div className="rounded-md bg-card p-6 shadow-soft lg:p-8">
            {/* Header inside card */}
            <div className="mb-6 flex items-start justify-between">
              <h2 className="font-heading text-2xl font-medium">Biomarkers</h2>
              <Link to="/results#biomarkers" className="link-arrow mt-1 text-muted-foreground hidden lg:flex">
                VIEW ALL
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Encouraging text — above numbers on mobile, hidden on desktop (shown in right col) */}
            {!isBlank && !isIntakeComplete && !isPreparingLab && !isLabsOrdered && (
              <div className="mb-6 lg:hidden">
                <h3 className="font-heading text-2xl font-medium leading-tight">
                  You are doing good, Elisa.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Continue testing twice a year and strive to improve your numbers for even better results.
                </p>
              </div>
            )}

            {/* Blank state mobile text */}
            {isBlank && (
              <div className="mb-6 lg:hidden">
                <h3 className="font-heading text-2xl font-medium leading-tight">
                  Finish your intake.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Complete your Intake Questionnaire so we can build your personalized lab panel and health plan.
                </p>
                <button onClick={() => navigate("/assessment")} className="mt-4 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-80 transition-opacity">
                  Continue Intake
                </button>
              </div>
            )}

            {/* Intake complete mobile text */}
            {isIntakeComplete && (
              <div className="mb-6 lg:hidden">
                <h3 className="font-heading text-2xl font-medium leading-tight">
                  Schedule your labs.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Your lab requisition is ready. Schedule your visit to get your comprehensive biomarker panel.
                </p>
                <button onClick={() => setLabReqModalOpen(true)} className="mt-4 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-80 transition-opacity">
                  Schedule Labs
                </button>
              </div>
            )}
            {isPreparingLab && (
              <div className="mb-6 lg:hidden">
                <h3 className="font-heading text-2xl font-medium leading-tight">
                  Preparing your lab requisition.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  We're preparing your lab requisition. Once ready, you'll receive it with instructions to visit a lab for your blood work.
                </p>
              </div>
            )}
            {isLabsOrdered && (
              <div className="mb-6 lg:hidden">
                <h3 className="font-heading text-2xl font-medium leading-tight">
                  Your labs are coming soon
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Continue testing twice a year and strive to improve your numbers for even better results.
                </p>
              </div>
            )}

            {/* Mobile: vertical stack. Desktop: two columns */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
              {/* Left column — counts + bar */}
              <div className="flex flex-col lg:pl-[5%]">
                {/* Counts */}
                <div className="flex gap-8 lg:gap-16">
                  {(isIntakeComplete || isPreparingLab || isLabsOrdered) ? (
                    <>
                      <div>
                        <p className="font-heading text-5xl font-light lg:text-8xl">
                          <span className="text-muted-foreground">--</span>
                        </p>
                        <div className="mt-2 flex items-center gap-1.5">
                          <span className="text-sm text-muted-foreground">in range</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-heading text-5xl font-light lg:text-8xl">
                          <span className="text-muted-foreground">--</span>
                        </p>
                        <div className="mt-2 flex items-center gap-1.5">
                          <span className="text-sm text-muted-foreground">out of range</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="font-heading text-5xl font-light lg:text-8xl">
                          {isBlank ? <span className="text-muted-foreground">--</span> : "58"}
                        </p>
                        <div className="mt-2 flex items-center gap-1.5">
                          {!isBlank && <span className="h-2.5 w-2.5 rounded-full" style={{ background: "hsl(var(--kwilt-blue))" }} />}
                          <span className="text-sm text-muted-foreground">in range</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-heading text-5xl font-light lg:text-8xl">
                          {isBlank ? <span className="text-muted-foreground">--</span> : "21"}
                        </p>
                        <div className="mt-2 flex items-center gap-1.5">
                          {!isBlank && <span className="h-2.5 w-2.5 rounded-full" style={{ background: "hsl(var(--kwilt-peach))" }} />}
                          <span className="text-sm text-muted-foreground">improving</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-heading text-5xl font-light lg:text-8xl">
                          {isBlank ? <span className="text-muted-foreground">--</span> : "04"}
                        </p>
                        <div className="mt-2 flex items-center gap-1.5">
                          {!isBlank && <span className="h-2.5 w-2.5 rounded-full" style={{ background: "hsl(var(--primary))" }} />}
                          <span className="text-sm text-muted-foreground">out of range</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Segmented bar or blank bar */}
                <div className="mt-6 flex h-2 w-full gap-1 lg:w-full">
                  {isBlank || isIntakeComplete || isPreparingLab || isLabsOrdered ? (
                    <div className="w-full rounded-full bg-muted" />
                  ) : (
                    <>
                      <div className="rounded-full" style={{ width: "70%", background: "hsl(var(--kwilt-blue))" }} />
                      <div className="rounded-full" style={{ width: "25%", background: "hsl(var(--kwilt-peach))" }} />
                      <div className="flex-1 rounded-full" style={{ background: "hsl(var(--primary))" }} />
                    </>
                  )}
                </div>

                {/* Footnotes — hidden in blank/intake-complete state */}
                {!isBlank && !isIntakeComplete && !isPreparingLab && !isLabsOrdered && (
                  <div className="mt-4 space-y-1 text-sm text-muted-foreground lg:text-base">
                    <p>Optimized biomarkers improve by 11%</p>
                    <p>Normal biomarkers improve by 53%</p>
                  </div>
                )}
              </div>

              {/* Right column — desktop only */}
              {isBlank ? (
                <div className="hidden lg:block lg:pl-[20%]">
                  <h3 className="font-heading text-4xl font-medium leading-tight">
                    Finish your intake.
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    Complete your Intake Questionnaire so we can build your personalized lab panel and health plan.
                  </p>
                  <button onClick={() => navigate("/assessment")} className="mt-6 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-80 transition-opacity">
                    Continue Intake
                  </button>
                </div>
              ) : isIntakeComplete ? (
                <div className="hidden lg:block lg:pl-[20%]">
                  <h3 className="font-heading text-4xl font-medium leading-tight">
                    Schedule your labs.
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    Your lab requisition is ready. Schedule your visit to get your comprehensive biomarker panel.
                  </p>
                  <button onClick={() => setLabReqModalOpen(true)} className="mt-6 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-80 transition-opacity">
                    Schedule Labs
                  </button>
                </div>
              ) : isPreparingLab ? (
                <div className="hidden lg:block lg:pl-[20%]">
                  <h3 className="font-heading text-4xl font-medium leading-tight">
                    Preparing your lab requisition.
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    We're preparing your lab requisition. Once ready, you'll receive it with instructions to visit a lab for your blood work.
                  </p>
                </div>
              ) : isLabsOrdered ? (
                <div className="hidden lg:block lg:pl-[20%]">
                  <h3 className="font-heading text-4xl font-medium leading-tight">
                    Your labs are coming soon
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    Continue testing twice a year and strive to improve your numbers for even better results.
                  </p>
                </div>
              ) : (
                <div className="hidden lg:block lg:pl-[20%]">
                  <h3 className="font-heading text-4xl font-medium leading-tight">
                    You are doing good, Elisa.
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    Continue testing twice a year and strive to improve your numbers for even better results.
                  </p>
                </div>
              )}
            </div>

            {/* View All — bottom left on mobile only */}
            {!isBlank && !isIntakeComplete && !isPreparingLab && !isLabsOrdered && (
              <Link to="/results#biomarkers" className="link-arrow mt-6 text-muted-foreground flex lg:hidden">
                VIEW ALL
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </section>

        {/* Your Plan Section */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-heading text-2xl font-medium">Your plan</h2>
            <Link to="/plan" className="link-arrow text-muted-foreground">
              <span className="lg:hidden">VIEW PLAN</span>
              <span className="hidden lg:inline">VIEW FULL TREATMENT PLAN</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Category Chips */}
          <div className="mb-8 flex flex-wrap gap-3">
            {planCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-md border px-5 py-2.5 text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "border-transparent text-foreground"
                    : "border-border bg-transparent hover:border-foreground/40"
                }`}
                style={activeCategory === category ? { background: "hsl(var(--kwilt-peach))" } : {}}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Plan Content */}
          <div className="space-y-4 text-base leading-relaxed text-foreground">
            {(isIntakeComplete || isPreparingLab || isLabsOrdered) ? (
              <p className="text-muted-foreground">Your plan will get a lot more details when labs arrive.</p>
            ) : (
              planContent[activeCategory].map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))
            )}
          </div>
        </section>

        {/* Your Recommended Treatments */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-heading text-2xl font-medium">{scenario === "none" || scenario === "default-with-wizard" || scenario === "new-rx-ordered" ? "Your recommended treatments" : "Treatments we trust"}</h2>
            <Link to="/treatments" className="link-arrow text-muted-foreground">
              VIEW ALL
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Arrow buttons — hidden on mobile (users swipe) */}
          <div className="mb-4 hidden justify-end gap-2 md:flex">
            <button
              onClick={() => scrollCarousel("left")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card transition-all hover:border-foreground/40 shadow-soft"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card transition-all hover:border-foreground/40 shadow-soft"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="relative">
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-4 md:snap-none snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
            >
              {treatments.map((product, i) => (
                <div
                  key={i}
                  className="flex-none w-[240px] md:w-[280px] snap-start cursor-pointer"
                  onClick={() => { setSelectedProduct(product); setProductModalOpen(true); }}
                >
                  {/* Image card */}
                  <div className="relative rounded-md overflow-hidden shadow-soft" style={{ aspectRatio: "280 / 320", background: "#F5EEEC" }}>
                    {product.badge && (
                      <div className="absolute top-4 left-4 flex items-center gap-1.5">
                        {product.badgeDot && (
                          <span className="h-2 w-2 rounded-full" style={{ background: "hsl(var(--primary))" }} />
                        )}
                        <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                          {product.badge}
                        </span>
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-6"
                    />
                  </div>
                  {/* Product info */}
                  <div className="mt-3 text-center">
                    <p className="font-heading text-lg font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Refer & How-to Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Refer and Earn */}
            <div
              className="relative overflow-hidden rounded-md"
              style={{ aspectRatio: "580 / 380" }}
            >
              <img
                src={referAndEarnImage}
                alt="Refer and earn"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
              {/* Top-left title */}
              <div className="absolute top-5 left-6">
                <h3 className="font-heading text-2xl font-medium text-white md:text-4xl">Refer and earn</h3>
              </div>
              {/* Bottom-left content */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm font-light text-white/90 leading-relaxed">
                  Share KWILT with friends and family and earn $50 in credit for every successful referral. Help someone you love take control of their health.
                </p>
                <button onClick={() => setReferralOpen(true)} className="link-arrow mt-3 text-white/80 hover:text-white">
                  Get your referral link
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* How to use KWILT */}
            <div
              className="relative overflow-hidden rounded-md"
              style={{ aspectRatio: "580 / 380" }}
            >
              <img
                src={howToUseImage}
                alt="How to use KWILT"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
              {/* Top-left title */}
              <div className="absolute top-5 left-6">
                <h3 className="font-heading text-2xl font-medium text-white md:text-4xl">How to use KWILT™</h3>
              </div>
              {/* Bottom-left content */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm font-light text-white/90 leading-relaxed">
                  New to KWILT? Learn how to get the most from your health plan — from reading your biomarker results to scheduling your first telehealth consultation.
                </p>
                <span className="link-arrow mt-3 text-white/80 cursor-default opacity-50">
                  Watch the guide
                  <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Disclaimer Footer — full width */}
      <footer className="border-t border-border px-4 pt-6 pb-8 lg:px-12 lg:pt-8 lg:pb-12">
        <p className="text-xs font-medium text-muted-foreground mb-3">©2025 kwilthealth</p>
        <p className="text-xs leading-relaxed text-muted-foreground max-w-4xl">
          The information provided by KWILT is for general informational and wellness purposes only and does not constitute medical advice, diagnosis, or treatment. KWILT is not a licensed medical provider. Always seek the guidance of your physician or other qualified health professional with any questions you may have regarding your health or a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read or received through the KWILT platform. Biomarker results and longevity scores are based on population-level data and individual results may vary. Prescription treatments are only available following a consultation with a licensed healthcare provider. KWILT complies with all applicable healthcare regulations and data privacy laws including HIPAA.
        </p>
      </footer>

      <ProductModal
        open={productModalOpen}
        onOpenChange={setProductModalOpen}
        product={selectedProduct}
        onProceedToQualification={(plan) => {
          setQualPlan(plan);
          setProductModalOpen(false);
          setQualModalOpen(true);
        }}
      />

      <ReferralModal open={referralOpen} onOpenChange={setReferralOpen} />

      <QualificationModal
        open={qualModalOpen}
        onOpenChange={(open) => {
          setQualModalOpen(open);
          if (!open) {
            setSelectedProduct(null);
            setQualPlan(null);
          }
        }}
        product={selectedProduct ? { name: selectedProduct.name, category: selectedProduct.category, image: selectedProduct.image } : null}
        plan={qualPlan}
      />
      {/* Lab Requisition Ready Modal */}
      {labReqModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md mx-4 rounded-2xl bg-background p-8 shadow-xl animate-scale-in">
            <button
              onClick={() => setLabReqModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
              Your Lab Requisition Is Ready
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground mb-6">
              Download your lab requisition form and bring it to your{" "}
              <span className="font-semibold text-foreground">Quest Diagnostics</span>{" "}
              appointment. You'll need it for your blood draw — you can show it digitally on your phone or print it if you prefer.
            </p>

            <div className="space-y-3">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                <Download className="h-4 w-4" />
                1. Download Requisition (PDF)
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                <ExternalLink className="h-4 w-4" />
                2. Book lab visit with Quest Diagnostics
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              You'll be redirected to QuestDiagnostics.com to complete your scheduling.
            </p>
          </div>
        </div>
      )}
      {wizardActive && (
        <WizardOverlay onComplete={() => { setWizardActive(false); setScenario("none"); }} />
      )}
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
