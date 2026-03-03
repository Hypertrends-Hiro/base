<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'

const open = ref(false)
defineProps<{ class?: string }>()
defineExpose({ open })
</script>

<template>
  <div class="relative inline-block" @mouseenter="open = true" @mouseleave="open = false">
    <slot name="trigger" />
    <Teleport to="body">
      <div
        v-if="open"
        :class="cn('absolute z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md', $props.class)"
      >
        <slot />
      </div>
    </Teleport>
  </div>
</template>
