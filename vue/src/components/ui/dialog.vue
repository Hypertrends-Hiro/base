<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ open?: boolean; class?: string; hideClose?: boolean }>()
const emit = defineEmits<{ 'update:open': [open: boolean] }>()
const open = computed({ get: () => props.open ?? false, set: (v) => emit('update:open', v) })
function close() { open.value = false }
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div class="fixed inset-0 z-50 bg-black/80" @click="close()" />
      <div
        :class="cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
          props.class
        )"
      >
        <div v-if="$slots.header" class="flex flex-col space-y-1.5 text-center sm:text-left"><slot name="header" /></div>
        <div v-if="$slots.title" class="text-lg font-semibold leading-none tracking-tight"><slot name="title" /></div>
        <div v-if="$slots.description" class="text-sm text-muted-foreground"><slot name="description" /></div>
        <slot />
        <div v-if="$slots.footer" class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"><slot name="footer" /></div>
        <button
          v-if="!hideClose"
          type="button"
          class="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Close"
          @click="close()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  </Teleport>
</template>
