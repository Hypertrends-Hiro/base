<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-4 sm:max-w-[420px]', $props.class)">
    <slot />
  </div>
</template>
