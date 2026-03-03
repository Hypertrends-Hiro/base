import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface BiomarkerItem {
  name: string;
  status: "above" | "below" | "out" | "optimal";
  value?: string;
}

interface BiomarkerCategory {
  title: string;
  markers: BiomarkerItem[];
}

const statusLabel: Record<string, string> = {
  above: "Above Range",
  below: "Below Range",
  out: "Out of Range",
  optimal: "In Range",
};

const statusDotColor: Record<string, string> = {
  above: "bg-kwilt-red",
  below: "bg-kwilt-honey",
  out: "bg-kwilt-red",
  optimal: "bg-kwilt-green",
};

const categories: BiomarkerCategory[] = [
  {
    title: "Cardiovascular Health Markers",
    markers: [
      { name: "Lipid Panel (Total Chol, LDL, HDL, Triglycerides)", status: "above", value: "264 nmol/L" },
      { name: "ApoB – Total atherogenic particles", status: "above", value: "264 nmol/L" },
      { name: "Lipoprotein(a) – Genetic cholesterol risk", status: "out" },
      { name: "Homocysteine – Vascular inflammation", status: "above", value: "264 nmol/L" },
      { name: "Omega-3 Index – Protective fatty acids", status: "below", value: "336 nmol/L" },
      { name: "hs-CRP – Arterial inflammation", status: "above", value: "264 nmol/L" },
      { name: "CMP / Urinalysis / Cortisol / Lead – Kidney, stress, toxin load", status: "above", value: "176 mg/L" },
    ],
  },
  {
    title: "Metabolic Health Markers",
    markers: [
      { name: "Fasting Glucose", status: "optimal", value: "92 mg/dL" },
      { name: "HbA1c – Long-term blood sugar", status: "optimal", value: "5.2%" },
      { name: "Insulin – Fasting level", status: "optimal", value: "6.4 µIU/mL" },
      { name: "HOMA-IR – Insulin resistance index", status: "optimal", value: "1.5" },
    ],
  },
  {
    title: "Organ-Function Panels (Liver, Kidney, Pancreas)",
    markers: [
      { name: "ALT – Liver enzyme", status: "optimal", value: "22 U/L" },
      { name: "AST – Liver enzyme", status: "optimal", value: "19 U/L" },
      { name: "GGT – Liver/bile duct", status: "above", value: "58 U/L" },
      { name: "BUN – Kidney function", status: "optimal", value: "14 mg/dL" },
      { name: "Creatinine – Kidney filtration", status: "optimal", value: "0.9 mg/dL" },
      { name: "eGFR – Kidney efficiency", status: "optimal", value: "98 mL/min" },
    ],
  },
  {
    title: "Hormonal Health Markers",
    markers: [
      { name: "Total Testosterone", status: "below", value: "380 ng/dL" },
      { name: "Free Testosterone", status: "below", value: "8.2 pg/mL" },
      { name: "DHEA-S – Adrenal hormone", status: "optimal", value: "310 µg/dL" },
      { name: "Cortisol – Stress hormone", status: "above", value: "22 µg/dL" },
      { name: "Estradiol", status: "optimal", value: "28 pg/mL" },
    ],
  },
  {
    title: "Thyroid Function",
    markers: [
      { name: "TSH – Thyroid stimulating hormone", status: "optimal", value: "2.1 mIU/L" },
      { name: "Free T4 – Active thyroid hormone", status: "optimal", value: "1.2 ng/dL" },
      { name: "Free T3 – Cellular thyroid hormone", status: "optimal", value: "3.1 pg/mL" },
    ],
  },
  {
    title: "Inflammation & Immune Markers",
    markers: [
      { name: "Lipid Panel (Total Chol, LDL, HDL, Triglycerides)", status: "above", value: "264 nmol/L" },
      { name: "ApoB – Total atherogenic particles", status: "above", value: "264 nmol/L" },
      { name: "Lipoprotein(a) – Genetic cholesterol risk", status: "out" },
      { name: "Homocysteine – Vascular inflammation", status: "above", value: "264 nmol/L" },
      { name: "Omega-3 Index – Protective fatty acids", status: "below", value: "336 nmol/L" },
      { name: "hs-CRP – Arterial inflammation", status: "above", value: "264 nmol/L" },
      { name: "CMP / Urinalysis / Cortisol / Lead – Kidney, stress, toxin load", status: "above", value: "176 mg/L" },
    ],
  },
  {
    title: "Nutritional Status Markers",
    markers: [
      { name: "Vitamin D – Immune & bone health", status: "below", value: "22 ng/mL" },
      { name: "Vitamin B12 – Neural support", status: "optimal", value: "680 pg/mL" },
      { name: "Folate – Cell repair", status: "optimal", value: "14 ng/mL" },
      { name: "Iron / Ferritin – Oxygen transport", status: "above", value: "310 ng/mL" },
      { name: "Magnesium – Muscle & nerve function", status: "optimal", value: "2.1 mg/dL" },
    ],
  },
  {
    title: "Heavy-Metal / Toxin Markers",
    markers: [
      { name: "Lead – Environmental toxin", status: "optimal", value: "1.2 µg/dL" },
      { name: "Mercury – Heavy metal exposure", status: "optimal", value: "3.1 µg/L" },
    ],
  },
  {
    title: "Cancer-Screening Marker",
    markers: [
      { name: "PSA – Prostate screening", status: "optimal", value: "0.8 ng/mL" },
    ],
  },
  {
    title: "Cognitive-Health Markers (Neurodegenerative Risk)",
    markers: [
      { name: "Homocysteine – Neurovascular risk", status: "above", value: "12 µmol/L" },
      { name: "Omega-3 Index – Neuroprotection", status: "below", value: "4.2%" },
      { name: "Vitamin B12 – Neural support", status: "optimal", value: "680 pg/mL" },
    ],
  },
  {
    title: "General-Health / Other Markers",
    markers: [
      { name: "CBC – Complete blood count", status: "optimal", value: "Normal" },
      { name: "Uric Acid – Gout & metabolic risk", status: "optimal", value: "5.4 mg/dL" },
    ],
  },
];

function CategoryRow({ category }: { category: BiomarkerCategory }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-md bg-card shadow-soft">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-4 md:px-6"
      >
        <span className="font-heading text-base font-medium">{category.title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            expanded && "rotate-180"
          )}
        />
      </button>

      {expanded && (
        <div className="animate-fade-in border-t border-border px-4 pb-4 md:px-6">
          <ul className="divide-y divide-border">
            {category.markers.map((m) => (
              <li key={m.name} className="py-3 first:pt-3 last:pb-0">
                <p className="text-sm leading-snug text-foreground">{m.name}</p>
                <p className="flex items-center gap-1.5 text-xs font-medium mt-0.5">
                  <span className={cn("h-2 w-2 rounded-full flex-shrink-0", statusDotColor[m.status])} />
                  <span className="text-foreground">{statusLabel[m.status]}</span>
                  {m.value && <span className="text-foreground">– {m.value}</span>}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function BiomarkerCategories() {
  const totalMarkers = categories.reduce((sum, c) => sum + c.markers.length, 0);

  return (
    <section className="mt-10">
      <h2 className="font-heading text-2xl font-medium lg:text-4xl mb-5">
        All Biomarkers
      </h2>
      <div className="space-y-3">
        {categories.map((c) => (
          <CategoryRow key={c.title} category={c} />
        ))}
      </div>
    </section>
  );
}
