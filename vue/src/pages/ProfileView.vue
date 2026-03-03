<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import UiCollapsible from '@/components/ui/collapsible.vue'
import UiDialog from '@/components/ui/dialog.vue'
import UiInput from '@/components/ui/input.vue'
import { cn } from '@/lib/utils'

const rightColRef = ref<HTMLElement | null>(null)
const intakeSectionRef = ref<HTMLElement | null>(null)
const navOffset = ref(0)

function updateNavOffset() {
  if (!rightColRef.value || !intakeSectionRef.value) return
  const rightTop = rightColRef.value.getBoundingClientRect().top
  const intakeTop = intakeSectionRef.value.getBoundingClientRect().top
  navOffset.value = Math.max(0, intakeTop - rightTop)
}

let resizeObserver: ResizeObserver | null = null
onMounted(() => {
  nextTick(() => {
    updateNavOffset()
    if (rightColRef.value) {
      resizeObserver = new ResizeObserver(updateNavOffset)
      resizeObserver.observe(rightColRef.value)
    }
  })
  window.addEventListener('resize', updateNavOffset)
})
onUnmounted(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', updateNavOffset)
})

const intakeCategories = [
  'Demographics',
  'Health Goals and Motivation',
  'Medical History and Current Health',
  'Medications and Supplements',
  'Lifestyle and Habits',
  'Substance Use',
  'Subjective Symptoms and Wellness',
  'Biometrics and Measurements',
  'Wearables and Tracking',
]

const accountFields = [
  { label: 'LEGAL NAME', value: 'Elisa George' },
  { label: 'BIOLOGICAL SEX', value: 'Female' },
  { label: 'EMAIL', value: 'elisa.george@email.com' },
  { label: 'DATE OF BIRTH', value: '05/05/1985' },
  { label: 'ADDRESS', value: '123 Wellness Ave, Austin TX 78701' },
  { label: 'PHONE NUMBER', value: '(512) 555-0198' },
]

const intakeData: Record<string, { label: string; value: string }[]> = {
  Demographics: [
    { label: 'AGE', value: '39' },
    { label: 'HEIGHT', value: "5'6\"" },
    { label: 'WEIGHT', value: '145 lbs' },
    { label: 'ETHNICITY', value: 'Caucasian' },
    { label: 'BIOLOGICAL SEX', value: 'Female' },
    { label: 'STATE', value: 'Texas' },
  ],
  'Health Goals and Motivation': [
    { label: 'PRIMARY GOAL', value: 'Weight management' },
    { label: 'SECONDARY GOAL', value: 'Better energy levels' },
    { label: 'MOTIVATION', value: 'Feel healthier and more confident' },
    { label: 'TIMELINE', value: '6 months' },
  ],
  'Medical History and Current Health': [
    { label: 'CONDITIONS', value: 'None reported' },
    { label: 'FAMILY HISTORY', value: 'Hypertension (maternal)' },
    { label: 'ALLERGIES', value: 'Penicillin' },
    { label: 'SURGERIES', value: 'None' },
  ],
  'Medications and Supplements': [
    { label: 'CURRENT MEDICATIONS', value: 'None' },
    { label: 'SUPPLEMENTS', value: 'Vitamin D, Omega-3' },
    { label: 'FREQUENCY', value: 'Daily' },
  ],
  'Lifestyle and Habits': [
    { label: 'EXERCISE FREQUENCY', value: '3-4 times per week' },
    { label: 'EXERCISE TYPE', value: 'Yoga, Running' },
    { label: 'DIET TYPE', value: 'Mediterranean' },
    { label: 'MEAL FREQUENCY', value: '3 meals, 1 snack' },
  ],
  'Substance Use': [
    { label: 'SMOKING', value: 'Never' },
    { label: 'ALCOHOL', value: 'Social (1-2 drinks/week)' },
    { label: 'CAFFEINE', value: '2 cups coffee daily' },
  ],
  'Subjective Symptoms and Wellness': [
    { label: 'ENERGY LEVEL', value: 'Moderate' },
    { label: 'SLEEP QUALITY', value: 'Good' },
    { label: 'STRESS LEVEL', value: 'Moderate' },
    { label: 'MOOD', value: 'Generally positive' },
  ],
  'Biometrics and Measurements': [
    { label: 'BLOOD PRESSURE', value: '118/76 mmHg' },
    { label: 'RESTING HEART RATE', value: '72 bpm' },
    { label: 'BODY FAT %', value: '28%' },
    { label: 'WAIST CIRCUMFERENCE', value: '30 in' },
  ],
  'Wearables and Tracking': [
    { label: 'DEVICE', value: 'Apple Watch Series 9' },
    { label: 'CONNECTED', value: 'Yes' },
    { label: 'TRACKING SINCE', value: 'January 2024' },
  ],
}

const activeIntake = ref(intakeCategories[0]!)
const currentIntakeFields = computed(() => intakeData[activeIntake.value] ?? [])

// Change password (button + dialog like React ChangePasswordRow)
const changePasswordOpen = ref(false)
const newPassword = ref('')
const confirmPassword = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const changePasswordSuccess = ref(false)
const passwordsMatch = computed(() => newPassword.value.length > 0 && newPassword.value === confirmPassword.value)
function submitChangePassword() {
  changePasswordSuccess.value = true
  newPassword.value = ''
  confirmPassword.value = ''
}
function closeChangePassword() {
  changePasswordOpen.value = false
  changePasswordSuccess.value = false
  showNewPassword.value = false
  showConfirmPassword.value = false
}

// Notification preferences (collapsible with On/Off rows like React)
const notifOpen = ref(false)
const notifPrefs = ref<Record<string, boolean>>({
  Newsletters: true,
  'Email notifications': true,
  'SMS notifications': true,
})
function setNotifPref(label: string, on: boolean) {
  notifPrefs.value = { ...notifPrefs.value, [label]: on }
}

// Delete account (button + dialog like React DeleteAccountRow)
const deleteAccountOpen = ref(false)
const deleteAcknowledged = ref(false)
const deleteSuccess = ref(false)
function closeDeleteAccount() {
  deleteAccountOpen.value = false
  deleteAcknowledged.value = false
  deleteSuccess.value = false
}
function confirmDelete() {
  deleteSuccess.value = true
}
</script>

<template>
  <div class="w-full max-w-6xl mx-auto px-4 md:px-8 py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Left sidebar: visible from md (768px) up via Tailwind only -->
      <aside
        class="hidden md:block w-[200px] shrink-0 sticky top-8 self-start"
      >
        <h1 class="font-heading text-2xl tracking-tight text-foreground mb-6 text-right">
          KWILT<span class="text-[10px] align-super">™</span> profile
        </h1>
        <nav
          class="flex flex-col gap-0.5"
          :style="{ marginTop: navOffset > 0 ? `${navOffset - 24}px` : 0 }"
        >
          <button
            v-for="cat in intakeCategories"
            :key="cat"
            type="button"
            class="text-[11px] leading-tight font-medium text-right py-1 pr-4 relative transition-colors uppercase tracking-[0.08em] w-full"
            :class="activeIntake === cat ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'"
            @click="activeIntake = cat"
          >
            <span v-if="activeIntake === cat" class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-1.5 h-1.5 rounded-full bg-primary" />
            {{ cat }}
          </button>
        </nav>
      </aside>

      <div ref="rightColRef" class="flex-1 space-y-12 min-w-0">
        <section>
          <div class="flex items-center justify-between">
            <h2 class="font-heading text-xl tracking-tight text-foreground mb-4">Account settings</h2>
            <button type="button" class="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Log out
            </button>
          </div>
          <div class="bg-card rounded-md p-6 shadow-soft relative">
            <button type="button" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label="Edit">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
            </button>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <div v-for="f in accountFields" :key="f.label" class="py-3 border-b border-border">
                <p class="text-[10px] font-medium tracking-[0.15em] text-muted-foreground">{{ f.label }}</p>
                <p class="text-sm mt-1 text-foreground">{{ f.value }}</p>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <!-- Change password: button opens dialog (parity with React ChangePasswordRow) -->
            <button
              type="button"
              class="flex w-full items-center justify-between py-4 border-b border-border text-left"
              @click="changePasswordOpen = true"
            >
              <span class="text-xs font-medium tracking-[0.15em] text-foreground">CHANGE PASSWORD</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 text-muted-foreground"><path d="m9 18 6-6-6-6" /></svg>
            </button>
            <UiDialog :open="changePasswordOpen" @update:open="(v: boolean) => { changePasswordOpen = v; if (!v) closeChangePassword() }" class="sm:max-w-md p-6" :style="{ background: '#F5F1F0' }">
              <div v-if="!changePasswordSuccess">
                <div class="flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5 text-foreground"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  <h2 class="font-heading text-xl font-medium">Change Password</h2>
                </div>
                <p class="text-sm font-light text-muted-foreground mb-6">Enter a new password below to change your password</p>
                <div class="space-y-5">
                  <div>
                    <label class="text-sm font-medium mb-1.5 block">New Password</label>
                    <div class="relative">
                      <UiInput v-model="newPassword" :type="showNewPassword ? 'text' : 'password'" placeholder="Enter your new password" class="bg-background border-border/60 pr-16" />
                      <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                        <span v-if="newPassword.length >= 6" class="text-green-600">✓</span>
                        <button type="button" class="text-muted-foreground hover:text-foreground" @click="showNewPassword = !showNewPassword">{{ showNewPassword ? 'Hide' : 'Show' }}</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="text-sm font-medium mb-1.5 block">Confirm Password</label>
                    <div class="relative">
                      <UiInput v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" placeholder="Confirm Password" class="bg-background border-border/60 pr-16" />
                      <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                        <span v-if="passwordsMatch" class="text-green-600">✓</span>
                        <button type="button" class="text-muted-foreground hover:text-foreground" @click="showConfirmPassword = !showConfirmPassword">{{ showConfirmPassword ? 'Hide' : 'Show' }}</button>
                      </div>
                    </div>
                  </div>
                  <button type="button" :disabled="!passwordsMatch" class="w-full rounded-md bg-foreground py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" @click="submitChangePassword">Change Password</button>
                  <p class="text-xs font-light text-muted-foreground text-center">By continuing, you are to <span class="underline">Kwilt's Terms of Service</span> and <span class="underline">Privacy Policy</span></p>
                </div>
              </div>
              <div v-else>
                <h2 class="font-heading text-xl font-medium mb-2">Reset Password</h2>
                <p class="text-sm font-light text-muted-foreground mb-6">Your password has been successfully changed, please use your new password to log in.</p>
                <button type="button" class="w-full rounded-md bg-foreground py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors" @click="closeChangePassword(); changePasswordOpen = false">Close</button>
              </div>
            </UiDialog>

            <!-- Notification preferences: collapsible with On/Off rows (parity with React CollapsibleRow + NotificationPrefRow) -->
            <UiCollapsible v-model="notifOpen">
              <template #trigger>
                <div class="flex w-full items-center justify-between py-4 border-b border-border text-left cursor-pointer">
                  <span class="text-xs font-medium tracking-[0.15em] text-foreground">NOTIFICATION PREFERENCES</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 text-muted-foreground transition-transform" :class="notifOpen && 'rotate-90'"><path d="m9 18 6-6-6-6" /></svg>
                </div>
              </template>
              <div class="space-y-0">
                <div v-for="pref in ['Newsletters', 'Email notifications', 'SMS notifications']" :key="pref" class="flex items-center justify-between py-4 border-b border-border">
                  <span class="text-sm text-foreground">{{ pref }}</span>
                  <div class="flex items-center gap-4">
                    <button type="button" class="flex items-center gap-1.5" @click="setNotifPref(pref, true)">
                      <span :class="cn('h-3 w-3 rounded-full border-2', notifPrefs[pref] ? 'bg-primary border-primary' : 'border-muted-foreground')" />
                      <span class="text-sm text-foreground">On</span>
                    </button>
                    <button type="button" class="flex items-center gap-1.5" @click="setNotifPref(pref, false)">
                      <span :class="cn('h-3 w-3 rounded-full border-2', !notifPrefs[pref] ? 'bg-primary border-primary' : 'border-muted-foreground')" />
                      <span class="text-sm text-foreground">Off</span>
                    </button>
                  </div>
                </div>
              </div>
            </UiCollapsible>

            <!-- Delete account: button opens dialog (parity with React DeleteAccountRow) -->
            <button
              type="button"
              class="flex w-full items-center justify-between py-4 border-b border-border text-left"
              @click="deleteAccountOpen = true"
            >
              <span class="text-xs font-medium tracking-[0.15em] text-foreground">DELETE ACCOUNT</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 text-muted-foreground"><path d="m9 18 6-6-6-6" /></svg>
            </button>
            <UiDialog :open="deleteAccountOpen" @update:open="(v: boolean) => { deleteAccountOpen = v; if (!v) closeDeleteAccount() }" class="sm:max-w-sm p-6">
              <div v-if="!deleteSuccess" class="text-center">
                <h2 class="font-heading text-xl font-medium mb-2">Delete Account</h2>
                <p class="text-sm font-light text-muted-foreground mb-6">Are you sure you want to delete<br />'egeorge@gmail.com' from kwilt?</p>
                <div class="flex items-start gap-2 text-left mb-6">
                  <input v-model="deleteAcknowledged" type="checkbox" class="mt-0.5 h-4 w-4 rounded border-border accent-primary" />
                  <span class="text-xs font-light text-muted-foreground leading-relaxed">I acknowledge this is an irreversible action and that this account will be permanently deleted upon removal</span>
                </div>
                <button type="button" :disabled="!deleteAcknowledged" class="w-full rounded-md bg-destructive py-3 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" @click="confirmDelete">Delete</button>
              </div>
              <div v-else class="text-center">
                <h2 class="font-heading text-xl font-medium mb-2">Success</h2>
                <p class="text-sm font-light text-muted-foreground mb-6">You have successfully deleted your account.</p>
                <button type="button" class="w-full rounded-md bg-foreground py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors" @click="closeDeleteAccount(); deleteAccountOpen = false">Close</button>
              </div>
            </UiDialog>
          </div>
        </section>

        <section ref="intakeSectionRef">
          <!-- Mobile: intake category selector (match React -mx-4 px-4 scrollbar-none) -->
          <div class="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none mb-4 md:hidden">
            <button
              v-for="cat in intakeCategories"
              :key="cat"
              type="button"
              class="text-xs font-medium px-3 py-1.5 rounded-full border border-border whitespace-nowrap"
              :class="activeIntake === cat ? 'bg-primary text-primary-foreground border-primary' : 'text-muted-foreground'"
              @click="activeIntake = cat"
            >
              {{ cat }}
            </button>
          </div>
          <!-- Intake card: exact React structure (FieldGrid) -->
          <div class="bg-card rounded-md p-6 shadow-soft" style="min-height: 320px">
            <p class="text-xs font-medium tracking-[0.15em] text-muted-foreground mb-3">{{ activeIntake?.toUpperCase() ?? '' }}</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <div v-for="f in currentIntakeFields" :key="f.label" class="py-3 border-b border-border">
                <p class="text-[10px] font-medium tracking-[0.15em] text-muted-foreground">{{ f.label }}</p>
                <p class="text-sm mt-1 text-foreground">{{ f.value }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
