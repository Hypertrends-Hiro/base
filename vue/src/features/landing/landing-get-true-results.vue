<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LandingFadeIn from './fade-in.vue'
import resultsUiCard from '@/assets/results-ui-card.png'
</script>

<template>
  <section class="bg-background px-8 py-0 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2" style="min-height: 90vh">
    <div class="flex flex-col justify-end pb-16 pt-16 pr-8 md:pr-16 space-y-8">
      <LandingFadeIn>
        <h2 class="font-heading text-5xl md:text-6xl font-normal text-foreground">Get true results</h2>
      </LandingFadeIn>
      <LandingFadeIn v-for="(item, i) in [{ label: '100+ BIOMARKERS', text: 'A comprehensive look at your body from the inside out.' }, { label: 'INSIGHTS MADE FOR YOU', text: 'No generic advice. Your plan is built around your biology.' }, { label: 'PROGRESS YOU CAN SEE', text: 'Track improvements over time with every test cycle.' }]" :key="item.label" :delay="i * 120">
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-foreground mb-1">{{ item.label }}</p>
          <p class="text-base text-foreground leading-relaxed">{{ item.text }}</p>
        </div>
      </LandingFadeIn>
      <LandingFadeIn :delay="400">
        <RouterLink to="/register" class="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-6 py-3 rounded-md w-fit hover:bg-foreground/85 transition-colors">
          Start Assessment→
        </RouterLink>
      </LandingFadeIn>
    </div>
    <LandingFadeIn :delay="200" class="relative overflow-hidden bg-[#b8a99a] rounded-2xl min-h-[60vh]">
      <img :src="resultsUiCard" alt="Get true results — Elisa profile" class="absolute inset-0 h-full w-full object-cover object-center" />
    </LandingFadeIn>
  </section>
</template>
