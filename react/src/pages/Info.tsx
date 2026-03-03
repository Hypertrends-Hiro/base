
import { Play, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScenario } from "@/contexts/ScenarioContext";
import howToUseKwilt from "@/assets/how-to-use-kwilt.png";
import navResults from "@/assets/nav-results.svg";
import navPlan from "@/assets/nav-plan.svg";
import navTreatments from "@/assets/nav-treatments.svg";
import navLifestyle from "@/assets/nav-lifestyle.svg";
import navSettings from "@/assets/nav-settings.svg";

const sections = [
  { icon: navResults, title: "Results", route: "/results", description: "View your lab results, biomarker trends, and health scores. Each biomarker includes an optimal range indicator and historical tracking so you can see how your health evolves over time." },
  { icon: navPlan, title: "Your Plan", route: "/plan", description: "Access your personalized nutrition, supplement, exercise, and sleep recommendations. Each category has daily action items tailored to your lab results and health goals." },
  { icon: navTreatments, title: "Treatments", route: "/treatments", description: "Browse and manage prescription therapies. View active subscriptions, explore new treatments, and manage billing, shipping, and appointment scheduling." },
  { icon: navLifestyle, title: "Lifestyle", route: "/lifestyle", description: "Track your daily meals, get nutritional grades, and monitor eating patterns over time. Log meals and receive AI-powered feedback on your nutritional choices." },
  { icon: navSettings, title: "Settings & Profile", route: "/profile", description: "Manage your account details, shipping addresses, payment methods, notification preferences, and referral program. Update your intake responses anytime." },
];

const tips = [
  { number: "01", text: "Start with your Dashboard — it gives you a snapshot of all your health scores and what needs attention first." },
  { number: "02", text: "Check your Results after each lab test to see updated biomarker levels and how they compare to your previous readings." },
  { number: "03", text: "Follow Your Plan daily — the nutrition and supplement recommendations update based on your latest results." },
  { number: "04", text: "Log meals in Lifestyle to get real-time feedback on your nutritional choices and track improvements." },
];

export default function Info() {
  const { scenario } = useScenario();
  const navigate = useNavigate();
  const showTourLink = scenario === "default-with-wizard";

  const handleRestartTour = () => {
    localStorage.removeItem("kwilt_wizard_seen_count");
    localStorage.removeItem("kwilt_wizard_dismissed");
    navigate("/dashboard");
  };

  return (
    <>
      <div className="p-4 lg:p-12">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-medium lg:text-4xl">
              How to use KWILT
            </h1>
            <p className="text-sm font-light text-muted-foreground mt-2 max-w-xl">
              A quick guide to navigating your health portal and getting the most out of your membership.
            </p>
          </div>
          {showTourLink && (
            <button
              onClick={handleRestartTour}
              className="flex-none inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-light tracking-wide uppercase transition-colors"
              style={{ background: "#F5F1F0" }}
            >
              <RotateCcw className="h-4 w-4" />
              Restart Tour
            </button>
          )}
        </header>

        {/* Video hero */}
        <div className="relative rounded-2xl overflow-hidden aspect-video mb-12 cursor-pointer group">
          <img
            src={howToUseKwilt}
            alt="How to use KWILT"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
              <Play className="h-7 w-7 text-white fill-white ml-1" />
            </div>
            <p className="mt-4 text-sm font-medium tracking-wider uppercase">Watch the walkthrough</p>
          </div>
        </div>

        {/* Portal sections */}
        <section className="mb-12">
          <h2 className="font-heading text-xl font-medium lg:text-2xl mb-6">
            Your portal at a glance
          </h2>
          <div className="space-y-4">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-xl p-5 flex items-start gap-4"
                style={{ background: "#F5F1F0" }}
              >
                <div className="h-10 w-10 flex-none flex items-center justify-center rounded-lg" style={{ background: "#EDE8E2" }}>
                  <img src={section.icon} alt={section.title} className="h-5 w-5 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-base font-medium">{section.title}</h3>
                  <p className="text-sm font-light text-muted-foreground mt-1 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick tips */}
        <section className="mb-12">
          <h2 className="font-heading text-xl font-medium lg:text-2xl mb-6">
            Getting started tips
          </h2>
          <div className="space-y-6">
            {tips.map((tip) => (
              <div key={tip.number} className="flex gap-6">
                <span className="font-heading text-3xl font-semibold text-primary/40 flex-none">
                  {tip.number}
                </span>
                <p className="text-sm font-light text-muted-foreground leading-relaxed pt-2">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 mb-8 pt-8 border-t border-border/40">
          <p className="text-xs font-light text-muted-foreground">
            Need more help? Reach out to your KWILT health coach through the dashboard or email support@kwilt.com.
          </p>
        </footer>
      </div>
    </>
  );
}
