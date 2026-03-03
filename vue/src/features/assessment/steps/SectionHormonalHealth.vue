<script setup lang="ts">
import { computed } from 'vue'
import AssessmentStep from '../AssessmentStep.vue'
import SingleSelect from '../SingleSelect.vue'

const REPRODUCTIVE_STATUS = [
  { value: 'premenopausal', label: 'Pre-menopausal (regular cycles)' },
  { value: 'perimenopausal', label: 'Peri-menopausal (irregular cycles)' },
  { value: 'postmenopausal', label: 'Post-menopausal' },
  { value: 'not_sure', label: 'Not sure' },
  { value: 'other', label: 'Other / Prefer not to say' },
]
const LAST_CYCLE = [
  { value: 'within_month', label: 'Within the last month' },
  { value: '1_3_months', label: '1–3 months ago' },
  { value: '3_6_months', label: '3–6 months ago' },
  { value: '6_12_months', label: '6–12 months ago' },
  { value: 'over_12_months', label: 'More than 12 months ago' },
  { value: 'na', label: 'N/A' },
]
const CYCLE_DESCRIPTION = [
  { value: 'regular', label: 'Regular (every 21–35 days)' },
  { value: 'irregular', label: 'Irregular (varies significantly)' },
  { value: 'heavy', label: 'Heavy or prolonged periods' },
  { value: 'light', label: 'Very light or short periods' },
  { value: 'painful', label: 'Painful periods (cramping, discomfort)' },
  { value: 'absent', label: 'Absent (no period for 3+ months)' },
]

const props = defineProps<{ answers: Record<string, unknown>; direction?: 'forward' | 'back' }>()
const emit = defineEmits<{ answer: [key: string, value: unknown]; next: []; back: [] }>()

const reproductiveStatus = computed(() => (props.answers.reproductiveStatus as string) ?? '')
const lastCycle = computed(() => (props.answers.lastCycle as string) ?? '')
const cycleDescription = computed(() => (props.answers.cycleDescription as string) ?? '')
const showCycleQuestions = computed(() =>
  ['premenopausal', 'perimenopausal', 'not_sure', 'other'].includes(reproductiveStatus.value)
)

const sectionDescription = `Hormones regulate nearly every system in your body — from energy and mood to metabolism and sleep. Understanding your reproductive and hormonal status helps us provide more accurate insights and personalize treatment options.

Please answer as honestly as you can. All information is confidential.`
</script>

<template>
  <AssessmentStep
    section-label="Hormonal Health"
    section-title="Your hormonal health"
    :section-description="sectionDescription"
    question-title="What best describes your current reproductive / menopause status?"
    step-key="section-hormonal"
    :direction="direction"
    @next="emit('next')"
    @back="emit('back')"
  >
    <SingleSelect
      :model-value="reproductiveStatus"
      :options="REPRODUCTIVE_STATUS"
      @update:model-value="emit('answer', 'reproductiveStatus', $event)"
    />
    <div class="space-y-2">
      <p class="text-base font-medium leading-snug text-foreground">
        When was your last menstrual cycle?
      </p>
      <SingleSelect
        :model-value="lastCycle"
        :options="LAST_CYCLE"
        @update:model-value="emit('answer', 'lastCycle', $event)"
      />
    </div>
    <div v-if="showCycleQuestions" class="space-y-2 animate-fade-in">
      <p class="text-base font-medium leading-snug text-foreground">
        How would you describe your menstrual cycle?
      </p>
      <SingleSelect
        :model-value="cycleDescription"
        :options="CYCLE_DESCRIPTION"
        @update:model-value="emit('answer', 'cycleDescription', $event)"
      />
    </div>
  </AssessmentStep>
</template>
