import { useState, useMemo } from "react";
import { ProductModal } from "@/components/cart/ProductModal";
import { QualificationModal } from "@/components/cart/QualificationModal";
import { useScenario } from "@/contexts/ScenarioContext";
import productSemaglutide from "@/assets/product-semaglutide.png";
import productBalance from "@/assets/product-balance.png";
import productGlp1 from "@/assets/product-glp1.png";
import productNad from "@/assets/product-nad.png";
import productHrt from "@/assets/product-hrt.png";

interface Product {
  name: string;
  category: string;
  filterCategory: string;
  image: string;
  price: number;
  description: string;
  healthSignals: string[];
  status: "available" | "active" | "ineligible";
}

const products: Product[] = [
  {
    name: "Tirzepatide",
    category: "Weight Management",
    filterCategory: "Weight Management",
    image: productGlp1,
    price: 199,
    description:
      "Dual GIP/GLP-1 receptor agonist that targets multiple pathways for effective weight management and metabolic improvement.",
    healthSignals: ["BMI", "Blood Sugar", "Appetite Regulation", "Insulin Sensitivity"],
    status: "available",
  },
  {
    name: "Semaglutide",
    category: "Weight Management",
    filterCategory: "Weight Management",
    image: productSemaglutide,
    price: 149,
    description:
      "GLP-1 receptor agonist that helps regulate appetite and blood sugar levels for sustainable weight management.",
    healthSignals: ["BMI", "Blood Sugar", "Appetite Regulation", "Metabolic Health"],
    status: "active",
  },
  {
    name: "NAD+ Therapy",
    category: "Longevity",
    filterCategory: "Longevity",
    image: productNad,
    price: 199,
    description:
      "Boost cellular energy and support healthy aging with NAD+ precursor supplementation.",
    healthSignals: ["Cellular Health", "Energy Levels", "Cognitive Function", "DNA Repair"],
    status: "available",
  },
  {
    name: "HRT (Hormone Therapy)",
    category: "Hormone & Menopause Health",
    filterCategory: "Hormone & Menopause Health",
    image: productHrt,
    price: 179,
    description:
      "Personalized hormone replacement therapy to restore balance and alleviate symptoms of hormonal decline.",
    healthSignals: ["Estrogen", "Progesterone", "Testosterone", "Thyroid"],
    status: "available",
  },
  {
    name: "GLP-1 Compound",
    category: "Weight Management",
    filterCategory: "Weight Management",
    image: productGlp1,
    price: 249,
    description:
      "Advanced compounded GLP-1 formulation designed for enhanced metabolic support and weight loss.",
    healthSignals: ["Insulin Sensitivity", "Appetite Control", "Body Composition"],
    status: "available",
  },
  {
    name: "Metformin",
    category: "Longevity",
    filterCategory: "Longevity",
    image: productBalance,
    price: 49,
    description:
      "Time-tested medication now used for longevity benefits including improved insulin sensitivity and cellular health.",
    healthSignals: ["Blood Sugar", "Insulin Sensitivity", "Inflammation", "Aging Biomarkers"],
    status: "active",
  },
  {
    name: "Immune Support IV",
    category: "Immune & Inflammation",
    filterCategory: "Immune & Inflammation",
    image: productNad,
    price: 299,
    description:
      "High-dose vitamin and mineral IV infusion to strengthen immune response and reduce chronic inflammation.",
    healthSignals: ["Immune Function", "Inflammation Markers", "Vitamin Levels"],
    status: "ineligible",
  },
];

const filterChips = [
  "Recommended",
  "View All",
  "Immune & Inflammation",
  "Hormone & Menopause Health",
  "Longevity",
  "Weight Management",
];

export function ExploreAllTreatments() {
  const { scenario } = useScenario();
  const isDemoScenario = scenario !== "none" && scenario !== "default-with-wizard" && scenario !== "new-rx-ordered";
  const [activeFilter, setActiveFilter] = useState(isDemoScenario ? "View All" : "Recommended");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [qualModalOpen, setQualModalOpen] = useState(false);
  const [qualPlan, setQualPlan] = useState<{ label: string; pricePerMonth: number; months: number } | null>(null);

  const visibleChips = isDemoScenario
    ? filterChips.filter((c) => c !== "Recommended")
    : filterChips;

  const noActiveProducts = scenario === "default-with-wizard";
  const scenarioProducts = useMemo(() => {
    if (scenario === "new-rx-ordered") {
      return products.map((p) => {
        if (p.name === "Tirzepatide") return { ...p, status: "active" as const };
        if (p.status === "active") return { ...p, status: "available" as const };
        return p;
      });
    }
    if (isDemoScenario || noActiveProducts) {
      return products.map((p) => p.status === "active" ? { ...p, status: "available" as const } : p);
    }
    return products;
  }, [isDemoScenario, noActiveProducts, scenario]);

  const filtered =
    activeFilter === "Recommended" || activeFilter === "View All"
      ? scenarioProducts
      : scenarioProducts.filter((p) => p.filterCategory === activeFilter);

  const filteredProducts = [...filtered].sort((a, b) => {
    const order = { available: 0, active: 1, ineligible: 1 };
    return order[a.status] - order[b.status];
  });

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleProceedToQualification = (plan: { label: string; pricePerMonth: number; months: number }) => {
    setQualPlan(plan);
    setQualModalOpen(true);
  };

  return (
    <section className="mt-12">
      <h2 className="font-heading text-2xl font-medium lg:text-4xl mb-6">
        Explore all treatments
      </h2>

      {/* Filter links */}
      <div
        className="flex gap-6 overflow-x-auto pb-4 mb-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {visibleChips.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveFilter(chip)}
            className={`whitespace-nowrap text-sm font-light transition-colors pb-1 flex items-center gap-1.5 ${
              activeFilter === chip
                ? "text-foreground border-b-2 border-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {chip === "Recommended" && (
              <span className="h-2 w-2 rounded-full flex-none" style={{ background: "#FF816B" }} />
            )}
            {chip}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.name} className="flex flex-col">
            {/* Image card */}
            <div
              className="relative rounded-xl overflow-hidden p-6 flex items-center justify-center aspect-square"
              style={{ background: "#F5EEEC" }}
            >
              {/* Badge - dot + text */}
              <span className="absolute top-4 left-4 flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#E07A5F" }} />
                <span className="text-[10px] font-medium tracking-wider uppercase text-foreground">
                  Lab required
                </span>
              </span>
              {/* Price tag */}
              <span
                className="absolute top-4 right-4 text-xs px-3 py-1.5 rounded-lg"
                style={{ background: "#E5DFDB" }}
              >
                From: <span className="font-medium">${product.price}</span>/mo
              </span>
              <img
                src={product.image}
                alt={product.name}
                className="h-[60%] w-auto object-contain"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col flex-1 pt-4 pb-2">
              <h3 className="font-heading text-lg font-medium">{product.name}</h3>
              <p className="text-sm font-light text-muted-foreground mt-2">
                {product.category}
              </p>
              <p className="text-sm font-light mt-2 leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Divider */}
              <div className="mt-4 mb-4 border-t" style={{ borderColor: "#B3B1B1" }} />

              {/* Health signals */}
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide">Health Signals</p>
                <div className="flex flex-col gap-2 items-start">
                  {product.healthSignals.map((signal) => (
                    <span
                      key={signal}
                      className="text-xs font-light px-3 py-2 rounded-md text-foreground"
                      style={{ background: "#F5F1F0" }}
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action button */}
              <div className="mt-auto pt-5">
                {product.status === "available" ? (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full rounded-md bg-primary py-3 text-sm font-light text-foreground hover:bg-primary/90 transition-colors uppercase tracking-wide"
                  >
                    Add to cart
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full rounded-md py-3 text-sm font-light uppercase tracking-wide bg-muted text-muted-foreground cursor-not-allowed"
                  >
                    {product.status === "active" ? "Already active" : "Ineligible"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      <ProductModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onProceedToQualification={handleProceedToQualification}
        product={
          selectedProduct
            ? {
                name: selectedProduct.name,
                category: selectedProduct.category,
                image: selectedProduct.image,
                price: `$${selectedProduct.price}`,
              }
            : null
        }
      />

      {/* Qualification Modal */}
      <QualificationModal
        open={qualModalOpen}
        onOpenChange={setQualModalOpen}
        product={
          selectedProduct
            ? {
                name: selectedProduct.name,
                category: selectedProduct.category,
                image: selectedProduct.image,
              }
            : null
        }
        plan={qualPlan}
      />
    </section>
  );
}
