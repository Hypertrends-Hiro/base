<script setup lang="ts">
import { ref } from 'vue'
import LandingFadeIn from './fade-in.vue'
import therapyCard1 from '@/assets/therapy-card-1.jpg'
import therapyCard2 from '@/assets/therapy-card-2.jpg'
import therapyCard3 from '@/assets/therapy-card-3.jpg'
import therapyCard4 from '@/assets/therapy-card-4.jpg'

const therapyCards = [
  { image: therapyCard1, title: 'BRAIN\nHEALTH', shop: 'SHOP SHARPEN' },
  { image: therapyCard2, title: 'CANCER\nPREVENTION', shop: 'SHOP DEFEND' },
  { image: therapyCard3, title: 'METABOLIC\nHEALTH', shop: 'SHOP VITALITY' },
  { image: therapyCard4, title: 'BONE &\nMUSCLE CARE', shop: 'SHOP FORTIFY' },
]
const carouselRef = ref<HTMLDivElement | null>(null)
function scrollCarousel(dir: 'left' | 'right') {
  if (!carouselRef.value) return
  const cardWidth = carouselRef.value.querySelector('div')?.clientWidth ?? 320
  carouselRef.value.scrollBy({ left: dir === 'right' ? cardWidth + 16 : -(cardWidth + 16), behavior: 'smooth' })
}
</script>

<template>
  <section class="bg-background px-8 pt-12 pb-0 md:px-16 lg:px-24" style="min-height: 90vh">
    <LandingFadeIn>
      <h2 class="font-heading text-4xl md:text-5xl font-normal text-foreground mb-6">KWILT targeted therapies</h2>
    </LandingFadeIn>
    <div class="relative">
      <button type="button" class="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/90 border border-border rounded-full items-center justify-center hover:bg-background transition-colors shadow-card" aria-label="Scroll left" @click="scrollCarousel('left')">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button type="button" class="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/90 border border-border rounded-full items-center justify-center hover:bg-background transition-colors shadow-card" aria-label="Scroll right" @click="scrollCarousel('right')">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <div
        ref="carouselRef"
        class="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth"
        style="height: 75vh; scrollbar-width: none"
      >
        <div
          v-for="({ image, title, shop }) in therapyCards"
          :key="title"
          class="relative flex-none rounded-2xl overflow-hidden snap-start cursor-pointer group"
          style="width: clamp(260px, 28vw, 380px); height: 100%"
        >
          <img :src="image" :alt="title.replace('\n', ' ')" class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-75" />
          <p class="absolute top-5 left-5 text-sm font-heading font-bold text-white tracking-wider uppercase leading-tight whitespace-pre-line">{{ title }}</p>
          <p class="absolute bottom-5 left-0 right-0 text-center text-[11px] font-heading text-white tracking-widest uppercase">{{ shop }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
