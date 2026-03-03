<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type ToastVariant = 'default' | 'destructive'
const props = withDefaults(defineProps<{ variant?: ToastVariant; class?: string }>(), { variant: 'default' })
const variantClass = computed(() =>
  props.variant === 'destructive'
    ? 'border-destructive bg-destructive text-destructive-foreground'
    : 'border bg-background text-foreground'
)
const rootClass = computed(() =>
  cn(
    'pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
    variantClass.value,
    props.class
  )
)
</script>

<template>
  <div :class="rootClass" role="status">
    <slot />
  </div>
</template>
