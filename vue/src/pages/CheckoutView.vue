<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useOrderThankYouStore } from '@/stores/orderThankYou'
import UiInput from '@/components/ui/input.vue'
import UiButton from '@/components/ui/button.vue'
import UiCheckbox from '@/components/ui/checkbox.vue'
import OrderSummary from '@/features/checkout/OrderSummary.vue'
import {
  MOCK_USER,
  MOCK_ADDRESSES,
  MOCK_PAYMENTS,
  type CartItem,
} from '@/features/checkout/checkout-fixture'
import kwiltLogoDark from '@/assets/kwilt-logo-dark.png'
import productSemaglutide from '@/assets/product-semaglutide.png'
import productBalance from '@/assets/product-balance.png'

const inputClass =
  'h-12 rounded-md border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none'

const router = useRouter()
const orderThankYou = useOrderThankYouStore()
const step = ref<1 | 2 | 3>(2)
const items = ref<CartItem[]>([
  { name: 'Semaglutide', category: 'Weight Management', image: productSemaglutide, plan: 'MONTHLY', pricePerMonth: 200, months: 1, quantity: 1 },
  { name: 'Balance Supplement Pack', category: 'Supplements', image: productBalance, plan: '6-month', pricePerMonth: 50, months: 6, quantity: 1 },
])
const selectedAddressId = ref(MOCK_ADDRESSES[0]!.id)
const useNewAddress = ref(false)
const shippingForm = ref({ street: '', city: '', state: '', zip: '', phone: '' })
const selectedPaymentId = ref(MOCK_PAYMENTS[0]!.id)
const useNewPayment = ref(false)
const billingSameAsShipping = ref(true)
const agreedToTerms = ref(false)
const paymentForm = ref({ cardNumber: '', expiry: '', cvv: '', nameOnCard: '', street: '', city: '', state: '', zip: '', phone: '' })

const selectedAddress = computed(() => MOCK_ADDRESSES.find((a) => a.id === selectedAddressId.value))

function removeFromCart(name: string, plan: string) {
  items.value = items.value.filter((i) => !(i.name === name && i.plan === plan))
}

function handleShippingContinue() {
  step.value = 3
}

function handleSubmitOrder(e: Event) {
  e.preventDefault()
  const subtotal = items.value.reduce((sum, i) => sum + i.pricePerMonth * i.months * i.quantity, 0)
  const orderNumber = Math.floor(100000000 + Math.random() * 900000000).toString()
  orderThankYou.setState({
    items: [...items.value],
    subtotal,
    orderNumber,
    firstName: MOCK_USER.firstName,
  })
  router.push('/thank-you')
}
</script>

<template>
  <div v-if="items.length === 0" class="min-h-screen bg-background flex items-center justify-center flex-col gap-4">
    <p class="text-muted-foreground">Your cart is empty.</p>
    <UiButton variant="outline" @click="router.push('/treatments')">Browse Treatments</UiButton>
  </div>
  <div v-else class="min-h-screen flex flex-col md:flex-row">
    <div class="md:w-[55%] bg-card flex flex-col px-8 py-8 md:px-12 md:py-10 md:min-h-screen md:overflow-y-auto">
      <RouterLink to="/" class="mb-10">
        <img :src="kwiltLogoDark" alt="KWILT" class="h-7 w-auto" />
      </RouterLink>

      <div class="mb-8">
        <p class="text-xs text-muted-foreground mb-1">1 of 3</p>
        <h2 class="font-heading text-2xl font-medium text-muted-foreground">Info</h2>
        <div class="mt-4 space-y-1.5">
          <div class="flex gap-6">
            <span class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground w-28 shrink-0">First Name</span>
            <span class="text-sm text-foreground">{{ MOCK_USER.firstName }}</span>
          </div>
          <div class="flex gap-6">
            <span class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground w-28 shrink-0">Last Name</span>
            <span class="text-sm text-foreground">{{ MOCK_USER.lastName }}</span>
          </div>
          <div class="flex gap-6">
            <span class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground w-28 shrink-0">Email</span>
            <span class="text-sm text-foreground">{{ MOCK_USER.email }}</span>
          </div>
          <div class="flex gap-6">
            <span class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground w-28 shrink-0">Date of Birth</span>
            <span class="text-sm text-foreground">{{ MOCK_USER.dob }}</span>
          </div>
          <div class="flex gap-6">
            <span class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground w-28 shrink-0">Gender</span>
            <span class="text-sm text-foreground">{{ MOCK_USER.gender }}</span>
          </div>
        </div>
      </div>
      <hr class="border-border mb-8" />

      <div class="mb-8">
        <p class="text-xs text-muted-foreground mb-1">2 of 3</p>
        <div class="flex items-center justify-between">
          <h2 class="font-heading text-2xl font-medium" :class="step !== 2 ? 'text-muted-foreground' : 'text-foreground'">Shipping</h2>
          <button v-if="step > 2" type="button" class="text-sm text-primary hover:text-primary/80" @click="step = 2">Edit</button>
        </div>
        <template v-if="step === 2">
          <div class="mt-5 space-y-4">
            <div v-if="MOCK_ADDRESSES.length > 0 && !useNewAddress" class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Saved Addresses</label>
              <select
                v-model="selectedAddressId"
                :class="inputClass + ' appearance-none cursor-pointer w-full'"
              >
                <option v-for="a in MOCK_ADDRESSES" :key="a.id" :value="a.id">{{ a.label }} – {{ a.street }}, {{ a.city }}</option>
              </select>
            </div>
            <button v-if="!useNewAddress" type="button" class="text-sm text-primary hover:text-primary/80" @click="useNewAddress = true">
              Use new address
            </button>
            <UiButton v-if="!useNewAddress" type="button" class="w-full h-12 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 mt-2" @click="handleShippingContinue">Continue</UiButton>
            <template v-if="useNewAddress">
              <button type="button" class="text-sm text-primary hover:text-primary/80 mb-2" @click="useNewAddress = false">Use saved address</button>
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Street Address*</label>
                <UiInput v-model="shippingForm.street" :class="inputClass" placeholder="Street address" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">City*</label>
                <UiInput v-model="shippingForm.city" :class="inputClass" placeholder="City" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">State*</label>
                <UiInput v-model="shippingForm.state" :class="inputClass" placeholder="State" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Zip Code*</label>
                <UiInput v-model="shippingForm.zip" :class="inputClass" placeholder="Zip code" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Phone Number*</label>
                <UiInput v-model="shippingForm.phone" :class="inputClass" placeholder="Phone number" />
              </div>
              <UiButton type="button" class="w-full h-12 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 mt-2" @click="handleShippingContinue">Continue</UiButton>
            </template>
          </div>
        </template>
        <div v-else-if="step > 2 && selectedAddress" class="mt-4 space-y-1.5">
          <div class="flex gap-6">
            <span class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground w-28 shrink-0">Street Address</span>
            <span class="text-sm text-foreground">{{ selectedAddress?.street }}</span>
          </div>
          <div class="flex gap-6">
            <span class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground w-28 shrink-0">City</span>
            <span class="text-sm text-foreground">{{ selectedAddress?.city }}</span>
          </div>
          <div class="flex gap-6">
            <span class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground w-28 shrink-0">State</span>
            <span class="text-sm text-foreground">{{ selectedAddress?.state }}</span>
          </div>
          <div class="flex gap-6">
            <span class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground w-28 shrink-0">Zip Code</span>
            <span class="text-sm text-foreground">{{ selectedAddress?.zip }}</span>
          </div>
          <div class="flex gap-6">
            <span class="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground w-28 shrink-0">Phone Number</span>
            <span class="text-sm text-foreground">{{ selectedAddress?.phone }}</span>
          </div>
        </div>
      </div>
      <hr class="border-border mb-8" />

      <div class="mb-8">
        <p class="text-xs text-muted-foreground mb-1">3 of 3</p>
        <h2 class="font-heading text-2xl font-medium" :class="step !== 3 ? 'text-muted-foreground' : 'text-foreground'">Payment</h2>
        <form v-if="step === 3" class="mt-5 space-y-4" @submit="handleSubmitOrder">
          <div class="flex items-start gap-3">
            <UiCheckbox id="terms" :checked="agreedToTerms" class="mt-0.5" @update:checked="(v: boolean) => (agreedToTerms = v)" />
            <label for="terms" class="text-xs leading-relaxed text-foreground">
              I agree to the terms and authorize the charge.
            </label>
          </div>
          <div v-if="MOCK_PAYMENTS.length > 0 && !useNewPayment" class="flex flex-col gap-1.5">
            <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Saved Payment Methods</label>
            <select v-model="selectedPaymentId" :class="inputClass + ' appearance-none cursor-pointer w-full'">
              <option v-for="p in MOCK_PAYMENTS" :key="p.id" :value="p.id">{{ p.label }} (exp {{ p.expiry }})</option>
            </select>
          </div>
          <button v-if="!useNewPayment" type="button" class="text-sm text-primary hover:text-primary/80" @click="useNewPayment = true">Add new card</button>
          <template v-if="useNewPayment">
            <button type="button" class="text-sm text-primary hover:text-primary/80 mb-2" @click="useNewPayment = false">Use saved payment</button>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Card Number*</label>
              <UiInput v-model="paymentForm.cardNumber" :class="inputClass" placeholder="Card number" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Expiry Date*</label>
              <UiInput v-model="paymentForm.expiry" :class="inputClass" placeholder="Expiry date" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">CVV*</label>
              <UiInput v-model="paymentForm.cvv" :class="inputClass" placeholder="CVV" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-semibold uppercase tracking-widest text-foreground">Name on Card*</label>
              <UiInput v-model="paymentForm.nameOnCard" :class="inputClass" placeholder="Name on card" />
            </div>
            <div class="flex items-center gap-2">
              <UiCheckbox id="billing-same" :checked="billingSameAsShipping" @update:checked="(v: boolean) => (billingSameAsShipping = v)" />
              <label for="billing-same" class="text-sm text-foreground">Billing same as shipping</label>
            </div>
          </template>
          <UiButton type="submit" :disabled="!agreedToTerms" class="w-full h-12 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 mt-2 disabled:opacity-50">Place order</UiButton>
        </form>
      </div>
      <hr class="border-border mb-6" />
      <div class="flex flex-wrap gap-4 text-sm text-primary">
        <span class="underline cursor-pointer">Refund policy</span>
        <span class="underline cursor-pointer">Privacy policy</span>
        <span class="underline cursor-pointer">Terms of service</span>
        <span class="underline cursor-pointer">Cancellations</span>
      </div>
    </div>
    <div class="flex-1 bg-background px-8 py-8 md:px-12 md:py-10">
      <OrderSummary :items="items" :on-remove="removeFromCart" />
    </div>
  </div>
</template>
