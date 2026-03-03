<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('relative overflow-hidden', $props.class)">
    <div class="h-full w-full overflow-auto [&>div]:min-h-full">
      <slot />
    </div>
  </div>
</template>
