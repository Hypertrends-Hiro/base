<script setup lang="ts">
import { computed } from 'vue'
import AssessmentStep from '../AssessmentStep.vue'
import YesNoToggle from '../YesNoToggle.vue'
import TagInput from '../TagInput.vue'

const props = defineProps<{ answers: Record<string, unknown>; direction?: 'forward' | 'back' }>()
const emit = defineEmits<{ answer: [key: string, value: unknown]; next: []; back: [] }>()

const hasPrescription = computed(() => (props.answers.hasPrescriptionMeds as 'yes' | 'no' | '') ?? '')
const prescriptionTags = computed(() => (props.answers.prescriptionMedTags as string[]) ?? [])
const hasOtc = computed(() => (props.answers.hasOtcSupplements as 'yes' | 'no' | '') ?? '')
const otcTags = computed(() => (props.answers.otcSupplementTags as string[]) ?? [])

const sectionDescription = `Knowing which medications and supplements you currently take helps us understand factors that may influence your health, symptoms, or lab results.

Some prescriptions, vitamins, and herbal products can affect metabolism, hormones, energy levels, or overall wellness. Please share anything you take regularly.`
</script>

<template>
  <AssessmentStep
    section-label="Medications & Supplements"
    section-title="Current medications & supplements"
    :section-description="sectionDescription"
    question-title="Are you currently taking any prescription medications?"
    step-key="section-medications"
    :direction="direction"
    @next="emit('next')"
    @back="emit('back')"
  >
    <YesNoToggle
      :model-value="hasPrescription"
      @update:model-value="(v) => emit('answer', 'hasPrescriptionMeds', v)"
    />
    <div v-if="hasPrescription === 'yes'" class="animate-fade-in space-y-2">
      <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">
        Please list your medications (press Enter after each)
      </p>
      <TagInput
        :model-value="prescriptionTags"
        placeholder="e.g. Metformin, Levothyroxine"
        @update:model-value="emit('answer', 'prescriptionMedTags', $event)"
      />
    </div>
    <div class="space-y-3">
      <p class="text-base font-medium leading-snug text-foreground">
        Are you regularly taking any over-the-counter vitamins, supplements, or herbal products?
      </p>
      <YesNoToggle
        :model-value="hasOtc"
        @update:model-value="(v) => emit('answer', 'hasOtcSupplements', v)"
      />
      <div v-if="hasOtc === 'yes'" class="animate-fade-in space-y-2">
        <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">
          Please list your supplements (press Enter after each)
        </p>
        <TagInput
          :model-value="otcTags"
          placeholder="e.g. Vitamin D, Fish Oil, Magnesium"
          @update:model-value="emit('answer', 'otcSupplementTags', $event)"
        />
      </div>
    </div>
  </AssessmentStep>
</template>
