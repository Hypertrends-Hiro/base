<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{ ratio?: number; class?: string }>(), { ratio: 1 })
const style = computed(() => ({ aspectRatio: String(props.ratio) }))
</script>

<template>
  <div :class="cn('relative w-full', $props.class)" :style="style">
    <slot />
  </div>
</template>
