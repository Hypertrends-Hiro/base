<script setup lang="ts">
import { computed } from 'vue'
import AssessmentStep from '../AssessmentStep.vue'
import CheckboxGrid from '../CheckboxGrid.vue'
import SingleSelect from '../SingleSelect.vue'
import UiTextarea from '@/components/ui/textarea.vue'

const SLEEP_HOURS = [
  { value: 'lt5', label: 'Less than 5 hours' },
  { value: '5_6', label: '5–6 hours' },
  { value: '7_8', label: '7–8 hours' },
  { value: 'gt8', label: 'More than 8 hours' },
]
const RESTED_OPTIONS = [
  { value: 'yes', label: 'Yes, I usually feel rested' },
  { value: 'sometimes', label: 'Sometimes' },
  { value: 'rarely', label: 'Rarely' },
  { value: 'never', label: 'No, I never feel rested' },
]
const SLEEP_CONCERNS = [
  { id: 'falling_asleep', label: 'Difficulty falling asleep' },
  { id: 'staying_asleep', label: 'Difficulty staying asleep' },
  { id: 'waking_early', label: 'Waking up too early' },
  { id: 'snoring', label: 'Snoring / sleep apnea' },
  { id: 'restless_legs', label: 'Restless legs' },
  { id: 'night_sweats', label: 'Night sweats' },
  { id: 'none', label: 'No sleep concerns' },
]

const props = defineProps<{ answers: Record<string, unknown>; direction?: 'forward' | 'back' }>()
const emit = defineEmits<{ answer: [key: string, value: unknown]; next: []; back: [] }>()

const hours = computed(() => (props.answers.sleepHoursNew as string) ?? '')
const rested = computed(() => (props.answers.feelsRested as string) ?? '')
const concerns = computed(() => (props.answers.sleepConcerns as string[]) ?? [])
const notes = computed(() => (props.answers.sleepNotes as string) ?? '')

function toggleConcern(id: string) {
  if (id === 'none') {
    emit('answer', 'sleepConcerns', concerns.value.includes('none') ? [] : ['none'])
    return
  }
  const filtered = concerns.value.filter((c) => c !== 'none')
  const next = filtered.includes(id) ? filtered.filter((c) => c !== id) : [...filtered, id]
  emit('answer', 'sleepConcerns', next)
}

const sectionDescription = `Quality sleep is essential for energy, mood, metabolism, and overall recovery. Understanding your sleep habits and any challenges you experience helps us identify patterns that may be impacting your health.

Please share details about your typical sleep.`
</script>

<template>
  <AssessmentStep
    section-label="Sleep"
    section-title="Sleep & recovery"
    :section-description="sectionDescription"
    question-title="On average, how many hours do you sleep per night?"
    step-key="section-sleep"
    :direction="direction"
    @next="emit('next')"
    @back="emit('back')"
  >
    <SingleSelect
      :model-value="hours"
      :options="SLEEP_HOURS"
      @update:model-value="emit('answer', 'sleepHoursNew', $event)"
    />
    <div class="space-y-2">
      <p class="text-base font-medium leading-snug text-foreground">Do you generally wake up feeling rested?</p>
      <SingleSelect
        :model-value="rested"
        :options="RESTED_OPTIONS"
        @update:model-value="emit('answer', 'feelsRested', $event)"
      />
    </div>
    <div class="space-y-3">
      <p class="text-base font-medium leading-snug text-foreground">Do you have any sleep concerns?</p>
      <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
      <CheckboxGrid :options="SLEEP_CONCERNS" :selected="concerns" :columns="1" @toggle="toggleConcern" />
    </div>
    <div class="space-y-2">
      <p class="text-base font-medium leading-snug text-foreground">
        Anything else about your sleep?
        <span class="text-foreground/60 font-normal">(optional)</span>
      </p>
      <UiTextarea
        :model-value="notes"
        placeholder="Any other details about your sleep..."
        class="min-h-[80px] resize-none bg-background/50"
        @update:model-value="emit('answer', 'sleepNotes', $event)"
      />
    </div>
  </AssessmentStep>
</template>
