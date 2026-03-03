<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string; checked?: boolean | 'indeterminate'; disabled?: boolean }>()
const emit = defineEmits<{ 'update:checked': [value: boolean] }>()
const checked = computed(() => props.checked === true)
const rootClass = computed(() =>
  cn(
    'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    checked.value && 'bg-primary text-primary-foreground',
    props.class
  )
)
</script>

<template>
  <button
    type="button"
    role="checkbox"
    :aria-checked="checked"
    :class="rootClass"
    :disabled="disabled"
    v-bind="$attrs"
    @click="emit('update:checked', !checked)"
  >
    <span v-if="checked" class="flex h-full w-full items-center justify-center text-current">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
    </span>
  </button>
</template>
