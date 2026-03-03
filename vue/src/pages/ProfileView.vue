<script setup lang="ts">
import { ref, computed } from 'vue'
import UiCollapsible from '@/components/ui/collapsible.vue'

const intakeCategories = [
  'Demographics',
  'Health Goals and Motivation',
  'Medical History and Current Health',
  'Medications and Supplements',
  'Lifestyle and Habits',
  'Substance Use',
  'Subjective Symptoms and Wellness',
  'Biometrics and Measurements',
  'Wearables and Tracking',
]

const accountFields = [
  { label: 'LEGAL NAME', value: 'Elisa George' },
  { label: 'BIOLOGICAL SEX', value: 'Female' },
  { label: 'EMAIL', value: 'elisa.george@email.com' },
  { label: 'DATE OF BIRTH', value: '05/05/1985' },
  { label: 'ADDRESS', value: '123 Wellness Ave, Austin TX 78701' },
  { label: 'PHONE NUMBER', value: '(512) 555-0198' },
]

const intakeData: Record<string, { label: string; value: string }[]> = {
  Demographics: [
    { label: 'AGE', value: '39' },
    { label: 'HEIGHT', value: "5'6\"" },
    { label: 'WEIGHT', value: '145 lbs' },
    { label: 'ETHNICITY', value: 'Caucasian' },
    { label: 'BIOLOGICAL SEX', value: 'Female' },
    { label: 'STATE', value: 'Texas' },
  ],
  'Health Goals and Motivation': [
    { label: 'PRIMARY GOAL', value: 'Weight management' },
    { label: 'SECONDARY GOAL', value: 'Better energy levels' },
    { label: 'MOTIVATION', value: 'Feel healthier and more confident' },
    { label: 'TIMELINE', value: '6 months' },
  ],
  'Medical History and Current Health': [
    { label: 'CONDITIONS', value: 'None reported' },
    { label: 'FAMILY HISTORY', value: 'Hypertension (maternal)' },
    { label: 'ALLERGIES', value: 'Penicillin' },
    { label: 'SURGERIES', value: 'None' },
  ],
  'Medications and Supplements': [
    { label: 'CURRENT MEDICATIONS', value: 'None' },
    { label: 'SUPPLEMENTS', value: 'Vitamin D, Omega-3' },
    { label: 'FREQUENCY', value: 'Daily' },
  ],
  'Lifestyle and Habits': [
    { label: 'EXERCISE FREQUENCY', value: '3-4 times per week' },
    { label: 'EXERCISE TYPE', value: 'Yoga, Running' },
    { label: 'DIET TYPE', value: 'Mediterranean' },
    { label: 'MEAL FREQUENCY', value: '3 meals, 1 snack' },
  ],
  'Substance Use': [
    { label: 'SMOKING', value: 'Never' },
    { label: 'ALCOHOL', value: 'Social (1-2 drinks/week)' },
    { label: 'CAFFEINE', value: '2 cups coffee daily' },
  ],
  'Subjective Symptoms and Wellness': [
    { label: 'ENERGY LEVEL', value: 'Moderate' },
    { label: 'SLEEP QUALITY', value: 'Good' },
    { label: 'STRESS LEVEL', value: 'Moderate' },
    { label: 'MOOD', value: 'Generally positive' },
  ],
  'Biometrics and Measurements': [
    { label: 'BLOOD PRESSURE', value: '118/76 mmHg' },
    { label: 'RESTING HEART RATE', value: '72 bpm' },
    { label: 'BODY FAT %', value: '28%' },
    { label: 'WAIST CIRCUMFERENCE', value: '30 in' },
  ],
  'Wearables and Tracking': [
    { label: 'DEVICE', value: 'Apple Watch Series 9' },
    { label: 'CONNECTED', value: 'Yes' },
    { label: 'TRACKING SINCE', value: 'January 2024' },
  ],
}

const activeIntake = ref(intakeCategories[0]!)
const currentIntakeFields = computed(() => intakeData[activeIntake.value] ?? [])
const changePasswordOpen = ref(false)
const notifOpen = ref(false)
const deleteAccountOpen = ref(false)
</script>

<template>
  <div class="w-full max-w-6xl mx-auto px-4 md:px-8 py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <div class="md:w-[200px] shrink-0 md:sticky md:top-8 md:self-start">
        <h1 class="font-heading text-2xl tracking-tight text-foreground mb-6 text-right">
          KWILT<span class="text-[10px] align-super">™</span> profile
        </h1>
        <nav class="flex flex-col gap-0.5">
          <button
            v-for="cat in intakeCategories"
            :key="cat"
            type="button"
            class="text-[11px] leading-tight font-medium text-right py-1 pr-4 relative transition-colors uppercase tracking-[0.08em]"
            :class="activeIntake === cat ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'"
            @click="activeIntake = cat"
          >
            <span v-if="activeIntake === cat" class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-1.5 h-1.5 rounded-full bg-primary" />
            {{ cat }}
          </button>
        </nav>
      </div>

      <div class="flex-1 space-y-12 min-w-0">
        <section>
          <div class="flex items-center justify-between">
            <h2 class="font-heading text-xl tracking-tight text-foreground mb-4">Account settings</h2>
            <button type="button" class="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Log out
            </button>
          </div>
          <div class="bg-card rounded-md p-6 shadow-soft relative">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <div v-for="f in accountFields" :key="f.label" class="py-3 border-b border-border">
                <p class="text-[10px] font-medium tracking-[0.15em] text-muted-foreground">{{ f.label }}</p>
                <p class="text-sm mt-1 text-foreground">{{ f.value }}</p>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <UiCollapsible v-model="changePasswordOpen">
              <template #trigger>
                <div class="flex w-full items-center justify-between py-4 border-b border-border text-left cursor-pointer">
                  <span class="text-xs font-medium tracking-[0.15em] text-foreground">CHANGE PASSWORD</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 text-muted-foreground"><path d="m9 18 6-6-6-6" /></svg>
                </div>
              </template>
              <p class="py-3 text-sm text-muted-foreground">Content coming soon.</p>
            </UiCollapsible>
            <UiCollapsible v-model="notifOpen">
              <template #trigger>
                <div class="flex w-full items-center justify-between py-4 border-b border-border text-left cursor-pointer">
                  <span class="text-xs font-medium tracking-[0.15em] text-foreground">NOTIFICATION PREFERENCES</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 text-muted-foreground transition-transform" :class="notifOpen && 'rotate-90'"><path d="m9 18 6-6-6-6" /></svg>
                </div>
              </template>
              <p class="py-3 text-sm text-muted-foreground">Content coming soon.</p>
            </UiCollapsible>
            <UiCollapsible v-model="deleteAccountOpen">
              <template #trigger>
                <div class="flex w-full items-center justify-between py-4 border-b border-border text-left cursor-pointer">
                  <span class="text-xs font-medium tracking-[0.15em] text-foreground">DELETE ACCOUNT</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 text-muted-foreground"><path d="m9 18 6-6-6-6" /></svg>
                </div>
              </template>
              <p class="py-3 text-sm text-muted-foreground">Content coming soon.</p>
            </UiCollapsible>
          </div>
        </section>

        <section>
          <div class="flex gap-2 overflow-x-auto pb-3 mb-4 md:hidden">
            <button
              v-for="cat in intakeCategories"
              :key="cat"
              type="button"
              class="text-xs font-medium px-3 py-1.5 rounded-full border border-border whitespace-nowrap"
              :class="activeIntake === cat ? 'bg-primary text-primary-foreground border-primary' : 'text-muted-foreground'"
              @click="activeIntake = cat"
            >
              {{ cat }}
            </button>
          </div>
          <div class="bg-card rounded-md p-6 shadow-soft" style="min-height: 320px">
            <p class="text-xs font-medium tracking-[0.15em] text-muted-foreground mb-3">{{ activeIntake?.toUpperCase() ?? '' }}</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <div v-for="f in currentIntakeFields" :key="f.label" class="py-3 border-b border-border">
                <p class="text-[10px] font-medium tracking-[0.15em] text-muted-foreground">{{ f.label }}</p>
                <p class="text-sm mt-1 text-foreground">{{ f.value }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
