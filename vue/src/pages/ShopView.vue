<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { cn } from '@/lib/utils'
import Header from '@/components/home/Header.vue'
import womanHairWind from '@/assets/woman-hair-wind.jpg'
import womanSkincare from '@/assets/woman-skincare.jpg'
import handSunset from '@/assets/hand-sunset.jpg'
import howToUse from '@/assets/how-to-use-kwilt.png'
import appMockup from '@/assets/app-phone-mockup.png'
import productSemaglutide from '@/assets/product-semaglutide.png'
import productBalance from '@/assets/product-balance.png'
import productGlp1 from '@/assets/product-glp1.png'
import productHrt from '@/assets/product-hrt.png'
import productNad from '@/assets/product-nad.png'

interface Product {
  name: string
  subtitle: string
  price: string
  image: string
  categories: string[]
}

const products: Product[] = [
  { name: 'KWILT Essentials', subtitle: 'Daily longevity supplement stack', price: '$149/mo', image: productBalance, categories: ['all', 'longevity'] },
  { name: 'Metformin', subtitle: 'Metabolic optimization', price: '$99/mo', image: productGlp1, categories: ['all', 'metabolic'] },
  { name: 'Semaglutide', subtitle: 'GLP-1 receptor agonist', price: '$199/mo', image: productSemaglutide, categories: ['all', 'metabolic'] },
  { name: 'Tretinoin', subtitle: 'Topical retinoid for skin renewal', price: '$59/mo', image: productNad, categories: ['all', 'aesthetic'] },
  { name: 'NAD+ Booster', subtitle: 'Cellular energy & repair', price: '$129/mo', image: productNad, categories: ['all', 'longevity'] },
  { name: 'HRT Balance', subtitle: 'Hormone optimization therapy', price: '$179/mo', image: productHrt, categories: ['all', 'sexual', 'aesthetic'] },
]

const categoryTabs = [
  { id: 'all', label: 'All' },
  { id: 'longevity', label: 'Longevity Essentials' },
  { id: 'sexual', label: 'Sexual Health' },
  { id: 'metabolic', label: 'Metabolic Health' },
  { id: 'aesthetic', label: 'Aesthetic & Feminine' },
  { id: 'hair', label: 'Hair + Nails' },
]

const features = [
  { title: 'Connect with a provider', description: 'Get matched with a medical provider who understands your unique goals.', image: handSunset },
  { title: 'Convenient delivery', description: 'Your treatments are compounded and shipped right to your door', image: howToUse },
  { title: 'Track your progress', description: 'With biomarker data and insights right at your fingertips', image: appMockup },
]

const activeCategory = ref('all')
const filteredProducts = computed(() => products.filter((p) => p.categories.includes(activeCategory.value)))
</script>

<template>
  <div class="min-h-screen bg-background">
    <Header />
    <section class="relative h-[85vh] min-h-[600px] overflow-hidden">
      <img :src="womanHairWind" alt="Products formulated for results" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      <div class="relative z-10 flex h-full flex-col justify-end p-8 md:p-16 pb-16 md:pb-20 max-w-2xl">
        <h1 class="font-heading text-3xl md:text-5xl font-light text-white leading-tight">
          Products formulated to combat the effects of aging with ingredients that create real results.
        </h1>
        <p class="mt-4 font-heading text-xl md:text-2xl font-light text-white/90">Results you can feel.</p>
        <RouterLink to="/register" class="mt-6 inline-flex items-center gap-2 text-primary text-lg font-medium hover:gap-3 transition-all">
          Get Started
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </RouterLink>
      </div>
    </section>
    <div class="border-b border-border sticky top-[72px] z-40 bg-background">
      <div class="max-w-7xl mx-auto px-6 overflow-x-auto">
        <div class="flex gap-0">
          <button
            v-for="tab in categoryTabs"
            :key="tab.id"
            type="button"
            :class="cn(
              'whitespace-nowrap px-5 py-4 text-sm font-medium transition-colors border-b-2',
              activeCategory === tab.id ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
            )"
            @click="activeCategory = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </div>
    <section class="max-w-7xl mx-auto px-6 py-12">
      <h2 class="font-heading text-2xl font-light mb-8">All Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        <div v-for="product in filteredProducts" :key="product.name" class="flex flex-col">
          <div class="aspect-square rounded-xl overflow-hidden bg-[#EDE8E2] flex items-center justify-center p-8">
            <img :src="product.image" :alt="product.name" class="h-full w-full object-contain" />
          </div>
          <div class="mt-4 space-y-1">
            <h3 class="font-heading text-base font-medium">{{ product.name }}</h3>
            <p class="text-sm text-muted-foreground">{{ product.subtitle }}</p>
            <p class="text-sm font-medium">{{ product.price }}</p>
          </div>
          <button type="button" class="mt-3 w-full rounded-md bg-primary py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Add to Plan
          </button>
        </div>
      </div>
    </section>
    <section class="relative overflow-hidden">
      <img :src="womanSkincare" alt="Everyone's longevity journey is unique" class="w-full h-[70vh] min-h-[500px] object-cover" />
      <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
      <div class="absolute inset-0 flex items-center p-8 md:p-16">
        <div class="max-w-lg">
          <h2 class="font-heading text-3xl md:text-5xl font-light text-white leading-tight">
            Everyone's<br />longevity<br />journey is<br />unique
          </h2>
          <p class="mt-6 text-sm text-white/80 leading-relaxed max-w-sm">
            You're not just investing in medicine, you're investing in your body's future potential. KWILT's approach combines cutting-edge science with personalized care to build a plan that's as individual as you are, because the best results come from understanding what makes you, you.
          </p>
        </div>
      </div>
    </section>
    <section class="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div>
        <h2 class="font-heading text-3xl md:text-4xl font-light leading-tight">
          A plan<br />designed<br />with you in<br />mind
        </h2>
        <RouterLink to="/assessment" class="mt-8 inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all">
          Start Assessment
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </RouterLink>
      </div>
      <div>
        <p class="text-sm text-muted-foreground leading-relaxed">
          After completing the health assessment, you'll receive your personalized KWILT plan — a roadmap to optimized longevity.
        </p>
        <p class="text-sm text-muted-foreground leading-relaxed mt-4">
          Our licensed providers review your results to create a comprehensive plan designed for your unique physiology. Including personalized supplement stacks, curated treatment recommendations, and lifestyle guidance tailored to your health goals and biomarker data — a truly individualized longevity plan.
        </p>
      </div>
    </section>
    <section class="bg-[#F5F1F0] py-16">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="font-heading text-2xl md:text-3xl font-light mb-10">We are here for you</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="flex flex-col">
            <div class="aspect-[4/3] rounded-xl overflow-hidden">
              <img :src="feature.image" :alt="feature.title" class="h-full w-full object-cover" />
            </div>
            <h3 class="font-heading text-lg font-medium mt-5">{{ feature.title }}</h3>
            <p class="text-sm text-muted-foreground leading-relaxed mt-2">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="max-w-7xl mx-auto px-6 py-20">
      <h2 class="font-heading text-3xl md:text-4xl font-light">Redefine what it means to age.</h2>
      <RouterLink to="/register" class="mt-4 inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all">
        Get Started
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </RouterLink>
    </section>
    <footer class="border-t border-border bg-background">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
          <div class="flex items-center gap-4">
            <a href="#" aria-label="Instagram" class="text-foreground hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="YouTube" class="text-foreground hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/></svg>
            </a>
            <a href="#" aria-label="Facebook" class="text-foreground hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
          <div class="flex items-center gap-2 border border-border rounded-md overflow-hidden">
            <input type="email" placeholder="email@email.com" class="px-4 py-2.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground w-52" />
            <button type="button" class="px-4 py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors border-l border-border">Subscribe</button>
          </div>
        </div>
        <div class="mb-8">
          <h3 class="font-heading text-6xl md:text-8xl font-bold tracking-tight text-foreground leading-none">KWILT<span class="text-2xl md:text-3xl align-super">™</span></h3>
          <p class="text-sm font-medium text-foreground mt-2">Longevity. Optimized.</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-8">
          <div class="space-y-2">
            <p class="font-medium text-foreground">Shop</p>
            <p class="text-muted-foreground">All products</p>
            <p class="text-muted-foreground">Plans</p>
          </div>
          <div class="space-y-2">
            <p class="font-medium text-foreground">Membership</p>
            <p class="text-muted-foreground">Benefits</p>
            <p class="text-muted-foreground">Labs</p>
          </div>
          <div class="space-y-2">
            <p class="font-medium text-foreground">Help</p>
            <p class="text-muted-foreground">Support</p>
          </div>
          <div class="space-y-2">
            <p class="font-medium text-foreground">More</p>
            <p class="text-muted-foreground">Careers</p>
          </div>
        </div>
        <p class="text-xs text-muted-foreground">©2025 kwilthealth.com</p>
      </div>
    </footer>
  </div>
</template>
