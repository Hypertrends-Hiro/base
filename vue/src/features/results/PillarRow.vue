<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'
import type { Pillar } from './pillars-data'
import { statusLabel } from './pillars-data'

const props = defineProps<{
  pillar: Pillar
  defaultExpanded?: boolean
}>()

const expanded = ref(props.defaultExpanded ?? false)
const pct = computed(() => (props.pillar.score / props.pillar.maxScore) * 100)
const barColor = computed(() =>
  pct.value >= 90 ? 'hsl(var(--kwilt-blue))' : pct.value >= 50 ? 'hsl(var(--kwilt-blue))' : 'hsl(var(--status-attention))'
)
</script>

<template>
  <div class="rounded-md bg-card shadow-soft">
    <button
      type="button"
      class="flex w-full flex-col px-4 py-4 md:px-6 md:py-5"
      @click="expanded = !expanded"
    >
      <div class="flex md:hidden w-full items-center justify-between mb-2">
        <span class="font-heading text-2xl font-light text-foreground">
          {{ pillar.score }}/{{ pillar.maxScore }}
        </span>
        <div class="flex items-center gap-2">
          <div class="h-2 w-24 overflow-hidden rounded-full bg-muted">
            <div
              class="h-full rounded-full transition-all"
              :style="{ width: `${pct}%`, background: barColor }"
            />
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="cn('h-5 w-5 transition-transform duration-200 -rotate-90', expanded && 'rotate-0')"><path d="m6 9 6 6 6-6" /></svg>
        </div>
      </div>
      <div class="md:hidden text-left">
        <p class="font-heading text-lg font-medium">{{ pillar.title }}</p>
        <p class="text-sm text-muted-foreground leading-snug mt-0.5">{{ pillar.subtitle }}</p>
      </div>
      <div class="hidden md:flex w-full items-start justify-between gap-4">
        <div class="flex flex-col gap-0.5 text-left">
          <span class="flex items-center gap-2 font-heading text-xl font-medium">
            {{ pillar.title }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="cn('h-4 w-4 transition-transform duration-200', expanded && 'rotate-180')"><path d="m6 9 6 6 6-6" /></svg>
          </span>
          <p class="text-sm text-muted-foreground leading-snug max-w-lg">{{ pillar.subtitle }}</p>
        </div>
        <div class="flex items-center gap-3 flex-shrink-0 pt-1">
          <div class="h-2 w-40 overflow-hidden rounded-full bg-muted">
            <div class="h-full rounded-full transition-all" :style="{ width: `${pct}%`, background: barColor }" />
          </div>
          <span class="min-w-[52px] text-right font-heading text-lg text-muted-foreground">{{ pillar.score }}/{{ pillar.maxScore }}</span>
        </div>
      </div>
    </button>
    <div v-show="expanded" class="animate-fade-in border-t border-border bg-background px-4 py-5 md:px-6">
      <div class="grid gap-4 md:grid-cols-3">
        <div class="rounded-md bg-card p-4 shadow-soft min-w-[85vw] md:min-w-0">
          <h5 class="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">Markers that influence this score</h5>
          <ul class="divide-y divide-border">
            <li v-for="m in pillar.markers" :key="m.name" class="py-3 first:pt-0 last:pb-0">
              <p class="text-sm leading-snug text-foreground">{{ m.name }}</p>
              <p class="text-xs font-medium mt-0.5 text-primary">{{ statusLabel[m.status] }}{{ m.value ? ` – ${m.value}` : '' }}</p>
            </li>
          </ul>
        </div>
        <div class="rounded-md bg-card p-4 shadow-soft min-w-[85vw] md:min-w-0">
          <h5 class="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">Score is lowered by</h5>
          <ul class="divide-y divide-border">
            <li v-for="item in pillar.loweredBy" :key="item" class="py-2.5 first:pt-0 last:pb-0 text-sm leading-snug text-foreground">{{ item }}</li>
          </ul>
        </div>
        <div class="rounded-md bg-card p-4 shadow-soft min-w-[85vw] md:min-w-0">
          <h5 class="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">Why it matters</h5>
          <p class="text-base leading-relaxed text-foreground font-heading">{{ pillar.whyItMatters }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
