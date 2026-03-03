<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import kwiltLogoDark from '@/assets/kwilt-logo-dark.png'

const navLinks = ['Shop', 'Plan', 'Labs', 'Science', 'About']
const scrolled = ref(false)
function onScroll() {
  scrolled.value = window.scrollY > 60
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'"
  >
    <div class="flex items-center justify-between px-6 md:px-10 h-14">
      <div class="hidden md:flex items-center gap-7">
        <RouterLink
          v-for="link in navLinks"
          :key="link"
          to="#"
          class="text-xs uppercase tracking-widest font-medium transition-colors duration-500 hover:text-primary"
          :class="scrolled ? 'text-foreground' : 'text-white/80'"
        >
          {{ link }}
        </RouterLink>
      </div>
      <div class="absolute left-1/2 -translate-x-1/2">
        <div class="relative h-6 flex items-center">
          <img
            :src="kwiltLogoDark"
            alt="KWILT"
            class="h-6 absolute transition-opacity duration-500"
            :style="{ opacity: scrolled ? 1 : 0 }"
          />
          <span
            class="font-heading text-white text-xl tracking-wider transition-opacity duration-500"
            :style="{ opacity: scrolled ? 0 : 1 }"
          >
            KWILT<sup class="text-[0.55em] align-super">™</sup>
          </span>
        </div>
      </div>
      <div class="flex items-center gap-4 ml-auto">
        <RouterLink
          to="/register"
          class="bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Get Started
        </RouterLink>
        <button type="button" aria-label="Cart" class="transition-colors duration-500 hover:text-primary" :class="scrolled ? 'text-foreground' : 'text-white'">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </button>
        <RouterLink
          to="/login"
          class="text-xs uppercase tracking-widest font-medium transition-colors duration-500 hover:text-primary"
          :class="scrolled ? 'text-foreground' : 'text-white/80'"
        >
          Log In
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
