<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ open?: boolean; class?: string }>()
const emit = defineEmits<{ 'update:open': [open: boolean] }>()
const open = computed({ get: () => props.open ?? false, set: (v) => emit('update:open', v) })
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50" role="alertdialog" aria-modal="true">
      <div class="fixed inset-0 z-50 bg-black/80" @click="open = false" />
      <div :class="cn('fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg sm:rounded-lg', props.class)">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
