<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'

const open = ref(true)
const props = defineProps<{ class?: string }>()
const sidebarClass = computed(() =>
  cn('flex h-full w-16 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground', props.class)
)
defineExpose({ open })
</script>

<template>
  <aside :class="sidebarClass">
    <slot />
  </aside>
</template>
