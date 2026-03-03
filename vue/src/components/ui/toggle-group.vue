<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ modelValue?: string | string[]; class?: string; type?: 'single' | 'multiple' }>()
const emit = defineEmits<{ 'update:modelValue': [value: string | string[]] }>()
</script>

<template>
  <div :class="cn('flex items-center justify-center gap-1', $props.class)">
    <slot :model-value="modelValue" :update="(v: string | string[]) => emit('update:modelValue', v)" />
  </div>
</template>
