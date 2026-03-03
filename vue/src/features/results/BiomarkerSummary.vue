<script setup lang="ts">
const biomarkerData = [
  { count: 88, label: 'in range', color: 'hsl(var(--kwilt-blue))' },
  { count: 17, label: 'out of range', color: 'hsl(var(--status-attention))' },
  { count: 3, label: 'improving', color: 'hsl(30, 100%, 84%)' },
]
const totalBiomarkers = biomarkerData.reduce((s, d) => s + d.count, 0)
</script>

<template>
  <section class="mt-10">
    <div class="flex items-center justify-between mb-3">
      <h2 class="font-heading text-2xl font-medium lg:text-4xl">
        {{ totalBiomarkers }} Biomarkers
      </h2>
      <a href="#" class="flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
        Download results
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
      </a>
    </div>
    <p class="text-sm text-muted-foreground leading-relaxed mb-5">
      With this comprehensive panel we can detect subtle dysfunctions early, monitor aging-related
      risk factors, and personalize your health strategy across key longevity pathways. Together,
      they provide a data-driven foundation for optimizing healthspan—not just lifespan.
    </p>
    <div class="grid grid-cols-3 gap-3">
      <div
        v-for="d in biomarkerData"
        :key="d.label"
        class="rounded-md bg-card p-4 pb-0 shadow-soft flex flex-col items-start overflow-hidden min-h-[160px]"
      >
        <p class="font-heading text-4xl lg:text-5xl font-light">{{ d.count }}</p>
        <p class="mt-0.5 text-xs text-muted-foreground font-light">{{ d.label }}</p>
        <div class="mt-auto w-full rounded-t-md -mx-4 px-0" style="margin-left: -1rem; margin-right: -1rem; width: calc(100% + 2rem)">
          <div
            class="h-9 rounded-t-md"
            :style="{ width: `${(d.count / totalBiomarkers) * 100}%`, backgroundColor: d.color }"
          />
        </div>
      </div>
    </div>
  </section>
</template>
