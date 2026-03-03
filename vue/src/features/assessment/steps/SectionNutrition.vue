<script setup lang="ts">
import { computed } from 'vue'
import AssessmentStep from '../AssessmentStep.vue'
import CheckboxGrid from '../CheckboxGrid.vue'
import SingleSelect from '../SingleSelect.vue'
import YesNoToggle from '../YesNoToggle.vue'
import UiInput from '@/components/ui/input.vue'
import UiTextarea from '@/components/ui/textarea.vue'

const DIET_TYPES = [
  { id: 'no_special', label: 'No special diet' },
  { id: 'mediterranean', label: 'Mediterranean' },
  { id: 'keto', label: 'Low-carb / Keto' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'paleo', label: 'Paleo' },
  { id: 'gluten_free', label: 'Gluten-free' },
  { id: 'dairy_free', label: 'Dairy-free' },
  { id: 'other', label: 'Other' },
]
const FRUIT_VEG_FREQ = [
  { value: 'rarely', label: 'Rarely (0–1 servings/day)' },
  { value: 'sometimes', label: 'Sometimes (2–3 servings/day)' },
  { value: 'often', label: 'Often (4–5 servings/day)' },
  { value: 'daily', label: 'Daily (5+ servings/day)' },
]
const BEVERAGE_OPTIONS = [
  { id: 'water', label: 'Water' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'tea', label: 'Tea' },
  { id: 'juice', label: 'Juice' },
  { id: 'soda', label: 'Soda / soft drinks' },
  { id: 'energy_drinks', label: 'Energy drinks' },
  { id: 'smoothies', label: 'Smoothies' },
  { id: 'other', label: 'Other' },
]

const props = defineProps<{ answers: Record<string, unknown>; direction?: 'forward' | 'back' }>()
const emit = defineEmits<{ answer: [key: string, value: unknown]; next: []; back: [] }>()

const dietTypes = computed(() => (props.answers.nutritionDietTypes as string[]) ?? [])
const hasOtherDiet = computed(() => (props.answers.hasOtherDietPref as 'yes' | 'no' | '') ?? '')
const otherDietText = computed(() => (props.answers.otherDietText as string) ?? '')
const fruitVegFreq = computed(() => (props.answers.fruitVegFrequency as string) ?? '')
const beverages = computed(() => (props.answers.beverageTypes as string[]) ?? [])
const nutritionNotes = computed(() => (props.answers.nutritionNotes as string) ?? '')

function toggleDiet(id: string) {
  const next = dietTypes.value.includes(id) ? dietTypes.value.filter((d) => d !== id) : [...dietTypes.value, id]
  emit('answer', 'nutritionDietTypes', next)
}
function toggleBeverage(id: string) {
  const next = beverages.value.includes(id) ? beverages.value.filter((b) => b !== id) : [...beverages.value, id]
  emit('answer', 'beverageTypes', next)
}

const sectionDescription = `Your eating habits play a major role in your energy levels, weight, digestion, and overall health. Understanding your typical diet, any restrictions, and how often you consume nutrient-rich foods helps us provide more accurate insights.

Please share a bit about how you usually eat.`
</script>

<template>
  <AssessmentStep
    section-label="Nutrition"
    section-title="Nutrition & Diet"
    :section-description="sectionDescription"
    question-title="How would you describe your typical diet?"
    step-key="section-nutrition"
    :direction="direction"
    @next="emit('next')"
    @back="emit('back')"
  >
    <div class="space-y-3">
      <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
      <CheckboxGrid :options="DIET_TYPES" :selected="dietTypes" @toggle="toggleDiet" />
    </div>
    <div class="space-y-3">
      <p class="text-base font-medium leading-snug text-foreground">
        Do you have any other dietary preferences or restrictions?
      </p>
      <YesNoToggle
        :model-value="hasOtherDiet"
        @update:model-value="(v) => emit('answer', 'hasOtherDietPref', v)"
      />
      <div v-if="hasOtherDiet === 'yes'" class="animate-fade-in">
        <UiInput
          :model-value="otherDietText"
          placeholder="Please describe..."
          class="bg-background/50"
          @update:model-value="emit('answer', 'otherDietText', $event)"
        />
      </div>
    </div>
    <div class="space-y-2">
      <p class="text-base font-medium leading-snug text-foreground">
        How often do you eat fruits and vegetables?
      </p>
      <SingleSelect
        :model-value="fruitVegFreq"
        :options="FRUIT_VEG_FREQ"
        @update:model-value="emit('answer', 'fruitVegFrequency', $event)"
      />
    </div>
    <div class="space-y-3">
      <p class="text-base font-medium leading-snug text-foreground">
        What non-alcoholic beverages do you regularly drink?
      </p>
      <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Check all that apply</p>
      <CheckboxGrid :options="BEVERAGE_OPTIONS" :selected="beverages" @toggle="toggleBeverage" />
    </div>
    <div class="space-y-2">
      <p class="text-base font-medium leading-snug text-foreground">
        Anything else you'd like us to know about your nutrition?
        <span class="text-foreground/60 font-normal">(optional)</span>
      </p>
      <UiTextarea
        :model-value="nutritionNotes"
        placeholder="Anything else about your eating habits..."
        class="min-h-[80px] resize-none bg-background/50"
        @update:model-value="emit('answer', 'nutritionNotes', $event)"
      />
    </div>
  </AssessmentStep>
</template>
