<script setup lang="ts">
import UiButton from '@/components/ui/button.vue'

defineProps<{ activeTab: 'login' | 'register' }>()

const navLinks = [
  { label: 'SHOP', href: '/shop' },
  { label: 'PLAN', href: '/plan' },
  { label: 'LABS', href: '/labs' },
  { label: 'SCIENCE', href: '/science' },
  { label: 'ABOUT', href: '/about' },
]
</script>

<template>
  <header class="relative flex items-center justify-between border-b border-border bg-background px-8 py-4">
    <nav class="hidden items-center gap-6 md:flex">
      <router-link
        v-for="link in navLinks"
        :key="link.label"
        :to="link.href"
        class="text-xs font-medium tracking-wider text-foreground transition-colors hover:text-primary"
      >
        {{ link.label }}
      </router-link>
    </nav>
    <router-link
      to="/"
      class="absolute left-1/2 -translate-x-1/2 font-heading text-2xl font-bold tracking-tight text-foreground"
    >
      KWILT<span class="text-[8px] align-super">™</span>
    </router-link>
    <div class="ml-auto flex items-center gap-3">
      <router-link to="/login?tab=register">
        <UiButton
          :variant="activeTab === 'register' ? 'default' : 'ghost'"
          :class="activeTab === 'register'
            ? 'rounded-md bg-primary px-6 text-xs font-medium tracking-wider text-primary-foreground hover:bg-primary/90'
            : 'text-xs font-medium tracking-wider'"
        >
          JOIN TODAY
        </UiButton>
      </router-link>
      <router-link to="/login?tab=login">
        <UiButton
          :variant="activeTab === 'login' ? 'default' : 'ghost'"
          :class="activeTab === 'login'
            ? 'rounded-md bg-primary px-6 text-xs font-medium tracking-wider text-primary-foreground hover:bg-primary/90'
            : 'text-xs font-medium tracking-wider'"
        >
          LOGIN
        </UiButton>
      </router-link>
    </div>
  </header>
</template>
