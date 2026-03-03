<script setup lang="ts">
defineProps<{
  modelValue: 'yes' | 'no' | ''
}>()
const emit = defineEmits<{ 'update:modelValue': [v: 'yes' | 'no'] }>()

const base = 'flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm transition-colors cursor-pointer'
const active = 'border-primary bg-primary/10 text-foreground'
const inactive = 'border-border bg-background/50 text-foreground hover:border-primary/50 hover:bg-background'
</script>

<template>
  <div class="flex gap-3">
    <button
      v-for="opt in (['yes', 'no'] as const)"
      :key="opt"
      type="button"
      :class="[base, modelValue === opt ? active : inactive]"
      @click="emit('update:modelValue', opt)"
    >
      <span
        class="h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0"
        :class="modelValue === opt ? 'border-primary' : 'border-foreground/30'"
      >
        <span
          v-if="modelValue === opt"
          class="h-2 w-2 rounded-full bg-primary"
        />
      </span>
      {{ opt.toUpperCase() }}
    </button>
  </div>
</template>
