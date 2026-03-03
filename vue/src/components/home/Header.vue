<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { cn } from '@/lib/utils'
import kwiltLogo from '@/assets/kwilt-logo-dark.png'

const navLinks = [
  { label: 'SHOP', href: '/shop' },
  { label: 'PLAN', href: '/plan' },
  { label: 'LABS', href: '/labs' },
  { label: 'SCIENCE', href: '/science' },
  { label: 'ABOUT', href: '/about' },
]
const isScrolled = ref(false)
function onScroll() {
  isScrolled.value = window.scrollY > 50
}
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    :class="cn(
      'fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-300',
      isScrolled ? 'bg-background shadow-sm' : 'bg-transparent'
    )"
  >
    <nav class="hidden items-center gap-8 md:flex">
      <RouterLink
        v-for="link in navLinks"
        :key="link.label"
        :to="link.href"
        :class="cn(
          'text-sm font-medium tracking-wider transition-colors',
          isScrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white'
        )"
      >
        {{ link.label }}
      </RouterLink>
    </nav>
    <RouterLink to="/" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <img
        :src="kwiltLogo"
        alt="KWILT"
        :class="cn('h-8 w-auto transition-all duration-300', isScrolled ? 'brightness-0' : 'brightness-0 invert')"
      />
    </RouterLink>
    <div class="ml-auto flex items-center gap-6">
      <RouterLink
        to="/register"
        :class="cn(
          'text-sm font-medium tracking-wider transition-colors',
          isScrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white'
        )"
      >
        JOIN TODAY
      </RouterLink>
      <RouterLink
        to="/login"
        :class="cn(
          'text-sm font-medium tracking-wider transition-colors',
          isScrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white'
        )"
      >
        LOGIN
      </RouterLink>
    </div>
  </header>
</template>
