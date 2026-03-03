<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    sectionLabel?: string
    sectionTitle: string
    sectionDescription: string
    questionTitle: string
    backLabel?: string
    nextLabel?: string
    stepKey: string
    direction?: 'forward' | 'back'
  }>(),
  { backLabel: 'Back', nextLabel: 'Continue', direction: 'forward' }
)

const emit = defineEmits<{ next: []; back: [] }>()

const expanded = ref(false)

const animClass = computed(() =>
  props.direction === 'back'
    ? 'animate-[step-enter-back_0.32s_cubic-bezier(0.22,1,0.36,1)]'
    : 'animate-[step-enter-forward_0.32s_cubic-bezier(0.22,1,0.36,1)]'
)

function onNext() {
  emit('next')
}
function onBack() {
  emit('back')
}
</script>

<template>
  <div
    :key="stepKey"
    :class="cn('flex-1 mx-auto w-full max-w-5xl px-6 py-8 lg:px-12 lg:py-12', animClass)"
  >
    <div class="grid gap-8 lg:grid-cols-[1fr,1.6fr] lg:gap-16 items-start">
      <div class="lg:pt-2">
        <p
          v-if="sectionLabel"
          class="text-[10px] font-semibold uppercase tracking-widest text-primary mb-3"
        >
          {{ sectionLabel }}
        </p>
        <h1 class="font-heading text-2xl font-medium leading-snug lg:text-3xl text-foreground">
          {{ sectionTitle }}
        </h1>
        <div class="mt-4 lg:hidden">
          <p
            :class="cn(
              'text-sm leading-relaxed text-foreground transition-all',
              !expanded && 'line-clamp-2'
            )"
          >
            {{ sectionDescription }}
          </p>
          <button
            type="button"
            class="mt-1.5 flex items-center gap-1 text-xs font-semibold text-primary"
            @click="expanded = !expanded"
          >
            {{ expanded ? 'Read less' : 'Read more' }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="cn('h-3.5 w-3.5 transition-transform duration-200', expanded && 'rotate-180')"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
        <p class="mt-4 hidden lg:block text-sm leading-relaxed text-foreground">
          {{ sectionDescription }}
        </p>
      </div>

      <div class="bg-card rounded-2xl shadow-[var(--shadow-card)] p-6 lg:p-8">
        <h2 class="text-base font-medium leading-snug text-foreground mb-3">
          {{ questionTitle }}
        </h2>
        <div class="space-y-5">
          <slot />
        </div>
        <div class="flex flex-col gap-3 pt-2 mt-5">
          <button
            type="button"
            class="h-12 w-full rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            @click="onNext"
          >
            {{ nextLabel }}
          </button>
          <button
            type="button"
            class="h-12 w-full rounded-lg border border-border bg-transparent text-foreground font-semibold text-sm hover:bg-border/40 transition-colors"
            @click="onBack"
          >
            {{ backLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
