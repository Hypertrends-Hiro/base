<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LandingFadeIn from './fade-in.vue'
import womanSwimwear from '@/assets/woman-swimwear.jpg'
import appPhoneMockup from '@/assets/app-phone-mockup.png'
import womanRelaxing from '@/assets/woman-relaxing.jpg'
import surferSunset from '@/assets/surfer-sunset.png'
import storyCard1 from '@/assets/story-card-1.jpg'
import storyCard2 from '@/assets/story-card-2.jpg'
import storyCard3 from '@/assets/story-card-3.jpg'
import storyCard4 from '@/assets/story-card-4.jpg'

const comparisonRows = [
  { label: 'Comprehensive holistic intake', kwilt: true, primary: false },
  { label: 'Personalized recommendations', kwilt: true, primary: false },
  { label: 'Consultation with provider', kwilt: true, primary: true },
  { label: 'Backed by science', kwilt: true, primary: true },
  { label: 'All-in-one health portal', kwilt: true, primary: false },
  { label: 'Convenient at-home access', kwilt: true, primary: false },
  { label: 'Seamless experience', kwilt: true, primary: false },
  { label: 'Proactive approach to longevity', kwilt: true, primary: false },
]
const storyCards = [
  { image: storyCard1, tag: 'Hormone Health', title: 'Weight gain isn\'t random', body: 'Hormonal shifts can stall metabolism before weight gain shows up.' },
  { image: storyCard2, tag: 'Metabolic Health', title: 'Built around your biology', body: 'Data-driven plans lead to more effective health outcomes.' },
  { image: storyCard3, tag: 'Hormone Health', title: 'Menopause & semaglutide', body: 'Semaglutide supports metabolic control during menopause.' },
  { image: storyCard4, tag: 'Hormone Health', title: 'Beyond yearly screenings', body: 'Early hormonal shifts often go undetected.' },
]
</script>

<template>
  <!-- Access KWILT: lifestyle image + $449 card -->
  <section class="bg-background px-8 md:px-16 lg:px-24 py-8 grid grid-cols-1 md:grid-cols-2 gap-6" style="min-height: 90vh">
    <LandingFadeIn class="rounded-3xl overflow-hidden">
      <img :src="womanSwimwear" alt="Active lifestyle" class="h-full w-full object-cover object-center" style="min-height: 60vh" />
    </LandingFadeIn>
    <LandingFadeIn :delay="150" class="rounded-3xl bg-card flex flex-col items-center justify-between py-16 px-10 gap-10">
      <div class="flex-1 flex items-center justify-center">
        <img :src="appPhoneMockup" alt="KWILT app dashboard" class="max-h-[60vh] w-auto object-contain drop-shadow-xl" />
      </div>
      <div class="w-full space-y-4">
        <div class="text-center space-y-1">
          <p class="font-heading text-base font-medium text-foreground">KWILT Comprehensive 100+ Biomarker Test</p>
          <p class="font-heading text-4xl font-normal text-foreground">$449/year</p>
        </div>
        <RouterLink to="/register" class="block w-full text-center bg-primary text-primary-foreground font-medium text-sm uppercase tracking-widest py-4 rounded-md hover:bg-primary/90 transition-colors">Add to Cart</RouterLink>
      </div>
    </LandingFadeIn>
  </section>

  <!-- Stat hero 80% -->
  <section class="relative w-full" style="min-height: 100vh">
    <img :src="womanRelaxing" alt="Woman relaxing" class="absolute inset-0 h-full w-full object-cover object-center" />
    <div class="absolute inset-0 bg-foreground/50" />
    <div class="relative h-full flex flex-col justify-between px-8 py-16 md:px-16 lg:px-24" style="min-height: 100vh">
      <LandingFadeIn class="max-w-xs">
        <p class="font-heading font-normal leading-none text-primary-foreground" style="font-size: clamp(5rem, 14vw, 14rem)">80<span class="text-[0.5em]">%</span></p>
        <p class="mt-4 text-base text-primary-foreground/90 leading-relaxed">of early deaths from chronic disease come from four conditions — heart disease, cancer, lung disease, and diabetes.</p>
        <p class="mt-4 text-xs uppercase tracking-widest text-primary-foreground/60 font-medium">World Health Organization (WHO)</p>
      </LandingFadeIn>
      <LandingFadeIn :delay="200" class="self-end text-right max-w-sm">
        <p class="font-heading text-5xl md:text-6xl font-medium text-primary-foreground leading-tight">Just a total game changer.</p>
        <p class="mt-2 text-xs uppercase tracking-widest text-primary-foreground/70">Anne Divers, 52</p>
      </LandingFadeIn>
    </div>
  </section>

  <!-- Real people, real stories -->
  <section class="bg-background px-8 py-20 md:px-16 lg:px-24" style="min-height: 100vh">
    <LandingFadeIn>
      <h2 class="font-heading text-5xl md:text-6xl font-normal text-foreground mb-12">Real people, real stories</h2>
    </LandingFadeIn>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div v-for="({ image, tag, title, body }) in storyCards" :key="title" class="flex flex-col gap-4">
        <div class="rounded-2xl overflow-hidden aspect-[3/4]">
          <img :src="image" :alt="title" class="h-full w-full object-cover object-center" />
        </div>
        <div class="space-y-2">
          <span class="inline-block bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full">{{ tag }}</span>
          <h3 class="font-heading text-2xl font-normal text-foreground leading-snug">{{ title }}</h3>
          <p class="text-base text-foreground leading-relaxed">{{ body }}</p>
          <a href="#" class="inline-block text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors">Read More</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Maximum transparency + comparison -->
  <section class="bg-background px-8 md:px-16 lg:px-24 py-16 grid grid-cols-1 md:grid-cols-2 gap-12" style="min-height: 80vh">
    <div class="flex flex-col justify-between">
      <div class="space-y-6">
        <LandingFadeIn>
          <h2 class="font-heading text-6xl md:text-7xl font-normal text-foreground leading-tight">Maximum transparency</h2>
        </LandingFadeIn>
        <LandingFadeIn :delay="150">
          <p class="text-base text-foreground leading-relaxed max-w-sm">KWILT emphasizes honesty, clarity, and care by setting realistic goals that enhance your energy, skin, sleep, and mood. We'll guide you on your journey with practical tools and celebrate your progress along the way.</p>
          <p class="text-base text-foreground leading-relaxed max-w-sm mt-4">Longevity care should feel personal, not clinical, which is why we made it tailored to your life, rhythms, and goals.</p>
        </LandingFadeIn>
      </div>
      <LandingFadeIn :delay="250" class="mt-10">
        <RouterLink to="/register" class="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-6 py-3 rounded-md hover:bg-foreground/85 transition-colors">Start Assessment→</RouterLink>
      </LandingFadeIn>
    </div>
    <div class="flex flex-col justify-center">
      <div class="grid grid-cols-[1fr_100px_120px] gap-3 mb-3 items-center">
        <div />
        <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground text-center">KWILT™</p>
        <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground text-center">Primary Care</p>
      </div>
      <div v-for="({ label, kwilt, primary }) in comparisonRows" :key="label" class="grid grid-cols-[1fr_100px_120px] gap-3 items-center border-t border-border py-2.5">
        <p class="text-[11px] uppercase tracking-widest text-foreground font-medium">{{ label }}</p>
        <div class="h-9 rounded-lg flex items-center justify-center" :class="kwilt ? 'bg-orange-200' : 'bg-muted'">
          <span v-if="kwilt" class="text-foreground font-normal text-base">✓</span>
        </div>
        <div class="h-9 rounded-lg flex items-center justify-center" :class="primary ? 'bg-orange-200' : 'bg-muted/60'">
          <span v-if="primary" class="text-foreground font-normal text-base">✓</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Live well CTA -->
  <section class="relative w-full" style="min-height: 100vh">
    <img :src="surferSunset" alt="Live well today" class="absolute inset-0 w-full h-full object-cover object-center" />
    <div class="absolute inset-0 bg-black/30" />
    <div class="relative z-10 flex flex-col justify-end h-full px-8 md:px-16 lg:px-24 py-20" style="min-height: 100vh">
      <div class="space-y-0 w-full">
        <div class="py-8">
          <p class="font-heading text-4xl md:text-5xl font-normal text-white leading-tight">Live well today,</p>
        </div>
        <div class="py-8">
          <p class="font-heading text-4xl md:text-5xl font-normal text-white leading-tight">for a better tomorrow.</p>
        </div>
        <div class="py-8">
          <RouterLink to="/register" class="inline-flex items-center gap-2 text-white text-4xl md:text-5xl font-normal hover:opacity-75 transition-opacity font-heading">Get Started→</RouterLink>
        </div>
        <div class="h-[2px] bg-white" />
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-background px-8 md:px-12 lg:px-16 pt-10 pb-8">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-5">
        <a href="#" aria-label="Instagram" class="text-foreground hover:opacity-70 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <a href="#" aria-label="Facebook" class="text-foreground hover:opacity-70 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
      </div>
      <form class="flex items-center border border-foreground/40 px-4 py-2 w-72 md:w-96" @submit.prevent>
        <input type="email" placeholder="enter e-mail" class="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground outline-none" />
        <button type="submit" class="ml-2 text-foreground hover:opacity-70 transition-opacity">&#8594;</button>
      </form>
    </div>
    <div class="border-t border-foreground/30" />
    <div class="py-4">
      <p class="font-heading font-bold text-foreground leading-none" style="font-size: clamp(5rem, 18vw, 18rem)">KWILT<span class="text-[0.3em] align-super">™</span></p>
      <p class="text-sm text-foreground mt-2">Longevity. Optimized.</p>
    </div>
    <div class="border-t border-foreground/30 mb-8" />
    <div class="flex flex-col md:flex-row justify-between gap-8">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-x-16 gap-y-2 text-sm text-foreground">
        <div class="flex flex-col gap-3">
          <a v-for="link in ['Plan', 'Science', 'Labs']" :key="link" href="#" class="hover:opacity-60 transition-opacity">{{ link }}</a>
        </div>
        <div class="flex flex-col gap-3">
          <a v-for="link in ['Contact Us', 'FAQs', 'Blog']" :key="link" href="#" class="hover:opacity-60 transition-opacity">{{ link }}</a>
        </div>
        <div class="flex flex-col gap-3">
          <a v-for="link in ['Terms', 'Accessibility', 'Privacy']" :key="link" href="#" class="hover:opacity-60 transition-opacity">{{ link }}</a>
        </div>
        <div class="flex flex-col gap-3">
          <a href="#" class="hover:opacity-60 transition-opacity">Affiliates</a>
        </div>
      </div>
      <div class="text-xs text-foreground text-right leading-relaxed shrink-0">
        <p class="font-semibold mb-1">KWILT Health</p>
        <p>13280 Evening Creek Dr. South</p>
        <p>STE 225</p>
        <p>San Diego, CA 92128</p>
        <p>1-888-299-5088</p>
      </div>
    </div>
    <div class="border-t border-foreground/30 mt-8 pt-5">
      <p class="text-xs text-foreground">© 2025 Enhance.MD, LLC. All rights reserved.</p>
    </div>
  </footer>
</template>
