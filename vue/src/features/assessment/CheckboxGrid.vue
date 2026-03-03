<script setup lang="ts">
import { cn } from '@/lib/utils'
import UiCheckbox from '@/components/ui/checkbox.vue'

defineProps<{
  options: { id: string; label: string }[]
  selected: string[]
  columns?: 1 | 2
}>()
const emit = defineEmits<{ toggle: [id: string] }>()
</script>

<template>
  <div
    :class="cn(
      'grid gap-x-4 gap-y-2.5',
      columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
    )"
  >
    <button
      v-for="opt in options"
      :key="opt.id"
      type="button"
      class="flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors w-full"
      :class="selected.includes(opt.id)
        ? 'border-primary bg-primary/10 text-foreground'
        : 'border-border bg-background/50 text-foreground/70 hover:border-primary/50 hover:bg-background'"
      @click="emit('toggle', opt.id)"
    >
      <UiCheckbox
        :checked="selected.includes(opt.id)"
        class="pointer-events-none shrink-0"
        aria-hidden
        @update:checked="emit('toggle', opt.id)"
      />
      <span class="text-sm leading-snug">{{ opt.label }}</span>
    </button>
  </div>
</template>
