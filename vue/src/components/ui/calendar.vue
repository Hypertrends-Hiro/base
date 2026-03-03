<script setup lang="ts">
import { cn } from '@/lib/utils'

const modelValue = defineModel<Date | undefined>()
defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('p-3', $props.class)">
    <div class="flex flex-col gap-4">
      <slot :model-value="modelValue" :update="(d: Date | undefined) => (modelValue = d)" />
    </div>
  </div>
</template>
