<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{ class?: string; open?: boolean }>(), { open: undefined })
const emit = defineEmits<{ 'update:open': [value: boolean] }>()
const internalOpen = ref(false)
const isOpen = computed(() => (props.open !== undefined ? props.open : internalOpen.value))
function setOpen(v: boolean) {
  if (props.open !== undefined) emit('update:open', v)
  else internalOpen.value = v
}
function toggle() {
  setOpen(!isOpen.value)
}
defineExpose({ open: isOpen, setOpen, toggle })
</script>

<template>
  <div class="relative inline-block">
    <div @click="toggle">
      <slot name="trigger" />
    </div>
    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-40" @click="setOpen(false)" />
      <div v-if="isOpen" :class="cn('absolute z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md', $props.class)">
        <slot />
      </div>
    </Teleport>
  </div>
</template>
