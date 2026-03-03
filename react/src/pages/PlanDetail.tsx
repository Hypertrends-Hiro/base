import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import MealPlanSection from "@/components/plan/MealPlanSection";

const categoryTitles: Record<string, string> = {
  nutrition: "Nutrition optimization",
  exercise: "Exercise & Movement",
  sleep: "Sleep optimization",
  diagnostics: "Diagnostics",
  wellness: "General Wellness",
  supplements: "Supplements",
};

const categoryDescriptions: Record<string, string> = {
  nutrition: "Personalized dietary recommendations based on your biomarker results and health goals.",
  exercise: "Movement and training guidance tailored to your fitness level and longevity targets.",
  sleep: "Evidence-based strategies to optimize your sleep quality and recovery.",
  diagnostics: "Recommended tests and screenings based on your risk profile.",
  wellness: "Holistic wellness practices to support your overall health journey.",
  supplements: "Targeted supplementation to address nutrient gaps identified in your labs.",
};

interface PillarData {
  title: string;
  description: string;
  score: number;
  maxScore: number;
  outOfRange: string[];
  inRange: string[];
}

const pillarData: PillarData[] = [
  {
    title: "Cardiovascular and metabolic health",
    description: "Heart function, cholesterol, blood sugar regulation, and metabolic markers.",
    score: 18,
    maxScore: 20,
    outOfRange: ["ApoB", "Lp(a)"],
    inRange: ["Total Cholesterol", "HDL-C", "LDL-C", "Triglycerides", "HbA1c", "Fasting Glucose", "Insulin", "hsCRP"],
  },
  {
    title: "Cancer prevention",
    description: "Markers related to inflammation, immune surveillance, and early detection.",
    score: 10,
    maxScore: 20,
    outOfRange: ["PSA", "CA-125", "CEA", "AFP", "Vitamin D"],
    inRange: ["WBC", "Lymphocytes", "Neutrophils", "Ferritin", "Iron"],
  },
  {
    title: "Brain health",
    description: "Cognitive function, neuroinflammation, and neuroprotective markers.",
    score: 20,
    maxScore: 20,
    outOfRange: [],
    inRange: ["Homocysteine", "Vitamin B12", "Folate", "Omega-3 Index", "BDNF"],
  },
  {
    title: "Bone and muscle care",
    description: "Skeletal integrity, muscle function, and related hormonal markers.",
    score: 20,
    maxScore: 20,
    outOfRange: [],
    inRange: ["Calcium", "Vitamin D", "Magnesium", "Phosphorus", "Testosterone", "DHEA-S"],
  },
  {
    title: "Additional insights",
    description: "Thyroid, liver, kidney function, and other systemic health markers.",
    score: 18,
    maxScore: 20,
    outOfRange: ["ALT", "GGT"],
    inRange: ["TSH", "Free T4", "Free T3", "Creatinine", "eGFR", "Albumin", "Bilirubin", "AST"],
  },
];

const notesText = `Based on your recent lab results, your nutritional profile shows strong metabolic health with a few areas for targeted improvement. Your cardiovascular markers are largely optimal, though ApoB and Lp(a) levels suggest a need for dietary adjustments focused on reducing saturated fat intake and increasing soluble fiber.

Your cancer prevention score indicates several markers that would benefit from an anti-inflammatory dietary approach — emphasizing cruciferous vegetables, omega-3 fatty acids, and limiting processed foods.

Brain health and bone & muscle markers are excellent, reflecting your current supplement regimen and active lifestyle. Continue prioritizing protein intake at 1.2–1.6g per kg of body weight to maintain these results.`;

export default function PlanDetail() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const title = categoryTitles[categoryId || ""] || "Plan Detail";
  const description = categoryDescriptions[categoryId || ""] || "";
  const [expandedIndex, setExpandedIndex] = useState(0);

  const handleToggle = (index: number) => {
    setExpandedIndex(index);
  };

  return (
    <>
      <div className="p-4 lg:p-12 space-y-8 max-w-6xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="font-heading text-2xl font-light lg:text-4xl">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">{description}</p>
          </div>
          <button
            onClick={() => navigate("/plan")}
            className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors flex items-center gap-1 shrink-0"
          >
            CLOSE<span className="text-lg">→</span>
          </button>
        </header>

        {/* Section heading */}
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Your summary &amp; longevity pillars
        </p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
          {/* Notes card */}
          <div className="bg-white rounded-xl p-6 shadow-soft lg:h-full lg:overflow-y-auto">
            <h3 className="font-heading text-lg font-medium text-foreground mb-3">Notes</h3>
            <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
              {notesText}
            </p>
          </div>

          {/* Pillar cards */}
          <div className="space-y-3">
            {pillarData.map((pillar, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-md overflow-hidden"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  {/* Card header */}
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-secondary/40"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-base font-medium text-foreground">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{pillar.description}</p>
                    </div>
                    <span className="font-heading text-2xl text-foreground shrink-0">
                      {pillar.score}/{pillar.maxScore}
                    </span>
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Out of range */}
                        <div className="bg-white border border-border rounded-md p-4">
                          <span className="inline-flex items-center rounded-md bg-kwilt-red/30 text-foreground px-2.5 py-0.5 text-xs font-normal">
                            out of range
                          </span>
                          <h5 className="text-xs font-medium uppercase tracking-wider text-foreground mt-3 mb-2">
                            Biomarkers
                          </h5>
                          {pillar.outOfRange.length > 0 ? (
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                              {pillar.outOfRange.map((marker) => (
                                <div key={marker} className="text-sm text-foreground flex items-center gap-2">
                                  <span className="w-1 h-1 rounded-full bg-foreground/40 shrink-0" />
                                  {marker}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">All markers in range</p>
                          )}
                        </div>

                        {/* In range */}
                        <div className="bg-white border border-border rounded-md p-4">
                          <span className="inline-flex items-center rounded-md bg-kwilt-blue/30 text-foreground px-2.5 py-0.5 text-xs font-normal">
                            in range
                          </span>
                          <h5 className="text-xs font-medium uppercase tracking-wider text-foreground mt-3 mb-2">
                            Biomarkers
                          </h5>
                          {pillar.inRange.length > 0 ? (
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                              {pillar.inRange.map((marker) => (
                                <div key={marker} className="text-sm text-foreground flex items-center gap-2">
                                  <span className="w-1 h-1 rounded-full bg-foreground/40 shrink-0" />
                                  {marker}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No markers in range</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 7-Day Meal Plan */}
        <MealPlanSection />
      </div>
    </>
  );
}
