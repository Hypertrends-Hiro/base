<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useScenarioStore } from '@/stores/scenario'
import howToUseKwilt from '@/assets/how-to-use-kwilt.png'
import navResults from '@/assets/nav-results.svg'
import navPlan from '@/assets/nav-plan.svg'
import navTreatments from '@/assets/nav-treatments.svg'
import navLifestyle from '@/assets/nav-lifestyle.svg'
import navSettings from '@/assets/nav-settings.svg'

const sections = [
  { icon: navResults, title: 'Results', route: '/results', description: 'View your lab results, biomarker trends, and health scores.' },
  { icon: navPlan, title: 'Your Plan', route: '/plan', description: 'Access your personalized nutrition, supplement, exercise, and sleep recommendations.' },
  { icon: navTreatments, title: 'Treatments', route: '/treatments', description: 'Browse and manage prescription therapies.' },
  { icon: navLifestyle, title: 'Lifestyle', route: '/lifestyle', description: 'Track your daily meals, get nutritional grades, and monitor eating patterns over time.' },
  { icon: navSettings, title: 'Settings & Profile', route: '/profile', description: 'Manage your account details, shipping addresses, payment methods, notification preferences, and referral program.' },
]

const tips = [
  { number: '01', text: 'Start with your Dashboard — it gives you a snapshot of all your health scores and what needs attention first.' },
  { number: '02', text: 'Check your Results after each lab test to see updated biomarker levels and how they compare to your previous readings.' },
  { number: '03', text: 'Follow Your Plan daily — the nutrition and supplement recommendations update based on your latest results.' },
  { number: '04', text: 'Log meals in Lifestyle to get real-time feedback on your nutritional choices and track improvements.' },
]

const router = useRouter()
const { scenario } = useScenarioStore()
const showTourLink = computed(() => scenario === 'default-with-wizard')

function handleRestartTour() {
  localStorage.removeItem('kwilt_wizard_seen_count')
  localStorage.removeItem('kwilt_wizard_dismissed')
  router.push('/dashboard')
}
</script>

<template>
  <div class="p-4 lg:p-12">
    <header class="mb-8 flex items-start justify-between gap-4">
      <div>
        <h1 class="font-heading text-2xl font-medium lg:text-4xl">
          How to use KWILT
        </h1>
        <p class="text-sm font-light text-muted-foreground mt-2 max-w-xl">
          A quick guide to navigating your health portal and getting the most out of your membership.
        </p>
      </div>
      <button
        v-if="showTourLink"
        type="button"
        class="flex-none inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-light tracking-wide uppercase transition-colors"
        style="background: #F5F1F0"
        @click="handleRestartTour"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        Restart Tour
      </button>
    </header>

    <div class="relative rounded-2xl overflow-hidden aspect-video mb-12 cursor-pointer group">
      <img
        :src="howToUseKwilt"
        alt="How to use KWILT"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
      <div class="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div class="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white fill-white ml-1" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <p class="mt-4 text-sm font-medium tracking-wider uppercase">Watch the walkthrough</p>
      </div>
    </div>

    <section class="mb-12">
      <h2 class="font-heading text-xl font-medium lg:text-2xl mb-6">
        Your portal at a glance
      </h2>
      <div class="space-y-4">
        <div
          v-for="section in sections"
          :key="section.title"
          class="rounded-xl p-5 flex items-start gap-4"
          style="background: #F5F1F0"
        >
          <div class="h-10 w-10 flex-none flex items-center justify-center rounded-lg" style="background: #EDE8E2">
            <img :src="section.icon" :alt="section.title" class="h-5 w-5 object-contain" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-heading text-base font-medium">{{ section.title }}</h3>
            <p class="text-sm font-light text-muted-foreground mt-1 leading-relaxed">
              {{ section.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="font-heading text-xl font-medium lg:text-2xl mb-6">
        Getting started tips
      </h2>
      <div class="space-y-6">
        <div v-for="tip in tips" :key="tip.number" class="flex gap-6">
          <span class="font-heading text-3xl font-semibold text-primary/40 flex-none">
            {{ tip.number }}
          </span>
          <p class="text-sm font-light text-muted-foreground leading-relaxed pt-2">
            {{ tip.text }}
          </p>
        </div>
      </div>
    </section>

    <footer class="mt-12 mb-8 pt-8 border-t border-border/40">
      <p class="text-xs font-light text-muted-foreground">
        Need more help? Reach out to your KWILT health coach through the dashboard or email support@kwilt.com.
      </p>
    </footer>
  </div>
</template>
