<script setup lang="ts">
import { ref, computed } from 'vue'

interface Meal {
  type: string
  rationale: string
  name: string
  ingredients: string[]
  instructions: string
  nutrition: { calories: string; protein: string; carbs: string; fat: string; vitaminD: string; b12: string; omega3: string }
}

const days = [
  { label: 'Day 1', meals: [] as Meal[] },
  { label: 'Day 2', meals: [] as Meal[] },
  { label: 'Day 3', meals: [] as Meal[] },
  { label: 'Day 4', meals: [] as Meal[] },
  { label: 'Day 5', meals: [] as Meal[] },
  { label: 'Day 6', meals: [] as Meal[] },
  { label: 'Day 7', meals: [] as Meal[] },
]

const day1Meals: Meal[] = [
  {
    type: 'BREAKFAST',
    rationale: 'High in healthy fats and fiber to stabilize morning blood sugar.',
    name: 'Avocado Toast with Poached Egg',
    ingredients: ['2 slices whole-grain bread', '1 ripe avocado', '2 eggs', 'Pinch of sea salt & black pepper', 'Red pepper flakes'],
    instructions: 'Toast the bread until golden. Mash avocado with salt and pepper, spread onto toast. Poach eggs in simmering water for 3 minutes. Place eggs on toast and finish with red pepper flakes.',
    nutrition: { calories: '420 kcal', protein: '18g', carbs: '38g', fat: '24g', vitaminD: '1.1 µg', b12: '0.9 µg', omega3: '0.3g' },
  },
]
days[0]!.meals = day1Meals

const selectedDay = ref(0)
const currentMeals = computed(() => days[selectedDay.value]?.meals ?? [])
</script>

<template>
  <div class="space-y-5">
    <p class="text-sm text-muted-foreground">
      7-Day Meal Plan: Focuses on heart-healthy fats, lean protein, and a variety of
      micronutrients for metabolic support.
    </p>
    <div class="flex gap-2 flex-wrap">
      <button
        v-for="(day, i) in days"
        :key="i"
        type="button"
        class="px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
        :class="selectedDay === i ? 'bg-kwilt-peach text-foreground' : 'border border-border bg-white text-foreground hover:bg-secondary'"
        @click="selectedDay = i"
      >
        {{ day.label }}
      </button>
    </div>
    <div class="bg-white rounded-xl p-6 shadow-soft">
      <h3 class="font-heading text-2xl font-light text-foreground mb-6">Today's agenda</h3>
      <div v-for="(meal, idx) in currentMeals" :key="idx" class="space-y-4">
        <div class="bg-secondary/80 rounded-md px-4 py-2">
          <span class="text-xs font-bold uppercase tracking-wider text-foreground">{{ meal.type }}</span>
          <span class="text-xs text-muted-foreground ml-2">{{ meal.rationale }}</span>
        </div>
        <h4 class="font-heading text-xl font-medium text-foreground">{{ meal.name }}</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <h5 class="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Ingredients</h5>
              <ul class="space-y-1.5">
                <li v-for="(item, i) in meal.ingredients" :key="i" class="text-sm text-foreground flex items-start gap-2">
                  <span class="w-1 h-1 rounded-full bg-foreground/40 shrink-0 mt-1.5" />
                  {{ item }}
                </li>
              </ul>
            </div>
            <div>
              <h5 class="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Instructions</h5>
              <p class="text-sm text-foreground/80 leading-relaxed">{{ meal.instructions }}</p>
            </div>
          </div>
          <div>
            <h5 class="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Nutrition</h5>
            <div class="space-y-0">
              <div v-for="row in [['Calories', meal.nutrition.calories], ['Protein', meal.nutrition.protein], ['Carbs', meal.nutrition.carbs], ['Fat', meal.nutrition.fat], ['Vitamin D', meal.nutrition.vitaminD], ['B12', meal.nutrition.b12], ['Omega-3', meal.nutrition.omega3]]" :key="row[0]" class="flex justify-between py-2 text-sm border-b border-border last:border-0">
                <span class="text-muted-foreground">{{ row[0] }}</span>
                <span class="font-medium text-foreground">{{ row[1] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8 pt-6">
      <p class="text-sm font-semibold text-foreground mb-3">©2025 kwilthealth</p>
      <p class="text-xs text-foreground/70 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a nisi in enim consectetur varius. In lacinia eleifend magna porttitor pretium. Aenean nec bibendum felis, eget tincidunt libero. Sed at diam in massa pretium sollicitudin eleifend nec risus. Praesent sed neque a dolor vestibulum molestie sit amet nec massa. Nunc id fringilla diam. Etiam eget volutpat enim. Donec accumsan, lectus in tristique pharetra, massa mauris rhoncus enim, vitae tempus sapien mauris id enim.
      </p>
    </div>
  </div>
</template>
