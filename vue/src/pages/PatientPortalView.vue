<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { cn } from '@/lib/utils'
import UiTabs from '@/components/ui/tabs.vue'
import UiButton from '@/components/ui/button.vue'
import BookAppointmentModal from '@/components/treatments/BookAppointmentModal.vue'
import RescheduleModal from '@/components/treatments/RescheduleModal.vue'
import CancelAppointmentModal from '@/components/treatments/CancelAppointmentModal.vue'

type AppointmentStatus = 'confirmed' | 'missed' | 'completed'

interface Appointment {
  id: string
  provider: string
  providerAvatar: string
  status: AppointmentStatus
  type: string
  date: string
  time: string
}

const upcomingAppointments: Appointment[] = [
  { id: 'u1', provider: 'Dr. Sarah Wilson', providerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', status: 'confirmed', type: 'Follow-up Visit', date: 'Tuesday, March 10, 2026', time: '10:30 AM' },
  { id: 'u2', provider: 'Dr. Sarah Wilson', providerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', status: 'confirmed', type: 'Mid-point Lab Review', date: 'Thursday, April 2, 2026', time: '2:00 PM' },
]

const recentAppointments: Appointment[] = [
  { id: 'r1', provider: 'Dr. Sarah Wilson', providerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', status: 'missed', type: 'Lab Review', date: 'Monday, February 16, 2026', time: '9:00 AM' },
  { id: 'r2', provider: 'Dr. Sarah Wilson', providerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', status: 'completed', type: 'Routine Check-up', date: 'Wednesday, January 28, 2026', time: '11:00 AM' },
  { id: 'r3', provider: 'Dr. Sarah Wilson', providerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', status: 'completed', type: 'New Treatment Consultation', date: 'Friday, December 12, 2025', time: '3:30 PM' },
]

interface VisitSummary {
  id: string
  provider: string
  date: string
  type: string
  visitType: string
  complaint: string
  medications: { name: string; instructions: string; quantity: string; refills: string }[]
  labResults: { name: string; value: string; status: string }[]
  careInstructions: string[]
  providerNotes: string
  nextAppointment: string
}

const visitSummaries: VisitSummary[] = [
  { id: 'v1', provider: 'Dr. Sarah Wilson', date: 'Wednesday, January 28, 2026', type: 'Routine Check-up', visitType: 'Routine Check-up', complaint: 'Follow-up for hypertension management', medications: [{ name: 'Lisinopril 10mg', instructions: 'Take once daily in the morning', quantity: '30 tablets', refills: '2 refills remaining' }], labResults: [{ name: 'Total Cholesterol', value: '185 mg/dL', status: 'Normal' }, { name: 'LDL Cholesterol', value: '110 mg/dL', status: 'Borderline High' }], careInstructions: ['Continue current blood pressure medication as prescribed', 'Monitor blood pressure at home daily', 'Follow low-sodium diet (less than 2300mg per day)', 'Exercise 30 minutes daily, 5 days per week', 'Schedule follow-up appointment in 3 months'], providerNotes: 'Patient reports good compliance with medications. Blood pressure well controlled. Continue current regime.', nextAppointment: 'Scheduled for: March 10, 2026' },
  { id: 'v2', provider: 'Dr. Sarah Wilson', date: 'Friday, December 12, 2025', type: 'New Treatment Consultation', visitType: 'New Treatment Consultation', complaint: 'Initial consultation for hormone therapy evaluation', medications: [{ name: 'Progesterone 100mg', instructions: 'Take at bedtime', quantity: '30 capsules', refills: '3 refills remaining' }], labResults: [{ name: 'Estradiol', value: '45 pg/mL', status: 'Low' }, { name: 'TSH', value: '2.1 mIU/L', status: 'Normal' }], careInstructions: ['Begin prescribed hormone therapy as directed', 'Track symptoms daily in journal', 'Return for follow-up labs in 6 weeks'], providerNotes: 'Patient presents with fatigue and mood changes. Labs consistent with perimenopause. Starting low-dose HRT. Will reassess at follow-up.', nextAppointment: 'Scheduled for: January 28, 2026' },
]

const route = useRoute()
const defaultTab = route.query.tab === 'visit-summary' ? 'visit-summary' : 'appointments'
const activeTab = ref(defaultTab)
const bookOpen = ref(false)
const rescheduleOpen = ref(false)
const cancelOpen = ref(false)
const cancelTarget = ref<Appointment | null>(null)
const selectedVisit = ref(visitSummaries[0])

const statusStyles: Record<AppointmentStatus, string> = { confirmed: 'bg-primary text-primary-foreground', missed: 'bg-foreground text-background', completed: 'bg-primary text-primary-foreground' }
const statusLabels: Record<AppointmentStatus, string> = { confirmed: 'Confirmed', missed: 'Missed', completed: 'Completed' }

function handleViewSummary(appointment: Appointment) {
  const match = visitSummaries.find((v) => v.date === appointment.date && v.type === appointment.type)
  if (match) selectedVisit.value = match
  activeTab.value = 'visit-summary'
}
</script>

<template>
  <div class="p-4 lg:p-12 max-w-6xl">
    <header class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-heading text-2xl font-light lg:text-4xl">Patient Portal</h1>
        <p class="text-muted-foreground mt-1 text-sm">Manage your health records and appointments</p>
      </div>
      <UiButton class="rounded-md bg-primary px-5 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 flex items-center gap-1.5 whitespace-nowrap" @click="bookOpen = true">
        + Book New Appointment
      </UiButton>
    </header>
    <UiTabs v-model="activeTab" class="mt-4">
      <template #list="{ modelValue, update }">
        <button type="button" :class="cn('rounded-full px-4 py-2 text-sm font-medium border-0 shadow-none flex items-center gap-1.5', modelValue === 'appointments' ? 'bg-primary text-primary-foreground' : 'bg-transparent text-foreground')" @click="update('appointments')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
          Appointments
        </button>
        <button type="button" :class="cn('rounded-full px-4 py-2 text-sm font-medium border-0 shadow-none flex items-center gap-1.5', modelValue === 'visit-summary' ? 'bg-primary text-primary-foreground' : 'bg-transparent text-foreground')" @click="update('visit-summary')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
          Visit summaries
        </button>
      </template>
      <div v-show="activeTab === 'appointments'" class="space-y-8">
        <section class="rounded-2xl p-6" style="background: #F5F1F0">
          <h2 class="font-heading text-xl font-medium mb-4">Upcoming</h2>
          <div class="space-y-3">
            <div v-for="a in upcomingAppointments" :key="a.id" class="rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 bg-card">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap mb-2">
                  <p class="font-heading text-base font-medium">{{ a.provider }}</p>
                  <span :class="cn('rounded-full px-2.5 py-0.5 text-[11px] font-medium', statusStyles[a.status])">{{ statusLabels[a.status] }}</span>
                  <span class="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-foreground">{{ a.type }}</span>
                </div>
                <div class="flex items-center gap-6 text-sm text-muted-foreground">
                  <span>{{ a.date }}</span>
                  <span>{{ a.time }}</span>
                </div>
              </div>
              <div class="flex gap-2 flex-none">
                <UiButton class="rounded-md bg-primary px-4 py-2 text-sm font-light text-foreground hover:bg-primary/90 flex items-center gap-1.5" @click="rescheduleOpen = true">Reschedule</UiButton>
                <UiButton class="rounded-md bg-primary px-4 py-2 text-sm font-light text-foreground hover:bg-primary/90" @click="cancelTarget = a; cancelOpen = true">✕ Cancel</UiButton>
              </div>
            </div>
          </div>
        </section>
        <section class="rounded-2xl p-6" style="background: #F5F1F0">
          <h2 class="font-heading text-xl font-medium mb-4">Recent</h2>
          <div class="space-y-3">
            <div v-for="a in recentAppointments" :key="a.id" :class="cn('rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4', a.status === 'missed' ? 'bg-background border border-border' : 'bg-card')">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap mb-2">
                  <p class="font-heading text-base font-medium">{{ a.provider }}</p>
                  <span :class="cn('rounded-full px-2.5 py-0.5 text-[11px] font-medium', statusStyles[a.status])">{{ statusLabels[a.status] }}</span>
                  <span class="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-foreground">{{ a.type }}</span>
                </div>
                <div class="flex items-center gap-6 text-sm text-muted-foreground">
                  <span>{{ a.date }}</span>
                  <span>{{ a.time }}</span>
                </div>
              </div>
              <div class="flex gap-2 flex-none">
                <UiButton v-if="a.status === 'missed'" class="rounded-md bg-primary px-4 py-2 text-sm font-light text-foreground hover:bg-primary/90" @click="rescheduleOpen = true">Reschedule</UiButton>
                <UiButton v-else class="rounded-md bg-primary px-4 py-2 text-sm font-light text-foreground hover:bg-primary/90" @click="handleViewSummary(a)">View summary</UiButton>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div v-show="activeTab === 'visit-summary'" class="space-y-6">
        <div>
          <h2 class="font-heading text-lg font-medium mb-1">Visit summaries</h2>
          <p class="text-sm text-muted-foreground">Review detailed summaries from your recent medical visits.</p>
        </div>
        <h3 class="font-heading text-base font-medium">Recent Visits</h3>
        <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <div class="space-y-3">
            <button v-for="v in visitSummaries" :key="v.id" type="button" :class="cn('w-full text-left rounded-xl p-4 transition-colors', selectedVisit?.id === v.id ? 'bg-card shadow-soft ring-1 ring-primary/20' : 'bg-card/50 hover:bg-card')" @click="selectedVisit = v">
              <span class="inline-flex rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-medium text-primary-foreground mb-1">{{ v.type }}</span>
              <span class="text-xs text-muted-foreground ml-2">{{ v.date }}</span>
              <p class="text-sm font-medium mt-1">{{ v.provider }}</p>
              <p class="text-xs text-muted-foreground">{{ v.complaint }}</p>
            </button>
          </div>
          <div v-if="selectedVisit" class="rounded-2xl p-6 space-y-6" style="background: #F5F1F0">
            <div>
              <h3 class="font-heading text-lg font-medium mb-1">Visit summaries</h3>
              <p class="text-sm text-muted-foreground">{{ selectedVisit.date }} – {{ selectedVisit.provider }}</p>
            </div>
            <div>
              <p class="text-sm font-medium mb-1">Complaint</p>
              <p class="text-sm text-muted-foreground">{{ selectedVisit.complaint }}</p>
            </div>
            <div v-for="(med, i) in selectedVisit.medications" :key="i" class="rounded-xl border border-border p-5">
              <h4 class="text-sm font-medium mb-2">Medications</h4>
              <p class="text-sm font-medium">{{ med.name }}</p>
              <p class="text-xs text-muted-foreground">{{ med.instructions }}</p>
              <p class="text-sm font-medium mt-1">Quantity: {{ med.quantity }}</p>
              <span class="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-foreground">{{ med.refills }}</span>
            </div>
            <div>
              <h4 class="font-heading text-base font-medium mb-3">Lab results</h4>
              <div class="space-y-3">
                <div v-for="(lab, i) in selectedVisit.labResults" :key="i" class="rounded-xl border border-border p-4 flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium">{{ lab.name }}</p>
                    <p class="text-xs text-muted-foreground">{{ lab.value }}</p>
                  </div>
                  <span class="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-foreground">{{ lab.status }}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 class="font-heading text-base font-medium mb-3">Care instructions</h4>
              <ul class="space-y-2">
                <li v-for="(item, i) in selectedVisit.careInstructions" :key="i" class="flex items-start gap-2 text-sm text-muted-foreground">
                  <span class="mt-1 h-2 w-2 rounded-full bg-primary flex-none" />
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="rounded-xl border border-border p-4">
              <h4 class="text-sm font-medium mb-2">Provider notes</h4>
              <p class="flex items-start gap-2 text-sm text-muted-foreground">
                <span class="mt-1 h-2 w-2 rounded-full bg-primary flex-none" />
                {{ selectedVisit.providerNotes }}
              </p>
            </div>
            <div class="rounded-xl border border-border p-4">
              <h4 class="text-sm font-medium mb-2">Next appointment</h4>
              <p class="flex items-start gap-2 text-sm text-muted-foreground">
                <span class="mt-1 h-2 w-2 rounded-full bg-primary flex-none" />
                {{ selectedVisit.nextAppointment }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UiTabs>
    <BookAppointmentModal :open="bookOpen" @update:open="(v: boolean) => (bookOpen = v)" />
    <RescheduleModal :open="rescheduleOpen" @update:open="(v: boolean) => (rescheduleOpen = v)" />
    <CancelAppointmentModal :open="cancelOpen" @update:open="(v: boolean) => (cancelOpen = v)" :appointment-type="cancelTarget?.type" :appointment-date="cancelTarget?.date" />
  </div>
</template>
