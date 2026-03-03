<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CartItem } from './checkout-fixture'

const props = defineProps<{
  items: CartItem[]
  onRemove?: (name: string, plan: string) => void
}>()

const discountCode = ref('')
const subtotal = computed(() =>
  props.items.reduce((sum, i) => sum + i.pricePerMonth * i.months * i.quantity, 0)
)
</script>

<template>
  <div class="sticky top-10">
    <h2 class="font-heading text-2xl font-medium text-foreground mb-6">Summary</h2>
    <div class="space-y-4 mb-6">
      <div
        v-for="item in items"
        :key="`${item.name}-${item.plan}`"
        class="flex gap-3 rounded-lg bg-card border border-border p-3"
      >
        <div class="h-16 w-16 flex-none rounded-md overflow-hidden bg-card">
          <img :src="item.image" :alt="item.name" class="h-full w-full object-contain p-1" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between">
            <div>
              <p class="font-medium text-sm">{{ item.name }}</p>
              <p class="text-xs text-muted-foreground">
                {{ item.plan === 'MONTHLY' ? `Member Monthly Subscription – $${item.pricePerMonth}/mo` : `Member ${item.months}-month Subscription – $${item.pricePerMonth}/mo` }}
              </p>
            </div>
            <button
              v-if="onRemove"
              type="button"
              class="text-muted-foreground hover:text-foreground ml-2"
              @click="onRemove(item.name, item.plan)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <p class="text-xs text-muted-foreground mt-0.5">
            ${{ item.pricePerMonth * item.months }} for a {{ item.months === 1 ? '1-month' : `${item.months}-month` }} supply
          </p>
          <p class="font-medium text-sm mt-1">${{ item.pricePerMonth * item.months * item.quantity }}</p>
        </div>
      </div>
    </div>
    <hr class="border-border mb-4" />
    <div class="flex items-center gap-2 border border-border rounded-md px-3 py-2 mb-6">
      <input
        v-model="discountCode"
        type="text"
        placeholder="Discount or Gift Card Code"
        class="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      <button type="button" class="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Apply</button>
    </div>
    <hr class="border-border mb-4" />
    <div class="space-y-2 text-sm">
      <div class="flex justify-between">
        <span>Subtotal:</span>
        <span class="font-medium">${{ subtotal.toLocaleString() }}.00</span>
      </div>
      <div class="flex justify-between text-muted-foreground">
        <span>Shipping</span>
        <span>$0.00</span>
      </div>
      <div class="flex justify-between pt-2 text-base">
        <span>Total:</span>
        <span class="font-heading text-xl font-semibold">${{ subtotal.toLocaleString() }}.00</span>
      </div>
    </div>
  </div>
</template>
