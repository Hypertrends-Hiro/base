<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ modelValue?: string; class?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div :class="cn('grid gap-2', $props.class)" role="radiogroup">
    <slot :model-value="modelValue" :update="(v: string) => emit('update:modelValue', v)" />
  </div>
</template>
