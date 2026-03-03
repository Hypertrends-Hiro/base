import { useState, useEffect, useCallback } from "react";
import { mealPlanData, type Meal } from "@/data/mealPlanData";
import { VoiceMicButton } from "@/components/assessment/VoiceMicButton";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useIsMobile } from "@/hooks/use-mobile";

function NutritionTable({ nutrition }: { nutrition: Meal["nutrition"] }) {
  const rows = [
    { label: "Calories", value: nutrition.calories },
    { label: "Protein", value: nutrition.protein },
    { label: "Carbs", value: nutrition.carbs },
    { label: "Fat", value: nutrition.fat },
    { label: "Vitamin D", value: nutrition.vitaminD },
    { label: "B12", value: nutrition.b12 },
    { label: "Omega-3", value: nutrition.omega3 },
  ];

  return (
    <div>
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`flex justify-between py-2 text-sm ${
            i < rows.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <span className="text-muted-foreground">{row.label}</span>
          <span className="font-medium text-foreground">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

function MealCard({ meal }: { meal: Meal }) {
  return (
    <div className="space-y-4">
      {/* Meal header bar */}
      <div className="bg-secondary/80 rounded-md px-4 py-2">
        <span className="text-xs font-bold uppercase tracking-wider text-foreground">
          {meal.type}
        </span>
        <span className="text-xs text-muted-foreground ml-2">{meal.rationale}</span>
      </div>

      {/* Recipe title */}
      <h4 className="font-heading text-xl font-medium text-foreground">{meal.name}</h4>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Ingredients + Instructions */}
        <div className="space-y-4">
          <div>
            <h5 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
              Ingredients
            </h5>
            <ul className="space-y-1.5">
              {meal.ingredients.map((item, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-foreground/40 shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
              Instructions
            </h5>
            <p className="text-sm text-foreground/80 leading-relaxed">{meal.instructions}</p>
          </div>
        </div>

        {/* Right: Nutrition */}
        <div>
          <h5 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Nutrition
          </h5>
          <NutritionTable nutrition={meal.nutrition} />
        </div>
      </div>
    </div>
  );
}

function MealAgenda({ meals }: { meals: Meal[] }) {
  const isMobile = useIsMobile();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-soft">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-2xl font-light text-foreground">Today's agenda</h3>
          {isMobile && (
            <div className="flex gap-1">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                className="p-1.5 rounded-md bg-secondary text-foreground/60 hover:text-foreground transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                className="p-1.5 rounded-md bg-secondary text-foreground/60 hover:text-foreground transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        {isMobile && (
          <div className="flex gap-1.5 mt-2 justify-end">
            {meals.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIndex ? "w-4 bg-foreground" : "w-1.5 bg-foreground/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {isMobile ? (
        <div className="overflow-hidden -mx-2" ref={emblaRef}>
          <div className="flex">
            {meals.map((meal, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 px-2">
                <MealCard meal={meal} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {meals.map((meal, i) => (
            <MealCard key={i} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}

const symptoms = [
  "No symptoms", "Bloating", "Nausea", "Fatigue", "Heartburn",
  "Brain fog", "Loose stool", "Constipation", "Skin flushing / Itching",
  "Increased thirst", "Other",
];

export default function MealPlanSection() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [feedbackText, setFeedbackText] = useState("");
  const currentDay = mealPlanData[selectedDay];

  const toggleSymptom = (s: string) =>
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  return (
    <div className="space-y-5">
      {/* Section header */}
      <p className="text-sm text-muted-foreground">
        7-Day Meal Plan: Focuses on heart-healthy fats, lean protein, and a variety of
        micronutrients for metabolic support.
      </p>

      {/* Day selector chips */}
      <div className="flex gap-2 flex-wrap">
        {mealPlanData.map((day, i) => (
          <button
            key={i}
            onClick={() => setSelectedDay(i)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              selectedDay === i
                ? "bg-kwilt-peach text-foreground"
                : "border border-border bg-white text-foreground hover:bg-secondary"
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>

      {/* Today's agenda card */}
      <MealAgenda meals={currentDay.meals} />

      {/* Feedback section */}
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Feedback
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left: Symptoms */}
          <div className="bg-secondary rounded-xl p-6">
            <h3 className="font-heading text-2xl font-light text-foreground mb-5">
              Any symptoms after meals?
            </h3>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSymptom(s)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedSymptoms.includes(s)
                      ? "bg-kwilt-peach text-foreground"
                      : "bg-white border border-border text-foreground hover:bg-white/80"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Open text feedback */}
          <div className="bg-secondary rounded-xl p-6 flex flex-col">
            <h3 className="font-heading text-2xl font-light text-foreground mb-2">
              Your input matters
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Let us know what felt off, overwhelming, or just didn't fit your lifestyle.
              We'll use your feedback to fine-tune your plan and make sure it works better for you.
            </p>
            <div className="relative flex-1 min-h-[160px]">
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Inputs will be used to adapt next plan"
                className="w-full h-full min-h-[160px] rounded-lg bg-white border-none px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="absolute top-2 right-2">
                <VoiceMicButton
                  onResult={(text) =>
                    setFeedbackText((prev) => (prev ? prev + " " + text : text))
                  }
                />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <button className="link-arrow text-foreground text-sm">
                SEND <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="mt-8 pt-6">
        <p className="text-sm font-semibold text-foreground mb-3">©2025 kwilthealth</p>
        <p className="text-xs text-foreground/70 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a nisi in enim consectetur varius. In lacinia eleifend magna porttitor pretium. Aenean nec bibendum felis, eget tincidunt libero. Sed at diam in massa pretium sollicitudin eleifend nec risus. Praesent sed neque a dolor vestibulum molestie sit amet nec massa. Nunc id fringilla diam. Etiam eget volutpat enim. Donec accumsan, lectus in tristique pharetra, massa mauris rhoncus enim, vitae tempus sapien mauris id enim.
        </p>
      </div>
    </div>
  );
}
