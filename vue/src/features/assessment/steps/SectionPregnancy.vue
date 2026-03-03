<script setup lang="ts">
import { computed } from 'vue'
import AssessmentStep from '../AssessmentStep.vue'
import SingleSelect from '../SingleSelect.vue'

const PREGNANCY_OPTIONS = [
  { value: 'not_pregnant', label: 'No' },
  { value: 'pregnant', label: 'Yes, I am currently pregnant' },
  { value: 'breastfeeding', label: 'Yes, I am currently breastfeeding' },
  { value: 'trying', label: 'I am trying to conceive' },
]

const props = defineProps<{ answers: Record<string, unknown>; direction?: 'forward' | 'back' }>()
const emit = defineEmits<{ answer: [key: string, value: unknown]; next: []; back: [] }>()

const pregnancyStatus = computed(() => (props.answers.pregnancyStatus as string) ?? '')

const sectionDescription = `Certain treatments and medications may not be appropriate during pregnancy or while breastfeeding. This question helps us ensure your safety and tailor our recommendations accordingly.

If you are pregnant, breastfeeding, or trying to conceive, some prescription treatments may be restricted.`
</script>

<template>
  <AssessmentStep
    section-label="Pregnancy"
    section-title="Pregnancy & breastfeeding status"
    :section-description="sectionDescription"
    question-title="Are you currently pregnant or breastfeeding?"
    step-key="section-pregnancy"
    :direction="direction"
    @next="emit('next')"
    @back="emit('back')"
  >
    <SingleSelect
      :model-value="pregnancyStatus"
      :options="PREGNANCY_OPTIONS"
      @update:model-value="emit('answer', 'pregnancyStatus', $event)"
    />
    <div
      v-if="pregnancyStatus === 'pregnant' || pregnancyStatus === 'breastfeeding'"
      class="rounded-lg border border-primary/30 bg-primary/5 p-4 animate-fade-in"
    >
      <p class="text-sm text-foreground leading-relaxed">
        <strong>Please note:</strong> Some prescription treatments may not be available during pregnancy or while breastfeeding.
        Our medical team will review your assessment and ensure all recommendations are safe for you.
      </p>
    </div>
  </AssessmentStep>
</template>
