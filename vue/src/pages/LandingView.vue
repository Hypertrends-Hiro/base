<script setup lang="ts">
import UiButton from '@/components/ui/button.vue'
import UiCard from '@/components/ui/card.vue'
import UiInput from '@/components/ui/input.vue'
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="font-heading text-2xl">Landing (placeholder)</h1>
    <UiCard class="max-w-md">
      <template #header><span class="font-semibold">Welcome</span></template>
      <UiInput placeholder="Email" class="mb-2" />
      <UiButton class="w-full">Get Started</UiButton>
    </UiCard>
  </div>
</template>
