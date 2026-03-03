<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ length?: number; class?: string; modelValue?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div :class="cn('flex gap-2', $props.class)">
    <input
      type="text"
      inputmode="numeric"
      maxlength="length ?? 6"
      :value="modelValue"
      class="h-10 w-10 rounded-md border border-input bg-background text-center text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
