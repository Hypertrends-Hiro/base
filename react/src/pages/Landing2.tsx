import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { Instagram, Facebook, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import heroRocky from "@/assets/hero-rocky.jpg";
import heroWater from "@/assets/hero-water.jpg";
import kwiltLogoDark from "@/assets/kwilt-logo-dark.png";
import womanHairWind from "@/assets/woman-hair-wind.jpg";
import womanSkincare from "@/assets/woman-skincare.jpg";
import lifestyleMeditation from "@/assets/lifestyle-meditation.jpg";
import longevityRunning from "@/assets/longevity-running.jpg";
import paddleboardSunset from "@/assets/paddleboard-sunset.jpg";
import surferSunset from "@/assets/surfer-sunset.png";
import nutrientsFood from "@/assets/nutrients-food.jpg";
import therapyCard1 from "@/assets/therapy-card-1.jpg";
import therapyCard2 from "@/assets/therapy-card-2.jpg";
import therapyCard3 from "@/assets/therapy-card-3.jpg";
import therapyCard4 from "@/assets/therapy-card-4.jpg";
import handSunset from "@/assets/hand-sunset.jpg";
import womanSwimwear from "@/assets/woman-swimwear.jpg";
import appPhoneMockup from "@/assets/app-phone-mockup.png";
import womanRelaxing from "@/assets/woman-relaxing.jpg";
import longevityCard from "@/assets/longevity-card.jpg";
import biologicalAgeCard from "@/assets/biological-age-card.jpg";
import resultsUiCard from "@/assets/results-ui-card.png";
import storyCard1 from "@/assets/story-card-1.jpg";
import storyCard2 from "@/assets/story-card-2.jpg";
import storyCard3 from "@/assets/story-card-3.jpg";
import storyCard4 from "@/assets/story-card-4.jpg";

// ── Animation Hooks ──────────────────────────────────────────────────────────

function useFadeIn(delay = 0, threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return {
    ref,
    style: { transitionDelay: `${delay}ms` },
    className: `transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
  };
}

function useSlideIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return {
    ref,
    style: { transitionDelay: `${delay}ms` },
    className: `transition-all duration-700 ease-out ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`,
  };
}

function useBarAnimate(targetWidth: string, delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return {
    ref,
    style: {
      width: visible ? targetWidth : "0%",
      transitionDelay: `${delay}ms`,
      transition: "width 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
    },
  };
}

// ── FadeIn wrapper component ─────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, style, className: animClass } = useFadeIn(delay);
  return (
    <div ref={ref} style={style} className={`${animClass} ${className}`}>
      {children}
    </div>
  );
}

function SlideIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, style, className: animClass } = useSlideIn(delay);
  return (
    <div ref={ref} style={style} className={`${animClass} ${className}`}>
      {children}
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const navLinks = ["Shop", "Plan", "Labs", "Science", "About"];

const therapyCards = [
  { image: therapyCard1, title: "BRAIN\nHEALTH", shop: "SHOP SHARPEN" },
  { image: therapyCard2, title: "CANCER\nPREVENTION", shop: "SHOP DEFEND" },
  { image: therapyCard3, title: "METABOLIC\nHEALTH", shop: "SHOP VITALITY" },
  { image: therapyCard4, title: "BONE &\nMUSCLE CARE", shop: "SHOP FORTIFY" },
];

const steps = [
  {
    number: "01",
    title: "Become a member",
    description: "Step into your most radiant self for $449/year.\n\nSign up to unlock our Comprehensive Biomarker Test, testing 100+ biomarkers. Fill out an intake form so we can personalize everything to your body, lifestyle, and goals.",
    barWidth: "15%",
    indent: "0%",
  },
  {
    number: "02",
    title: "Get tested",
    description: "With over 2,000 Quest Lab locations, getting your bloodwork is simple and stress-free, whether you're leading meetings or managing mom life.",
    barWidth: "30%",
    indent: "8%",
  },
  {
    number: "03",
    title: "Discover insights",
    description: "Receive a clear, personalized breakdown of your results, plus a custom wellness plan powered by expert care and smart AI.\n\nWant extra support? Book an optional chat with a trusted provider.",
    barWidth: "45%",
    indent: "16%",
  },
  {
    number: "04",
    title: "Ongoing guidance",
    description: "Monthly check-ins and quarterly testing to keep your longevity journey on track. Your plan evolves as you do.",
    barWidth: "60%",
    indent: "24%",
  },
];

const comparisonRows = [
  { label: "Comprehensive holistic intake", kwilt: true, primary: false },
  { label: "Personalized recommendations", kwilt: true, primary: false },
  { label: "Consultation with provider", kwilt: true, primary: true },
  { label: "Backed by science", kwilt: true, primary: true },
  { label: "All-in-one health portal", kwilt: true, primary: false },
  { label: "Convenient at-home access", kwilt: true, primary: false },
  { label: "Seamless experience", kwilt: true, primary: false },
  { label: "Proactive approach to longevity", kwilt: true, primary: false },
];

const storyCards = [
  { image: storyCard1, tag: "Hormone Health", title: "Weight gain isn't random", body: "Hormonal shifts can stall metabolism before weight gain shows up." },
  { image: storyCard2, tag: "Metabolic Health", title: "Built around your biology", body: "Data-driven plans lead to more effective health outcomes." },
  { image: storyCard3, tag: "Hormone Health", title: "Menopause & semaglutide", body: "Semaglutide supports metabolic control during menopause." },
  { image: storyCard4, tag: "Hormone Health", title: "Beyond yearly screenings", body: "Early hormonal shifts often go undetected." },
];

// ── Step component with animated bar ─────────────────────────────────────────

function StepRow({ step, index }: { step: typeof steps[0]; index: number }) {
  const bar = useBarAnimate(step.barWidth, index * 100);
  const fadeNum = useFadeIn(index * 100 + 200);
  const fadeText = useFadeIn(index * 100 + 350);

  return (
    <div>
      <div ref={bar.ref} className="h-[3px] bg-foreground mb-6" style={bar.style} />
      <div className="grid grid-cols-2 gap-8 pb-10">
        <div className="flex items-end" style={{ paddingLeft: step.indent }}>
          <div ref={fadeNum.ref} style={fadeNum.style} className={fadeNum.className}>
            <span
              className="font-heading font-normal text-foreground leading-none"
              style={{ fontSize: "clamp(5rem, 10vw, 10rem)" }}
            >
              {step.number}
            </span>
          </div>
        </div>
        <div ref={fadeText.ref} style={fadeText.style} className={`${fadeText.className} flex flex-col justify-end pb-2`}>
          <h3 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-3">
            {step.title}
          </h3>
          {step.description.split("\n\n").map((para, j) => (
            <p key={j} className={`text-base text-foreground leading-relaxed ${j > 0 ? "mt-3" : ""}`}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Comparison row with bounce checkmark ─────────────────────────────────────

function CompRow({ label, kwilt, primary, delay }: { label: string; kwilt: boolean; primary: boolean; delay: number }) {
  const slide = useSlideIn(delay);
  return (
    <div
      ref={slide.ref}
      style={slide.style}
      className={`${slide.className} grid grid-cols-[1fr_100px_120px] gap-3 items-center border-t border-border py-2.5`}
    >
      <p className="text-[11px] uppercase tracking-widest text-foreground font-medium">{label}</p>
      <div className={`h-9 rounded-lg flex items-center justify-center ${kwilt ? "bg-orange-200" : "bg-muted"}`}>
        {kwilt && (
          <span
            className="text-foreground font-normal text-base transition-transform duration-300"
            style={{ transform: "scale(1)" }}
          >
            ✓
          </span>
        )}
      </div>
      <div className={`h-9 rounded-lg flex items-center justify-center ${primary ? "bg-orange-200" : "bg-muted/60"}`}>
        {primary && <span className="text-foreground font-normal text-base">✓</span>}
      </div>
    </div>
  );
}

// ── Live Well line reveal ─────────────────────────────────────────────────────

function LiveWellLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* Divider line animates first */}
      <div
        className="h-[2px] bg-white"
        style={{
          width: visible ? "100%" : "0%",
          transition: `width 600ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        }}
      />
      {/* Then text slides in */}
      <div
        className="py-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-2rem)",
          transition: `opacity 600ms ease-out ${delay + 400}ms, transform 600ms ease-out ${delay + 400}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Landing2() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 60);
    setScrollY(y);
    setNavVisible(y > 60);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollCarousel = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.querySelector("div")?.clientWidth ?? 320;
    carouselRef.current.scrollBy({ left: dir === "right" ? cardWidth + 16 : -(cardWidth + 16), behavior: "smooth" });
  };

  // Hero parallax values
  const heroFraction = Math.min(scrollY / (typeof window !== "undefined" ? window.innerHeight * 0.9 : 700), 1);
  const videoTranslate = scrollY * 0.3;
  const overlayOpacity = 0.5 + heroFraction * 0.2;
  const heroTextOpacity = 1 - heroFraction * 1.4;
  const heroTextTranslate = -scrollY * 0.15;

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">

      {/* ── TOP NAV ──────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-14">
          {/* Left — nav links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link}
                to="#"
                className={`text-xs uppercase tracking-widest font-medium transition-colors duration-500 hover:text-primary ${
                  scrolled ? "text-foreground" : "text-white/80"
                }`}
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Center — logo crossfade */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <div className="relative h-6 flex items-center">
              {/* Dark logo — fades in when scrolled */}
              <img
                src={kwiltLogoDark}
                alt="KWILT"
                className="h-6 absolute transition-opacity duration-500"
                style={{ opacity: scrolled ? 1 : 0 }}
              />
              {/* White wordmark — fades out when scrolled */}
              <span
                className="font-heading text-white text-xl tracking-wider transition-opacity duration-500"
                style={{ opacity: scrolled ? 0 : 1 }}
              >
                KWILT<sup className="text-[0.55em] align-super">™</sup>
              </span>
            </div>
          </div>

          {/* Right — CTA + icons */}
          <div className="flex items-center gap-4 ml-auto">
            <Link
              to="/register"
              className="bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
            <button
              aria-label="Cart"
              className={`transition-colors duration-500 hover:text-primary ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              <ShoppingBag size={18} />
            </button>
            <Link
              to="/login"
              className={`text-xs uppercase tracking-widest font-medium transition-colors duration-500 hover:text-primary ${
                scrolled ? "text-foreground" : "text-white/80"
              }`}
            >
              Log In
            </Link>
          </div>
        </div>
      </nav>


      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ height: "90vh", minHeight: "560px" }}>
        {/* Parallax video */}
        <video
          src="https://cdn.prod.website-files.com/6830e308e57fd4713ea17bc9%2F6868777b35de09e3adcfdcf8_Kwilt_homepage_r1-transcode.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ transform: `translateY(${videoTranslate}px)`, willChange: "transform" }}
        />
        {/* Progressive overlay */}
        <div
          className="absolute inset-0 transition-none"
          style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
        />

        {/* Hero text — fades out on scroll */}
        <div
          className="absolute inset-0 flex flex-col justify-start pt-16 md:pt-20 overflow-visible"
          style={{
            opacity: Math.max(heroTextOpacity, 0),
            transform: `translateY(${heroTextTranslate}px)`,
            willChange: "transform, opacity",
          }}
        >
          {/* Massive heading row */}
          <div className="relative w-full overflow-visible px-4 md:px-8 flex items-end">
            <h1
              className="font-heading text-background leading-[0.85] whitespace-nowrap"
              style={{ fontSize: "clamp(7rem, 26vw, 28rem)", letterSpacing: "-0.02em" }}
            >
              KWILT
            </h1>
            <sup
              className="font-heading text-background self-start leading-none ml-2 md:ml-4"
              style={{ fontSize: "clamp(2rem, 5.5vw, 7rem)", marginTop: "clamp(1.2rem, 3.5vw, 4.5rem)" }}
            >
              ™
            </sup>
          </div>

          {/* Tagline */}
          <p className="font-heading text-background font-normal text-3xl md:text-5xl px-4 md:px-8 mt-3 md:mt-5">
            Redefine your age.
          </p>

          {/* Divider + CTA + divider */}
          <div className="px-4 md:px-8 mt-5 md:mt-8">
            <div className="border-t border-background/50" />
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 text-background text-3xl md:text-5xl font-normal font-heading py-4 hover:text-primary transition-colors"
            >
              Get Started<span className="text-lg">→</span>
            </Link>
            <div className="border-t border-background/50" />
          </div>
        </div>
      </section>


      {/* ── SUB-HERO TAGLINE ─────────────────────────────────────────────── */}
      <div className="bg-background px-8 pt-10 pb-0 md:px-16 lg:px-24">
        <FadeIn>
          <p className="text-foreground text-xl md:text-2xl leading-relaxed w-full">
            Join KWILT to empower your wellness journey. Discover a holistic personalized platform that combines breakthrough science and intuitive tools for every stage of life.
          </p>
        </FadeIn>
        <div className="border-t border-border mt-8" />
      </div>

      {/* ── 2 + 3. ASSESS, REPAIR, SUSTAIN ──────────────────────────────── */}
      <section className="bg-background px-8 py-16 md:px-16 lg:px-24">
        <FadeIn>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-foreground leading-tight w-full mb-12">
            Taking charge of your longevity journey should be effortless—now it is.
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end">

          {/* Left — text */}
          <div className="space-y-6">
            <FadeIn delay={100}>
              <div>
                <h2 className="font-heading text-5xl md:text-6xl font-normal text-foreground mb-3">
                  Assess, repair, sustain
                </h2>
                <p className="text-base text-foreground leading-relaxed">
                  Discover your true cellular age with KWILT. Our Comprehensive Biomarker Test analyzes 100+
                  biomarkers to provide insights into your
                </p>
              </div>
            </FadeIn>

            {/* Pill tags */}
            <FadeIn delay={200}>
              <div className="flex flex-col gap-2">
                {["11 ORGAN SYSTEMS", "AGING RATE", "BIOLOGICAL AGE"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-block w-fit border border-border text-foreground text-xs tracking-widest uppercase px-4 py-2 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <p className="text-base text-foreground leading-relaxed">
                Based on your results, you'll receive a personalized health protocol from our medical
                team, including targeted nutrition, lifestyle, and supplement recommendations.
              </p>
              <p className="text-base text-foreground leading-relaxed mt-4">
                Set benchmarks, monitor progress, and make data-driven changes for a healthier you.
              </p>
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-6 py-3 rounded-md hover:bg-foreground/85 transition-colors mt-4"
              >
                Start Assessment<span>→</span>
              </Link>
            </FadeIn>
          </div>

          {/* Right — image */}
          <FadeIn delay={200} className="relative rounded-lg overflow-hidden aspect-[3/4]">
            <img
              src={womanHairWind}
              alt="Assess repair sustain"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </FadeIn>

        </div>
      </section>


      {/* ── 4. KWILT TARGETED THERAPIES ─────────────────────────────────── */}
      <section className="bg-background px-8 pt-12 pb-0 md:px-16 lg:px-24" style={{ minHeight: "90vh" }}>
        <FadeIn>
          <h2 className="font-heading text-4xl md:text-5xl font-normal text-foreground mb-6">
            KWILT targeted therapies
          </h2>
        </FadeIn>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Arrow buttons — desktop only */}
          <button
            onClick={() => scrollCarousel("left")}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/90 border border-border rounded-full items-center justify-center hover:bg-background transition-colors shadow-card"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/90 border border-border rounded-full items-center justify-center hover:bg-background transition-colors shadow-card"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth"
            style={{ height: "75vh", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            {therapyCards.map(({ image, title, shop }, i) => (
              <div
                key={title}
                className="relative flex-none rounded-2xl overflow-hidden snap-start cursor-pointer group"
                style={{ width: "clamp(260px, 28vw, 380px)", height: "100%" }}
              >
                <img
                  src={image}
                  alt={title.replace("\n", " ")}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Gradient overlay — lightens on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-75" />

                {/* Title — top left */}
                <p className="absolute top-5 left-5 text-sm font-heading font-bold text-white tracking-wider uppercase leading-tight whitespace-pre-line">
                  {title}
                </p>

                {/* Shop label — bottom center */}
                <p className="absolute bottom-5 left-0 right-0 text-center text-[11px] font-heading text-white tracking-widest uppercase">
                  {shop}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 5. HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="bg-background px-8 py-16 md:px-16 lg:px-24">
        <FadeIn>
          <h2 className="font-heading text-4xl md:text-5xl font-normal text-foreground mb-8">
            How it works
          </h2>
        </FadeIn>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <StepRow key={step.number} step={step} index={i} />
          ))}
        </div>
      </section>


      {/* ── 6. GET TRUE RESULTS ─────────────────────────────────────────── */}
      <section
        className="bg-background px-8 py-0 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2"
        style={{ minHeight: "90vh" }}
      >
        {/* Left — bottom-aligned text */}
        <div className="flex flex-col justify-end pb-16 pt-16 pr-8 md:pr-16 space-y-8">
          <FadeIn>
            <h2 className="font-heading text-5xl md:text-6xl font-normal text-foreground">
              Get true results
            </h2>
          </FadeIn>

          {[
            { label: "100+ BIOMARKERS", text: "A comprehensive look at your body from the inside out." },
            { label: "INSIGHTS MADE FOR YOU", text: "No generic advice. Your plan is built around your biology." },
            { label: "PROGRESS YOU CAN SEE", text: "Track improvements over time with every test cycle." },
          ].map(({ label, text }, i) => (
            <FadeIn key={label} delay={i * 120}>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-1">{label}</p>
                <p className="text-base text-foreground leading-relaxed">{text}</p>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={400}>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-6 py-3 rounded-md w-fit hover:bg-foreground/85 transition-colors"
            >
              Start Assessment→
            </Link>
          </FadeIn>
        </div>

        {/* Right — composite UI image */}
        <FadeIn delay={200} className="relative overflow-hidden bg-[#b8a99a] rounded-2xl min-h-[60vh]">
          <img
            src={resultsUiCard}
            alt="Get true results — Elisa profile"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </FadeIn>
      </section>


      {/* ── 6b. ACCESS KWILT ─────────────────────────────────────────────── */}
      <section
        className="bg-background px-8 md:px-16 lg:px-24 py-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        style={{ minHeight: "90vh" }}
      >
        {/* Left — lifestyle image */}
        <FadeIn className="rounded-3xl overflow-hidden">
          <img
            src={womanSwimwear}
            alt="Active lifestyle"
            className="h-full w-full object-cover object-center"
            style={{ minHeight: "60vh" }}
          />
        </FadeIn>

        {/* Right — linen card with phone mockup + CTA */}
        <FadeIn delay={150} className="rounded-3xl bg-card flex flex-col items-center justify-between py-16 px-10 gap-10">
          {/* Phone mockup */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src={appPhoneMockup}
              alt="KWILT app dashboard"
              className="max-h-[60vh] w-auto object-contain drop-shadow-xl"
            />
          </div>

          {/* Product info + CTA */}
          <div className="w-full space-y-4">
            <div className="text-center space-y-1">
              <p className="font-heading text-base font-medium text-foreground">
                KWILT Comprehensive 100+ Biomarker Test
              </p>
              <p className="font-heading text-4xl font-normal text-foreground">$449/year</p>
            </div>
            <Link
              to="/register"
              className="block w-full text-center bg-primary text-primary-foreground font-medium text-sm uppercase tracking-widest py-4 rounded-md hover:bg-primary/90 transition-colors"
            >
              Add to Cart
            </Link>
          </div>
        </FadeIn>
      </section>


      {/* ── 6c. STAT HERO IMAGE ──────────────────────────────────────────── */}
      <section className="relative w-full" style={{ minHeight: "100vh" }}>
        <img
          src={womanRelaxing}
          alt="Woman relaxing"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-foreground/50" />

        <div className="relative h-full flex flex-col justify-between px-8 py-16 md:px-16 lg:px-24" style={{ minHeight: "100vh" }}>
          <FadeIn className="max-w-xs">
            <p className="font-heading font-normal leading-none text-primary-foreground"
              style={{ fontSize: "clamp(5rem, 14vw, 14rem)" }}>
              80<span className="text-[0.5em]">%</span>
            </p>
            <p className="mt-4 text-base text-primary-foreground/90 leading-relaxed">
              of early deaths from chronic disease come from four conditions — heart disease, cancer, lung disease, and diabetes.
            </p>
            <p className="mt-4 text-xs uppercase tracking-widest text-primary-foreground/60 font-medium">
              World Health Organization (WHO)
            </p>
          </FadeIn>

          <FadeIn delay={200} className="self-end text-right max-w-sm">
            <p className="font-heading text-5xl md:text-6xl font-medium text-primary-foreground leading-tight">
              Just a total game changer.
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-primary-foreground/70">
              Anne Divers, 52
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── REAL PEOPLE, REAL STORIES ────────────────────────────────────── */}
      <section className="bg-background px-8 py-20 md:px-16 lg:px-24" style={{ minHeight: "100vh" }}>
        <FadeIn>
          <h2 className="font-heading text-5xl md:text-6xl font-normal text-foreground mb-12">
            Real people, real stories
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {storyCards.map(({ image, tag, title, body }, i) => (
            <div
              key={title}
              className="flex flex-col gap-4 transition-all duration-700 ease-out"
              style={{
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <StoryCard image={image} tag={tag} title={title} body={body} delay={i * 150} />
            </div>
          ))}
        </div>
      </section>


      {/* ── MAXIMUM TRANSPARENCY ─────────────────────────────────────────── */}
      <section
        className="bg-background px-8 md:px-16 lg:px-24 py-16 grid grid-cols-1 md:grid-cols-2 gap-12"
        style={{ minHeight: "80vh" }}
      >
        {/* Left */}
        <div className="flex flex-col justify-between">
          <div className="space-y-6">
            <FadeIn>
              <h2 className="font-heading text-6xl md:text-7xl font-normal text-foreground leading-tight">
                Maximum transparency
              </h2>
            </FadeIn>
            <FadeIn delay={150}>
              <p className="text-base text-foreground leading-relaxed max-w-sm">
                KWILT emphasizes honesty, clarity, and care by setting realistic goals
                that enhance your energy, skin, sleep, and mood. We'll guide you on your
                journey with practical tools and celebrate your progress along the way.
              </p>
              <p className="text-base text-foreground leading-relaxed max-w-sm mt-4">
                Longevity care should feel personal, not clinical, which is why we made
                it tailored to your life, rhythms, and goals.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={250} className="mt-10">
            <a
              href="/register"
              className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-6 py-3 rounded-md hover:bg-foreground/85 transition-colors"
            >
              Start Assessment→
            </a>
          </FadeIn>
        </div>

        {/* Right — comparison table */}
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-[1fr_100px_120px] gap-3 mb-3 items-center">
            <div />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground text-center">KWILT™</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground text-center">Primary Care</p>
          </div>

          {comparisonRows.map(({ label, kwilt, primary }, i) => (
            <CompRow key={label} label={label} kwilt={kwilt} primary={primary} delay={i * 80} />
          ))}
        </div>
      </section>


      {/* ── LIVE WELL CTA IMAGE SECTION ──────────────────────────────────── */}
      <section className="relative w-full" style={{ minHeight: "100vh" }}>
        <img
          src={surferSunset}
          alt="Live well today"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex flex-col justify-end h-full px-8 md:px-16 lg:px-24 py-20" style={{ minHeight: "100vh" }}>
          <div className="space-y-0 w-full">
            <LiveWellLine delay={0}>
              <p className="font-heading text-4xl md:text-5xl font-normal text-white leading-tight">Live well today,</p>
            </LiveWellLine>
            <LiveWellLine delay={200}>
              <p className="font-heading text-4xl md:text-5xl font-normal text-white leading-tight">for a better tomorrow.</p>
            </LiveWellLine>
            <LiveWellLine delay={400}>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 text-white text-4xl md:text-5xl font-normal hover:opacity-75 transition-opacity font-heading"
              >
                Get Started→
              </Link>
            </LiveWellLine>
            {/* Final bottom border */}
            <div className="h-[2px] bg-white" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}

      <footer className="bg-background px-8 md:px-12 lg:px-16 pt-10 pb-8">

        {/* Top row — social icons + email input */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-5">
            <a href="#" aria-label="Instagram" className="text-foreground hover:opacity-70 transition-opacity">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="Facebook" className="text-foreground hover:opacity-70 transition-opacity">
              <Facebook size={20} />
            </a>
          </div>
          <form className="flex items-center border border-foreground/40 px-4 py-2 w-72 md:w-96" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="enter e-mail"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground outline-none"
            />
            <button type="submit" className="ml-2 text-foreground hover:opacity-70 transition-opacity">
              &#8594;
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="border-t border-foreground/30" />

        {/* Giant KWILT™ wordmark */}
        <div className="py-4">
          <p className="font-heading font-bold text-foreground leading-none" style={{ fontSize: "clamp(5rem, 18vw, 18rem)" }}>
            KWILT<span className="text-[0.3em] align-super">™</span>
          </p>
          <p className="text-sm text-foreground mt-2">Longevity. Optimized.</p>
        </div>

        {/* Divider */}
        <div className="border-t border-foreground/30 mb-8" />

        {/* Nav links + address */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-16 gap-y-2 text-sm text-foreground">
            <div className="flex flex-col gap-3">
              {["Plan", "Science", "Labs"].map(link => (
                <a key={link} href="#" className="hover:opacity-60 transition-opacity">{link}</a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {["Contact Us", "FAQs", "Blog"].map(link => (
                <a key={link} href="#" className="hover:opacity-60 transition-opacity">{link}</a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {["Terms", "Accessibility", "Privacy"].map(link => (
                <a key={link} href="#" className="hover:opacity-60 transition-opacity">{link}</a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {["Affiliates"].map(link => (
                <a key={link} href="#" className="hover:opacity-60 transition-opacity">{link}</a>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="text-xs text-foreground text-right leading-relaxed shrink-0">
            <p className="font-semibold mb-1">KWILT Health</p>
            <p>13280 Evening Creek Dr. South</p>
            <p>STE 225</p>
            <p>San Diego, CA 92128</p>
            <p>1-888-299-5088</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-foreground/30 mt-8 pt-5">
          <p className="text-xs text-foreground">© 2025 Enhance.MD, LLC. All rights reserved.</p>
        </div>

      </footer>

    </div>
  );
}

// ── Story Card with entrance animation ───────────────────────────────────────

function StoryCard({ image, tag, title, body, delay }: { image: string; tag: string; title: string; body: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms ease-out ${delay}ms, transform 700ms ease-out ${delay}ms`,
      }}
    >
      <div className="rounded-2xl overflow-hidden aspect-[3/4]">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-700"
          style={{
            transform: visible ? "scale(1)" : "scale(1.05)",
          }}
        />
      </div>
      <div className="space-y-2">
        <span className="inline-block bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
          {tag}
        </span>
        <h3 className="font-heading text-2xl font-normal text-foreground leading-snug">{title}</h3>
        <p className="text-base text-foreground leading-relaxed">{body}</p>
        <a href="#" className="inline-block text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors">
          Read More
        </a>
      </div>
    </div>
  );
}
