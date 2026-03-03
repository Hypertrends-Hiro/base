<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'

interface BiomarkerItem {
  name: string
  status: 'above' | 'below' | 'out' | 'optimal'
  value?: string
}

interface BiomarkerCategory {
  title: string
  markers: BiomarkerItem[]
}

const statusLabel: Record<string, string> = {
  above: 'Above Range',
  below: 'Below Range',
  out: 'Out of Range',
  optimal: 'In Range',
}

const statusDotColor: Record<string, string> = {
  above: 'bg-kwilt-red',
  below: 'bg-kwilt-honey',
  out: 'bg-kwilt-red',
  optimal: 'bg-kwilt-green',
}

const categories: BiomarkerCategory[] = [
  {
    title: 'Cardiovascular Health Markers',
    markers: [
      { name: 'Lipid Panel (Total Chol, LDL, HDL, Triglycerides)', status: 'above', value: '264 nmol/L' },
      { name: 'ApoB – Total atherogenic particles', status: 'above', value: '264 nmol/L' },
      { name: 'Lipoprotein(a) – Genetic cholesterol risk', status: 'out' },
      { name: 'Homocysteine – Vascular inflammation', status: 'above', value: '264 nmol/L' },
      { name: 'Omega-3 Index – Protective fatty acids', status: 'below', value: '336 nmol/L' },
      { name: 'hs-CRP – Arterial inflammation', status: 'above', value: '264 nmol/L' },
      { name: 'CMP / Urinalysis / Cortisol / Lead – Kidney, stress, toxin load', status: 'above', value: '176 mg/L' },
    ],
  },
  {
    title: 'Metabolic Health Markers',
    markers: [
      { name: 'Fasting Glucose', status: 'optimal', value: '92 mg/dL' },
      { name: 'HbA1c – Long-term blood sugar', status: 'optimal', value: '5.2%' },
      { name: 'Insulin – Fasting level', status: 'optimal', value: '6.4 µIU/mL' },
      { name: 'HOMA-IR – Insulin resistance index', status: 'optimal', value: '1.5' },
    ],
  },
  {
    title: 'Organ-Function Panels (Liver, Kidney, Pancreas)',
    markers: [
      { name: 'ALT – Liver enzyme', status: 'optimal', value: '22 U/L' },
      { name: 'AST – Liver enzyme', status: 'optimal', value: '19 U/L' },
      { name: 'GGT – Liver/bile duct', status: 'above', value: '58 U/L' },
      { name: 'BUN – Kidney function', status: 'optimal', value: '14 mg/dL' },
      { name: 'Creatinine – Kidney filtration', status: 'optimal', value: '0.9 mg/dL' },
      { name: 'eGFR – Kidney efficiency', status: 'optimal', value: '98 mL/min' },
    ],
  },
  {
    title: 'Hormonal Health Markers',
    markers: [
      { name: 'Total Testosterone', status: 'below', value: '380 ng/dL' },
      { name: 'Free Testosterone', status: 'below', value: '8.2 pg/mL' },
      { name: 'DHEA-S – Adrenal hormone', status: 'optimal', value: '310 µg/dL' },
      { name: 'Cortisol – Stress hormone', status: 'above', value: '22 µg/dL' },
      { name: 'Estradiol', status: 'optimal', value: '28 pg/mL' },
    ],
  },
  {
    title: 'Thyroid Function',
    markers: [
      { name: 'TSH – Thyroid stimulating hormone', status: 'optimal', value: '2.1 mIU/L' },
      { name: 'Free T4 – Active thyroid hormone', status: 'optimal', value: '1.2 ng/dL' },
      { name: 'Free T3 – Cellular thyroid hormone', status: 'optimal', value: '3.1 pg/mL' },
    ],
  },
  {
    title: 'Inflammation & Immune Markers',
    markers: [
      { name: 'Lipid Panel (Total Chol, LDL, HDL, Triglycerides)', status: 'above', value: '264 nmol/L' },
      { name: 'ApoB – Total atherogenic particles', status: 'above', value: '264 nmol/L' },
      { name: 'Homocysteine – Vascular inflammation', status: 'above', value: '264 nmol/L' },
      { name: 'Omega-3 Index – Protective fatty acids', status: 'below', value: '336 nmol/L' },
      { name: 'hs-CRP – Arterial inflammation', status: 'above', value: '264 nmol/L' },
    ],
  },
  {
    title: 'Nutritional Status Markers',
    markers: [
      { name: 'Vitamin D – Immune & bone health', status: 'below', value: '22 ng/mL' },
      { name: 'Vitamin B12 – Neural support', status: 'optimal', value: '680 pg/mL' },
      { name: 'Folate – Cell repair', status: 'optimal', value: '14 ng/mL' },
      { name: 'Iron / Ferritin – Oxygen transport', status: 'above', value: '310 ng/mL' },
      { name: 'Magnesium – Muscle & nerve function', status: 'optimal', value: '2.1 mg/dL' },
    ],
  },
]

const categoryExpanded = ref<boolean[]>(categories.map(() => false))
</script>

<template>
  <section class="mt-10">
    <h2 class="font-heading text-2xl font-medium lg:text-4xl mb-5">
      All Biomarkers
    </h2>
    <div class="space-y-3">
      <div
        v-for="(c, idx) in categories"
        :key="c.title"
        class="rounded-md bg-card shadow-soft"
      >
        <button
          type="button"
          class="flex w-full items-center justify-between px-4 py-4 md:px-6"
          @click="categoryExpanded[idx] = !categoryExpanded[idx]"
        >
          <span class="font-heading text-base font-medium">{{ c.title }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            :class="cn('h-4 w-4 text-muted-foreground transition-transform duration-200', categoryExpanded[idx] && 'rotate-180')"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <div
          v-show="categoryExpanded[idx]"
          class="animate-fade-in border-t border-border px-4 pb-4 md:px-6"
        >
          <ul class="divide-y divide-border">
            <li
              v-for="m in c.markers"
              :key="m.name"
              class="py-3 first:pt-3 last:pb-0"
            >
              <p class="text-sm leading-snug text-foreground">{{ m.name }}</p>
              <p class="flex items-center gap-1.5 text-xs font-medium mt-0.5">
                <span :class="cn('h-2 w-2 rounded-full flex-shrink-0', statusDotColor[m.status])" />
                <span class="text-foreground">{{ statusLabel[m.status] }}</span>
                <span v-if="m.value" class="text-foreground">– {{ m.value }}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
