<script setup lang="ts">
import { computed } from 'vue'
import AssessmentStep from '../AssessmentStep.vue'
import CheckboxGrid from '../CheckboxGrid.vue'
import UiTextarea from '@/components/ui/textarea.vue'

const FOCUS_AREAS = [
  { id: 'weight_management', label: 'Weight management' },
  { id: 'hormone_optimization', label: 'Hormone optimization' },
  { id: 'energy_vitality', label: 'Energy & vitality' },
  { id: 'longevity_aging', label: 'Longevity & aging' },
  { id: 'mental_clarity', label: 'Mental clarity & focus' },
  { id: 'sleep', label: 'Sleep improvement' },
  { id: 'fitness', label: 'Fitness & performance' },
  { id: 'stress', label: 'Stress reduction' },
  { id: 'skin_health', label: 'Skin health & appearance' },
  { id: 'sexual_health', label: 'Sexual health' },
  { id: 'gut_health', label: 'Gut health & digestion' },
  { id: 'other', label: 'Other' },
]
const WELLNESS_GOALS = [
  { id: 'lose_weight', label: 'Lose weight' },
  { id: 'build_muscle', label: 'Build muscle / tone up' },
  { id: 'more_energy', label: 'Have more energy' },
  { id: 'better_sleep', label: 'Sleep better' },
  { id: 'reduce_stress', label: 'Reduce stress & anxiety' },
  { id: 'balance_hormones', label: 'Balance hormones' },
  { id: 'improve_skin', label: 'Improve skin quality' },
  { id: 'boost_libido', label: 'Boost libido' },
  { id: 'slow_aging', label: 'Slow biological aging' },
  { id: 'improve_digestion', label: 'Improve digestion' },
  { id: 'prevent_disease', label: 'Prevent chronic disease' },
  { id: 'other', label: 'Other' },
]
const CURRENT_SYMPTOMS = [
  { id: 'fatigue', label: 'Fatigue / low energy' },
  { id: 'weight_gain', label: 'Unexplained weight gain' },
  { id: 'brain_fog', label: 'Brain fog / poor concentration' },
  { id: 'mood_swings', label: 'Mood swings / irritability' },
  { id: 'hot_flashes', label: 'Hot flashes / night sweats' },
  { id: 'low_libido', label: 'Low libido' },
  { id: 'joint_pain', label: 'Joint pain or stiffness' },
  { id: 'hair_loss', label: 'Hair thinning or loss' },
  { id: 'bloating', label: 'Bloating or digestive issues' },
  { id: 'insomnia', label: 'Insomnia or poor sleep' },
  { id: 'anxiety', label: 'Anxiety' },
  { id: 'none', label: 'None of the above' },
]

const props = defineProps<{ answers: Record<string, unknown>; direction?: 'forward' | 'back' }>()
const emit = defineEmits<{ answer: [key: string, value: unknown]; next: []; back: [] }>()

const focusAreas = computed(() => (props.answers.focusAreas as string[]) ?? [])
const wellnessGoals = computed(() => (props.answers.wellnessGoals as string[]) ?? [])
const currentSymptoms = computed(() => (props.answers.currentSymptoms as string[]) ?? [])
const motivation = computed(() => (props.answers.motivationText as string) ?? '')

function makeToggle(key: string, arr: string[], exclusiveId?: string) {
  return (id: string) => {
    if (exclusiveId && id === exclusiveId) {
      emit('answer', key, arr.includes(exclusiveId) ? [] : [exclusiveId])
      return
    }
    const filtered = exclusiveId ? arr.filter((x) => x !== exclusiveId) : arr
    const next = filtered.includes(id) ? filtered.filter((x) => x !== id) : [...filtered, id]
    emit('answer', key, next)
  }
}

const sectionDescription = `Everyone's health journey is unique. Understanding what matters most to you helps us personalize your recommendations and focus on the areas that will make the biggest difference in your daily life.

Whether you're looking to boost energy, manage weight, reduce stress, or simply feel healthier overall — tell us what's on your mind.`
</script>

<template>
  <AssessmentStep
    section-label="Health Goals"
    section-title="What matters most to you?"
    :section-description="sectionDescription"
    question-title="What are your top health focus areas?"
    step-key="section-health-goals"
    :direction="direction"
    @next="emit('next')"
    @back="emit('back')"
  >
    <div class="space-y-3">
      <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
      <CheckboxGrid
        :options="FOCUS_AREAS"
        :selected="focusAreas"
        @toggle="(id) => makeToggle('focusAreas', focusAreas)(id)"
      />
    </div>
    <div class="space-y-3">
      <p class="text-base font-medium leading-snug text-foreground">What specific wellness goals are you working toward?</p>
      <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
      <CheckboxGrid
        :options="WELLNESS_GOALS"
        :selected="wellnessGoals"
        @toggle="(id) => makeToggle('wellnessGoals', wellnessGoals)(id)"
      />
    </div>
    <div class="space-y-3">
      <p class="text-base font-medium leading-snug text-foreground">Are you currently experiencing any of these symptoms?</p>
      <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
      <CheckboxGrid
        :options="CURRENT_SYMPTOMS"
        :selected="currentSymptoms"
        @toggle="(id) => makeToggle('currentSymptoms', currentSymptoms, 'none')(id)"
      />
    </div>
    <div class="space-y-2">
      <p class="text-base font-medium leading-snug text-foreground">
        What is your primary motivation for starting this health journey?
      </p>
      <UiTextarea
        :model-value="motivation"
        placeholder="Tell us what's driving you..."
        class="min-h-[100px] resize-none bg-background/50"
        @update:model-value="emit('answer', 'motivationText', $event)"
      />
    </div>
  </AssessmentStep>
</template>
