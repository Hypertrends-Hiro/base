<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthHeader from '@/components/auth/AuthHeader.vue'
import UiButton from '@/components/ui/button.vue'
import UiInput from '@/components/ui/input.vue'
import UiLabel from '@/components/ui/label.vue'
import UiCheckbox from '@/components/ui/checkbox.vue'
import UiDialog from '@/components/ui/dialog.vue'
import UiSelect from '@/components/ui/select.vue'
import { useToast } from '@/components/ui/use-toast'

const route = useRoute()
const tab = computed(() => (route.query.tab === 'register' ? 'register' : 'login'))
const { toast } = useToast()

const loginEmail = ref('')
const loginPassword = ref('')
const showLoginPassword = ref(false)
const loginErrors = ref<Record<string, string>>({})

const resetOpen = ref(false)
const resetEmail = ref('')
const resetError = ref('')
const resetSent = ref(false)

const firstName = ref('')
const lastName = ref('')
const registerEmail = ref('')
const phone = ref('')
const registerPassword = ref('')
const confirmPassword = ref('')
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)
const biologicalSex = ref('')
const dateOfBirth = ref('')
const agreeTerms = ref(false)
const agreeMarketing = ref(false)
const registerErrors = ref<Record<string, string>>({})

function handleLogin(e: Event) {
  e.preventDefault()
  loginErrors.value = {}
  const email = loginEmail.value.trim()
  const password = loginPassword.value
  const err: Record<string, string> = {}
  if (!email) err.email = 'Invalid email address'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err.email = 'Invalid email address'
  if (password.length < 6) err.password = 'Password must be at least 6 characters'
  if (Object.keys(err).length) {
    loginErrors.value = err
    return
  }
  toast({
    title: 'Login',
    description: 'Login functionality requires Lovable Cloud to be enabled.',
  })
}

function handleResetPassword(e: Event) {
  e.preventDefault()
  resetError.value = ''
  const email = resetEmail.value.trim()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    resetError.value = 'Please enter a valid email address'
    return
  }
  resetSent.value = true
}

function openResetModal() {
  resetEmail.value = ''
  resetError.value = ''
  resetSent.value = false
  resetOpen.value = true
}

function handleRegister(e: Event) {
  e.preventDefault()
  registerErrors.value = {}
  const err: Record<string, string> = {}
  if (!firstName.value.trim()) err.firstName = 'First name is required'
  if (!lastName.value.trim()) err.lastName = 'Last name is required'
  if (!registerEmail.value.trim()) err.email = 'Invalid email address'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail.value)) err.email = 'Invalid email address'
  if (registerPassword.value.length < 8) err.password = 'Password must be at least 8 characters'
  if (registerPassword.value !== confirmPassword.value) err.confirmPassword = "Passwords don't match"
  if (!agreeTerms.value) err.agreeTerms = 'You must agree to the terms'
  if (Object.keys(err).length) {
    registerErrors.value = err
    return
  }
  toast({
    title: 'Create Account',
    description: 'Registration functionality requires Lovable Cloud to be enabled.',
  })
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <AuthHeader :active-tab="tab" />
    <main class="mx-auto max-w-lg px-6 py-16">
      <div v-if="tab === 'login'" class="text-center">
        <h1 class="font-heading text-4xl font-semibold text-foreground">Member Login</h1>
        <p class="mt-3 text-sm text-muted-foreground">
          Questions? Visit <router-link to="/faq" class="text-primary hover:underline">FAQ</router-link>
        </p>
        <form @submit="handleLogin" class="mt-10 space-y-4">
          <div>
            <UiInput
              type="email"
              placeholder="Email"
              v-model="loginEmail"
              class="h-12 rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground"
            />
            <p v-if="loginErrors.email" class="mt-1 text-left text-xs text-destructive">{{ loginErrors.email }}</p>
          </div>
          <div class="relative">
            <UiInput
              :type="showLoginPassword ? 'text' : 'password'"
              placeholder="Password"
              v-model="loginPassword"
              class="h-12 rounded-lg border-border bg-card pr-12 text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="button"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              @click="showLoginPassword = !showLoginPassword"
            >
              <svg v-if="showLoginPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <p v-if="loginErrors.password" class="mt-1 text-left text-xs text-destructive">{{ loginErrors.password }}</p>
          </div>
          <UiButton type="submit" class="mt-6 h-12 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">Login</UiButton>
        </form>
        <div class="mt-6 border-t border-border pt-6">
          <button type="button" class="text-sm text-primary hover:underline" @click="openResetModal">Forgot Password?</button>
        </div>
        <p class="mt-6 text-sm text-muted-foreground">
          Not a member yet? - <router-link to="/login?tab=register" class="text-primary hover:underline">Sign up here</router-link>
        </p>
      </div>
      <div v-else>
        <div class="text-center">
          <h1 class="font-heading text-4xl font-semibold text-foreground">Create Account</h1>
          <p class="mt-3 text-sm text-muted-foreground">Join us to start your health journey today.</p>
        </div>
        <form @submit="handleRegister" class="mt-10 space-y-5">
          <div>
            <UiLabel class="text-xs font-medium text-foreground">Legal Name</UiLabel>
            <div class="mt-2 grid grid-cols-2 gap-3">
              <div>
                <UiInput v-model="firstName" type="text" placeholder="First Name" class="h-12 rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground" />
                <p v-if="registerErrors.firstName" class="mt-1 text-xs text-destructive">{{ registerErrors.firstName }}</p>
              </div>
              <div>
                <UiInput v-model="lastName" type="text" placeholder="Last Name" class="h-12 rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground" />
                <p v-if="registerErrors.lastName" class="mt-1 text-xs text-destructive">{{ registerErrors.lastName }}</p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <UiLabel class="text-xs font-medium text-foreground">Email</UiLabel>
              <UiInput v-model="registerEmail" type="email" placeholder="Email" class="mt-2 h-12 rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground" />
              <p v-if="registerErrors.email" class="mt-1 text-xs text-destructive">{{ registerErrors.email }}</p>
            </div>
            <div>
              <UiLabel class="text-xs font-medium text-foreground">Phone Number</UiLabel>
              <UiInput v-model="phone" type="tel" placeholder="(---) ---/----" class="mt-2 h-12 rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <UiLabel class="text-xs font-medium text-foreground">Password</UiLabel>
              <div class="relative mt-2">
                <UiInput v-model="registerPassword" :type="showRegisterPassword ? 'text' : 'password'" placeholder="Password" class="h-12 rounded-lg border-border bg-card pr-12 text-foreground placeholder:text-muted-foreground" />
                <button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" @click="showRegisterPassword = !showRegisterPassword">
                  <svg v-if="showRegisterPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
              <p v-if="registerErrors.password" class="mt-1 text-xs text-destructive">{{ registerErrors.password }}</p>
            </div>
            <div>
              <UiLabel class="text-xs font-medium text-foreground">Confirm Password</UiLabel>
              <div class="relative mt-2">
                <UiInput v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" placeholder="Password" class="h-12 rounded-lg border-border bg-card pr-12 text-foreground placeholder:text-muted-foreground" />
                <button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" @click="showConfirmPassword = !showConfirmPassword">
                  <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
              <p v-if="registerErrors.confirmPassword" class="mt-1 text-xs text-destructive">{{ registerErrors.confirmPassword }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <UiLabel class="text-xs font-medium text-foreground">Biological Sex</UiLabel>
              <UiSelect v-model="biologicalSex" class="mt-2 h-12 rounded-lg border-border bg-card text-foreground">
                <option value="">Biological sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </UiSelect>
            </div>
            <div>
              <UiLabel class="text-xs font-medium text-foreground">Date of Birth</UiLabel>
              <UiInput v-model="dateOfBirth" type="text" placeholder="MM/DD/YYYY" class="mt-2 h-12 rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground" />
            </div>
          </div>
          <div class="space-y-4 pt-2">
            <div class="flex items-start gap-3">
              <UiCheckbox id="terms" :checked="agreeTerms" @update:checked="agreeTerms = $event" class="mt-0.5" />
              <label for="terms" class="text-sm leading-relaxed text-foreground">
                I agree to the <router-link to="/terms" class="text-primary underline">Terms of Use</router-link> and <router-link to="/privacy" class="text-primary underline">Privacy Policy</router-link>
              </label>
            </div>
            <p v-if="registerErrors.agreeTerms" class="text-xs text-destructive">{{ registerErrors.agreeTerms }}</p>
            <div class="flex items-start gap-3">
              <UiCheckbox id="marketing" :checked="agreeMarketing" @update:checked="agreeMarketing = $event" class="mt-0.5" />
              <label for="marketing" class="text-sm leading-relaxed text-foreground">I want to receive offers, updates, marketing emails & SMS from KWILT Health.</label>
            </div>
          </div>
          <UiButton type="submit" class="mt-4 h-12 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">Create Account</UiButton>
        </form>
        <p class="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <router-link to="/login?tab=login" class="text-foreground underline hover:text-primary">Sign In</router-link>
        </p>
      </div>
    </main>

    <UiDialog v-model:open="resetOpen" hide-close class="sm:max-w-md p-8 bg-card border-border rounded-xl">
      <template v-if="!resetSent">
        <div class="flex justify-end -mt-2 -mr-2">
          <button type="button" class="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors flex items-center gap-0.5" @click="resetOpen = false">
            EXIT<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
        <div class="text-center mb-6">
          <h2 class="font-heading text-2xl font-semibold text-foreground">Reset your password</h2>
          <p class="mt-2 text-sm text-muted-foreground">Enter your email address, and we'll send instructions to reset your password.</p>
        </div>
        <form @submit="handleResetPassword" class="space-y-5">
          <div>
            <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground mb-1.5 block">Email Address</label>
            <UiInput v-model="resetEmail" type="email" placeholder="Email address" class="h-12 rounded-lg border-border bg-background text-foreground placeholder:text-muted-foreground" />
            <p v-if="resetError" class="mt-1 text-xs text-destructive">{{ resetError }}</p>
          </div>
          <UiButton type="submit" class="h-12 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">Continue</UiButton>
        </form>
      </template>
      <template v-else>
        <div class="flex justify-end -mt-2 -mr-2">
          <button type="button" class="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors flex items-center gap-0.5" @click="resetOpen = false">
            EXIT<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
        <div class="text-center py-6">
          <div class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <h2 class="font-heading text-2xl font-semibold text-foreground">Check your email</h2>
          <p class="mt-3 text-sm text-muted-foreground max-w-xs mx-auto">
            We've sent password reset instructions to <span class="font-medium text-foreground">{{ resetEmail }}</span>. Please check your inbox and follow the link to reset your password.
          </p>
          <p class="mt-4 text-xs text-muted-foreground">
            Didn't receive it? <button type="button" class="text-primary hover:underline" @click="resetSent = false">Try again</button>
          </p>
        </div>
      </template>
    </UiDialog>
  </div>
</template>
