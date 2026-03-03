<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'

const current = ref(0)
defineProps<{ class?: string }>()
defineExpose({ current })
</script>

<template>
  <div :class="cn('relative w-full', $props.class)">
    <slot :current="current" />
  </div>
</template>
