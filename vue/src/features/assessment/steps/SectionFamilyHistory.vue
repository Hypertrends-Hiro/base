<script setup lang="ts">
import { computed } from 'vue'
import AssessmentStep from '../AssessmentStep.vue'
import YesNoToggle from '../YesNoToggle.vue'
import TagInput from '../TagInput.vue'

const props = defineProps<{ answers: Record<string, unknown>; direction?: 'forward' | 'back' }>()
const emit = defineEmits<{ answer: [key: string, value: unknown]; next: []; back: [] }>()

const hasFamilyConditions = computed(() => (props.answers.hasFamilyConditions as 'yes' | 'no' | '') ?? '')
const familyTags = computed(() => (props.answers.familyConditionTags as string[]) ?? [])

const sectionDescription = `Family health history provides important clues about your genetic predispositions and risk factors. Understanding conditions that run in your family helps us proactively identify areas to monitor and manage.

Please share any significant health conditions in your immediate family (parents, siblings, grandparents).`
</script>

<template>
  <AssessmentStep
    section-label="Family History"
    section-title="Family health history"
    :section-description="sectionDescription"
    question-title="Do any close relatives have significant health conditions?"
    step-key="section-family-history"
    :direction="direction"
    @next="emit('next')"
    @back="emit('back')"
  >
    <YesNoToggle
      :model-value="hasFamilyConditions"
      @update:model-value="(v) => emit('answer', 'hasFamilyConditions', v)"
    />
    <div v-if="hasFamilyConditions === 'yes'" class="animate-fade-in space-y-2">
      <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">
        Please list conditions and the relation (press Enter after each)
      </p>
      <TagInput
        :model-value="familyTags"
        placeholder="e.g. Heart disease – Father, Diabetes – Mother"
        @update:model-value="emit('answer', 'familyConditionTags', $event)"
      />
    </div>
  </AssessmentStep>
</template>
