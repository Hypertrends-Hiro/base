<script setup lang="ts">
import { computed } from 'vue'
import AssessmentStep from '../AssessmentStep.vue'
import YesNoToggle from '../YesNoToggle.vue'
import TagInput from '../TagInput.vue'
import CheckboxGrid from '../CheckboxGrid.vue'
import UiInput from '@/components/ui/input.vue'

const ALLERGY_OPTIONS = [
  { id: 'medications', label: 'Medications' },
  { id: 'food', label: 'Food allergies' },
  { id: 'environmental', label: 'Environmental (pollen, dust, etc.)' },
  { id: 'latex', label: 'Latex' },
  { id: 'none', label: 'No known allergies' },
]

const props = defineProps<{ answers: Record<string, unknown>; direction?: 'forward' | 'back' }>()
const emit = defineEmits<{ answer: [key: string, value: unknown]; next: []; back: [] }>()

const hasDiagnosed = computed(() => (props.answers.hasDiagnosedConditions as 'yes' | 'no' | '') ?? '')
const diagnosedTags = computed(() => (props.answers.diagnosedConditionTags as string[]) ?? [])
const allergies = computed(() => (props.answers.allergyTypes as string[]) ?? [])
const allergyDetails = computed(() => (props.answers.allergyDetails as string) ?? '')
const hasSurgeries = computed(() => (props.answers.hasSurgeries as 'yes' | 'no' | '') ?? '')
const surgeryTags = computed(() => (props.answers.surgeryTags as string[]) ?? [])

function toggleAllergy(id: string) {
  if (id === 'none') {
    emit('answer', 'allergyTypes', allergies.value.includes('none') ? [] : ['none'])
    return
  }
  const filtered = allergies.value.filter((a) => a !== 'none')
  const next = filtered.includes(id) ? filtered.filter((a) => a !== id) : [...filtered, id]
  emit('answer', 'allergyTypes', next)
}

const sectionDescription = `Understanding your medical history — including any diagnosed conditions, allergies, and past surgeries — helps us provide safer, more accurate recommendations.

Please share what's relevant. If you're unsure about anything, just provide your best recollection.`
</script>

<template>
  <AssessmentStep
    section-label="Medical History"
    section-title="Your medical history"
    :section-description="sectionDescription"
    question-title="Have you been diagnosed with any medical conditions?"
    step-key="section-medical-history"
    :direction="direction"
    @next="emit('next')"
    @back="emit('back')"
  >
    <YesNoToggle
      :model-value="hasDiagnosed"
      @update:model-value="(v) => emit('answer', 'hasDiagnosedConditions', v)"
    />
    <div v-if="hasDiagnosed === 'yes'" class="animate-fade-in space-y-2">
      <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">
        Please list your conditions (press Enter after each)
      </p>
      <TagInput
        :model-value="diagnosedTags"
        placeholder="e.g. Diabetes, Hypertension"
        @update:model-value="emit('answer', 'diagnosedConditionTags', $event)"
      />
    </div>
    <div class="space-y-3">
      <p class="text-base font-medium leading-snug text-foreground">
        Do you have any known allergies or intolerances?
      </p>
      <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
      <CheckboxGrid :options="ALLERGY_OPTIONS" :selected="allergies" @toggle="toggleAllergy" />
      <div v-if="allergies.length > 0 && !allergies.includes('none')" class="animate-fade-in space-y-2">
        <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Please specify</p>
        <UiInput
          :model-value="allergyDetails"
          placeholder="List specific allergies"
          class="bg-background/50"
          @update:model-value="emit('answer', 'allergyDetails', $event)"
        />
      </div>
    </div>
    <div class="space-y-3">
      <p class="text-base font-medium leading-snug text-foreground">
        Have you had any major surgeries?
      </p>
      <YesNoToggle
        :model-value="hasSurgeries"
        @update:model-value="(v) => emit('answer', 'hasSurgeries', v)"
      />
      <div v-if="hasSurgeries === 'yes'" class="animate-fade-in space-y-2">
        <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">
          Please list your surgeries (press Enter after each)
        </p>
        <TagInput
          :model-value="surgeryTags"
          placeholder="e.g. Appendectomy, Knee replacement"
          @update:model-value="emit('answer', 'surgeryTags', $event)"
        />
      </div>
    </div>
  </AssessmentStep>
</template>
