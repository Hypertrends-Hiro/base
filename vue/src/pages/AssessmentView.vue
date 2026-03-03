<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import AssessmentLayout from '@/features/assessment/AssessmentLayout.vue'
import SectionBiometrics from '@/features/assessment/steps/SectionBiometrics.vue'
import SectionHealthGoals from '@/features/assessment/steps/SectionHealthGoals.vue'
import SectionPregnancy from '@/features/assessment/steps/SectionPregnancy.vue'
import SectionHormonalHealth from '@/features/assessment/steps/SectionHormonalHealth.vue'
import SectionMedicalHistory from '@/features/assessment/steps/SectionMedicalHistory.vue'
import SectionPreventiveScreening from '@/features/assessment/steps/SectionPreventiveScreening.vue'
import SectionMedications from '@/features/assessment/steps/SectionMedications.vue'
import SectionFamilyHistory from '@/features/assessment/steps/SectionFamilyHistory.vue'
import SectionNutrition from '@/features/assessment/steps/SectionNutrition.vue'
import SectionPhysicalActivity from '@/features/assessment/steps/SectionPhysicalActivity.vue'
import SectionSleep from '@/features/assessment/steps/SectionSleep.vue'
import SectionSubstanceUse from '@/features/assessment/steps/SectionSubstanceUse.vue'
import SectionInformedConsent from '@/features/assessment/steps/SectionInformedConsent.vue'

const TOTAL_STEPS = 13
const router = useRouter()
const currentStep = ref(1)
const direction = ref<'forward' | 'back'>('forward')
const answers = reactive<Record<string, unknown>>({})

function handleAnswer(key: string, value: unknown) {
  answers[key] = value
}

function handleNext() {
  if (currentStep.value === TOTAL_STEPS) {
    router.push('/assessment-complete')
  } else {
    direction.value = 'forward'
    currentStep.value += 1
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function handleBack() {
  if (currentStep.value === 1) {
    router.push('/welcome')
  } else {
    direction.value = 'back'
    currentStep.value -= 1
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

</script>

<template>
  <AssessmentLayout :current-step="currentStep" :total-steps="TOTAL_STEPS">
    <SectionBiometrics
      v-if="currentStep === 1"
      :answers="answers"
      :direction="direction"
      @answer="handleAnswer"
      @next="handleNext"
      @back="handleBack"
    />
    <SectionHealthGoals
      v-else-if="currentStep === 2"
      :answers="answers"
      :direction="direction"
      @answer="handleAnswer"
      @next="handleNext"
      @back="handleBack"
    />
    <SectionPregnancy
      v-else-if="currentStep === 3"
      :answers="answers"
      :direction="direction"
      @answer="handleAnswer"
      @next="handleNext"
      @back="handleBack"
    />
    <SectionHormonalHealth
      v-else-if="currentStep === 4"
      :answers="answers"
      :direction="direction"
      @answer="handleAnswer"
      @next="handleNext"
      @back="handleBack"
    />
    <SectionMedicalHistory
      v-else-if="currentStep === 5"
      :answers="answers"
      :direction="direction"
      @answer="handleAnswer"
      @next="handleNext"
      @back="handleBack"
    />
    <SectionPreventiveScreening
      v-else-if="currentStep === 6"
      :answers="answers"
      :direction="direction"
      @answer="handleAnswer"
      @next="handleNext"
      @back="handleBack"
    />
    <SectionMedications
      v-else-if="currentStep === 7"
      :answers="answers"
      :direction="direction"
      @answer="handleAnswer"
      @next="handleNext"
      @back="handleBack"
    />
    <SectionFamilyHistory
      v-else-if="currentStep === 8"
      :answers="answers"
      :direction="direction"
      @answer="handleAnswer"
      @next="handleNext"
      @back="handleBack"
    />
    <SectionNutrition
      v-else-if="currentStep === 9"
      :answers="answers"
      :direction="direction"
      @answer="handleAnswer"
      @next="handleNext"
      @back="handleBack"
    />
    <SectionPhysicalActivity
      v-else-if="currentStep === 10"
      :answers="answers"
      :direction="direction"
      @answer="handleAnswer"
      @next="handleNext"
      @back="handleBack"
    />
    <SectionSleep
      v-else-if="currentStep === 11"
      :answers="answers"
      :direction="direction"
      @answer="handleAnswer"
      @next="handleNext"
      @back="handleBack"
    />
    <SectionSubstanceUse
      v-else-if="currentStep === 12"
      :answers="answers"
      :direction="direction"
      @answer="handleAnswer"
      @next="handleNext"
      @back="handleBack"
    />
    <SectionInformedConsent
      v-else-if="currentStep === 13"
      :answers="answers"
      :direction="direction"
      @answer="handleAnswer"
      @next="handleNext"
      @back="handleBack"
    />
  </AssessmentLayout>
</template>
