<script setup lang="ts">
import { computed } from 'vue'
import AssessmentStep from '../AssessmentStep.vue'
import UiInput from '@/components/ui/input.vue'
import UiSelect from '@/components/ui/select.vue'
import SingleSelect from '../SingleSelect.vue'

const FEET_OPTIONS = Array.from({ length: 5 }, (_, i) => ({ value: String(i + 4), label: `${i + 4} ft` }))
const INCHES_OPTIONS = Array.from({ length: 12 }, (_, i) => ({ value: String(i), label: `${i} in` }))
const BP_OPTIONS = [
  { value: 'normal', label: 'Normal (below 120/80)' },
  { value: 'elevated', label: 'Elevated (120-129 / less than 80)' },
  { value: 'high_stage1', label: 'High – Stage 1 (130-139 / 80-89)' },
  { value: 'high_stage2', label: 'High – Stage 2 (140+ / 90+)' },
  { value: 'dont_know', label: "I don't know" },
]

const props = defineProps<{
  answers: Record<string, unknown>
  direction?: 'forward' | 'back'
}>()
const emit = defineEmits<{ answer: [key: string, value: unknown]; next: []; back: [] }>()

const heightFeet = computed(() => (props.answers.heightFeet as string) ?? '')
const heightInches = computed(() => (props.answers.heightInches as string) ?? '')
const currentWeight = computed(() => (props.answers.currentWeight as string) ?? '')
const goalWeight = computed(() => (props.answers.goalWeight as string) ?? '')
const bloodPressure = computed(() => (props.answers.bloodPressure as string) ?? '')

const sectionDescription = `Your height, weight, and basic measurements help us understand where you are today and how your wellness journey is progressing. These numbers give us important context for interpreting your results — but don't worry if you're not exactly sure. Just provide your best estimate.

Our goal is to support you, not stress you. Every bit of information helps us personalize your experience.`
</script>

<template>
  <AssessmentStep
    section-label="Biometrics"
    section-title="Let's get your measurements"
    :section-description="sectionDescription"
    question-title="What is your height?"
    step-key="section-biometrics"
    :direction="direction"
    @next="emit('next')"
    @back="emit('back')"
  >
    <div class="grid grid-cols-2 gap-3">
      <div class="space-y-1.5">
        <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Feet</p>
        <UiSelect
          :model-value="heightFeet"
          class="w-full bg-background/50"
          @update:model-value="emit('answer', 'heightFeet', $event)"
        >
          <option value="" disabled>Select</option>
          <option v-for="o in FEET_OPTIONS" :key="o.value" :value="o.value">{{ o.label }}</option>
        </UiSelect>
      </div>
      <div class="space-y-1.5">
        <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Inches</p>
        <UiSelect
          :model-value="heightInches"
          class="w-full bg-background/50"
          @update:model-value="emit('answer', 'heightInches', $event)"
        >
          <option value="" disabled>Select</option>
          <option v-for="o in INCHES_OPTIONS" :key="o.value" :value="o.value">{{ o.label }}</option>
        </UiSelect>
      </div>
    </div>
    <div class="space-y-2">
      <p class="text-base font-medium leading-snug text-foreground">What is your current weight? (lbs)</p>
      <UiInput
        :model-value="currentWeight"
        type="number"
        placeholder="Current weight in lbs"
        class="bg-background/50"
        @update:model-value="emit('answer', 'currentWeight', $event)"
      />
    </div>
    <div class="space-y-2">
      <p class="text-base font-medium leading-snug text-foreground">What is your goal weight? (lbs)</p>
      <UiInput
        :model-value="goalWeight"
        type="number"
        placeholder="Goal weight in lbs"
        class="bg-background/50"
        @update:model-value="emit('answer', 'goalWeight', $event)"
      />
    </div>
    <div class="space-y-2">
      <p class="text-base font-medium leading-snug text-foreground">
        Do you know your most recent blood pressure reading?
      </p>
      <SingleSelect
        :model-value="bloodPressure"
        :options="BP_OPTIONS"
        @update:model-value="emit('answer', 'bloodPressure', $event)"
      />
    </div>
  </AssessmentStep>
</template>
