<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useScenarioStore } from '@/stores/scenario'
import type { ScenarioKey } from '@/stores/scenario'
import UiDropdownMenu from '@/components/ui/dropdown-menu.vue'
import longevityImage from '@/assets/longevity-card.jpg'
import biologicalAgeImage from '@/assets/biological-age-card.jpg'
import productBalance from '@/assets/product-balance.png'
import productGlp1 from '@/assets/product-glp1.png'
import productSemaglutide from '@/assets/product-semaglutide.png'
import referAndEarnImage from '@/assets/refer-and-earn.png'
import howToUseImage from '@/assets/how-to-use-kwilt.png'

const router = useRouter()
const scenarioStore = useScenarioStore()
const scenario = computed(() => scenarioStore.scenario)
const setScenario = (k: ScenarioKey) => scenarioStore.setScenario(k)

const scenarios: { key: ScenarioKey; label: string }[] = [
  { key: 'none', label: 'Default View' },
  { key: 'default-with-wizard', label: 'Default View with Wizard' },
  { key: 'new-rx-ordered', label: 'Member - New Rx Ordered' },
  { key: 'assessment-not-started', label: 'Intake Not Started' },
  { key: 'intake-complete', label: 'Lab Requisition Ready' },
  { key: 'preparing-lab-requisition', label: 'Preparing Lab Requisition' },
  { key: 'labs-ordered', label: 'Labs Ordered' },
]

const activeScenarioLabel = computed(() => scenarios.find((s) => s.key === scenario.value)?.label ?? 'Default View')
const isWizard = computed(() => scenario.value === 'default-with-wizard')
const isBlank = computed(() => scenario.value === 'assessment-not-started')
const isIntakeComplete = computed(() => scenario.value === 'intake-complete')
const isPreparingLab = computed(() => scenario.value === 'preparing-lab-requisition')
const isLabsOrdered = computed(() => scenario.value === 'labs-ordered')
const isScoresBlank = computed(() => isBlank.value || isIntakeComplete.value || isPreparingLab.value || isLabsOrdered.value)

const showTourBanner = ref(true)
const expandedScore = ref<string | null>('Heart health')
const activeCategory = ref('Exercises')
const labReqModalOpen = ref(false)

const healthScores = [
  { title: 'Heart health', subtitle: 'Evaluates your heart and blood vessels, including inflammation and cholesterol-related risks.', score: 14, maxScore: 20, status: 'improving' as const },
  { title: 'Metabolic health', subtitle: 'Measures blood sugar regulation, fat metabolism, and body composition resilience.', score: 20, maxScore: 20, status: 'optimal' as const },
  { title: 'Brain health', subtitle: 'Assesses cognitive biomarkers, neuroinflammation, and neural support nutrients.', score: 18, maxScore: 20, status: 'optimal' as const },
  { title: 'Cancer prevention', subtitle: 'Tracks inflammation, antioxidant levels, and early-warning biomarkers for cancer risk.', score: 8, maxScore: 20, status: 'improving' as const },
  { title: 'Bone and muscle care', subtitle: 'Evaluates bone density markers, muscle health indicators, and key supporting minerals.', score: 20, maxScore: 20, status: 'optimal' as const },
]

const planCategories = ['Nutrition', 'Supplements', 'Exercises', 'Sleep', 'Therapy', 'Medical Intervention']

const treatments = [
  { name: 'Balance', category: 'Weightloss', price: '$149/mo', image: productBalance, badge: 'BEST SELLER', badgeDot: false },
  { name: 'GLP-1 Assist', category: 'Weightloss', price: '$299/mo', image: productGlp1, badge: null, badgeDot: false },
  { name: 'NAD+', category: 'Hormone Treatment', price: '$79/mo', image: productSemaglutide, badge: 'LAB REQUIRED', badgeDot: true },
  { name: 'Semaglutide', category: 'Hormone Treatment', price: '$79/mo', image: productSemaglutide, badge: 'LAB REQUIRED', badgeDot: true },
  { name: 'Tirzepatide', category: 'Metabolic Health', price: '$199/mo', image: productGlp1, badge: null, badgeDot: false },
]
</script>

<template>
  <div class="relative p-4 lg:p-12">
    <div class="absolute top-4 right-4 lg:top-12 lg:right-12 z-50">
      <UiDropdownMenu align="end" class="min-w-[200px] bg-popover">
        <template #trigger>
          <button type="button" class="flex items-center gap-1.5 rounded-full border border-border bg-popover px-3 py-1.5 text-xs font-medium text-foreground shadow-sm hover:bg-muted transition-colors focus:outline-none">
            <span class="text-muted-foreground">Demo:</span>
            <span>{{ activeScenarioLabel }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </template>
        <div class="px-2 py-1.5 text-xs text-muted-foreground">Select Scenario</div>
        <div class="border-t border-border my-1" />
        <button v-for="s in scenarios" :key="s.key" type="button" class="block w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-muted" :class="scenario === s.key ? 'bg-muted font-medium' : ''" @click="setScenario(s.key)">{{ s.label }}</button>
      </UiDropdownMenu>
    </div>

    <header class="mb-8">
      <h1 class="font-heading text-2xl font-medium lg:text-5xl">Hello, Elisa</h1>
      <p class="mt-2 text-muted-foreground">14 day streak. Last updated 9:45 am.</p>
    </header>

    <div v-if="isWizard && showTourBanner" class="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-kwilt-red px-6 py-5 text-kwilt-bark">
      <div>
        <p class="text-sm font-medium mb-1.5">🎉 Congrats — your labs are in!</p>
        <p class="text-base leading-relaxed">Your personalized dashboard is ready. Take a quick tour to see what's here.</p>
      </div>
      <div class="flex items-center gap-3 flex-none">
        <button type="button" class="rounded-md border border-kwilt-bark/30 px-5 py-3 text-sm font-medium text-kwilt-bark hover:bg-kwilt-bark/10 transition-colors whitespace-nowrap" @click="showTourBanner = false">Dismiss</button>
        <button type="button" class="rounded-md bg-kwilt-bark px-5 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity whitespace-nowrap">Tour the Portal</button>
      </div>
    </div>

    <div v-if="isBlank" class="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-kwilt-red px-6 py-5 text-kwilt-bark">
      <div>
        <p class="text-sm font-medium mb-1.5">Welcome!</p>
        <p class="text-base leading-relaxed">To fill dashboard with your personalized insights—we just need your information. Get started by completing your <span class="font-semibold">Intake Questionnaire</span>.</p>
      </div>
      <button type="button" class="flex-none rounded-md bg-kwilt-bark px-7 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity whitespace-nowrap" @click="router.push('/assessment')">Start Intake</button>
    </div>

    <div v-if="isIntakeComplete && !labReqModalOpen" class="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-kwilt-red px-6 py-5 text-kwilt-bark">
      <div>
        <p class="text-sm font-medium mb-1.5">Your Lab Requisition Is Ready</p>
        <p class="text-base leading-relaxed">Download your requisition and book your lab visit to get your blood work done.</p>
      </div>
      <button type="button" class="flex-none rounded-md bg-kwilt-bark px-7 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity whitespace-nowrap" @click="labReqModalOpen = true">View details</button>
    </div>

    <div v-if="isPreparingLab" class="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-accent px-6 py-5 text-foreground">
      <div>
        <p class="text-sm font-medium mb-1.5">Preparing Your Lab Requisition</p>
        <p class="text-base leading-relaxed">We're preparing your lab requisition. Once ready, you'll receive it with instructions to visit a lab for your blood work.</p>
      </div>
      <div class="flex-none rounded-md bg-foreground px-7 py-3 text-sm font-medium text-background opacity-60 cursor-default whitespace-nowrap">In progress</div>
    </div>

    <div v-if="isLabsOrdered" class="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-[#F5C451] px-6 py-5 text-kwilt-bark">
      <div>
        <p class="text-sm font-medium mb-1.5">Your Lab Results Are Arriving Soon</p>
        <p class="text-base leading-relaxed">We'll notify you when your results are ready and you can schedule your labs.</p>
      </div>
      <div class="flex-none rounded-md bg-kwilt-bark px-7 py-3 text-sm font-medium text-white opacity-60 cursor-default whitespace-nowrap">Pending</div>
    </div>

    <div class="mb-6 grid gap-6 lg:grid-cols-2">
      <div class="card-hero relative flex flex-col justify-between overflow-hidden p-6 text-white rounded-xl" :style="{ aspectRatio: '580/534', backgroundImage: `url(${longevityImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 rounded-xl" />
        <div class="relative z-10">
          <h3 class="font-heading text-xl sm:text-3xl font-medium leading-tight text-white">KWILT™ longevity score</h3>
          <p class="mt-1 text-sm font-light text-white">{{ isScoresBlank ? 'Complete your assessment to unlock this score.' : 'Based on the lab test from January 2025' }}</p>
        </div>
        <div class="relative z-10 self-end text-right">
          <span v-if="isScoresBlank" class="font-heading text-6xl font-light leading-none text-white/40">--</span>
          <template v-else><span class="font-heading text-6xl font-light leading-none text-white">60</span><span class="font-heading text-3xl font-light text-white">/100</span></template>
          <p class="mt-3 max-w-[220px] text-sm font-light text-white ml-auto text-right">{{ isScoresBlank ? 'Your score total will be based on an analysis of all screened biomarkers across the five health pillars.' : 'Your score total is based on an analysis of all screened biomarkers across the five health pillars.' }}</p>
        </div>
      </div>
      <div class="card-hero relative flex flex-col justify-between overflow-hidden p-6 text-white rounded-xl" :style="{ aspectRatio: '580/534', backgroundImage: `url(${biologicalAgeImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 rounded-xl" />
        <div class="relative z-10">
          <h3 class="font-heading text-xl sm:text-3xl font-medium leading-tight text-white">Biological age</h3>
          <p class="mt-1 text-sm font-light text-white">{{ isScoresBlank ? 'Complete your assessment to unlock this score.' : 'Based on the lab test from January 2025' }}</p>
        </div>
        <div class="relative z-10 self-end text-right">
          <span v-if="isScoresBlank" class="font-heading text-6xl font-light leading-none text-white/40">--</span>
          <template v-else><span class="font-heading text-6xl font-light leading-none text-white">34</span><span class="font-heading text-3xl font-light text-white">.7</span></template>
          <p class="mt-3 max-w-[220px] text-sm font-light text-white ml-auto text-right">{{ isScoresBlank ? 'Your biological age will appear here after your first lab results.' : 'Your biological age is' }} <span v-if="!isScoresBlank" style="color: hsl(30, 100%, 84%)">10.5 years</span> <span v-if="!isScoresBlank" class="text-white">younger than your calendar age</span></p>
        </div>
      </div>
    </div>

    <section class="mb-12">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="font-heading text-2xl font-medium">Your scores</h2>
        <router-link to="/results" class="text-muted-foreground text-sm flex items-center gap-1">VIEW ALL<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></router-link>
      </div>
      <div class="flex flex-col gap-1.5">
        <div v-for="score in healthScores" :key="score.title" class="rounded-lg border border-border bg-card p-4">
          <button type="button" class="w-full flex items-center justify-between text-left" @click="expandedScore = expandedScore === score.title ? null : score.title">
            <div>
              <p class="font-heading font-medium">{{ score.title }}</p>
              <p class="text-sm text-muted-foreground">{{ score.subtitle }}</p>
            </div>
            <span v-if="!isScoresBlank" class="text-sm font-medium">{{ score.score }}/{{ score.maxScore }}</span>
          </button>
        </div>
      </div>
    </section>

    <section class="mb-12">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="font-heading text-2xl font-medium">Biomarkers</h2>
        <router-link to="/results#biomarkers" class="text-muted-foreground text-sm flex items-center gap-1">VIEW ALL<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></router-link>
      </div>
      <div class="rounded-md bg-card p-6 shadow-soft">
        <p class="text-muted-foreground text-sm">Your biomarker details will appear here. Use scenario selector to see different states.</p>
      </div>
    </section>

    <section class="mb-12">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="font-heading text-2xl font-medium">Your plan</h2>
        <router-link to="/plan" class="text-muted-foreground text-sm flex items-center gap-1">VIEW FULL TREATMENT PLAN<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></router-link>
      </div>
      <div class="mb-8 flex flex-wrap gap-3">
        <button v-for="cat in planCategories" :key="cat" type="button" class="rounded-md border px-5 py-2.5 text-sm font-medium transition-all" :class="activeCategory === cat ? 'border-transparent text-foreground bg-[hsl(var(--kwilt-peach))]' : 'border-border bg-transparent hover:border-foreground/40'" @click="activeCategory = cat">{{ cat }}</button>
      </div>
      <p class="text-base leading-relaxed text-foreground">Your plan content for {{ activeCategory }}. Based on your lab results, we recommend targeted nutrition, lifestyle, and supplement recommendations.</p>
    </section>

    <section class="mb-12">
      <h2 class="font-heading text-2xl font-medium mb-6">Recommended for you</h2>
      <div class="flex gap-4 overflow-x-auto pb-4">
        <div v-for="t in treatments" :key="t.name" class="flex-none w-64 rounded-xl border border-border bg-card overflow-hidden">
          <div class="aspect-square bg-[#EDE8E2] flex items-center justify-center p-4 relative">
            <img :src="t.image" :alt="t.name" class="max-h-full object-contain" />
            <span v-if="t.badge" class="absolute top-2 right-2 rounded bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">{{ t.badge }}</span>
          </div>
          <div class="p-4">
            <h3 class="font-heading font-medium">{{ t.name }}</h3>
            <p class="text-sm text-muted-foreground">{{ t.category }}</p>
            <p class="text-sm font-medium mt-1">{{ t.price }}</p>
            <button type="button" class="mt-3 w-full rounded-md bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Add to Plan</button>
          </div>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="rounded-xl overflow-hidden">
        <img :src="referAndEarnImage" alt="Refer and earn" class="w-full h-48 object-cover" />
        <div class="p-4 bg-card">
          <h3 class="font-heading text-lg font-medium">Refer a friend</h3>
          <p class="text-sm text-muted-foreground mt-1">Share KWILT and earn rewards when they join.</p>
        </div>
      </div>
      <div class="rounded-xl overflow-hidden">
        <img :src="howToUseImage" alt="How to use KWILT" class="w-full h-48 object-cover" />
        <div class="p-4 bg-card">
          <h3 class="font-heading text-lg font-medium">How to use KWILT</h3>
          <p class="text-sm text-muted-foreground mt-1">Get the most out of your membership.</p>
        </div>
      </div>
    </section>
  </div>
</template>
