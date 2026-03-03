<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import UiInput from '@/components/ui/input.vue'

const props = withDefaults(
  defineProps<{
    modelValue: string[]
    placeholder?: string
    class?: string
  }>(),
  { placeholder: 'Type and press Enter' }
)
const emit = defineEmits<{ 'update:modelValue': [tags: string[]] }>()

const input = ref('')

function addTag() {
  const trimmed = input.value.trim()
  if (trimmed && !props.modelValue.includes(trimmed)) {
    emit('update:modelValue', [...props.modelValue, trimmed])
  }
  input.value = ''
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault()
    addTag()
  }
  if (e.key === 'Backspace' && !input.value && props.modelValue.length > 0) {
    emit('update:modelValue', props.modelValue.slice(0, -1))
  }
}

function removeTag(tag: string) {
  emit('update:modelValue', props.modelValue.filter((t) => t !== tag))
}
</script>

<template>
  <div :class="cn('space-y-2', props.class)">
    <div v-if="modelValue.length > 0" class="flex flex-wrap gap-2">
      <span
        v-for="tag in modelValue"
        :key="tag"
        class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-sm font-medium text-foreground"
      >
        {{ tag }}
        <button
          type="button"
          class="rounded-full p-0.5 hover:bg-primary/20 transition-colors"
          @click="removeTag(tag)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>
      </span>
    </div>
    <UiInput
      v-model="input"
      :placeholder="placeholder"
      class="bg-background/50"
      @keydown="onKeyDown"
      @blur="addTag"
    />
  </div>
</template>
