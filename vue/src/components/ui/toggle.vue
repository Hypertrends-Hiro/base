<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ pressed?: boolean; class?: string }>()
const emit = defineEmits<{ 'update:pressed': [pressed: boolean] }>()
const pressed = computed({ get: () => props.pressed ?? false, set: (v) => emit('update:pressed', v) })
const rootClass = computed(() =>
  cn(
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
    pressed.value && 'bg-accent text-accent-foreground',
    props.class
  )
)
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-pressed="pressed"
    :class="rootClass"
    v-bind="$attrs"
    @click="pressed = !pressed"
  >
    <slot />
  </button>
</template>
