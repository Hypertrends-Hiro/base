<script setup lang="ts">
import { computed } from 'vue'
import AssessmentStep from '../AssessmentStep.vue'
import CheckboxGrid from '../CheckboxGrid.vue'
import SingleSelect from '../SingleSelect.vue'
import UiTextarea from '@/components/ui/textarea.vue'

const ACTIVITY_FREQUENCY = [
  { value: 'none', label: "I don't exercise regularly" },
  { value: '1_2', label: '1–2 times per week' },
  { value: '3_4', label: '3–4 times per week' },
  { value: '5_plus', label: '5 or more times per week' },
]
const ACTIVITY_TYPES = [
  { id: 'walking', label: 'Walking / hiking' },
  { id: 'running', label: 'Running / jogging' },
  { id: 'strength', label: 'Strength / weight training' },
  { id: 'yoga', label: 'Yoga / Pilates' },
  { id: 'cycling', label: 'Cycling' },
  { id: 'swimming', label: 'Swimming' },
  { id: 'group_fitness', label: 'Group fitness classes' },
  { id: 'sports', label: 'Sports (tennis, golf, etc.)' },
  { id: 'other', label: 'Other' },
]
const BARRIERS = [
  { id: 'time', label: 'Lack of time' },
  { id: 'motivation', label: 'Lack of motivation' },
  { id: 'pain', label: 'Physical limitations or pain' },
  { id: 'how_to_start', label: 'Not sure how to start' },
  { id: 'no_facilities', label: 'No access to facilities' },
  { id: 'fatigue', label: 'Too tired / fatigue' },
  { id: 'none', label: 'No barriers' },
]

const props = defineProps<{ answers: Record<string, unknown>; direction?: 'forward' | 'back' }>()
const emit = defineEmits<{ answer: [key: string, value: unknown]; next: []; back: [] }>()

const frequency = computed(() => (props.answers.activityFrequency as string) ?? '')
const types = computed(() => (props.answers.activityTypes as string[]) ?? [])
const barriers = computed(() => (props.answers.activityBarriers as string[]) ?? [])
const notes = computed(() => (props.answers.activityNotes as string) ?? '')

function toggleType(id: string) {
  const next = types.value.includes(id) ? types.value.filter((t) => t !== id) : [...types.value, id]
  emit('answer', 'activityTypes', next)
}
function toggleBarrier(id: string) {
  if (id === 'none') {
    emit('answer', 'activityBarriers', barriers.value.includes('none') ? [] : ['none'])
    return
  }
  const filtered = barriers.value.filter((b) => b !== 'none')
  const next = filtered.includes(id) ? filtered.filter((b) => b !== id) : [...filtered, id]
  emit('answer', 'activityBarriers', next)
}

const sectionDescription = `Regular movement plays a key role in supporting your energy, mood, weight, and overall health. Understanding your activity level — and any challenges you may face — helps us tailor recommendations that fit your lifestyle.

Please tell us about your typical exercise habits.`
</script>

<template>
  <AssessmentStep
    section-label="Physical Activity"
    section-title="Physical activity & exercise"
    :section-description="sectionDescription"
    question-title="How often do you exercise per week?"
    step-key="section-physical-activity"
    :direction="direction"
    @next="emit('next')"
    @back="emit('back')"
  >
    <SingleSelect
      :model-value="frequency"
      :options="ACTIVITY_FREQUENCY"
      @update:model-value="emit('answer', 'activityFrequency', $event)"
    />
    <div class="space-y-3">
      <p class="text-base font-medium leading-snug text-foreground">What types of physical activity do you do?</p>
      <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
      <CheckboxGrid :options="ACTIVITY_TYPES" :selected="types" @toggle="toggleType" />
    </div>
    <div class="space-y-3">
      <p class="text-base font-medium leading-snug text-foreground">Do you face any barriers or challenges to exercising?</p>
      <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
      <CheckboxGrid :options="BARRIERS" :selected="barriers" @toggle="toggleBarrier" />
    </div>
    <div class="space-y-2">
      <p class="text-base font-medium leading-snug text-foreground">
        Anything else about your activity level?
        <span class="text-foreground/60 font-normal">(optional)</span>
      </p>
      <UiTextarea
        :model-value="notes"
        placeholder="Any other details about your exercise habits..."
        class="min-h-[80px] resize-none bg-background/50"
        @update:model-value="emit('answer', 'activityNotes', $event)"
      />
    </div>
  </AssessmentStep>
</template>
