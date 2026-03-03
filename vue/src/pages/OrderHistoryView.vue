<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
import productSemaglutide from '@/assets/product-semaglutide.png'
import productBalance from '@/assets/product-balance.png'

type FilterTab = 'all' | 'shipped' | 'delivered' | 'cancelled'

const mockOrders = [
  { id: '123455789', date: 'Dec 20, 2025', total: '$1,250.00', status: 'delivered' as const, shippingAddress: { street: '12345 Test Address', cityState: 'Test City, Test State', zip: '55555' }, payment: { type: 'VISA', last4: '5555', name: 'Elisa George', expiry: '12/26' }, summary: { subtotal: '$1,250.00', shipping: '$0.00', discount: '–', tax: '–', total: '$1,250.00' }, items: [{ name: 'Semaglutide', plan: '6-month Subscription – $200/mo', price: '$1200 for a 6-month supply', qty: 1, image: productSemaglutide }, { name: 'Semaglutide', plan: '1-month Subscription – $50/mo', price: '$50 for a 1-month supply', qty: 1, image: productSemaglutide }] },
  { id: '123455790', date: 'Nov 15, 2025', total: '$49.00', status: 'shipped' as const, shippingAddress: { street: '123 Wellness Ave, Apt 4B', cityState: 'Austin, TX', zip: '78701' }, payment: { type: 'VISA', last4: '6590', name: 'Elisa George', expiry: '09/27' }, summary: { subtotal: '$49.00', shipping: '$0.00', discount: '–', tax: '–', total: '$49.00' }, items: [{ name: 'Balance Supplement Pack', plan: 'One-time purchase', price: '$49.00', qty: 1, image: productBalance }] },
  { id: '123455791', date: 'Oct 10, 2025', total: '$99.00', status: 'cancelled' as const, shippingAddress: { street: '123 Wellness Ave, Apt 4B', cityState: 'Austin, TX', zip: '78701' }, payment: { type: 'MASTERCARD', last4: '3321', name: 'Elisa George', expiry: '03/26' }, summary: { subtotal: '$99.00', shipping: '$0.00', discount: '–', tax: '–', total: '$99.00' }, items: [{ name: 'Semaglutide', plan: '1-month Subscription – $99/mo', price: '$99 for a 1-month supply', qty: 1, image: productSemaglutide }] },
]

const filters: { label: string; value: FilterTab }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'SHIPPED', value: 'shipped' },
  { label: 'DELIVERED', value: 'delivered' },
  { label: 'CANCELLED', value: 'cancelled' },
]

const router = useRouter()
const activeFilter = ref<FilterTab>('all')
const expandedOrders = ref<Set<string>>(new Set())

const filtered = computed(() => (activeFilter.value === 'all' ? mockOrders : mockOrders.filter((o) => o.status === activeFilter.value)))

function toggleExpand(id: string) {
  const next = new Set(expandedOrders.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expandedOrders.value = next
}
</script>

<template>
  <div class="max-w-4xl mx-auto pt-8 pb-16">
    <div class="flex items-center justify-between mb-8">
      <h1 class="font-heading text-3xl md:text-4xl tracking-tight text-foreground">Order history</h1>
      <button type="button" class="text-xs font-medium tracking-[0.15em] text-foreground hover:text-foreground/70 flex items-center gap-1" @click="router.push('/profile')">
        CLOSE→
      </button>
    </div>
    <div class="flex gap-6 mb-8 border-b border-border pb-3">
      <button
        v-for="f in filters"
        :key="f.value"
        type="button"
        :class="cn('text-xs font-medium tracking-[0.15em] pb-1 transition-colors', activeFilter === f.value ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground')"
        @click="activeFilter = f.value"
      >
        {{ f.label }}
      </button>
    </div>
    <div class="space-y-6">
      <p v-if="filtered.length === 0" class="text-sm text-muted-foreground py-8 text-center">No orders found.</p>
      <div v-for="order in filtered" :key="order.id" class="bg-card rounded-md shadow-soft overflow-hidden">
        <div class="flex items-start justify-between p-6">
          <div class="space-y-0.5">
            <p class="text-sm font-medium text-foreground">Placed: {{ order.date }}</p>
            <p class="text-sm text-foreground">Order #{{ order.id }}</p>
            <p class="text-sm text-foreground">Order Total: {{ order.total }}</p>
          </div>
          <button type="button" class="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap" @click="toggleExpand(order.id)">
            {{ expandedOrders.has(order.id) ? 'Hide order details' : 'Show order details' }}
          </button>
        </div>
        <template v-if="expandedOrders.has(order.id)">
          <div class="px-6 pb-2">
            <div class="border-t border-border pt-5 pb-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p class="text-sm font-semibold text-foreground mb-2">Sent to</p>
                <p class="text-sm text-foreground">{{ order.shippingAddress.street }}</p>
                <p class="text-sm text-foreground">{{ order.shippingAddress.cityState }}</p>
                <p class="text-sm text-foreground">{{ order.shippingAddress.zip }}</p>
              </div>
              <div>
                <p class="text-sm font-semibold text-foreground mb-2">Paid with</p>
                <p class="text-sm text-foreground">{{ order.payment.type }} **** {{ order.payment.last4 }}</p>
                <p class="text-sm text-foreground">{{ order.payment.name }}</p>
                <p class="text-sm text-foreground">{{ order.payment.expiry }}</p>
              </div>
              <div>
                <div class="flex items-center justify-between mb-2">
                  <p class="text-sm font-semibold text-foreground">Summary</p>
                  <p class="text-sm text-muted-foreground">{{ order.items.length }} items</p>
                </div>
                <div class="space-y-1">
                  <div class="flex justify-between text-sm text-foreground"><span>Subtotal</span><span>{{ order.summary.subtotal }}</span></div>
                  <div class="flex justify-between text-sm text-foreground"><span>Shipping</span><span>{{ order.summary.shipping }}</span></div>
                  <div class="flex justify-between text-sm text-foreground"><span>Discount</span><span>{{ order.summary.discount }}</span></div>
                  <div class="flex justify-between text-sm text-foreground"><span>Tax</span><span>{{ order.summary.tax }}</span></div>
                  <div class="flex justify-between text-sm font-semibold text-foreground pt-1 border-t border-border"><span>Total</span><span>{{ order.summary.total }}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-t border-border">
            <div class="flex justify-end px-6 pt-3">
              <span class="text-sm text-muted-foreground">{{ order.items.length }} items</span>
            </div>
            <div v-for="(item, idx) in order.items" :key="idx" class="flex items-start gap-4 px-6 py-4">
              <div class="w-16 h-20 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-contain" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-foreground">{{ item.name }}</p>
                <p class="text-xs text-muted-foreground mt-0.5">{{ item.plan }}</p>
                <p class="text-xs text-muted-foreground mt-2">{{ item.price }}</p>
                <p class="text-xs font-medium text-foreground mt-0.5">Quantity: {{ item.qty }}</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
