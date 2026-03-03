<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ modelValue?: number | number[]; class?: string; min?: number; max?: number }>()
const emit = defineEmits<{ 'update:modelValue': [value: number | number[]] }>()
const value = computed(() => (Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue) ?? 0)
</script>

<template>
  <input
    type="range"
    :class="cn('w-full', $props.class)"
    :min="min ?? 0"
    :max="max ?? 100"
    :value="value"
    @input="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
  />
</template>
