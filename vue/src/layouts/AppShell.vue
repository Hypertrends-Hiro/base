<script setup lang="ts">
import UiButton from '@/components/ui/button.vue'
</script>

<template>
  <div id="app-shell" class="min-h-screen bg-background text-foreground">
    <header class="border-b border-border px-4 py-2 flex items-center justify-between">
      <span class="font-heading text-lg">KWILT</span>
      <UiButton variant="outline" size="sm">Login</UiButton>
    </header>
    <RouterView />
  </div>
</template>
