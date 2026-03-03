<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type SheetSide = 'top' | 'bottom' | 'left' | 'right'
const props = withDefaults(defineProps<{ open?: boolean; side?: SheetSide; class?: string; hideClose?: boolean }>(), { side: 'right' })
const emit = defineEmits<{ 'update:open': [open: boolean] }>()
const open = computed({ get: () => props.open ?? false, set: (v) => emit('update:open', v) })
const sideClass: Record<SheetSide, string> = {
  top: 'inset-x-0 top-0 border-b',
  bottom: 'inset-x-0 bottom-0 border-t',
  left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
  right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
}
const contentClass = computed(() =>
  cn('fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out', sideClass[props.side], props.class)
)
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50">
      <div class="fixed inset-0 z-50 bg-black/80" @click="open = false" />
      <div :class="contentClass">
        <slot />
        <button
          v-if="!hideClose"
          type="button"
          class="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:ring-2 focus:ring-ring"
          aria-label="Close"
          @click="open = false"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  </Teleport>
</template>
