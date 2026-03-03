<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'

const open = ref(false)
defineProps<{ class?: string }>()
defineExpose({ open })
</script>

<template>
  <div :class="cn('relative', $props.class)" @mouseenter="open = true" @mouseleave="open = false">
    <slot name="trigger" />
    <div v-if="open" class="absolute z-50">
      <slot />
    </div>
  </div>
</template>
