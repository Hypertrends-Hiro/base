<script setup lang="ts">
import { computed } from 'vue'
import AssessmentStep from '../AssessmentStep.vue'
import YesNoToggle from '../YesNoToggle.vue'
import SingleSelect from '../SingleSelect.vue'
import UiInput from '@/components/ui/input.vue'
import UiTextarea from '@/components/ui/textarea.vue'

const SMOKING_FREQUENCY = [
  { value: 'daily', label: 'Daily' },
  { value: 'several_week', label: 'Several times a week' },
  { value: 'occasionally', label: 'Occasionally (a few times a month)' },
  { value: 'rarely', label: 'Rarely (social / special occasions)' },
]
const ALCOHOL_FREQUENCY = [
  { value: 'daily', label: 'Daily' },
  { value: 'several_week', label: 'Several times a week' },
  { value: 'weekly', label: 'About once a week' },
  { value: 'occasionally', label: 'Occasionally (a few times a month)' },
  { value: 'rarely', label: 'Rarely (social / special occasions)' },
]

const props = defineProps<{ answers: Record<string, unknown>; direction?: 'forward' | 'back' }>()
const emit = defineEmits<{ answer: [key: string, value: unknown]; next: []; back: [] }>()

const smokes = computed(() => (props.answers.smokesNicotine as 'yes' | 'no' | '') ?? '')
const smokeType = computed(() => (props.answers.smokeType as string) ?? '')
const smokeFreq = computed(() => (props.answers.smokeFrequency as string) ?? '')
const drinks = computed(() => (props.answers.drinksAlcohol as 'yes' | 'no' | '') ?? '')
const drinkType = computed(() => (props.answers.drinkType as string) ?? '')
const drinkFreq = computed(() => (props.answers.drinkFrequency as string) ?? '')
const substanceNotes = computed(() => (props.answers.substanceNotes as string) ?? '')

const sectionDescription = `Lifestyle habits such as smoking and alcohol use can have a meaningful impact on your overall health, energy levels, and long-term wellness. Understanding your current habits helps us interpret your results more accurately and provide the best recommendations.

Please answer honestly — this information is confidential.`
</script>

<template>
  <AssessmentStep
    section-label="Substance Use"
    section-title="Substance use"
    :section-description="sectionDescription"
    question-title="Do you currently smoke or use nicotine products?"
    step-key="section-substance"
    :direction="direction"
    @next="emit('next')"
    @back="emit('back')"
  >
    <YesNoToggle
      :model-value="smokes"
      @update:model-value="(v) => emit('answer', 'smokesNicotine', v)"
    />
    <div v-if="smokes === 'yes'" class="animate-fade-in space-y-4">
      <div class="space-y-2">
        <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">What do you use?</p>
        <UiInput
          :model-value="smokeType"
          placeholder="e.g. Cigarettes, Vape, Chewing tobacco"
          class="bg-background/50"
          @update:model-value="emit('answer', 'smokeType', $event)"
        />
      </div>
      <div class="space-y-2">
        <p class="text-base font-medium leading-snug text-foreground">How often?</p>
        <SingleSelect
          :model-value="smokeFreq"
          :options="SMOKING_FREQUENCY"
          @update:model-value="emit('answer', 'smokeFrequency', $event)"
        />
      </div>
    </div>
    <div class="space-y-3">
      <p class="text-base font-medium leading-snug text-foreground">Do you drink alcohol?</p>
      <YesNoToggle
        :model-value="drinks"
        @update:model-value="(v) => emit('answer', 'drinksAlcohol', v)"
      />
      <div v-if="drinks === 'yes'" class="animate-fade-in space-y-4">
        <div class="space-y-2">
          <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground">What do you typically drink?</p>
          <UiInput
            :model-value="drinkType"
            placeholder="e.g. Wine, Beer, Cocktails"
            class="bg-background/50"
            @update:model-value="emit('answer', 'drinkType', $event)"
          />
        </div>
        <div class="space-y-2">
          <p class="text-base font-medium leading-snug text-foreground">How often?</p>
          <SingleSelect
            :model-value="drinkFreq"
            :options="ALCOHOL_FREQUENCY"
            @update:model-value="emit('answer', 'drinkFrequency', $event)"
          />
        </div>
      </div>
    </div>
    <div class="space-y-2">
      <p class="text-base font-medium leading-snug text-foreground">
        Anything else about substance use?
        <span class="text-foreground/60 font-normal">(optional)</span>
      </p>
      <UiTextarea
        :model-value="substanceNotes"
        placeholder="Any other details..."
        class="min-h-[80px] resize-none bg-background/50"
        @update:model-value="emit('answer', 'substanceNotes', $event)"
      />
    </div>
  </AssessmentStep>
</template>
