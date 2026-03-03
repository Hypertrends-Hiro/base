<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('w-full', $props.class)" v-bind="$attrs">
    <slot />
  </div>
</template>
