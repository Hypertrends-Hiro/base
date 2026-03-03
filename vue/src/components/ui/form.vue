<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ class?: string }>()
</script>

<template>
  <form :class="cn('space-y-6', $props.class)" v-bind="$attrs">
    <slot />
  </form>
</template>
