import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubscriptionPlan {
  label: string;
  months: number;
  pricePerMonth: number;
}

const plans: SubscriptionPlan[] = [
  { label: "MONTHLY", months: 1, pricePerMonth: 280 },
  { label: "3 MONTHS", months: 3, pricePerMonth: 270 },
  { label: "6 MONTHS", months: 6, pricePerMonth: 260 },
  { label: "12 MONTHS", months: 12, pricePerMonth: 250 },
];

// Product detail data keyed by product name
const productDetails: Record<string, {
  description: string;
  tags: string[];
  benefits: string[];
  howToUse: string;
}> = {
  Semaglutide: {
    description: "Injectable peptides that gently slow digestion and help quiet cravings, while supporting a more balanced relationship with food, more stable blood sugar, and it often leads to 15% body-weight reduction.",
    tags: ["Appetite", "Metabolic"],
    benefits: [
      "Clinically proven for sustainable weight loss",
      "Improves insulin sensitivity & blood sugar",
      "Reduces appetite and food cravings",
      "Supports cardiovascular health markers",
    ],
    howToUse: "Administered as a weekly subcutaneous injection. Start at a low dose and titrate up over 4–8 weeks as directed by your provider. Store refrigerated.",
  },
  "NAD+ Therapy": {
    description: "Boost cellular energy production and support healthy aging with NAD+ precursor therapy, targeting mitochondrial function, DNA repair, and cognitive clarity.",
    tags: ["Longevity", "Energy"],
    benefits: [
      "Enhances cellular energy & mitochondrial health",
      "Supports DNA repair and cognitive function",
      "May slow age-related cellular decline",
      "Improves mental clarity and focus",
    ],
    howToUse: "Oral supplement taken daily with food. Recommended dosage is determined during your consultation based on your biomarker profile.",
  },
  "HRT (Hormone Therapy)": {
    description: "Personalized hormone replacement therapy to restore hormonal balance, alleviate symptoms of decline, and support bone density, mood, and vitality.",
    tags: ["Hormone", "Wellness"],
    benefits: [
      "Restores hormonal balance naturally",
      "Alleviates menopause & andropause symptoms",
      "Supports bone density and lean muscle",
      "Improves mood, sleep, and energy levels",
    ],
    howToUse: "Customized delivery method (topical, injection, or pellet) determined by your provider based on lab results and symptoms. Regular monitoring required.",
  },
  "GLP-1 Compound": {
    description: "Advanced compounded GLP-1 formulation designed for enhanced metabolic support, appetite regulation, and body composition improvement.",
    tags: ["Weight", "Metabolic"],
    benefits: [
      "Enhanced metabolic support formulation",
      "Sustained appetite and craving control",
      "Improved body composition outcomes",
      "Better tolerability with compounded dosing",
    ],
    howToUse: "Weekly subcutaneous injection with a gradual dose escalation schedule. Your provider will customize the titration based on your response and tolerance.",
  },
  Metformin: {
    description: "Time-tested medication now used for longevity benefits including improved insulin sensitivity, reduced inflammation, and cellular health optimization.",
    tags: ["Longevity", "Metabolic"],
    benefits: [
      "Improves insulin sensitivity",
      "Reduces chronic inflammation markers",
      "Supports healthy aging biomarkers",
      "Well-studied safety profile over decades",
    ],
    howToUse: "Oral tablet taken once or twice daily with meals. Start with a low dose and increase gradually. Extended-release formulation available for better tolerance.",
  },
  Balance: {
    description: "A comprehensive weight management solution combining targeted nutrients and metabolic support for sustainable, healthy weight loss.",
    tags: ["Weight", "Nutrition"],
    benefits: [
      "Supports healthy metabolism",
      "Promotes satiety and portion control",
      "Nutrient-dense formula for energy",
      "Complements diet and exercise routines",
    ],
    howToUse: "Take as directed daily with your first meal. Best results when combined with the nutrition plan from your KWILT dashboard.",
  },
  "GLP-1 Assist": {
    description: "A supportive formulation designed to work alongside GLP-1 therapy, helping manage side effects and optimize treatment outcomes.",
    tags: ["Weight", "Support"],
    benefits: [
      "Reduces common GLP-1 side effects",
      "Supports nutrient absorption during treatment",
      "Helps maintain lean muscle mass",
      "Optimizes overall treatment outcomes",
    ],
    howToUse: "Daily oral supplement taken with food. Designed to complement your GLP-1 injection protocol. Follow your provider's specific guidance.",
  },
  "NAD+": {
    description: "Boost cellular energy production and support healthy aging with NAD+ precursor therapy, targeting mitochondrial function, DNA repair, and cognitive clarity.",
    tags: ["Longevity", "Energy"],
    benefits: [
      "Enhances cellular energy & mitochondrial health",
      "Supports DNA repair and cognitive function",
      "May slow age-related cellular decline",
      "Improves mental clarity and focus",
    ],
    howToUse: "Oral supplement taken daily with food. Recommended dosage is determined during your consultation based on your biomarker profile.",
  },
  Tirzepatide: {
    description: "Dual GIP/GLP-1 receptor agonist offering powerful appetite control and metabolic improvement, with clinical data showing significant weight reduction outcomes.",
    tags: ["Weight", "Metabolic"],
    benefits: [
      "Dual-action GIP and GLP-1 targeting",
      "Superior weight loss outcomes in trials",
      "Significant A1C and blood sugar improvement",
      "Cardiovascular benefit potential",
    ],
    howToUse: "Weekly subcutaneous injection. Begin at a starting dose and titrate up every 4 weeks as tolerated. Refrigerate unused pens.",
  },
};

const defaultDetails = {
  description: "A personalized treatment designed to support your health goals based on your biomarker profile and clinical assessment.",
  tags: ["Health", "Wellness"],
  benefits: [
    "Personalized to your biomarker profile",
    "Clinician-supervised treatment plan",
    "Ongoing monitoring and adjustments",
    "Supports your overall health goals",
  ],
  howToUse: "Follow the dosage and schedule prescribed by your KWILT clinician. Regular check-ins ensure optimal results.",
};

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    name: string;
    category: string;
    image: string;
    price?: string;
  } | null;
  onProceedToQualification?: (plan: { label: string; pricePerMonth: number; months: number }) => void;
}

export function ProductModal({ open, onOpenChange, product, onProceedToQualification }: ProductModalProps) {
  const [selectedPlan, setSelectedPlan] = useState("MONTHLY");
  const [pricingExpanded, setPricingExpanded] = useState(true);
  const [howToUseOpen, setHowToUseOpen] = useState(false);
  const [benefitsOpen, setBenefitsOpen] = useState(false);
  const { addToCart } = useCart();

  if (!product) return null;

  const plan = plans.find((p) => p.label === selectedPlan)!;
  const lowestPrice = plans[plans.length - 1].pricePerMonth;
  const details = productDetails[product.name] || defaultDetails;

  const handleAddToCart = () => {
    if (onProceedToQualification) {
      onProceedToQualification({ label: plan.label, pricePerMonth: plan.pricePerMonth, months: plan.months });
      onOpenChange(false);
    } else {
      addToCart({
        name: product.name,
        category: product.category,
        image: product.image,
        plan: plan.label,
        pricePerMonth: plan.pricePerMonth,
        months: plan.months,
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[860px] p-0 gap-0 overflow-hidden max-h-[90vh]"
        style={{ background: "#F5F1F0" }}
      >
        <div className="flex flex-col sm:flex-row max-h-[90vh]">
          {/* Left: Product Image */}
          <div
            className="sm:w-[45%] flex items-center justify-center p-8 sm:p-10 flex-shrink-0"
            style={{ background: "#F5EEEC" }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[200px] sm:max-h-[320px] w-auto object-contain"
            />
          </div>

          {/* Right: Details */}
          <div className="sm:w-[55%] overflow-y-auto p-5 sm:p-6 flex flex-col gap-0">
            {/* Tags */}
            <div className="flex gap-2 mb-3">
              {details.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium tracking-wider uppercase px-3 py-1 rounded-full border border-foreground/20 text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <DialogHeader className="pb-0 space-y-0">
              <DialogTitle className="font-heading text-xl sm:text-2xl font-light text-foreground leading-tight">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            {/* Description */}
            <p className="text-sm font-light leading-relaxed text-muted-foreground mt-2">
              {details.description}
            </p>

            {/* Benefits checklist */}
            <div className="mt-4 space-y-2">
              {details.benefits.map((b) => (
                <div key={b} className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 mt-0.5 text-primary flex-shrink-0" />
                  <span className="text-sm font-light text-foreground">{b}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-foreground/10 mt-4" />

            {/* Member pricing — expanded by default */}
            <button
              onClick={() => setPricingExpanded(!pricingExpanded)}
              className="flex items-center justify-between py-3 w-full text-left"
              style={{ background: "transparent" }}
            >
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="text-sm font-medium tracking-wide uppercase text-foreground">Member Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">FROM ${lowestPrice}</span>
                <ChevronDown className={cn("h-4 w-4 text-foreground transition-transform duration-200", pricingExpanded && "rotate-180")} />
              </div>
            </button>

            {pricingExpanded && (
              <RadioGroup
                value={selectedPlan}
                onValueChange={setSelectedPlan}
                className="divide-y divide-border/40 rounded-md mb-1"
                style={{ background: "#E5DFDB" }}
              >
                {plans.map((p) => (
                  <label
                    key={p.label}
                    className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-black/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={p.label} className="border-foreground text-foreground" />
                      <span className="text-sm font-light tracking-wide uppercase text-foreground">{p.label}</span>
                    </div>
                    <span className="text-sm font-light text-muted-foreground">${p.pricePerMonth}/mo</span>
                  </label>
                ))}
              </RadioGroup>
            )}

            {/* Add to cart CTA */}
            <button
              onClick={handleAddToCart}
              className="mt-3 w-full rounded-md bg-primary py-3.5 text-sm font-light uppercase tracking-wide text-foreground hover:bg-primary/90 transition-colors"
            >
              Add to cart
            </button>

            {/* How to Use accordion */}
            <div className="border-t border-foreground/10 mt-4" />
            <button
              onClick={() => setHowToUseOpen(!howToUseOpen)}
              className="flex items-center justify-between py-3 w-full text-left"
            >
              <span className="text-sm font-medium uppercase tracking-wide text-foreground">How to use</span>
              <ChevronDown className={cn("h-4 w-4 text-foreground transition-transform duration-200", howToUseOpen && "rotate-180")} />
            </button>
            {howToUseOpen && (
              <p className="text-sm font-light text-muted-foreground pb-3 -mt-1 leading-relaxed">
                {details.howToUse}
              </p>
            )}

            {/* Benefits accordion */}
            <div className="border-t border-foreground/10" />
            <button
              onClick={() => setBenefitsOpen(!benefitsOpen)}
              className="flex items-center justify-between py-3 w-full text-left"
            >
              <span className="text-sm font-medium uppercase tracking-wide text-foreground">Benefits</span>
              <ChevronDown className={cn("h-4 w-4 text-foreground transition-transform duration-200", benefitsOpen && "rotate-180")} />
            </button>
            {benefitsOpen && (
              <ul className="text-sm font-light text-muted-foreground pb-3 -mt-1 leading-relaxed space-y-1 list-disc pl-4">
                {details.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
