<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useScenarioStore } from '@/stores/scenario'
import { useOrderThankYouStore } from '@/stores/orderThankYou'
import kwiltLogoDark from '@/assets/kwilt-logo-dark.png'

const router = useRouter()
const { scenario, setScenario } = useScenarioStore()
const orderThankYou = useOrderThankYouStore()
const state = computed(() => orderThankYou.state)

const hasValidState = computed(() => state.value?.items?.length)

onMounted(() => {
  if (!hasValidState.value) {
    router.replace('/dashboard')
  }
})
</script>

<template>
  <div v-if="hasValidState" class="min-h-screen flex flex-col md:flex-row">
    <div class="md:w-[55%] bg-card flex flex-col justify-between px-8 py-8 md:px-12 md:py-10 md:min-h-screen">
      <div>
        <RouterLink to="/" class="mb-14 inline-block">
          <img :src="kwiltLogoDark" alt="KWILT" class="h-7 w-auto" />
        </RouterLink>
        <p class="text-sm text-muted-foreground mb-2">Order #{{ state?.orderNumber }}</p>
        <h1 class="font-heading text-3xl md:text-5xl font-light text-foreground mb-4">
          Thank you {{ state?.firstName }}!
        </h1>
        <p class="text-muted-foreground text-sm max-w-md">
          A confirmation email has been sent to your email with order and shipping details.
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center mt-12 mb-4 h-12 w-full max-w-xs rounded-md border border-primary text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
        @click="
          scenario === 'default-with-wizard' && setScenario('new-rx-ordered');
          router.push('/dashboard');
        "
      >
        Back to dashboard
      </button>
    </div>
    <div class="md:w-[45%] bg-background px-8 py-8 md:px-12 md:py-10">
      <div class="sticky top-10">
        <h2 class="font-heading text-2xl font-medium text-foreground mb-6">Summary</h2>
        <hr class="border-border mb-6" />
        <div class="space-y-4 mb-6">
          <div
            v-for="item in state?.items"
            :key="`${item.name}-${item.plan}`"
            class="flex gap-3 rounded-lg bg-card border border-border p-3"
          >
            <div class="h-16 w-16 flex-none rounded-md overflow-hidden bg-card">
              <img :src="item.image" :alt="item.name" class="h-full w-full object-contain p-1" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm">{{ item.name }}</p>
              <p class="text-xs text-muted-foreground">
                {{ item.plan === 'MONTHLY' ? `Monthly Subscription – $${item.pricePerMonth}/mo` : `${item.months}-month Subscription – $${item.pricePerMonth}/mo` }}
              </p>
              <p class="text-xs text-muted-foreground mt-0.5">
                ${{ item.pricePerMonth * item.months }} for a {{ item.months === 1 ? '1-month' : `${item.months}-month` }} supply
              </p>
              <p class="font-medium text-sm mt-1">${{ item.pricePerMonth * item.months * item.quantity }}</p>
            </div>
          </div>
        </div>
        <hr class="border-border mb-4" />
        <div class="flex items-center gap-2 border border-border rounded-md px-3 py-2 mb-6">
          <span class="flex-1 text-sm text-muted-foreground">Discount or Gift Card Code</span>
          <span class="text-sm font-medium text-primary">Apply</span>
        </div>
        <hr class="border-border mb-4" />
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="font-medium">Subtotal:</span>
            <span>${{ state?.subtotal?.toLocaleString() }}.00</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium">Shipping</span>
            <span>$0.00</span>
          </div>
          <div class="flex justify-between pt-2 text-base">
            <span class="font-medium">Total:</span>
            <span class="font-heading text-xl font-semibold">${{ state?.subtotal?.toLocaleString() }}.00</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
