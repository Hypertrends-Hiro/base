<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useScenarioStore } from '@/stores/scenario'
import { pillars } from '@/features/results/pillars-data'
import PillarRow from '@/features/results/PillarRow.vue'
import BiomarkerSummary from '@/features/results/BiomarkerSummary.vue'
import BiomarkerCategories from '@/components/results/BiomarkerCategories.vue'
import resultsCtaHero from '@/assets/results-cta-hero.png'

const route = useRoute()
const { scenario } = useScenarioStore()
const isBlank = computed(() => scenario !== 'none')

const pillarTitles = ['Heart health', 'Metabolic health', 'Brain health', 'Cancer prevention', 'Bone and muscle care']

onMounted(() => {
  if (route.hash === '#biomarkers') {
    const el = document.getElementById('biomarkers')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
})
</script>

<template>
  <div class="p-4 lg:p-12">
    <header class="flex items-center justify-between mb-8">
      <h1 class="font-heading text-2xl font-light lg:text-4xl">
        KWILT<span class="text-[10px] lg:text-xs align-super">™</span> longevity pillars
      </h1>
    </header>

    <template v-if="isBlank">
      <section class="space-y-3">
        <div
          v-for="title in pillarTitles"
          :key="title"
          class="rounded-md bg-card shadow-soft px-4 py-4 md:px-6 md:py-5"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="font-heading text-xl font-medium text-muted-foreground/50">{{ title }}</p>
              <p class="text-sm text-muted-foreground/40 mt-0.5">Awaiting lab results</p>
            </div>
            <div class="flex items-center gap-3">
              <div class="h-2 w-24 md:w-40 overflow-hidden rounded-full bg-muted">
                <div class="h-full rounded-full bg-muted-foreground/10" style="width: 0%" />
              </div>
              <span class="min-w-[52px] text-right font-heading text-lg text-muted-foreground/30">—/20</span>
            </div>
          </div>
        </div>
      </section>
      <section class="mt-10">
        <h2 class="font-heading text-2xl font-medium lg:text-4xl mb-3">Biomarkers</h2>
        <div class="rounded-xl bg-card shadow-soft p-8 text-center">
          <p class="text-muted-foreground font-light">
            Complete your lab work to see your biomarker results and longevity pillar scores.
          </p>
        </div>
      </section>
    </template>

    <template v-else>
      <section class="space-y-3">
        <PillarRow
          v-for="p in pillars"
          :key="p.title"
          :pillar="p"
          :default-expanded="p.title === 'Heart health'"
        />
      </section>
      <div id="biomarkers">
        <BiomarkerSummary />
        <BiomarkerCategories />
      </div>
    </template>

    <section class="mt-10 relative w-full overflow-hidden rounded-2xl" style="aspect-ratio: 21/9">
      <img
        :src="resultsCtaHero"
        alt="Live well today"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      <div class="relative z-10 flex h-full flex-col justify-end p-6 md:p-10">
        <h2 class="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-light leading-tight">
          Live well today,
        </h2>
        <div class="my-3 h-[1px] w-full max-w-md bg-white/60" />
        <h2 class="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-light leading-tight">
          for a better tomorrow.
        </h2>
        <div class="mt-3 h-[1px] w-full max-w-md bg-white/60" />
      </div>
    </section>
  </div>
</template>
