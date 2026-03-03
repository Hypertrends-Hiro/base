<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type AlertVariant = 'default' | 'destructive'
const props = withDefaults(defineProps<{ variant?: AlertVariant; class?: string }>(), { variant: 'default' })
const variantClass = computed(() =>
  props.variant === 'destructive'
    ? 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive'
    : ''
)
const rootClass = computed(() =>
  cn(
    'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
    variantClass.value,
    props.class
  )
)
</script>

<template>
  <div :class="rootClass" role="alert" v-bind="$attrs">
    <slot />
  </div>
</template>
