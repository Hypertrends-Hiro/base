<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ class?: string }>()
</script>

<template>
  <span :class="cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', $props.class)" v-bind="$attrs">
    <slot name="image" />
    <slot v-if="$slots.default && !$slots.fallback" />
    <span v-if="$slots.fallback" :class="cn('flex h-full w-full items-center justify-center rounded-full bg-muted')">
      <slot name="fallback" />
    </span>
  </span>
</template>
