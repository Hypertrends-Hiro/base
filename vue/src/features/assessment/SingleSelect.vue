<script setup lang="ts">
defineProps<{
  options: { value: string; label: string }[]
  modelValue: string
}>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="grid grid-cols-1 gap-2.5">
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="flex items-center gap-3 rounded-lg border px-4 py-2.5 text-left transition-colors w-full text-sm"
      :class="modelValue === opt.value
        ? 'border-primary bg-primary/10 text-foreground'
        : 'border-border bg-background/50 text-foreground hover:border-primary/50 hover:bg-background'"
      @click="emit('update:modelValue', opt.value)"
    >
      <span
        class="h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0"
        :class="modelValue === opt.value ? 'border-primary' : 'border-foreground/30'"
      >
        <span
          v-if="modelValue === opt.value"
          class="h-2 w-2 rounded-full bg-primary"
        />
      </span>
      {{ opt.label }}
    </button>
  </div>
</template>
