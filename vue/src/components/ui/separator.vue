<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{ orientation?: 'horizontal' | 'vertical'; class?: string }>(), {
  orientation: 'horizontal',
})
const separatorClass = computed(() =>
  cn(
    'shrink-0 bg-border',
    props.orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
    props.class
  )
)
</script>

<template>
  <div :class="separatorClass" role="separator" v-bind="$attrs" />
</template>
