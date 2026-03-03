<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import kwiltLogo from '@/assets/kwilt-logo-dark.png'

const SECTION_NAMES = [
  'Biometrics',
  'Health Goals',
  'Pregnancy',
  'Hormonal Health',
  'Medical History',
  'Preventive Screening',
  'Medications',
  'Family History',
  'Nutrition',
  'Physical Activity',
  'Sleep',
  'Substance Use',
  'Informed Consent',
]

const props = defineProps<{
  currentStep: number
  totalSteps: number
}>()

const sectionName = computed(() => SECTION_NAMES[props.currentStep - 1] ?? '')
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <header class="flex items-center justify-between border-b border-border px-6 py-4 lg:px-12 bg-card">
      <RouterLink to="/">
        <img :src="kwiltLogo" alt="KWILT" class="h-7 w-auto" />
      </RouterLink>
      <RouterLink
        to="/dashboard"
        class="text-xs font-semibold uppercase tracking-widest text-foreground hover:text-foreground transition-colors"
      >
        Exit
      </RouterLink>
    </header>

    <div class="bg-card border-b border-border px-6 py-3 lg:px-12">
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-[11px] font-semibold uppercase tracking-widest text-foreground">
          {{ sectionName }}
        </span>
        <span class="text-[11px] font-semibold text-foreground">
          {{ currentStep }} of {{ totalSteps }}
        </span>
      </div>
      <div class="flex gap-1">
        <div
          v-for="i in totalSteps"
          :key="i"
          class="h-1.5 flex-1 rounded-full transition-all duration-500 ease-out"
          :class="i <= currentStep ? 'bg-primary' : 'bg-border'"
        />
      </div>
    </div>

    <main class="flex-1 flex flex-col">
      <slot />
    </main>

    <footer class="border-t border-border px-6 py-6 lg:px-12">
      <p class="text-[10px] leading-relaxed text-foreground max-w-3xl">
        KWILT Health Intake Form — The information collected here is used solely to personalize your health assessment and recommendations. All data is encrypted and stored securely in accordance with HIPAA guidelines. KWILT does not sell or share your personal health information with third parties. ©2025 KWILT Health, Inc.
      </p>
    </footer>
  </div>
</template>
