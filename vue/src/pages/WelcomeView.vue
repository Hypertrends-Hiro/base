<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import UiButton from '@/components/ui/button.vue'
import kwiltLogoSvg from '@/assets/kwilt-logo-dark.png'

const router = useRouter()
const route = useRoute()
const firstName = (route.query?.firstName as string) ?? ''
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
    <div class="w-full max-w-[560px] mb-10 animate-fade-in" style="animation-delay: 0ms">
      <router-link to="/">
        <img :src="kwiltLogoSvg" alt="KWILT" class="h-7 w-auto" />
      </router-link>
    </div>

    <div
      class="w-full max-w-[560px] bg-card rounded-2xl px-8 py-10 md:px-10 animate-[scale-in_0.35s_ease-out,fade-in_0.35s_ease-out]"
      :style="{ boxShadow: 'var(--shadow-card)' }"
    >
      <div
        class="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 mb-6 animate-fade-in"
        style="animation-delay: 150ms; animation-fill-mode: both"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0" style="color: hsl(var(--status-optimal))"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span class="text-xs font-semibold tracking-wide text-foreground">Payment successful</span>
      </div>

      <h1
        class="font-heading text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-3 animate-fade-in"
        style="animation-delay: 200ms; animation-fill-mode: both"
      >
        You're officially a KWILT™ member{{ firstName ? `, ${firstName}` : '' }}.
      </h1>

      <p
        class="text-sm leading-relaxed text-foreground mb-6 animate-fade-in"
        style="animation-delay: 260ms; animation-fill-mode: both"
      >
        Your annual membership is now active. Welcome to a healthier you.
      </p>

      <div
        class="border-t border-border mb-6 animate-fade-in"
        style="animation-delay: 300ms; animation-fill-mode: both"
      />

      <div class="animate-fade-in" style="animation-delay: 340ms; animation-fill-mode: both">
        <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground mb-3">What's next</p>
        <h2 class="font-heading text-xl font-medium text-foreground leading-snug mb-4">
          Every person is unique. Help us get to know you.
        </h2>
        <p class="text-sm leading-relaxed text-foreground mb-5">
          To build your personalized health plan, we'll ask you a series of simple questions
          about your health history and lifestyle. Your answers let us tailor everything —
          from your biomarker panel to your recommendations — specifically to you.
        </p>
        <div class="flex items-center gap-1.5 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-foreground shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span class="text-xs text-foreground">~10 min · Save &amp; resume anytime</span>
        </div>
      </div>

      <div class="flex flex-col gap-3 animate-fade-in" style="animation-delay: 420ms; animation-fill-mode: both">
        <UiButton
          class="h-12 w-full rounded-md bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:bg-primary/90 flex items-center justify-center gap-2"
          @click="router.push('/assessment')"
        >
          Start My Health Assessment
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </UiButton>
        <UiButton
          variant="outline"
          class="h-12 w-full rounded-md border border-border bg-transparent text-sm font-medium text-foreground hover:bg-background hover:text-foreground"
          @click="router.push('/dashboard')"
        >
          I'll do this later — take me to my dashboard
        </UiButton>
        <p class="text-center text-[11px] text-foreground mt-1">
          You can always start your assessment from your dashboard.
        </p>
      </div>
    </div>
  </div>
</template>
