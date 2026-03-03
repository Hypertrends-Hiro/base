<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import UiButton from '@/components/ui/button.vue'
import { useScenarioStore } from '@/stores/scenario'
import kwiltLogoSvg from '@/assets/kwilt-logo-dark.png'

const router = useRouter()
const { setScenario } = useScenarioStore()

function goToDashboard() {
  setScenario('preparing-lab-requisition')
  router.push('/dashboard')
}
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
    <div
      class="w-full max-w-[560px] mb-10 animate-fade-in"
      style="animation-delay: 0ms; animation-fill-mode: both"
    >
      <RouterLink to="/">
        <img :src="kwiltLogoSvg" alt="KWILT" class="h-7 w-auto" />
      </RouterLink>
    </div>

    <div
      class="w-full max-w-[560px] bg-card rounded-2xl px-8 py-10 md:px-10 animate-[scale-in_0.35s_ease-out,fade-in_0.35s_ease-out]"
      style="box-shadow: var(--shadow-card)"
    >
      <div
        class="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 mb-6 animate-fade-in"
        style="animation-delay: 150ms; animation-fill-mode: both"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0" style="color: hsl(var(--status-optimal))">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span class="text-xs font-semibold tracking-wide text-foreground">
          Assessment complete
        </span>
      </div>

      <h1
        class="font-heading text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-3 animate-fade-in"
        style="animation-delay: 200ms; animation-fill-mode: both"
      >
        Thank you for completing your health profile.
      </h1>

      <p
        class="text-sm leading-relaxed text-foreground mb-6 animate-fade-in"
        style="animation-delay: 260ms; animation-fill-mode: both"
      >
        Your answers give our team everything they need to build a health plan that's
        truly yours — not a template, not a guess. You've taken a meaningful step.
      </p>

      <div
        class="border-t border-border mb-6 animate-fade-in"
        style="animation-delay: 300ms; animation-fill-mode: both"
      />

      <div
        class="animate-fade-in"
        style="animation-delay: 340ms; animation-fill-mode: both"
      >
        <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground mb-4">
          What's next
        </p>

        <div class="grid grid-cols-2 gap-3 mb-7">
          <div class="flex flex-col gap-2.5 rounded-xl border border-border bg-background p-4">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg"
              style="background-color: hsl(var(--status-optimal) / 0.12)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: hsl(var(--status-optimal))">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <p class="font-heading text-sm font-semibold text-foreground leading-snug">
              Expert review
              <span class="block text-xs font-normal text-foreground mt-0.5">1–2 business days</span>
            </p>
            <p class="text-xs leading-relaxed text-foreground">
              Our health professionals will carefully review your responses and craft a personalized plan built specifically for you.
            </p>
          </div>

          <div class="flex flex-col gap-2.5 rounded-xl border border-border bg-background p-4">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg"
              style="background-color: hsl(var(--primary) / 0.10)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: hsl(var(--primary))">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </div>
            <p class="font-heading text-sm font-semibold text-foreground leading-snug">
              We'll notify you
              <span class="block text-xs font-normal text-foreground mt-0.5">Email &amp; SMS</span>
            </p>
            <p class="text-xs leading-relaxed text-foreground">
              You'll hear from us the moment your custom health plan is ready, with clear next steps to get started.
            </p>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col gap-3 animate-fade-in"
        style="animation-delay: 420ms; animation-fill-mode: both"
      >
        <UiButton
          class="h-12 w-full rounded-md bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:bg-primary/90 flex items-center justify-center gap-2"
          @click="goToDashboard"
        >
          Go to My Dashboard
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
        </UiButton>

        <p class="text-center text-[11px] text-foreground mt-1">
          Your profile is saved. You can always update it from your dashboard.
        </p>
      </div>
    </div>
  </div>
</template>
