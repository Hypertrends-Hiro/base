import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Download, X, Info } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ExploreAllTreatments } from "@/components/treatments/ExploreAllTreatments";
import { BookAppointmentModal } from "@/components/treatments/BookAppointmentModal";
import { useScenario } from "@/contexts/ScenarioContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import productSemaglutide from "@/assets/product-semaglutide.png";
import productBalance from "@/assets/product-balance.png";
import productGlp1 from "@/assets/product-glp1.png";

const activeTreatments = [
  {
    name: "Metformin",
    plan: "1-month subscription",
    image: productBalance,
    startedOn: "5/6/24",
    visitRequiredBy: "5/6/25",
    viewAction: "View treatment plan",
    patient: {
      name: "Mike Tyson",
      dob: "12/29/1994",
      gender: "Male",
      email: "mtyson@gmail.com",
    },
    provider: {
      name: "Kate Cordisco, NP",
      address: "13280 Evening Creek Drive South, Ste 225, San Diego, CA 92128",
      supervisingPhysician: "Brian Crenshaw, MD",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    },
    assessment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    instructions:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Semaglutide",
    plan: "6-month Subscription",
    image: productSemaglutide,
    startedOn: "5/6/24",
    visitRequiredBy: "5/6/25",
    viewAction: "Close treatment plan",
    patient: {
      name: "Mike Tyson",
      dob: "12/29/1994",
      gender: "Male",
      email: "mtyson@gmail.com",
    },
    provider: {
      name: "Kate Cordisco, NP",
      address: "13280 Evening Creek Drive South, Ste 225, San Diego, CA 92128",
      supervisingPhysician: "Brian Crenshaw, MD",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    },
    assessment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    instructions:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const newRxTreatment = {
  name: "Tirzepatide",
  plan: "3-month subscription",
  image: productGlp1,
  startedOn: "2/25/26",
  visitRequiredBy: "3/15/26",
  needsVisit: true,
  viewAction: "View treatment plan",
  patient: {
    name: "Mike Tyson",
    dob: "12/29/1994",
    gender: "Male",
    email: "mtyson@gmail.com",
  },
  provider: {
    name: "Kate Cordisco, NP",
    address: "13280 Evening Creek Drive South, Ste 225, San Diego, CA 92128",
    supervisingPhysician: "Brian Crenshaw, MD",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
  },
  assessment: "Pending provider consultation. A virtual visit is required before this prescription can be fulfilled.",
  instructions: "Please schedule your virtual consultation at your earliest convenience to begin this treatment.",
};

export default function Treatments() {
  const navigate = useNavigate();
  const { scenario } = useScenario();
  const isDemoScenario = scenario !== "none";
  const isNewRx = scenario === "new-rx-ordered";
  const showTreatments = !isDemoScenario || isNewRx;
  const allTreatments = isNewRx ? [newRxTreatment] : activeTreatments;
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [activeSlides, setActiveSlides] = useState<Record<string, number>>({});
  const carouselRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [bannerDismissed, setBannerDismissed] = useState(
    () => localStorage.getItem("kwilt-treatments-banner-dismissed") === "true"
  );
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const isWizardScenario = scenario === "default-with-wizard";
  const showBanner = isWizardScenario && !bannerDismissed;

  const handleDismissBanner = () => {
    setBannerDismissed(true);
    localStorage.setItem("kwilt-treatments-banner-dismissed", "true");
  };

  const toggleExpand = (name: string) => {
    setExpandedCard(expandedCard === name ? null : name);
  };

  const handleScroll = useCallback((name: string) => {
    const el = carouselRefs.current[name];
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.offsetWidth * 0.85 + 16; // 85% width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveSlides((prev) => ({ ...prev, [name]: index }));
  }, []);

  const scrollToSlide = useCallback((name: string, index: number) => {
    const el = carouselRefs.current[name];
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.85 + 16;
    el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="p-4 lg:p-12">
        <header className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-2xl font-light lg:text-4xl">
            {isDemoScenario && !isNewRx ? "Treatments" : "My treatments"}
          </h1>
          {showTreatments && (
            <button
              onClick={() => setAppointmentOpen(true)}
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors"
            >
              Schedule virtual visit
            </button>
          )}
        </header>

        {/* Recommended Treatments Banner — wizard scenario only */}
        {showBanner && (
          <div className="mb-6 rounded-xl p-5 lg:p-6" style={{ background: "#FF816B" }}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="font-heading text-lg font-medium mb-1">
                  🎉 You have recommended treatments
                </p>
                <p className="text-base font-normal">
                  Add products you're interested in to your cart before your health consultation — your provider can discuss them with you during your visit.
                </p>
              </div>
              <div className="flex-none flex items-center gap-3">
                <button
                  onClick={handleDismissBanner}
                  className="rounded-md border border-foreground/30 px-4 py-2 text-sm font-light hover:bg-black/5 transition-colors"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => setInfoModalOpen(true)}
                  className="rounded-md px-4 py-2 text-sm font-light text-white transition-colors"
                  style={{ background: "#3D2E1E" }}
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Treatment Subscriptions */}
        {showTreatments && (
        <section className="space-y-4 mb-8">
          {allTreatments.map((treatment) => {
            const isExpanded = expandedCard === treatment.name;
            const hasVisitNeeded = 'needsVisit' in treatment && treatment.needsVisit;
            return (
              <div
                key={treatment.name}
                className="rounded-xl"
                style={{ background: "#F5F1F0" }}
              >
                {/* Top bar */}
                <div className="p-5 lg:p-6">
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                    {/* Product image */}
                    <div className="h-24 w-24 flex-none rounded-md overflow-hidden" style={{ background: "#EDE8E2" }}>
                      <img
                        src={treatment.image}
                        alt={treatment.name}
                        className="h-full w-full object-contain p-3"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-heading text-lg font-medium">{treatment.name}</p>
                        {hasVisitNeeded && (
                          <span className="rounded-full bg-[#FF816B] px-2.5 py-0.5 text-[10px] font-medium text-foreground whitespace-nowrap">
                            New prescription
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-light text-muted-foreground">{treatment.plan}</p>
                      <div className="mt-3 space-y-0.5">
                        <p className="text-sm font-light">
                          <span className="font-medium">Started on:</span> {treatment.startedOn}
                        </p>
                        <p className={`text-sm font-light ${hasVisitNeeded ? 'text-[#FF816B] font-medium' : ''}`}>
                          <span className="font-medium">Visit required by:</span> {treatment.visitRequiredBy}
                        </p>
                      </div>
                    </div>

                    {/* Actions — desktop only, inline */}
                    <div className="hidden sm:flex flex-wrap gap-3 flex-none">
                      <button
                        onClick={() => navigate(`/treatments/manage/${treatment.name.toLowerCase()}`)}
                        className="rounded-md bg-primary px-5 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
                      >
                        Manage subscription
                      </button>
                      <button
                        onClick={() => toggleExpand(treatment.name)}
                        className="rounded-md bg-primary px-5 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
                      >
                        {isExpanded ? "Close treatment plan" : "View treatment plan"}
                      </button>
                    </div>
                  </div>

                  {/* Actions — mobile only, full width */}
                  <div className="flex sm:hidden flex-col gap-2 mt-4">
                    <button
                      onClick={() => navigate(`/treatments/manage/${treatment.name.toLowerCase()}`)}
                      className="w-full rounded-md bg-primary py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors"
                    >
                      Manage subscription
                    </button>
                    <button
                      onClick={() => toggleExpand(treatment.name)}
                      className="w-full rounded-md bg-primary py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors"
                    >
                      {isExpanded ? "Close treatment plan" : "View treatment plan"}
                    </button>
                  </div>
                </div>

                {/* Expanded treatment plan */}
                {isExpanded && (
                  <div className="px-5 pb-6 lg:px-6 space-y-4 animate-fade-in">
                    {/* Row 1 — Patient details (1 column width) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="bg-white rounded-xl p-5 lg:col-span-1">
                        <h3 className="font-heading text-lg font-medium mb-4">Patient</h3>
                        <div className="space-y-2">
                          {[
                            ["Name", treatment.patient.name],
                            ["Date of birth:", treatment.patient.dob],
                            ["Gender:", treatment.patient.gender],
                            ["Email:", treatment.patient.email],
                          ].map(([label, value]) => (
                            <div key={label} className="flex justify-between text-sm">
                              <span className="font-light">{label}</span>
                              <span className="font-light text-right">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Row 2 — Provider, Assessment, Instructions: carousel on mobile, 3-col grid on desktop */}
                    <div className="hidden lg:grid lg:grid-cols-3 gap-4">
                      {/* Medical Provider */}
                      <div className="bg-white rounded-xl p-5 flex flex-col">
                        <h4 className="text-xs font-medium tracking-wide uppercase mb-4">Medical Provider</h4>
                        <Avatar className="h-12 w-12 mb-4">
                          <AvatarImage src={treatment.provider.avatar} alt="Provider" />
                          <AvatarFallback className="bg-primary/10 text-primary">KC</AvatarFallback>
                        </Avatar>
                        <div className="space-y-3 flex-1">
                          <div>
                            <p className="text-sm font-medium">Provider:</p>
                            <p className="text-sm font-light">{treatment.provider.name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Address:</p>
                            <p className="text-sm font-light">{treatment.provider.address}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Supervising Physician:</p>
                            <p className="text-sm font-light">{treatment.provider.supervisingPhysician}</p>
                          </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-border space-y-1">
                          <p className="text-sm font-light">For questions or concerns, text or call</p>
                          <p className="text-sm">
                            <a href="tel:888-299-5088" className="font-medium underline">888-299-5088</a>
                            <span className="font-light"> or email</span>
                          </p>
                          <p className="text-sm">
                            <a href="mailto:support@kwilthealth.com" className="font-medium underline">support@kwilthealth.com</a>
                          </p>
                          <p className="text-sm font-light mt-2">In case of an emergency call 911</p>
                        </div>
                      </div>

                      {/* Assessment */}
                      <div className="bg-white rounded-xl p-5">
                        <h4 className="text-xs font-medium tracking-wide uppercase mb-4">Assessment</h4>
                        <p className="text-sm font-light leading-relaxed">{treatment.assessment}</p>
                      </div>

                      {/* Instructions */}
                      <div className="bg-white rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xs font-medium tracking-wide uppercase">Instructions</h4>
                          <button className="text-foreground hover:text-foreground/70 transition-colors" aria-label="Download instructions">
                            <Download className="h-5 w-5" strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="text-sm font-light leading-relaxed">{treatment.instructions}</p>
                      </div>
                    </div>

                    {/* Mobile carousel for row 2 */}
                    <div
                      ref={(el) => { carouselRefs.current[treatment.name] = el; }}
                      onScroll={() => handleScroll(treatment.name)}
                      className="flex lg:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
                    >
                      {/* Medical Provider */}
                      <div className="bg-white rounded-xl p-5 flex flex-col flex-none w-[85%] snap-start">
                        <h4 className="text-xs font-medium tracking-wide uppercase mb-4">Medical Provider</h4>
                        <Avatar className="h-12 w-12 mb-4">
                          <AvatarImage src={treatment.provider.avatar} alt="Provider" />
                          <AvatarFallback className="bg-primary/10 text-primary">KC</AvatarFallback>
                        </Avatar>
                        <div className="space-y-3 flex-1">
                          <div>
                            <p className="text-sm font-medium">Provider:</p>
                            <p className="text-sm font-light">{treatment.provider.name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Address:</p>
                            <p className="text-sm font-light">{treatment.provider.address}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Supervising Physician:</p>
                            <p className="text-sm font-light">{treatment.provider.supervisingPhysician}</p>
                          </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-border space-y-1">
                          <p className="text-sm font-light">For questions or concerns, text or call</p>
                          <p className="text-sm">
                            <a href="tel:888-299-5088" className="font-medium underline">888-299-5088</a>
                            <span className="font-light"> or email</span>
                          </p>
                          <p className="text-sm">
                            <a href="mailto:support@kwilthealth.com" className="font-medium underline">support@kwilthealth.com</a>
                          </p>
                          <p className="text-sm font-light mt-2">In case of an emergency call 911</p>
                        </div>
                      </div>

                      {/* Assessment */}
                      <div className="bg-white rounded-xl p-5 flex-none w-[85%] snap-start">
                        <h4 className="text-xs font-medium tracking-wide uppercase mb-4">Assessment</h4>
                        <p className="text-sm font-light leading-relaxed">{treatment.assessment}</p>
                      </div>

                      {/* Instructions */}
                      <div className="bg-white rounded-xl p-5 flex-none w-[85%] snap-start">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xs font-medium tracking-wide uppercase">Instructions</h4>
                          <button className="text-foreground hover:text-foreground/70 transition-colors" aria-label="Download instructions">
                            <Download className="h-5 w-5" strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="text-sm font-light leading-relaxed">{treatment.instructions}</p>
                      </div>
                    </div>
                    {/* Dot indicators */}
                    <div className="flex lg:hidden justify-center gap-2 pt-2">
                      {[0, 1, 2].map((i) => (
                        <button
                          key={i}
                          onClick={() => scrollToSlide(treatment.name, i)}
                          className={`h-2 w-2 rounded-full transition-colors ${
                            (activeSlides[treatment.name] ?? 0) === i ? "bg-foreground" : "bg-foreground/25"
                          }`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>
        )}

        {/* Explore All Treatments */}
        <ExploreAllTreatments />
      </div>

      <BookAppointmentModal open={appointmentOpen} onOpenChange={setAppointmentOpen} />

      {/* Info Modal */}
      <Dialog open={infoModalOpen} onOpenChange={setInfoModalOpen}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden" style={{ background: "#F5F1F0" }}>
          {/* Hero accent strip */}
          <div className="relative h-24 w-full overflow-hidden" style={{ background: "linear-gradient(135deg, #FF816B 0%, #FFB199 100%)" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading text-2xl font-medium text-white tracking-wide">Your path to wellness</span>
            </div>
            <div className="absolute bottom-3 right-4 h-3 w-3 rounded-full bg-white/40" />
            <div className="absolute bottom-5 right-10 h-2 w-2 rounded-full bg-white/25" />
          </div>

          <div className="px-6 pb-6 pt-4">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl font-medium">How treatments work</DialogTitle>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              {[
                { num: "1", text: "Browse your recommended treatments below" },
                { num: "2", text: "Add a product to your cart — you'll answer a few quick qualification questions first" },
                { num: "3", text: "Discuss your selections with your provider during your virtual visit" },
                { num: "4", text: "If you don't qualify, you'll be fully refunded" },
              ].map((step) => (
                <div key={step.num} className="flex items-start gap-3">
                  <span className="flex-none flex items-center justify-center h-7 w-7 rounded-full text-xs font-medium text-white" style={{ background: "#FF816B" }}>
                    {step.num}
                  </span>
                  <p className="text-base font-normal pt-0.5">{step.text}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs font-light text-muted-foreground text-center">
              Questions? Your provider is here to help during your visit.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
