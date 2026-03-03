<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LandingFadeIn from './fade-in.vue'
import womanHairWind from '@/assets/woman-hair-wind.jpg'
</script>

<template>
  <section class="bg-background px-8 py-16 md:px-16 lg:px-24">
    <LandingFadeIn>
      <h2 class="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-foreground leading-tight w-full mb-12">
        Taking charge of your longevity journey should be effortless—now it is.
      </h2>
    </LandingFadeIn>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end">
      <div class="space-y-6">
        <LandingFadeIn :delay="100">
          <div>
            <h2 class="font-heading text-5xl md:text-6xl font-normal text-foreground mb-3">Assess, repair, sustain</h2>
            <p class="text-base text-foreground leading-relaxed">
              Discover your true cellular age with KWILT. Our Comprehensive Biomarker Test analyzes 100+
              biomarkers to provide insights into your
            </p>
          </div>
        </LandingFadeIn>
        <LandingFadeIn :delay="200">
          <div class="flex flex-col gap-2">
            <span v-for="tag in ['11 ORGAN SYSTEMS', 'AGING RATE', 'BIOLOGICAL AGE']" :key="tag" class="inline-block w-fit border border-border text-foreground text-xs tracking-widest uppercase px-4 py-2 rounded-sm">{{ tag }}</span>
          </div>
        </LandingFadeIn>
        <LandingFadeIn :delay="300">
          <p class="text-base text-foreground leading-relaxed">
            Based on your results, you'll receive a personalized health protocol from our medical
            team, including targeted nutrition, lifestyle, and supplement recommendations.
          </p>
          <p class="text-base text-foreground leading-relaxed mt-4">
            Set benchmarks, monitor progress, and make data-driven changes for a healthier you.
          </p>
          <RouterLink to="/assessment" class="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-6 py-3 rounded-md hover:bg-foreground/85 transition-colors mt-4">
            Start Assessment<span>→</span>
          </RouterLink>
        </LandingFadeIn>
      </div>
      <LandingFadeIn :delay="200" class="relative rounded-lg overflow-hidden aspect-[3/4]">
        <img :src="womanHairWind" alt="Assess repair sustain" class="absolute inset-0 h-full w-full object-cover object-top" />
      </LandingFadeIn>
    </div>
  </section>
</template>
