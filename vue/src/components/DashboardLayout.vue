<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { cn } from '@/lib/utils'
import AppSidebar from '@/components/AppSidebar.vue'
import navResults from '@/assets/nav-results.svg'
import navPlan from '@/assets/nav-plan.svg'
import navTreatments from '@/assets/nav-treatments.svg'
import navLifestyle from '@/assets/nav-lifestyle.svg'
import navSettings from '@/assets/nav-settings.svg'

interface MobileNavItem {
  type: 'icon' | 'img'
  src?: string
  label: string
  href: string
  id?: string
}

const mobileNavItems: MobileNavItem[] = [
  { type: 'icon', label: 'Home', href: '/dashboard' },
  { type: 'img', src: navResults, label: 'Results', href: '/results', id: 'mobile-nav-results' },
  { type: 'img', src: navPlan, label: 'Plan', href: '/plan', id: 'mobile-nav-plan' },
  { type: 'img', src: navTreatments, label: 'Treatments', href: '/treatments', id: 'mobile-nav-treatments' },
  { type: 'img', src: navLifestyle, label: 'Lifestyle', href: '/lifestyle', id: 'mobile-nav-lifestyle' },
  { type: 'img', src: navSettings, label: 'Settings', href: '/profile' },
]

const route = useRoute()
const isActive = (href: string) => route.path === href
</script>

<template>
  <div class="flex min-h-screen w-full bg-background">
    <AppSidebar />
    <main class="flex-1 overflow-auto pb-20 md:pb-0">
      <slot />
    </main>

    <!-- Mobile bottom nav bar -->
    <nav class="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-border bg-sidebar">
      <RouterLink
        v-for="item in mobileNavItems"
        :key="item.href"
        :to="item.href"
        :id="item.id"
        :class="cn(
          'flex flex-1 flex-col items-center justify-center gap-1 py-3 transition-all',
          isActive(item.href) ? 'text-foreground' : 'text-foreground/50'
        )"
      >
        <template v-if="item.type === 'icon'">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        </template>
        <img
          v-else-if="item.src"
          :src="item.src"
          :alt="item.label"
          :class="cn('h-5 w-5 object-contain', !isActive(item.href) && 'opacity-50')"
        />
        <span class="text-[10px] font-medium">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </div>
</template>
