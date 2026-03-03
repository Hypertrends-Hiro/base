<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink } from 'vue-router'

const scrollY = ref(0)
function onScroll() { scrollY.value = window.scrollY }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const heroFraction = computed(() => Math.min(scrollY.value / (typeof window !== 'undefined' ? window.innerHeight * 0.9 : 700), 1))
const videoTranslate = computed(() => scrollY.value * 0.3)
const overlayOpacity = computed(() => 0.5 + heroFraction.value * 0.2)
const heroTextOpacity = computed(() => Math.max(1 - heroFraction.value * 1.4, 0))
const heroTextTranslate = computed(() => -scrollY.value * 0.15)
</script>

<template>
  <section class="relative w-full overflow-hidden" style="height: 90vh; min-height: 560px">
    <video
      src="https://cdn.prod.website-files.com/6830e308e57fd4713ea17bc9%2F6868777b35de09e3adcfdcf8_Kwilt_homepage_r1-transcode.mp4"
      autoplay
      muted
      loop
      playsinline
      class="absolute inset-0 h-full w-full object-cover object-center"
      :style="{ transform: `translateY(${videoTranslate}px)`, willChange: 'transform' }"
    />
    <div class="absolute inset-0 transition-none" :style="{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }" />
    <div
      class="absolute inset-0 flex flex-col justify-start pt-16 md:pt-20 overflow-visible"
      :style="{ opacity: heroTextOpacity, transform: `translateY(${heroTextTranslate}px)`, willChange: 'transform, opacity' }"
    >
      <div class="relative w-full overflow-visible px-4 md:px-8 flex items-end">
        <h1 class="font-heading text-background leading-[0.85] whitespace-nowrap" style="font-size: clamp(7rem, 26vw, 28rem); letter-spacing: -0.02em">KWILT</h1>
        <sup class="font-heading text-background self-start leading-none ml-2 md:ml-4" style="font-size: clamp(2rem, 5.5vw, 7rem); margin-top: clamp(1.2rem, 3.5vw, 4.5rem)">™</sup>
      </div>
      <p class="font-heading text-background font-normal text-3xl md:text-5xl px-4 md:px-8 mt-3 md:mt-5">Redefine your age.</p>
      <div class="px-4 md:px-8 mt-5 md:mt-8">
        <div class="border-t border-background/50" />
        <RouterLink to="/register" class="inline-flex items-center gap-1.5 text-background text-3xl md:text-5xl font-normal font-heading py-4 hover:text-primary transition-colors">
          Get Started<span class="text-lg">→</span>
        </RouterLink>
        <div class="border-t border-background/50" />
      </div>
    </div>
  </section>
</template>
