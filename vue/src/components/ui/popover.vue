<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'

const open = ref(false)
defineProps<{ class?: string }>()
defineExpose({ open })
</script>

<template>
  <div class="relative inline-block">
    <div @click="open = !open">
      <slot name="trigger" />
    </div>
    <Teleport to="body">
      <div v-if="open" class="fixed inset-0 z-40" @click="open = false" />
      <div v-if="open" :class="cn('absolute z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md', $props.class)">
        <slot />
      </div>
    </Teleport>
  </div>
</template>
