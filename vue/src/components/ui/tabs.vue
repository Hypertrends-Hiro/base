<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const modelValue = defineModel<string>({ default: '' })
const props = defineProps<{ class?: string }>()
const listClass = computed(() =>
  cn('inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', props.class)
)
</script>

<template>
  <div class="w-full">
    <div v-if="$slots.list" :class="listClass" role="tablist">
      <slot name="list" :model-value="modelValue" :update="(v: string) => (modelValue = v)" />
    </div>
    <div v-if="$slots.default" class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <slot :model-value="modelValue" />
    </div>
  </div>
</template>
