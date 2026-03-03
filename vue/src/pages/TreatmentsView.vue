<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useScenarioStore } from '@/stores/scenario'
import UiAvatar from '@/components/ui/avatar.vue'
import UiDialog from '@/components/ui/dialog.vue'
import BookAppointmentModal from '@/components/treatments/BookAppointmentModal.vue'
import ExploreAllTreatments from '@/components/treatments/ExploreAllTreatments.vue'
import productSemaglutide from '@/assets/product-semaglutide.png'
import productBalance from '@/assets/product-balance.png'
import productGlp1 from '@/assets/product-glp1.png'

interface Treatment {
  name: string
  plan: string
  image: string
  startedOn: string
  visitRequiredBy: string
  viewAction: string
  needsVisit?: boolean
  patient: { name: string; dob: string; gender: string; email: string }
  provider: { name: string; address: string; supervisingPhysician: string; avatar: string }
  assessment: string
  instructions: string
}

const activeTreatments: Treatment[] = [
  {
    name: 'Metformin',
    plan: '1-month subscription',
    image: productBalance,
    startedOn: '5/6/24',
    visitRequiredBy: '5/6/25',
    viewAction: 'View treatment plan',
    patient: { name: 'Mike Tyson', dob: '12/29/1994', gender: 'Male', email: 'mtyson@gmail.com' },
    provider: { name: 'Kate Cordisco, NP', address: '13280 Evening Creek Drive South, Ste 225, San Diego, CA 92128', supervisingPhysician: 'Brian Crenshaw, MD', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
    assessment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    name: 'Semaglutide',
    plan: '6-month Subscription',
    image: productSemaglutide,
    startedOn: '5/6/24',
    visitRequiredBy: '5/6/25',
    viewAction: 'Close treatment plan',
    patient: { name: 'Mike Tyson', dob: '12/29/1994', gender: 'Male', email: 'mtyson@gmail.com' },
    provider: { name: 'Kate Cordisco, NP', address: '13280 Evening Creek Drive South, Ste 225, San Diego, CA 92128', supervisingPhysician: 'Brian Crenshaw, MD', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
    assessment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
]

const newRxTreatment: Treatment = {
  name: 'Tirzepatide',
  plan: '3-month subscription',
  image: productGlp1,
  startedOn: '2/25/26',
  visitRequiredBy: '3/15/26',
  viewAction: 'View treatment plan',
  needsVisit: true,
  patient: { name: 'Mike Tyson', dob: '12/29/1994', gender: 'Male', email: 'mtyson@gmail.com' },
  provider: { name: 'Kate Cordisco, NP', address: '13280 Evening Creek Drive South, Ste 225, San Diego, CA 92128', supervisingPhysician: 'Brian Crenshaw, MD', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
  assessment: 'Pending provider consultation. A virtual visit is required before this prescription can be fulfilled.',
  instructions: 'Please schedule your virtual consultation at your earliest convenience to begin this treatment.',
}

const router = useRouter()
const scenarioStore = useScenarioStore()
const isDemoScenario = computed(() => scenarioStore.scenario !== 'none')
const isNewRx = computed(() => scenarioStore.scenario === 'new-rx-ordered')
const showTreatments = computed(() => !isDemoScenario.value || isNewRx.value)
const allTreatments = computed(() => (isNewRx.value ? [newRxTreatment] : activeTreatments))

const expandedCard = ref<string | null>(null)
const appointmentOpen = ref(false)
const bannerDismissed = ref(false)
const infoModalOpen = ref(false)
const isWizardScenario = computed(() => scenarioStore.scenario === 'default-with-wizard')
const showBanner = computed(() => isWizardScenario.value && !bannerDismissed.value)

function toggleExpand(name: string) {
  expandedCard.value = expandedCard.value === name ? null : name
}
function dismissBanner() {
  bannerDismissed.value = true
}
</script>

<template>
  <div class="p-4 lg:p-12">
    <header class="flex items-center justify-between mb-8">
      <h1 class="font-heading text-2xl font-light lg:text-4xl">
        {{ isDemoScenario && !isNewRx ? 'Treatments' : 'My treatments' }}
      </h1>
      <button
        v-if="showTreatments"
        type="button"
        class="rounded-md bg-primary px-5 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors"
        @click="appointmentOpen = true"
      >
        Schedule virtual visit
      </button>
    </header>

    <div v-if="showBanner" class="mb-6 rounded-xl p-5 lg:p-6" style="background: #FF816B">
      <div class="flex items-center justify-between gap-4">
        <div class="flex-1">
          <p class="font-heading text-lg font-medium mb-1">🎉 You have recommended treatments</p>
          <p class="text-base font-normal">
            Add products you're interested in to your cart before your health consultation — your provider can discuss them with you during your visit.
          </p>
        </div>
        <div class="flex-none flex items-center gap-3">
          <button type="button" class="rounded-md border border-foreground/30 px-4 py-2 text-sm font-light hover:bg-black/5 transition-colors" @click="dismissBanner">Dismiss</button>
          <button type="button" class="rounded-md px-4 py-2 text-sm font-light text-white transition-colors" style="background: #3D2E1E" @click="infoModalOpen = true">Learn more</button>
        </div>
      </div>
    </div>

    <section v-if="showTreatments" class="space-y-4 mb-8">
      <div
        v-for="treatment in allTreatments"
        :key="treatment.name"
        class="rounded-xl"
        style="background: #F5F1F0"
      >
        <div class="p-5 lg:p-6">
          <div class="flex items-start sm:items-center gap-4 sm:gap-6">
            <div class="h-24 w-24 flex-none rounded-md overflow-hidden" style="background: #EDE8E2">
              <img :src="treatment.image" :alt="treatment.name" class="h-full w-full object-contain p-3" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-heading text-lg font-medium">{{ treatment.name }}</p>
                <span v-if="treatment.needsVisit" class="rounded-full bg-[#FF816B] px-2.5 py-0.5 text-[10px] font-medium text-foreground whitespace-nowrap">New prescription</span>
              </div>
              <p class="text-sm font-light text-muted-foreground">{{ treatment.plan }}</p>
              <div class="mt-3 space-y-0.5">
                <p class="text-sm font-light"><span class="font-medium">Started on:</span> {{ treatment.startedOn }}</p>
                <p class="text-sm font-light" :class="treatment.needsVisit ? 'text-[#FF816B] font-medium' : ''"><span class="font-medium">Visit required by:</span> {{ treatment.visitRequiredBy }}</p>
              </div>
            </div>
            <div class="hidden sm:flex flex-wrap gap-3 flex-none">
              <button type="button" class="rounded-md bg-primary px-5 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors whitespace-nowrap" @click="router.push(`/treatments/manage/${treatment.name.toLowerCase()}`)">Manage subscription</button>
              <button type="button" class="rounded-md bg-primary px-5 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors whitespace-nowrap" @click="toggleExpand(treatment.name)">
                {{ expandedCard === treatment.name ? 'Close treatment plan' : 'View treatment plan' }}
              </button>
            </div>
          </div>
          <div class="flex sm:hidden flex-col gap-2 mt-4">
            <button type="button" class="w-full rounded-md bg-primary py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors" @click="router.push(`/treatments/manage/${treatment.name.toLowerCase()}`)">Manage subscription</button>
            <button type="button" class="w-full rounded-md bg-primary py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors" @click="toggleExpand(treatment.name)">
              {{ expandedCard === treatment.name ? 'Close treatment plan' : 'View treatment plan' }}
            </button>
          </div>
        </div>
        <div v-if="expandedCard === treatment.name" class="px-5 pb-6 lg:px-6 space-y-4">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="bg-white rounded-xl p-5 lg:col-span-1">
              <h3 class="font-heading text-lg font-medium mb-4">Patient</h3>
              <div class="space-y-2">
                <div class="flex justify-between text-sm"><span class="font-light">Name</span><span class="font-light text-right">{{ treatment.patient.name }}</span></div>
                <div class="flex justify-between text-sm"><span class="font-light">Date of birth:</span><span class="font-light text-right">{{ treatment.patient.dob }}</span></div>
                <div class="flex justify-between text-sm"><span class="font-light">Gender:</span><span class="font-light text-right">{{ treatment.patient.gender }}</span></div>
                <div class="flex justify-between text-sm"><span class="font-light">Email:</span><span class="font-light text-right">{{ treatment.patient.email }}</span></div>
              </div>
            </div>
            <div class="bg-white rounded-xl p-5 flex flex-col">
              <h4 class="text-xs font-medium tracking-wide uppercase mb-4">Medical Provider</h4>
              <UiAvatar class="h-12 w-12 mb-4">
                <template #image><img :src="treatment.provider.avatar" alt="Provider" class="h-full w-full object-cover" /></template>
                <template #fallback><span class="flex h-full w-full items-center justify-center bg-primary/10 text-primary text-sm font-medium">KC</span></template>
              </UiAvatar>
              <div class="space-y-3 flex-1">
                <div><p class="text-sm font-medium">Provider:</p><p class="text-sm font-light">{{ treatment.provider.name }}</p></div>
                <div><p class="text-sm font-medium">Address:</p><p class="text-sm font-light">{{ treatment.provider.address }}</p></div>
                <div><p class="text-sm font-medium">Supervising Physician:</p><p class="text-sm font-light">{{ treatment.provider.supervisingPhysician }}</p></div>
              </div>
              <div class="mt-6 pt-4 border-t border-border space-y-1">
                <p class="text-sm font-light">For questions or concerns, text or call</p>
                <p class="text-sm"><a href="tel:888-299-5088" class="font-medium underline">888-299-5088</a><span class="font-light"> or email</span></p>
                <p class="text-sm"><a href="mailto:support@kwilthealth.com" class="font-medium underline">support@kwilthealth.com</a></p>
                <p class="text-sm font-light mt-2">In case of an emergency call 911</p>
              </div>
            </div>
            <div class="bg-white rounded-xl p-5">
              <h4 class="text-xs font-medium tracking-wide uppercase mb-4">Assessment</h4>
              <p class="text-sm font-light leading-relaxed">{{ treatment.assessment }}</p>
            </div>
            <div class="bg-white rounded-xl p-5">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-xs font-medium tracking-wide uppercase">Instructions</h4>
              </div>
              <p class="text-sm font-light leading-relaxed">{{ treatment.instructions }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ExploreAllTreatments />

    <BookAppointmentModal v-model:open="appointmentOpen" />

    <UiDialog v-model:open="infoModalOpen" class="sm:max-w-md p-0 overflow-hidden" :style="{ background: '#F5F1F0' }">
      <div class="relative h-24 w-full overflow-hidden" style="background: linear-gradient(135deg, #FF816B 0%, #FFB199 100%)">
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="font-heading text-2xl font-medium text-white tracking-wide">Your path to wellness</span>
        </div>
      </div>
      <div class="px-6 pb-6 pt-4">
        <h3 class="font-heading text-xl font-medium">How treatments work</h3>
        <div class="mt-4 space-y-4">
          <div class="flex items-start gap-3">
            <span class="flex-none flex items-center justify-center h-7 w-7 rounded-full text-xs font-medium text-white" style="background: #FF816B">1</span>
            <p class="text-base font-normal pt-0.5">Browse your recommended treatments below</p>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex-none flex items-center justify-center h-7 w-7 rounded-full text-xs font-medium text-white" style="background: #FF816B">2</span>
            <p class="text-base font-normal pt-0.5">Add a product to your cart — you'll answer a few quick qualification questions first</p>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex-none flex items-center justify-center h-7 w-7 rounded-full text-xs font-medium text-white" style="background: #FF816B">3</span>
            <p class="text-base font-normal pt-0.5">Discuss your selections with your provider during your virtual visit</p>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex-none flex items-center justify-center h-7 w-7 rounded-full text-xs font-medium text-white" style="background: #FF816B">4</span>
            <p class="text-base font-normal pt-0.5">If you don't qualify, you'll be fully refunded</p>
          </div>
        </div>
        <p class="mt-5 text-xs font-light text-muted-foreground text-center">Questions? Your provider is here to help during your visit.</p>
      </div>
    </UiDialog>
  </div>
</template>
