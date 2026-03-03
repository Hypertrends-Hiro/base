<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('flex w-full flex-wrap items-center gap-2 rounded-md border bg-background p-1', $props.class)">
    <slot />
  </div>
</template>
