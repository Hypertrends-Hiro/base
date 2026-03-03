<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ value?: number; max?: number; class?: string }>()
const pct = computed(() => {
  const max = props.max ?? 100
  const val = props.value ?? 0
  return Math.min(100, max > 0 ? (val / max) * 100 : 0)
})
</script>

<template>
  <div :class="cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', $props.class)" role="progressbar" :aria-valuenow="value" :aria-valuemax="max ?? 100">
    <div class="h-full w-full flex-1 bg-primary transition-all" :style="{ transform: `translateX(-${100 - pct}%)` }" />
  </div>
</template>
