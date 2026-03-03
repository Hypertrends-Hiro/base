<script setup lang="ts">
import { ref } from 'vue'
import UiInput from '@/components/ui/input.vue'
import womanRelaxing from '@/assets/woman-relaxing.jpg'
import mealPasta from '@/assets/meal-pasta.jpg'
import mealPizza from '@/assets/meal-pizza.jpg'
import mealRiceBeans from '@/assets/meal-rice-beans.jpg'

const stats = [
  { label: 'This week', value: '3 meals logged', sub: '-70% from last week' },
  { label: 'Average grade', value: '4.2/5', sub: 'Based on 3 analyzed meals' },
  { label: 'Trend', value: 'Improving', sub: 'Overall nutritional quality' },
  { label: 'Quick action', value: 'Add new meal', sub: 'Track nutrition' },
]

const meals = [
  { date: 'JULY 19, 2025', name: 'Pasta with meatballs', grade: 'B', image: mealPasta },
  { date: 'JULY 20, 2025', name: 'Deep dish pizza', grade: 'C', image: mealPizza },
  { date: 'JULY 21, 2025', name: 'Rice and beans', grade: 'A', image: mealRiceBeans },
]

const timeframe = ref('Last 30 days')
</script>

<template>
  <div class="p-4 lg:p-12">
    <header class="flex items-center justify-between mb-8">
      <h1 class="font-heading text-2xl font-light lg:text-4xl">
        Track your meals
      </h1>
      <button type="button" class="rounded-md bg-primary px-5 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors whitespace-nowrap">
        Add a meal
      </button>
    </header>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-xl p-4"
        style="background: #F5F1F0"
      >
        <p class="text-xs font-light text-muted-foreground">{{ stat.label }}</p>
        <p class="font-heading text-lg font-medium mt-1">{{ stat.value }}</p>
        <p class="text-xs font-light text-muted-foreground mt-1">{{ stat.sub }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
      <div class="rounded-xl p-4" style="background: #F5F1F0">
        <p class="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-2">
          Filter Meals
        </p>
        <div class="flex items-center gap-2">
          <UiInput
            placeholder="Search meals"
            class="border-0 bg-transparent p-0 h-auto text-sm font-light focus-visible:ring-0 placeholder:text-muted-foreground"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 text-foreground flex-none"><path d="m5 12 7-7 7 7" /></svg>
        </div>
        <div class="mt-2 border-t border-primary" />
      </div>
      <div class="rounded-xl p-4" style="background: #F5F1F0">
        <div class="flex items-center gap-1">
          <p class="text-[10px] font-medium uppercase tracking-wider text-foreground/70">
            Timeframe
          </p>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3 w-3 text-foreground/70"><path d="m6 9 6 6 6-6" /></svg>
        </div>
        <p class="text-sm font-light mt-2">{{ timeframe }}</p>
      </div>
    </div>

    <section>
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-heading text-xl font-medium lg:text-2xl">Your meals</h2>
        <button type="button" class="text-xs font-medium tracking-wider text-foreground hover:text-primary transition-colors flex items-center gap-1">
          VIEW ALL<span class="text-sm">→</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="meal in meals" :key="meal.name" class="flex flex-col">
          <div class="rounded-xl overflow-hidden aspect-[4/3]">
            <img :src="meal.image" :alt="meal.name" class="h-full w-full object-cover" />
          </div>
          <div class="flex items-center justify-between mt-3">
            <p class="text-xs font-light text-muted-foreground uppercase tracking-wide">
              {{ meal.date }}
            </p>
            <span class="h-7 w-7 rounded-full border border-border flex items-center justify-center text-xs font-medium">
              {{ meal.grade }}
            </span>
          </div>
          <p class="font-heading text-base font-medium mt-1">{{ meal.name }}</p>
          <button type="button" class="text-xs font-light text-muted-foreground mt-0.5 text-left hover:text-foreground transition-colors">
            View details
          </button>
        </div>
      </div>
    </section>

    <section class="mt-12 rounded-2xl overflow-hidden relative">
      <img
        :src="womanRelaxing"
        alt="Lifestyle motivation"
        class="w-full h-[400px] object-cover"
      />
      <div class="absolute inset-0 bg-black/20" />
      <div class="absolute bottom-0 left-0 right-0 p-8">
        <p class="font-heading text-2xl lg:text-3xl font-medium text-white">
          Small changes.
        </p>
        <div class="my-3 border-t border-white/50" />
        <p class="font-heading text-2xl lg:text-3xl font-medium text-white">
          Results that you can feel.
        </p>
        <div class="mt-2 border-t border-white/50" />
      </div>
    </section>

    <footer class="mt-12 mb-8">
      <p class="text-xs font-medium text-foreground">©2025 kwilthealth</p>
      <p class="text-[10px] font-light text-muted-foreground mt-2 leading-relaxed max-w-3xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a isi in enim consectetur varius. In lacinia eleifend magna porttitor pretium. Aenean nec bibendum felis, eget tincidunt libero. Sed at diam in massa pretium sollicitudin eleifend nec risus.
      </p>
    </footer>
  </div>
</template>
