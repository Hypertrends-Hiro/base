import { useState } from "react";

import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import womanRelaxing from "@/assets/woman-relaxing.jpg";
import mealPasta from "@/assets/meal-pasta.jpg";
import mealPizza from "@/assets/meal-pizza.jpg";
import mealRiceBeans from "@/assets/meal-rice-beans.jpg";

const stats = [
  { label: "This week", value: "3 meals logged", sub: "-70% from last week" },
  { label: "Average grade", value: "4.2/5", sub: "Based on 3 analyzed meals" },
  { label: "Trend", value: "Improving", sub: "Overall nutritional quality" },
  { label: "Quick action", value: "Add new meal", sub: "Track nutrition" },
];

const meals = [
  { date: "JULY 19, 2025", name: "Pasta with meatballs", grade: "B", image: mealPasta },
  { date: "JULY 20, 2025", name: "Deep dish pizza", grade: "C", image: mealPizza },
  { date: "JULY 21, 2025", name: "Rice and beans", grade: "A", image: mealRiceBeans },
];

export default function Lifestyle() {
  const [timeframe, setTimeframe] = useState("Last 30 days");

  return (
    <>
      <div className="p-4 lg:p-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-2xl font-light lg:text-4xl">
            Track your meals
          </h1>
          <button className="rounded-md bg-primary px-5 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors whitespace-nowrap">
            Add a meal
          </button>
        </header>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-4"
              style={{ background: "#F5F1F0" }}
            >
              <p className="text-xs font-light text-muted-foreground">{stat.label}</p>
              <p className="font-heading text-lg font-medium mt-1">{stat.value}</p>
              <p className="text-xs font-light text-muted-foreground mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Filter & Timeframe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="rounded-xl p-4" style={{ background: "#F5F1F0" }}>
            <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-2">
              Filter Meals
            </p>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search meals"
                className="border-0 bg-transparent p-0 h-auto text-sm font-light focus-visible:ring-0 placeholder:text-muted-foreground"
              />
              <ArrowRight className="h-4 w-4 text-foreground flex-none" />
            </div>
            <div className="mt-2 border-t border-primary" />
          </div>
          <div className="rounded-xl p-4" style={{ background: "#F5F1F0" }}>
            <div className="flex items-center gap-1">
              <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/70">
                Timeframe
              </p>
              <ChevronDown className="h-3 w-3 text-foreground/70" />
            </div>
            <p className="text-sm font-light mt-2">{timeframe}</p>
          </div>
        </div>

        {/* Your meals */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-xl font-medium lg:text-2xl">Your meals</h2>
            <button className="text-xs font-medium tracking-wider text-foreground hover:text-primary transition-colors flex items-center gap-1">
              VIEW ALL<span className="text-sm">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <div key={meal.name} className="flex flex-col">
                <div className="rounded-xl overflow-hidden aspect-[4/3]">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs font-light text-muted-foreground uppercase tracking-wide">
                    {meal.date}
                  </p>
                  <span className="h-7 w-7 rounded-full border border-border flex items-center justify-center text-xs font-medium">
                    {meal.grade}
                  </span>
                </div>
                <p className="font-heading text-base font-medium mt-1">{meal.name}</p>
                <button className="text-xs font-light text-muted-foreground mt-0.5 text-left hover:text-foreground transition-colors">
                  View details
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Motivational CTA */}
        <section className="mt-12 rounded-2xl overflow-hidden relative">
          <img
            src={womanRelaxing}
            alt="Lifestyle motivation"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="font-heading text-2xl lg:text-3xl font-medium text-white">
              Small changes.
            </p>
            <div className="my-3 border-t border-white/50" />
            <p className="font-heading text-2xl lg:text-3xl font-medium text-white">
              Results that you can feel.
            </p>
            <div className="mt-2 border-t border-white/50" />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 mb-8">
          <p className="text-xs font-medium text-foreground">©2025 kwilthealth</p>
          <p className="text-[10px] font-light text-muted-foreground mt-2 leading-relaxed max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a isi in enim consectetur varius. In lacinia eleifend magna porttitor pretium. Aenean nec bibendum felis, eget tincidunt libero. Sed at diam in massa pretium sollicitudin eleifend nec risus.
          </p>
        </footer>
      </div>
    </>
  );
}
