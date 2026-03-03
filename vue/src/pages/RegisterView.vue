<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import UiButton from '@/components/ui/button.vue'
import UiInput from '@/components/ui/input.vue'
import UiCheckbox from '@/components/ui/checkbox.vue'
import UiLabel from '@/components/ui/label.vue'
import SignupLayout from '@/components/signup/SignupLayout.vue'
import DobPicker from '@/components/signup/DobPicker.vue'

const router = useRouter()
const showPassword = ref(false)
const showConfirm = ref(false)
const marketing = ref(false)
const terms = ref(false)
const dob = ref<Date | undefined>(undefined)
const errors = reactive<{ sex?: string; age?: string }>({})
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  biologicalSex: '',
})

function getAge(date: Date) {
  const today = new Date()
  let age = today.getFullYear() - date.getFullYear()
  const m = today.getMonth() - date.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) age--
  return age
}

function handleContinue(e: Event) {
  e.preventDefault()
  const newErrors: { sex?: string; age?: string } = {}
  if (form.biologicalSex !== 'female') {
    newErrors.sex = 'At this time, KWILT membership is available for females only.'
  }
  if (!dob.value || getAge(dob.value) < 18) {
    newErrors.age = 'You must be 18 or older to create an account.'
  }
  if (Object.keys(newErrors).length > 0) {
    errors.sex = newErrors.sex
    errors.age = newErrors.age
    return
  }
  errors.sex = undefined
  errors.age = undefined
  router.push({
    path: '/payment',
    query: { firstName: form.firstName, lastName: form.lastName, email: form.email },
  })
}

const inputClass =
  'h-12 rounded-md border border-border bg-card px-4 text-sm text-foreground placeholder:text-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none'
</script>

<template>
  <SignupLayout>
    <template #left>
      <div class="max-w-xs">
        <h1 class="font-heading text-3xl font-semibold leading-snug text-foreground mb-5">
          Become a KWILT™ member
        </h1>
        <p class="text-sm leading-relaxed text-foreground">
          It's time to truly own your health narrative. Track and understand
          vital aspects like your heart, hormones, potential cancer indicators,
          thyroid health, and more. Create an account to stay empowered and
          proactive.
        </p>
      </div>
    </template>
    <template #right>
      <div class="max-w-xl w-full mx-auto">
        <h2 class="font-heading text-2xl font-semibold text-foreground mb-1">Your Information</h2>
        <p class="text-xs text-foreground mb-8">All fields are required unless marked optional.</p>

        <form @submit="handleContinue" class="space-y-5">
          <div>
            <p class="text-[10px] font-semibold uppercase tracking-widest text-foreground mb-1.5">Legal Name</p>
            <p class="text-[11px] text-foreground mb-3 italic">*Your name must match the ID you present at each lab visit.</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <UiInput
                :class="inputClass"
                placeholder="First Name"
                :model-value="form.firstName"
                @update:model-value="form.firstName = $event"
                required
              />
              <UiInput
                :class="inputClass"
                placeholder="Last Name"
                :model-value="form.lastName"
                @update:model-value="form.lastName = $event"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Email</label>
              <UiInput
                :class="inputClass"
                type="email"
                placeholder="Email"
                :model-value="form.email"
                @update:model-value="form.email = $event"
                required
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Phone</label>
              <UiInput
                :class="inputClass"
                type="tel"
                placeholder="888-299-5088"
                :model-value="form.phone"
                @update:model-value="form.phone = $event"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Select Biological Sex</label>
              <select
                :class="inputClass + ' appearance-none cursor-pointer'"
                :value="form.biologicalSex"
                @change="(e: Event) => { form.biologicalSex = (e.target as HTMLSelectElement).value; errors.sex = undefined }"
              >
                <option value="">Select an option</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="intersex">Intersex</option>
              </select>
              <p v-if="errors.sex" class="text-xs text-destructive mt-1">{{ errors.sex }}</p>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Date of Birth</label>
              <DobPicker v-model="dob" :input-class="inputClass" />
              <p v-if="errors.age" class="text-xs text-destructive mt-1">{{ errors.age }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Password</label>
              <div class="relative">
                <UiInput
                  :class="inputClass + ' pr-10'"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Password"
                  :model-value="form.password"
                  @update:model-value="form.password = $event"
                  required
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
                  @click="showPassword = !showPassword"
                >
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Confirm Password</label>
              <div class="relative">
                <UiInput
                  :class="inputClass + ' pr-10'"
                  :type="showConfirm ? 'text' : 'password'"
                  placeholder="Confirm Password"
                  :model-value="form.confirmPassword"
                  @update:model-value="form.confirmPassword = $event"
                  required
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
                  @click="showConfirm = !showConfirm"
                >
                  <svg v-if="showConfirm" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
            </div>
          </div>

          <div class="space-y-3 pt-2">
            <div class="flex items-start gap-3">
              <UiCheckbox id="marketing" :checked="marketing" @update:checked="marketing = $event" class="mt-0.5" />
              <UiLabel for="marketing" class="text-xs leading-relaxed text-foreground cursor-pointer">
                I want to receive offers, updates, marketing emails &amp; SMS from KWILT Health
              </UiLabel>
            </div>
            <div class="flex items-start gap-3">
              <UiCheckbox id="terms" :checked="terms" @update:checked="terms = $event" class="mt-0.5" />
              <UiLabel for="terms" class="text-xs leading-relaxed text-foreground cursor-pointer">
                I agree to KWILT's <span class="underline cursor-pointer text-foreground">Terms of Service</span> and <span class="underline cursor-pointer text-foreground">Privacy Policy</span>
              </UiLabel>
            </div>
          </div>

          <UiButton
            type="submit"
            class="w-full h-12 rounded-md bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:bg-primary/90 mt-4"
          >
            Continue to Payment
          </UiButton>

          <p class="text-center text-xs text-foreground pt-1">
            Already have an account? <router-link to="/login" class="text-foreground underline">Log in</router-link>
          </p>
        </form>
      </div>
    </template>
  </SignupLayout>
</template>
