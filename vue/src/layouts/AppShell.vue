<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import UiButton from '@/components/ui/button.vue'

const route = useRoute()
const isLandingOrShop = computed(() => route.name === 'landing' || route.name === 'shop')
</script>

<template>
  <div
    id="app-shell"
    class="min-h-screen text-foreground"
    :class="{ 'bg-background': !isLandingOrShop }"
  >
    <header
      v-if="!isLandingOrShop"
      class="border-b border-border px-4 py-2 flex items-center justify-between"
    >
      <span class="font-heading text-lg">KWILT</span>
      <UiButton variant="outline" size="sm">Login</UiButton>
    </header>
    <RouterView />
  </div>
</template>
