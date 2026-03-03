<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useScenarioStore } from '@/stores/scenario'
import UiCheckbox from '@/components/ui/checkbox.vue'
import UiButton from '@/components/ui/button.vue'
import planCtaHero from '@/assets/plan-cta-hero.png'

type Priority = 'MUST DO' | 'ROUTINE' | 'PRO TIP'

interface ActionItem {
  id: string
  priority: Priority
  title: string
  description: string
}

const actions: ActionItem[] = [
  { id: '1', priority: 'MUST DO', title: 'Take Vitamin D3 supplement', description: 'Your levels are below optimal range. Take 5000 IU daily with a fat-containing meal.' },
  { id: '2', priority: 'MUST DO', title: '30-min strength training', description: 'Focus on compound movements — squats, deadlifts, bench press. Track progressive overload.' },
  { id: '3', priority: 'ROUTINE', title: 'Eat 30g protein at breakfast', description: 'Supports muscle synthesis and keeps blood sugar stable through the morning.' },
  { id: '4', priority: 'ROUTINE', title: 'Wind-down routine by 10 PM', description: 'Dim lights, no screens 30 min before bed. Aim for 7–8 hours of quality sleep.' },
  { id: '5', priority: 'PRO TIP', title: 'Drink 3L of water today', description: 'Spread intake across the day. Add electrolytes if exercising for over an hour.' },
  { id: '6', priority: 'PRO TIP', title: '5-min mindfulness session', description: 'Box breathing or guided meditation. Reduces cortisol and supports recovery.' },
]

interface AgendaItem { time: string; label: string }
interface AgendaBlock { period: string; items: AgendaItem[] }

const agenda: AgendaBlock[] = [
  { period: 'MORNING', items: [
    { time: '7:30 AM', label: 'Veggie Egg White Omelet (breakfast)' },
    { time: '7:30 AM', label: 'Taurine 1g, Astaxanthin 6mg, Omega-3 1.5g (breakfast supps)' },
    { time: '8:00 AM', label: 'Morning sunlight exposure (10–15 min outside)' },
    { time: '8:30 AM', label: 'Upper-Body Strength (Push-ups, Rows, Band Raises)' },
    { time: '9:00 AM', label: 'Creatine 5g (after breakfast/workout)' },
    { time: '10:00 AM', label: 'Grapes & Almonds (snack 1)' },
    { time: '10:00 AM', label: 'Collagen 10g (morning smoothie/snack)' },
  ]},
  { period: 'MIDDAY', items: [
    { time: '12:00 PM', label: 'Berberine 500mg (before lunch)' },
    { time: '12:30 PM', label: 'Turkey & Avocado Wrap (lunch)' },
    { time: '2:00 PM', label: 'Shoulder PT (per therapist/schedule)' },
    { time: '3:30 PM', label: 'Cucumber & Tomato Salad (snack 2)' },
  ]},
  { period: 'EVENING', items: [
    { time: '6:00 PM', label: 'Berberine 500mg (before dinner)' },
    { time: '6:30 PM', label: 'Grilled Chicken with Sweet Potato and Kale' },
    { time: '9:45 PM', label: 'Evening wind-down: dim lights, 30 min screen-free' },
    { time: '10:00 PM', label: 'Magnesium glycinate 200mg & Glycine 3g' },
    { time: '10:30 PM', label: 'Target bedtime' },
  ]},
]

interface PlanCategory { id: string; title: string; description: string }

const planCategories: PlanCategory[] = [
  { id: 'nutrition', title: 'Nutrition optimization', description: 'Your cardiovascular lab results indicate areas of improvement for someone aged 34, focusing on consistent.' },
  { id: 'exercise', title: 'Exercise & Movement', description: 'Your cardiovascular lab results indicate areas of improvement for someone aged 34, focusing on consistent.' },
  { id: 'sleep', title: 'Sleep optimization', description: 'Your cardiovascular lab results indicate areas of improvement for someone aged 34, focusing on consistent.' },
  { id: 'diagnostics', title: 'Diagnostics', description: 'Your cardiovascular lab results indicate areas of improvement for someone aged 34, focusing on consistent.' },
  { id: 'wellness', title: 'General Wellness', description: 'Your cardiovascular lab results indicate areas of improvement for someone aged 34, focusing on consistent.' },
  { id: 'supplements', title: 'Supplements', description: 'Your cardiovascular lab results indicate areas of improvement for someone aged 34, focusing on consistent.' },
]

const priorityDotColor: Record<Priority, string> = {
  'MUST DO': 'bg-primary',
  'ROUTINE': 'bg-status-optimal',
  'PRO TIP': 'bg-accent',
}
const priorityBadgeBg: Record<Priority, string> = {
  'MUST DO': 'bg-accent/60 text-foreground',
  'ROUTINE': 'bg-accent/60 text-foreground',
  'PRO TIP': 'bg-accent/60 text-foreground',
}

const router = useRouter()
const { scenario } = useScenarioStore()
const isBlank = computed(() => scenario === 'assessment-not-started')
const isPreLab = computed(() => scenario !== 'none' && !isBlank.value && scenario !== 'default-with-wizard' && scenario !== 'new-rx-ordered')
const activeSlide = ref(0)
const SLIDE_LABELS = ["Top Actions", "Today's Agenda"]
</script>

<template>
  <div class="p-4 lg:p-12 space-y-6 max-w-6xl">
    <header class="flex items-center justify-between mb-8">
      <h1 class="font-heading text-2xl font-light lg:text-4xl">Your KWILT plan</h1>
      <UiButton
        class="rounded-md bg-primary px-5 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors flex items-center gap-1.5 whitespace-nowrap"
        @click="router.push('/patient-portal?tab=visit-summary')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M16 13H8" /><path d="M16 17H8" /><polyline points="10 9 9 9 8 9" /></svg>
        <span class="hidden sm:inline">Clinician's notes</span>
        <span class="sm:hidden">Notes</span>
      </UiButton>
    </header>

    <div v-if="isPreLab" class="rounded-lg bg-accent/40 px-4 py-3">
      <p class="text-sm font-light text-foreground">
        Your plan will become more personalized once your lab results are available.
      </p>
    </div>

    <div class="flex items-center justify-between">
      <div class="inline-flex gap-1 rounded-full bg-white p-1 shadow-soft">
        <button
          v-for="(label, i) in SLIDE_LABELS"
          :key="label"
          type="button"
          class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
          :class="activeSlide === i ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-black/5'"
          @click="activeSlide = i"
        >
          {{ label }}
        </button>
      </div>
      <div class="flex gap-1">
        <button
          type="button"
          class="p-1.5 rounded-full text-foreground disabled:opacity-30 hover:bg-secondary transition-colors"
          :disabled="activeSlide <= 0"
          @click="activeSlide = Math.max(0, activeSlide - 1)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button
          type="button"
          class="p-1.5 rounded-full text-foreground disabled:opacity-30 hover:bg-secondary transition-colors"
          :disabled="activeSlide >= SLIDE_LABELS.length - 1"
          @click="activeSlide = Math.min(SLIDE_LABELS.length - 1, activeSlide + 1)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
    </div>

    <div v-if="isBlank" class="bg-white border border-border rounded-xl p-8 text-center">
      <p class="text-muted-foreground font-light">
        Complete your health assessment to receive your personalized plan.
      </p>
    </div>
    <template v-else>
      <div class="bg-white border border-border rounded-xl p-5 h-full">
        <div v-show="activeSlide === 0" class="space-y-4">
          <h2 class="text-xl font-medium text-foreground">Top actions across your six plans</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              v-for="a in actions"
              :key="a.id"
              class="card-action relative overflow-hidden border-0 rounded-lg p-4"
              style="background-color: #F6F1F0"
            >
              <div class="flex items-start gap-3 relative z-10">
                <div class="flex-1 space-y-1.5">
                  <span
                    class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    :class="priorityBadgeBg[a.priority]"
                  >
                    <span class="h-1.5 w-1.5 rounded-full" :class="priorityDotColor[a.priority]" />
                    {{ a.priority }}
                  </span>
                  <p class="text-base font-medium text-foreground leading-snug">{{ a.title }}</p>
                  <p class="text-sm text-muted-foreground leading-relaxed">{{ a.description }}</p>
                </div>
                <UiCheckbox class="mt-1 h-5 w-5 rounded-sm border-muted" />
              </div>
            </div>
          </div>
        </div>
        <div v-show="activeSlide === 1" class="space-y-5">
          <h2 class="text-xl font-normal text-foreground">Today's agenda</h2>
          <div v-for="block in agenda" :key="block.period" class="space-y-2">
            <div class="w-full rounded-lg bg-secondary px-4 py-2">
              <span class="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{{ block.period }}</span>
            </div>
            <div class="space-y-1.5 px-4">
              <p v-for="(item, i) in block.items" :key="i" class="text-sm font-light text-foreground">
                <span class="text-muted-foreground font-light">{{ item.time }}</span> {{ item.label }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-1.5">
        <button
          v-for="cat in planCategories"
          :key="cat.id"
          type="button"
          class="w-full text-left rounded-md bg-card px-4 py-4 shadow-soft md:px-6 md:py-5"
          @click="router.push(`/plan/${cat.id}`)"
        >
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex flex-col gap-0.5">
              <div class="flex items-center gap-2 font-heading text-xl font-medium">
                {{ cat.title }}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6" /></svg>
              </div>
              <p class="text-sm text-muted-foreground leading-snug">{{ cat.description }}</p>
            </div>
          </div>
        </button>
      </div>
    </template>

    <section class="mt-4 relative w-full overflow-hidden rounded-2xl" style="aspect-ratio: 21/9">
      <img :src="planCtaHero" alt="Get the full picture" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      <div class="relative z-10 flex h-full flex-col justify-end p-6 md:p-10">
        <h2 class="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-light leading-tight">Get the full picture.</h2>
        <div class="my-3 h-[1px] w-full max-w-md bg-white/60" />
        <h2 class="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-light leading-tight">Take control.</h2>
        <div class="mt-3 h-[1px] w-full max-w-md bg-white/60" />
      </div>
    </section>

    <footer class="mt-6 pb-8 space-y-3">
      <p class="text-sm font-medium text-foreground">©2025 kwilthealth</p>
      <p class="text-xs text-muted-foreground leading-relaxed max-w-2xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a risus enim consectetur varius, in facilisi eleifend magna porttitor pretium. Aenean nec bibendum felis, eget tincidunt libero. Sed ut diam in massa pretium sollicitudin eleifend nec risus. Praesent sed neque a dolor vestibulum molestie sit amet nec massa. Nunc id fringilla diam. Etiam eget volutpat enim. Donec accumsan, lectus in tristique pharetra, massa mauris rhoncus enim, vitae tempus sapien mauris id enim.
      </p>
    </footer>
  </div>
</template>
