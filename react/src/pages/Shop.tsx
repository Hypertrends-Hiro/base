import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/home/Header";
import { ArrowRight, Instagram, Youtube, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";
import kwiltLogoDark from "@/assets/kwilt-logo-dark.png";

import womanHairWind from "@/assets/woman-hair-wind.jpg";
import womanSkincare from "@/assets/woman-skincare.jpg";
import handSunset from "@/assets/hand-sunset.jpg";
import howToUse from "@/assets/how-to-use-kwilt.png";
import appMockup from "@/assets/app-phone-mockup.png";

import productSemaglutide from "@/assets/product-semaglutide.png";
import productBalance from "@/assets/product-balance.png";
import productGlp1 from "@/assets/product-glp1.png";
import productHrt from "@/assets/product-hrt.png";
import productNad from "@/assets/product-nad.png";

/* ── Product data ── */

interface Product {
  name: string;
  subtitle: string;
  price: string;
  image: string;
  categories: string[];
}

const products: Product[] = [
  {
    name: "KWILT Essentials",
    subtitle: "Daily longevity supplement stack",
    price: "$149/mo",
    image: productBalance,
    categories: ["all", "longevity"],
  },
  {
    name: "Metformin",
    subtitle: "Metabolic optimization",
    price: "$99/mo",
    image: productGlp1,
    categories: ["all", "metabolic"],
  },
  {
    name: "Semaglutide",
    subtitle: "GLP-1 receptor agonist",
    price: "$199/mo",
    image: productSemaglutide,
    categories: ["all", "metabolic"],
  },
  {
    name: "Tretinoin",
    subtitle: "Topical retinoid for skin renewal",
    price: "$59/mo",
    image: productNad,
    categories: ["all", "aesthetic"],
  },
  {
    name: "NAD+ Booster",
    subtitle: "Cellular energy & repair",
    price: "$129/mo",
    image: productNad,
    categories: ["all", "longevity"],
  },
  {
    name: "HRT Balance",
    subtitle: "Hormone optimization therapy",
    price: "$179/mo",
    image: productHrt,
    categories: ["all", "sexual", "aesthetic"],
  },
];

const categoryTabs = [
  { id: "all", label: "All" },
  { id: "longevity", label: "Longevity Essentials" },
  { id: "sexual", label: "Sexual Health" },
  { id: "metabolic", label: "Metabolic Health" },
  { id: "aesthetic", label: "Aesthetic & Feminine" },
  { id: "hair", label: "Hair + Nails" },
];

/* ── Feature cards ── */

const features = [
  {
    title: "Connect with a provider",
    description:
      "Get matched with a medical provider who understands your unique goals. From labs to medications, our team builds your plan from the inside out, making you a partner in your care, not a patient.",
    image: handSunset,
  },
  {
    title: "Convenient delivery",
    description:
      "Your treatments are compounded and shipped right to your door — no pharmacy lines, no waiting. A seamless delivery experience built around your schedule and preferences.",
    image: howToUse,
  },
  {
    title: "Track your progress",
    description:
      "With biomarker data and insights right at your fingertips, watch your results improve over time. Real metrics, real progress — and a plan that evolves with you.",
    image: appMockup,
  },
];

/* ── Page ── */

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = products.filter((p) =>
    p.categories.includes(activeCategory)
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ── */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <img
          src={womanHairWind}
          alt="Products formulated for results"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-16 pb-16 md:pb-20 max-w-2xl">
          <h1 className="font-heading text-3xl md:text-5xl font-light text-white leading-tight">
            Products formulated to combat the effects of aging with ingredients
            that create real results.
          </h1>
          <p className="mt-4 font-heading text-xl md:text-2xl font-light text-white/90">
            Results you can feel.
          </p>
          <Link
            to="/register"
            className="mt-6 inline-flex items-center gap-2 text-primary text-lg font-medium hover:gap-3 transition-all"
          >
            Get Started <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* ── Category Tabs ── */}
      <div className="border-b border-border sticky top-[72px] z-40 bg-background">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
          <div className="flex gap-0">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={cn(
                  "whitespace-nowrap px-5 py-4 text-sm font-medium transition-colors border-b-2",
                  activeCategory === tab.id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="font-heading text-2xl font-light mb-8">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {filteredProducts.map((product) => (
            <div key={product.name} className="flex flex-col">
              {/* Product image */}
              <div className="aspect-square rounded-xl overflow-hidden bg-[#EDE8E2] flex items-center justify-center p-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
              </div>
              {/* Info */}
              <div className="mt-4 space-y-1">
                <h3 className="font-heading text-base font-medium">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {product.subtitle}
                </p>
                <p className="text-sm font-medium">{product.price}</p>
              </div>
              {/* CTA */}
              <button className="mt-3 w-full rounded-md bg-primary py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Add to Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Longevity Journey Section ── */}
      <section className="relative overflow-hidden">
        <img
          src={womanSkincare}
          alt="Everyone's longevity journey is unique"
          className="w-full h-[70vh] min-h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        <div className="absolute inset-0 flex items-center p-8 md:p-16">
          <div className="max-w-lg">
            <h2 className="font-heading text-3xl md:text-5xl font-light text-white leading-tight">
              Everyone's
              <br />
              longevity
              <br />
              journey is
              <br />
              unique
            </h2>
            <p className="mt-6 text-sm text-white/80 leading-relaxed max-w-sm">
              You're not just investing in medicine, you're investing in your 
              body's future potential. KWILT's approach combines cutting-edge 
              science with personalized care to build a plan that's as 
              individual as you are, because the best results come from 
              understanding what makes you, you.
            </p>
          </div>
        </div>
      </section>

      {/* ── A plan designed with you in mind ── */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-light leading-tight">
            A plan
            <br />
            designed
            <br />
            with you in
            <br />
            mind
          </h2>
          <Link
            to="/assessment"
            className="mt-8 inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all"
          >
            Start Assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            After completing the health assessment, you'll receive your 
            personalized KWILT plan — a roadmap to optimized longevity.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-4">
            Our licensed providers review your results to create a 
            comprehensive plan designed for your unique physiology. 
            Including personalized supplement stacks, curated 
            treatment recommendations, and lifestyle guidance 
            tailored to your health goals and biomarker data — a truly 
            individualized longevity plan.
          </p>
        </div>
      </section>

      {/* ── We are here for you ── */}
      <section className="bg-[#F5F1F0] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-light mb-10">
            We are here for you
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col">
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-heading text-lg font-medium mt-5">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-heading text-3xl md:text-4xl font-light">
          Redefine what it means to age.
        </h2>
        <Link
          to="/register"
          className="mt-4 inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all"
        >
          Get Started <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Top row: socials + email */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="text-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="YouTube" className="text-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Facebook" className="text-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <div className="flex items-center gap-2 border border-border rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="email@email.com"
                className="px-4 py-2.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground w-52"
              />
              <button className="px-4 py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors border-l border-border">
                Subscribe
              </button>
            </div>
          </div>

          {/* Logo */}
          <div className="mb-8">
            <h3 className="font-heading text-6xl md:text-8xl font-bold tracking-tight text-foreground leading-none">
              KWILT<span className="text-2xl md:text-3xl align-super">™</span>
            </h3>
            <p className="text-sm font-medium text-foreground mt-2">
              Longevity. Optimized.
            </p>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-8">
            <div className="space-y-2">
              <p className="font-medium text-foreground">Shop</p>
              <p className="text-muted-foreground">All products</p>
              <p className="text-muted-foreground">Plans</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-foreground">Membership</p>
              <p className="text-muted-foreground">Benefits</p>
              <p className="text-muted-foreground">Labs</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-foreground">Help</p>
              <p className="text-muted-foreground">Support</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-foreground">More</p>
              <p className="text-muted-foreground">Careers</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            ©2025 kwilthealth.com
          </p>
        </div>
      </footer>
    </div>
  );
}
