<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ class?: string }>()
</script>

<template>
  <nav :class="cn('relative z-10 flex max-w-max flex-1 items-center justify-center', $props.class)">
    <slot />
  </nav>
</template>
