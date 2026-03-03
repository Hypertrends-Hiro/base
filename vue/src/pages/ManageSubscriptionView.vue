<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UiInput from '@/components/ui/input.vue'
import UiCheckbox from '@/components/ui/checkbox.vue'
import UiButton from '@/components/ui/button.vue'
import UiDialog from '@/components/ui/dialog.vue'
import productSemaglutide from '@/assets/product-semaglutide.png'
import productBalance from '@/assets/product-balance.png'

const route = useRoute()
const router = useRouter()

const subscriptionData: Record<string, { name: string; plan: string; pricePerMonth: number; months: number; image: string; billsOn: string; shipsOn: string }> = {
  metformin: { name: 'Metformin', plan: '1-month Subscription', pricePerMonth: 200, months: 1, image: productBalance, billsOn: '2/3', shipsOn: '2/6' },
  semaglutide: { name: 'Semaglutide', plan: '6-month Subscription', pricePerMonth: 200, months: 6, image: productSemaglutide, billsOn: '2/3', shipsOn: '2/6' },
}

const treatmentName = computed(() => (route.params.treatmentName as string) ?? '')
const sub = computed(() => subscriptionData[treatmentName.value?.toLowerCase() ?? ''])

const billingOpen = ref(false)
const editingShipping = ref(false)
const editingPayment = ref(false)
const shippingForm = ref({ street: '', city: '', state: '', zip: '', phone: '' })
const cancelState = ref<'none' | 'confirm' | 'cancelled'>('none')
const shipmentModalOpen = ref(false)
const selectedDateStr = ref('')
const paymentForm = ref({ cardNumber: '', expiry: '', cvv: '', nameOnCard: '', sameAsShipping: false })

const orderTotal = computed(() => (sub.value ? sub.value.pricePerMonth * sub.value.months : 0))
const headerTitle = computed(() => (sub.value ? `Manage ${sub.value.name} subscription` : ''))

function addDays(d: Date, n: number) {
  const out = new Date(d)
  out.setDate(out.getDate() + n)
  return out
}
function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div v-if="!sub" class="p-4 lg:p-12">
    <p class="text-muted-foreground">Subscription not found.</p>
  </div>
  <template v-else>
    <div class="p-4 lg:p-12">
      <header class="flex items-center justify-between mb-8">
        <h1 class="font-heading text-2xl font-light lg:text-4xl">{{ headerTitle }}</h1>
        <button type="button" class="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors flex items-center gap-1" @click="router.push('/treatments')">
          CLOSE<span class="text-lg">→</span>
        </button>
      </header>
      <div class="rounded-2xl" style="background: #F5F1F0">
        <div class="p-5 lg:p-6">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div class="space-y-1">
              <p class="text-sm font-light"><span class="font-medium">Billing</span></p>
              <p class="text-sm font-light"><span class="font-medium">Bills on:</span> {{ sub.billsOn }}</p>
              <p class="text-sm font-light"><span class="font-medium">Ships on:</span> {{ sub.shipsOn }}</p>
              <p class="text-sm font-light"><span class="font-medium">Next billing date</span></p>
              <p class="text-sm font-light"><span class="font-medium">Shipment</span></p>
              <p class="text-sm font-light"><span class="font-medium">Order Total:</span> ${{ orderTotal.toFixed(2) }}</p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
              <UiButton class="rounded-md bg-primary px-6 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 whitespace-nowrap" @click="shipmentModalOpen = true">
                Add to calendar
              </UiButton>
              <UiButton class="rounded-md bg-primary px-6 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 whitespace-nowrap" @click="billingOpen = !billingOpen">
                {{ billingOpen ? 'Close billing & shipping' : 'Open billing & shipping' }}
              </UiButton>
            </div>
          </div>
        </div>
        <template v-if="billingOpen">
          <div class="mx-5 lg:mx-6 border-t border-border/40" />
          <div class="p-5 lg:p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p class="text-sm font-medium mb-3">Shipping</p>
                <template v-if="editingShipping">
                  <div class="space-y-4">
                    <div><label class="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">Street Address*</label><UiInput v-model="shippingForm.street" placeholder="Street address" class="bg-background border-border/60" /></div>
                    <div><label class="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">City*</label><UiInput v-model="shippingForm.city" placeholder="City" class="bg-background border-border/60" /></div>
                    <div><label class="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">State*</label><UiInput v-model="shippingForm.state" placeholder="State" class="bg-background border-border/60" /></div>
                    <div><label class="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">Zip Code*</label><UiInput v-model="shippingForm.zip" placeholder="Zip code" class="bg-background border-border/60" /></div>
                    <div><label class="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">Phone Number*</label><UiInput v-model="shippingForm.phone" placeholder="Phone number" class="bg-background border-border/60" /></div>
                    <div class="flex items-center gap-4 pt-2">
                      <button type="button" class="text-sm font-medium underline hover:text-primary transition-colors" @click="editingShipping = false">Cancel</button>
                      <UiButton class="rounded-md bg-primary px-8 py-2.5 text-sm font-light text-foreground hover:bg-primary/90" @click="editingShipping = false">Save</UiButton>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <p class="text-sm font-light">12345 Test Address</p>
                  <p class="text-sm font-light">Test City, Test State</p>
                  <p class="text-sm font-light">55555</p>
                  <button type="button" class="text-sm font-medium underline mt-3 hover:text-primary transition-colors" @click="editingShipping = true">Edit</button>
                </template>
              </div>
              <div>
                <p class="text-sm font-medium mb-3">Payment</p>
                <template v-if="editingPayment">
                  <div class="space-y-4">
                    <div class="flex items-start gap-2">
                      <UiCheckbox id="payment-agreement" class="mt-1" />
                      <label for="payment-agreement" class="text-xs font-light leading-relaxed">I agree to the terms and authorize the charge.</label>
                    </div>
                    <div><label class="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">Card number</label><UiInput v-model="paymentForm.cardNumber" placeholder="Card number" class="bg-background border-border/60" /></div>
                    <div><label class="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">Expiry</label><UiInput v-model="paymentForm.expiry" placeholder="Expiry" class="bg-background border-border/60" /></div>
                    <div><label class="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">CVV</label><UiInput v-model="paymentForm.cvv" placeholder="CVV" class="bg-background border-border/60" /></div>
                    <div><label class="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">Name on card</label><UiInput v-model="paymentForm.nameOnCard" placeholder="Name on card" class="bg-background border-border/60" /></div>
                    <div class="flex items-center gap-2">
                      <UiCheckbox id="same-as-shipping" :checked="paymentForm.sameAsShipping" @update:checked="(v: boolean) => (paymentForm.sameAsShipping = v)" />
                      <label for="same-as-shipping" class="text-sm font-light">Billing same as shipping</label>
                    </div>
                    <div class="flex items-center gap-4 pt-2">
                      <button type="button" class="text-sm font-medium underline hover:text-primary transition-colors" @click="editingPayment = false">Cancel</button>
                      <UiButton class="rounded-md bg-primary px-8 py-2.5 text-sm font-light text-foreground hover:bg-primary/90" @click="editingPayment = false">Save</UiButton>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <p class="text-sm font-light">VISA **** 5555</p>
                  <p class="text-sm font-light">Firstname Lastname</p>
                  <p class="text-sm font-light">12/26</p>
                  <button type="button" class="text-sm font-medium underline mt-3 hover:text-primary transition-colors" @click="editingPayment = true">Edit</button>
                </template>
              </div>
              <div>
                <div class="flex items-center justify-between mb-3">
                  <p class="text-sm font-medium">Summary</p>
                  <p class="text-sm font-light text-muted-foreground">1 item</p>
                </div>
                <div class="space-y-1.5">
                  <div class="flex justify-between text-sm font-light"><span>Subtotal</span><span>${{ orderTotal.toFixed(2) }}</span></div>
                  <div class="flex justify-between text-sm font-light"><span>Shipping</span><span>$0.00</span></div>
                  <div class="flex justify-between text-sm font-light"><span>Discount</span><span>-</span></div>
                  <div class="flex justify-between text-sm font-light"><span>Tax</span><span>-</span></div>
                  <div class="flex justify-between text-sm font-medium pt-1"><span>Total</span><span>${{ orderTotal.toFixed(2) }}</span></div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="mx-5 lg:mx-6 border-t border-border/40" />
        <div class="p-5 lg:p-6">
          <div class="flex items-start gap-4">
            <div class="h-24 w-24 flex-none rounded-md overflow-hidden" style="background: #EDE8E2">
              <img :src="sub.image" :alt="sub.name" class="h-full w-full object-contain p-3" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-heading text-base font-medium">{{ sub.name }}</p>
                <button v-if="cancelState === 'none'" type="button" class="text-muted-foreground hover:text-foreground transition-colors" @click="cancelState = 'confirm'">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </button>
                <button v-else type="button" class="text-sm font-medium underline hover:text-primary transition-colors" @click="cancelState = 'none'">Close</button>
              </div>
              <template v-if="cancelState === 'none'">
                <p class="text-sm font-light text-muted-foreground mt-0.5">{{ sub.plan }} – ${{ sub.pricePerMonth }}/mo</p>
                <p class="text-sm font-light text-muted-foreground mt-2">${{ orderTotal }} for a {{ sub.months }}-month supply</p>
                <p class="text-sm mt-1"><span class="font-medium">Quantity:</span> <span class="font-light">1</span></p>
                <button type="button" class="text-sm font-medium underline mt-3 hover:text-primary transition-colors" @click="cancelState = 'confirm'">Cancel subscription</button>
              </template>
              <template v-else-if="cancelState === 'confirm'">
                <div class="mt-2 max-w-md">
                  <p class="text-sm font-medium">Are you sure?</p>
                  <p class="text-sm font-light mt-2">Your subscription will remain active until the end of the current period.</p>
                  <UiButton class="mt-5 w-full max-w-xs rounded-md bg-primary py-3 text-sm font-light text-foreground hover:bg-primary/90" @click="cancelState = 'none'">Confirm</UiButton>
                  <button type="button" class="mt-3 text-sm font-medium underline hover:text-primary transition-colors block" @click="cancelState = 'cancelled'">Yes, cancel</button>
                </div>
              </template>
              <template v-else>
                <p class="text-sm font-medium mt-2">Your subscription has been cancelled.</p>
              </template>
            </div>
            <p class="text-sm font-light text-muted-foreground flex-none">1 item</p>
          </div>
        </div>
      </div>
    </div>
    <UiDialog :open="shipmentModalOpen" hide-close @update:open="(v: boolean) => (shipmentModalOpen = v)">
      <template #title>Set your next shipment date</template>
      <div class="mt-2">
        <input v-model="selectedDateStr" type="date" class="rounded-xl border border-border w-full px-3 py-2 text-sm" :min="new Date().toISOString().slice(0,10)" />
      </div>
      <div class="mt-4">
        <p class="text-xs font-medium uppercase tracking-wider text-foreground/70 mb-3">Quick skip</p>
        <div class="flex gap-2">
          <button v-for="d in [30, 60, 90]" :key="d" type="button" class="flex-1 rounded-md border border-border/60 bg-background py-2.5 text-sm font-light text-foreground hover:bg-primary/20 transition-colors" @click="selectedDateStr = addDays(new Date(), d).toISOString().slice(0,10)">
            {{ d }} days
          </button>
        </div>
      </div>
      <p v-if="selectedDateStr" class="text-sm font-light mt-3 text-center text-muted-foreground">
        New shipment date: <span class="font-medium text-foreground">{{ formatDate(new Date(selectedDateStr)) }}</span>
      </p>
      <UiButton class="mt-4 w-full rounded-md bg-primary py-3 text-sm font-light text-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed" :disabled="!selectedDateStr" @click="shipmentModalOpen = false">Confirm date</UiButton>
    </UiDialog>
  </template>
</template>
