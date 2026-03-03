<script setup lang="ts">
import LandingNav from '@/features/landing/landing-nav.vue'
import LandingHero from '@/features/landing/landing-hero.vue'
import LandingTagline from '@/features/landing/landing-tagline.vue'
import LandingAssess from '@/features/landing/landing-assess.vue'
import LandingTherapyCarousel from '@/features/landing/landing-therapy-carousel.vue'
import LandingHowItWorks from '@/features/landing/landing-how-it-works.vue'
import LandingGetTrueResults from '@/features/landing/landing-get-true-results.vue'
import LandingPricingAndFooter from '@/features/landing/landing-pricing-and-footer.vue'
</script>

<template>
  <div class="min-h-screen bg-background font-body overflow-x-hidden">
    <LandingNav />
    <LandingHero />
    <LandingTagline />
    <LandingAssess />
    <LandingTherapyCarousel />
    <LandingHowItWorks />
    <LandingGetTrueResults />
    <LandingPricingAndFooter />
  </div>
</template>
