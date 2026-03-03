<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MealPlanSection from '@/components/plan/MealPlanSection.vue'

const categoryTitles: Record<string, string> = {
  nutrition: 'Nutrition optimization',
  exercise: 'Exercise & Movement',
  sleep: 'Sleep optimization',
  diagnostics: 'Diagnostics',
  wellness: 'General Wellness',
  supplements: 'Supplements',
}

const categoryDescriptions: Record<string, string> = {
  nutrition: 'Personalized dietary recommendations based on your biomarker results and health goals.',
  exercise: 'Movement and training guidance tailored to your fitness level and longevity targets.',
  sleep: 'Evidence-based strategies to optimize your sleep quality and recovery.',
  diagnostics: 'Recommended tests and screenings based on your risk profile.',
  wellness: 'Holistic wellness practices to support your overall health journey.',
  supplements: 'Targeted supplementation to address nutrient gaps identified in your labs.',
}

interface PillarData {
  title: string
  description: string
  score: number
  maxScore: number
  outOfRange: string[]
  inRange: string[]
}

const pillarData: PillarData[] = [
  { title: 'Cardiovascular and metabolic health', description: 'Heart function, cholesterol, blood sugar regulation, and metabolic markers.', score: 18, maxScore: 20, outOfRange: ['ApoB', 'Lp(a)'], inRange: ['Total Cholesterol', 'HDL-C', 'LDL-C', 'Triglycerides', 'HbA1c', 'Fasting Glucose', 'Insulin', 'hsCRP'] },
  { title: 'Cancer prevention', description: 'Markers related to inflammation, immune surveillance, and early detection.', score: 10, maxScore: 20, outOfRange: ['PSA', 'CA-125', 'CEA', 'AFP', 'Vitamin D'], inRange: ['WBC', 'Lymphocytes', 'Neutrophils', 'Ferritin', 'Iron'] },
  { title: 'Brain health', description: 'Cognitive function, neuroinflammation, and neuroprotective markers.', score: 20, maxScore: 20, outOfRange: [], inRange: ['Homocysteine', 'Vitamin B12', 'Folate', 'Omega-3 Index', 'BDNF'] },
  { title: 'Bone and muscle care', description: 'Skeletal integrity, muscle function, and related hormonal markers.', score: 20, maxScore: 20, outOfRange: [], inRange: ['Calcium', 'Vitamin D', 'Magnesium', 'Phosphorus', 'Testosterone', 'DHEA-S'] },
  { title: 'Additional insights', description: 'Thyroid, liver, kidney function, and other systemic health markers.', score: 18, maxScore: 20, outOfRange: ['ALT', 'GGT'], inRange: ['TSH', 'Free T4', 'Free T3', 'Creatinine', 'eGFR', 'Albumin', 'Bilirubin', 'AST'] },
]

const notesText = `Based on your recent lab results, your nutritional profile shows strong metabolic health with a few areas for targeted improvement. Your cardiovascular markers are largely optimal, though ApoB and Lp(a) levels suggest a need for dietary adjustments focused on reducing saturated fat intake and increasing soluble fiber.

Your cancer prevention score indicates several markers that would benefit from an anti-inflammatory dietary approach — emphasizing cruciferous vegetables, omega-3 fatty acids, and limiting processed foods.

Brain health and bone & muscle markers are excellent, reflecting your current supplement regimen and active lifestyle. Continue prioritizing protein intake at 1.2–1.6g per kg of body weight to maintain these results.`

const route = useRoute()
const router = useRouter()
const categoryId = computed(() => (route.params.categoryId as string) ?? '')
const title = computed(() => categoryTitles[categoryId.value] ?? 'Plan Detail')
const description = computed(() => categoryDescriptions[categoryId.value] ?? '')
const expandedIndex = ref(0)
function handleToggle(index: number) {
  expandedIndex.value = index
}
</script>

<template>
  <div class="p-4 lg:p-12 space-y-8 max-w-6xl">
    <header class="flex items-center justify-between mb-8">
      <div class="space-y-1">
        <h1 class="font-heading text-2xl font-light lg:text-4xl">{{ title }}</h1>
        <p class="text-sm text-muted-foreground max-w-xl">{{ description }}</p>
      </div>
      <button
        type="button"
        class="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors flex items-center gap-1 shrink-0"
        @click="router.push('/plan')"
      >
        CLOSE<span class="text-lg">→</span>
      </button>
    </header>

    <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
      Your summary &amp; longevity pillars
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
      <div class="bg-white rounded-xl p-6 shadow-soft lg:h-full lg:overflow-y-auto">
        <h3 class="font-heading text-lg font-medium text-foreground mb-3">Notes</h3>
        <p class="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{{ notesText }}</p>
      </div>

      <div class="space-y-3">
        <div
          v-for="(pillar, index) in pillarData"
          :key="index"
          class="bg-white rounded-md overflow-hidden"
          style="box-shadow: var(--shadow-soft)"
        >
          <button
            type="button"
            class="w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-secondary/40"
            @click="handleToggle(index)"
          >
            <svg v-if="expandedIndex === index" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0 text-muted-foreground"><path d="m6 9 6 6 6-6" /></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0 text-muted-foreground"><path d="m9 18 6-6-6-6" /></svg>
            <div class="flex-1 min-w-0">
              <h4 class="font-heading text-base font-medium text-foreground">{{ pillar.title }}</h4>
              <p class="text-xs text-muted-foreground mt-0.5">{{ pillar.description }}</p>
            </div>
            <span class="font-heading text-2xl text-foreground shrink-0">{{ pillar.score }}/{{ pillar.maxScore }}</span>
          </button>
          <div v-show="expandedIndex === index" class="px-4 pb-4 pt-1">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="bg-white border border-border rounded-md p-4">
                <span class="inline-flex items-center rounded-md bg-kwilt-red/30 text-foreground px-2.5 py-0.5 text-xs font-normal">out of range</span>
                <h5 class="text-xs font-medium uppercase tracking-wider text-foreground mt-3 mb-2">Biomarkers</h5>
                <div v-if="pillar.outOfRange.length > 0" class="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  <div v-for="marker in pillar.outOfRange" :key="marker" class="text-sm text-foreground flex items-center gap-2">
                    <span class="w-1 h-1 rounded-full bg-foreground/40 shrink-0" />
                    {{ marker }}
                  </div>
                </div>
                <p v-else class="text-sm text-muted-foreground">All markers in range</p>
              </div>
              <div class="bg-white border border-border rounded-md p-4">
                <span class="inline-flex items-center rounded-md bg-kwilt-blue/30 text-foreground px-2.5 py-0.5 text-xs font-normal">in range</span>
                <h5 class="text-xs font-medium uppercase tracking-wider text-foreground mt-3 mb-2">Biomarkers</h5>
                <div v-if="pillar.inRange.length > 0" class="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  <div v-for="marker in pillar.inRange" :key="marker" class="text-sm text-foreground flex items-center gap-2">
                    <span class="w-1 h-1 rounded-full bg-foreground/40 shrink-0" />
                    {{ marker }}
                  </div>
                </div>
                <p v-else class="text-sm text-muted-foreground">No markers in range</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <MealPlanSection />
  </div>
</template>
