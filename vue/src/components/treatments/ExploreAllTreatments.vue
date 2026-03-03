<script setup lang="ts">
import { ref, computed } from 'vue'
import { useScenarioStore } from '@/stores/scenario'
import { useCartStore } from '@/stores/cart'
import productSemaglutide from '@/assets/product-semaglutide.png'
import productBalance from '@/assets/product-balance.png'
import productGlp1 from '@/assets/product-glp1.png'
import productNad from '@/assets/product-nad.png'
import productHrt from '@/assets/product-hrt.png'

interface Product {
  name: string
  category: string
  image: string
  price: number
  status: string
}

const products: Product[] = [
  { name: 'Tirzepatide', category: 'Weight Management', image: productGlp1, price: 199, status: 'available' },
  { name: 'Semaglutide', category: 'Weight Management', image: productSemaglutide, price: 149, status: 'active' },
  { name: 'NAD+ Therapy', category: 'Longevity', image: productNad, price: 199, status: 'available' },
  { name: 'HRT (Hormone Therapy)', category: 'Hormone & Menopause Health', image: productHrt, price: 179, status: 'available' },
  { name: 'Metformin', category: 'Longevity', image: productBalance, price: 49, status: 'active' },
]

const filterChips = ['Recommended', 'View All', 'Weight Management', 'Longevity', 'Hormone & Menopause Health']

const scenarioStore = useScenarioStore()
const isDemoScenario = computed(() => {
  const s = scenarioStore.scenario
  return s !== 'none' && s !== 'default-with-wizard' && s !== 'new-rx-ordered'
})
const activeFilter = ref('Recommended')
const visibleChips = computed(() => (isDemoScenario.value ? filterChips : ['Recommended', 'View All']))
const cartStore = useCartStore()
const filteredProducts = computed(() => {
  if (activeFilter.value === 'Recommended') return products.filter((p) => p.status === 'active' || p.status === 'available')
  if (activeFilter.value === 'View All') return products
  return products.filter((p) => p.category === activeFilter.value)
})

function addProductToCart(product: Product) {
  cartStore.addToCart({
    name: product.name,
    category: product.category,
    image: product.image,
    plan: 'MONTHLY',
    pricePerMonth: product.price,
    months: 1,
  })
}
</script>

<template>
  <section class="mb-8">
    <h2 class="font-heading text-2xl font-medium mb-4">Explore all treatments</h2>
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="chip in visibleChips"
        :key="chip"
        type="button"
        class="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors"
        :class="activeFilter === chip ? 'bg-foreground text-background' : 'bg-card text-foreground hover:bg-muted'"
        @click="activeFilter = chip"
      >
        {{ chip }}
      </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in filteredProducts" :key="product.name" class="rounded-xl border border-border bg-card p-4 flex flex-col">
        <div class="aspect-square rounded-lg overflow-hidden bg-[#EDE8E2] flex items-center justify-center p-4">
          <img :src="product.image" :alt="product.name" class="max-h-full w-full object-contain" />
        </div>
        <h3 class="font-heading text-lg font-medium mt-3">{{ product.name }}</h3>
        <p class="text-sm text-muted-foreground mt-1">${{ product.price }}/mo</p>
        <button type="button" class="mt-3 w-full rounded-md bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90" @click="addProductToCart(product)">
          Add to Plan
        </button>
      </div>
    </div>
  </section>
</template>
