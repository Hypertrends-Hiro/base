<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'

const open = ref(false)
const props = defineProps<{ class?: string; align?: 'start' | 'center' | 'end' }>()
const contentClass = computed(() =>
  cn(
    'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
    props.class
  )
)
defineExpose({ open })
</script>

<template>
  <div class="relative inline-block">
    <div @click="open = !open">
      <slot name="trigger" />
    </div>
    <Teleport to="body">
      <div v-if="open" class="fixed inset-0 z-40" @click="open = false" />
      <div v-if="open" :class="contentClass" class="absolute z-50 mt-1">
        <slot />
      </div>
    </Teleport>
  </div>
</template>
