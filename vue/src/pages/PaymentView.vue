<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UiInput from '@/components/ui/input.vue'
import UiButton from '@/components/ui/button.vue'
import SignupLayout from '@/components/signup/SignupLayout.vue'

interface AddressSuggestion {
  display: string
  city: string
  state: string
  zip: string
}
const MOCK_ADDRESSES: AddressSuggestion[] = [
  { display: '123 Main Street, Austin, TX 78701', city: 'Austin', state: 'TX', zip: '78701' },
  { display: '456 Oak Avenue, Los Angeles, CA 90001', city: 'Los Angeles', state: 'CA', zip: '90001' },
  { display: '789 Park Boulevard, New York, NY 10001', city: 'New York', state: 'NY', zip: '10001' },
]
const US_STATES = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

const route = useRoute()
const router = useRouter()
const state = route.query as { firstName?: string; lastName?: string; email?: string }
const inputClass =
  'h-12 rounded-md border border-border bg-card px-4 text-sm text-foreground placeholder:text-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none'

interface PaymentForm {
  firstName: string
  lastName: string
  cardNumber: string
  expDate: string
  securityCode: string
  address: string
  apartment: string
  city: string
  stateCode: string
  zip: string
}
const form = ref<PaymentForm>({
  firstName: (state?.firstName as string) || 'Sandra',
  lastName: (state?.lastName as string) || 'Mitchell',
  cardNumber: '',
  expDate: '',
  securityCode: '',
  address: '',
  apartment: '',
  city: '',
  stateCode: '',
  zip: '',
})
const addressQuery = ref('')
const suggestions = ref<typeof MOCK_ADDRESSES>([])
const showSuggestions = ref(false)

onMounted(() => {
  const handler = (e: MouseEvent) => {
    const el = document.getElementById('address-wrap')
    if (el && !el.contains(e.target as Node)) showSuggestions.value = false
  }
  document.addEventListener('mousedown', handler)
  return () => document.removeEventListener('mousedown', handler)
})

function handleAddressChange(val: string) {
  addressQuery.value = val
  form.value.address = val
  if (val.length >= 2) {
    const filtered = MOCK_ADDRESSES.filter((a) => a.display.toLowerCase().includes(val.toLowerCase()))
    suggestions.value = filtered.length > 0 ? filtered : MOCK_ADDRESSES.slice(0, 4)
    showSuggestions.value = true
  } else {
    showSuggestions.value = false
  }
}

function selectAddress(addr: AddressSuggestion) {
  const firstPart = addr.display.split(',')[0] ?? ''
  addressQuery.value = firstPart
  form.value.address = firstPart
  form.value.city = addr.city
  form.value.stateCode = addr.state
  form.value.zip = addr.zip
  showSuggestions.value = false
}

function formatCard(val: string) {
  const digits = val.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

function formatExp(val: string) {
  const digits = val.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return digits
}

function handleSubmit(e: Event) {
  e.preventDefault()
  router.push({ path: '/welcome', query: { firstName: form.value.firstName } })
}
</script>

<template>
  <SignupLayout>
    <template #left>
      <div class="max-w-xs">
        <h1 class="font-heading text-3xl font-semibold leading-snug text-foreground mb-5">
          Become a KWILT™ member
        </h1>
        <div class="mb-6 rounded-lg bg-background/60 border border-border p-4">
          <p class="text-xs font-semibold uppercase tracking-widest text-foreground mb-1">Annual Membership</p>
          <p class="font-heading text-3xl font-semibold text-foreground">$449</p>
        </div>
        <p class="text-sm leading-relaxed text-foreground">
          Unlock a deeper understanding of your health for $449 a year. Gain
          invaluable insights with our comprehensive Mega Panel, exploring over
          100 key biomarkers. Cancel anytime. Membership auto renews each year.
        </p>
        <div class="mt-8 flex items-center gap-2 text-xs text-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span>Secured with 256-bit SSL encryption</span>
        </div>
      </div>
    </template>
    <template #right>
      <div class="max-w-xl w-full mx-auto">
        <div class="rounded-lg border border-border bg-card p-5 mb-8 flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-foreground mb-0.5">Annual Membership</p>
            <p class="text-sm text-foreground">Cancel anytime. Membership auto renews each year.</p>
          </div>
          <p class="font-heading text-2xl font-semibold text-foreground ml-4 whitespace-nowrap">$449</p>
        </div>
        <h2 class="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          Payment Details
        </h2>
        <form class="space-y-5" @submit="handleSubmit">
          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">First Name</label>
              <UiInput v-model="form.firstName" :class="inputClass" required />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Last Name</label>
              <UiInput v-model="form.lastName" :class="inputClass" required />
            </div>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Card Number</label>
            <div class="relative">
              <UiInput
                :model-value="form.cardNumber"
                :class="inputClass + ' pl-10'"
                placeholder="4433 2211 4433 2211"
                maxlength="19"
                required
                @update:model-value="(v) => (form.cardNumber = formatCard(v ?? ''))"
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Exp Date</label>
              <UiInput
                :model-value="form.expDate"
                :class="inputClass"
                placeholder="12/29"
                maxlength="5"
                required
                @update:model-value="(v) => (form.expDate = formatExp(v ?? ''))"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Security Code</label>
              <UiInput v-model="form.securityCode" :class="inputClass" placeholder="123" maxlength="4" required />
            </div>
          </div>
          <div class="flex flex-col gap-1.5" id="address-wrap">
            <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Address</label>
            <div class="relative">
              <UiInput
                :model-value="addressQuery"
                :class="inputClass + ' pl-10'"
                placeholder="Start typing your address..."
                autocomplete="off"
                required
                @update:model-value="handleAddressChange"
                @focus="addressQuery.length >= 2 && (showSuggestions = true)"
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <div
                v-if="showSuggestions && suggestions.length > 0"
                class="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border border-border bg-card shadow-lg overflow-hidden"
              >
                <button
                  v-for="addr in suggestions"
                  :key="addr.display"
                  type="button"
                  class="flex items-start gap-3 w-full px-4 py-3 text-left text-sm hover:bg-background transition-colors border-b border-border/50 last:border-0"
                  @mousedown.prevent="selectAddress(addr)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span class="text-foreground">{{ addr.display }}</span>
                </button>
                <div class="px-4 py-2 bg-background/50 text-[10px] text-foreground flex items-center gap-1">
                  <span>Powered by</span>
                  <span class="font-semibold">Google Places</span>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div class="flex flex-col gap-1.5 col-span-1">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">City</label>
              <UiInput v-model="form.city" :class="inputClass" placeholder="City" required />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">State</label>
              <select v-model="form.stateCode" :class="inputClass + ' appearance-none cursor-pointer'" required>
                <option value="">Select State</option>
                <option v-for="s in US_STATES" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">ZIP</label>
              <UiInput v-model="form.zip" :class="inputClass" placeholder="ZIP" maxlength="10" required />
            </div>
          </div>
          <UiButton type="submit" class="w-full h-12 rounded-md bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:bg-primary/90 mt-2">
            Complete Purchase
          </UiButton>
          <p class="text-center text-[11px] text-foreground pt-1 flex items-center justify-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Your payment is secured and encrypted
          </p>
        </form>
      </div>
    </template>
  </SignupLayout>
</template>
