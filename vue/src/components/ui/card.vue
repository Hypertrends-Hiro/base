<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
const rootClass = computed(() =>
  cn('rounded-lg border bg-card text-card-foreground shadow-sm', props.class)
)
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <div v-if="$slots.header" class="flex flex-col space-y-1.5 p-6"><slot name="header" /></div>
    <div v-if="$slots.default" class="p-6 pt-0"><slot /></div>
    <div v-if="$slots.footer" class="flex items-center p-6 pt-0"><slot name="footer" /></div>
  </div>
</template>
