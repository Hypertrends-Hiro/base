<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ open?: boolean; class?: string }>()
const emit = defineEmits<{ 'update:open': [open: boolean] }>()
const open = computed({ get: () => props.open ?? false, set: (v) => emit('update:open', v) })
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50">
      <div class="fixed inset-0 bg-black/80" @click="open = false" />
      <div :class="cn('fixed inset-x-0 bottom-0 z-50 border-t bg-background', $props.class)">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
