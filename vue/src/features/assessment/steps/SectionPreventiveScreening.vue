<script setup lang="ts">
import { computed } from 'vue'
import AssessmentStep from '../AssessmentStep.vue'
import SingleSelect from '../SingleSelect.vue'

const SCREENING_OPTIONS = [
  { value: 'within_1_year', label: 'Within the last year' },
  { value: '1_3_years', label: '1–3 years ago' },
  { value: '3_5_years', label: '3–5 years ago' },
  { value: 'over_5_years', label: 'More than 5 years ago' },
  { value: 'never', label: 'Never had one' },
]

const props = defineProps<{ answers: Record<string, unknown>; direction?: 'forward' | 'back' }>()
const emit = defineEmits<{ answer: [key: string, value: unknown]; next: []; back: [] }>()

const papSmear = computed(() => (props.answers.lastPapSmear as string) ?? '')
const mammogram = computed(() => (props.answers.lastMammogram as string) ?? '')
const colonScreening = computed(() => (props.answers.lastColonScreening as string) ?? '')
const dexaScan = computed(() => (props.answers.lastDexaScan as string) ?? '')

const sectionDescription = `Staying up to date on preventive screenings is one of the most important things you can do for your long-term health. These tests help catch potential issues early, when they're most treatable.

Please let us know when you last completed each of the following screenings. If you've never had one, that's okay — just let us know.`
</script>

<template>
  <AssessmentStep
    section-label="Preventive Screening"
    section-title="Your preventive screenings"
    :section-description="sectionDescription"
    question-title="When was your last Pap smear?"
    step-key="section-preventive"
    :direction="direction"
    @next="emit('next')"
    @back="emit('back')"
  >
    <SingleSelect
      :model-value="papSmear"
      :options="SCREENING_OPTIONS"
      @update:model-value="emit('answer', 'lastPapSmear', $event)"
    />
    <div class="space-y-2">
      <p class="text-base font-medium leading-snug text-foreground">When was your last mammogram?</p>
      <SingleSelect
        :model-value="mammogram"
        :options="SCREENING_OPTIONS"
        @update:model-value="emit('answer', 'lastMammogram', $event)"
      />
    </div>
    <div class="space-y-2">
      <p class="text-base font-medium leading-snug text-foreground">When was your last colon cancer screening?</p>
      <SingleSelect
        :model-value="colonScreening"
        :options="SCREENING_OPTIONS"
        @update:model-value="emit('answer', 'lastColonScreening', $event)"
      />
    </div>
    <div class="space-y-2">
      <p class="text-base font-medium leading-snug text-foreground">When was your last DEXA scan (bone density)?</p>
      <SingleSelect
        :model-value="dexaScan"
        :options="SCREENING_OPTIONS"
        @update:model-value="emit('answer', 'lastDexaScan', $event)"
      />
    </div>
  </AssessmentStep>
</template>
