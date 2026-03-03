<script setup lang="ts">
import LandingFadeIn from './fade-in.vue'

const steps = [
  { number: '01', title: 'Become a member', description: 'Step into your most radiant self for $449/year.\n\nSign up to unlock our Comprehensive Biomarker Test, testing 100+ biomarkers. Fill out an intake form so we can personalize everything to your body, lifestyle, and goals.', barWidth: '15%', indent: '0%' },
  { number: '02', title: 'Get tested', description: "With over 2,000 Quest Lab locations, getting your bloodwork is simple and stress-free, whether you're leading meetings or managing mom life.", barWidth: '30%', indent: '8%' },
  { number: '03', title: 'Discover insights', description: "Receive a clear, personalized breakdown of your results, plus a custom wellness plan powered by expert care and smart AI.\n\nWant extra support? Book an optional chat with a trusted provider.", barWidth: '45%', indent: '16%' },
  { number: '04', title: 'Ongoing guidance', description: 'Monthly check-ins and quarterly testing to keep your longevity journey on track. Your plan evolves as you do.', barWidth: '60%', indent: '24%' },
]
</script>

<template>
  <section class="bg-background px-8 py-16 md:px-16 lg:px-24">
    <LandingFadeIn>
      <h2 class="font-heading text-4xl md:text-5xl font-normal text-foreground mb-8">How it works</h2>
    </LandingFadeIn>
    <div class="space-y-0">
      <div v-for="step in steps" :key="step.number">
        <div class="h-[3px] bg-foreground mb-6" :style="{ width: step.barWidth, transition: 'width 1000ms cubic-bezier(0.22, 1, 0.36, 1)' }" />
        <div class="grid grid-cols-2 gap-8 pb-10">
          <div class="flex items-end" :style="{ paddingLeft: step.indent }">
            <span class="font-heading font-normal text-foreground leading-none" style="font-size: clamp(5rem, 10vw, 10rem)">{{ step.number }}</span>
          </div>
          <div class="flex flex-col justify-end pb-2">
            <h3 class="font-heading text-3xl md:text-4xl font-normal text-foreground mb-3">{{ step.title }}</h3>
            <p v-for="(para, j) in step.description.split('\n\n')" :key="j" class="text-base text-foreground leading-relaxed" :class="j > 0 ? 'mt-3' : ''">{{ para }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
