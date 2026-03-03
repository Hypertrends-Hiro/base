<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { cn } from '@/lib/utils'
import kwiltLogo from '@/assets/kwilt-logo-dark.png'
import navResults from '@/assets/nav-results.svg'
import navPlan from '@/assets/nav-plan.svg'
import navLifestyle from '@/assets/nav-lifestyle.svg'
import navTreatments from '@/assets/nav-treatments.svg'
import navInfo from '@/assets/nav-info.svg'
import navSettings from '@/assets/nav-settings.svg'

interface NavItem {
  type: 'icon' | 'img'
  src?: string
  label: string
  href: string
  id?: string
}

const mainNavItems: NavItem[] = [
  { type: 'icon', label: 'Home', href: '/dashboard' },
  { type: 'img', src: navResults, label: 'Results', href: '/results', id: 'nav-results' },
  { type: 'img', src: navPlan, label: 'Your Plan', href: '/plan', id: 'nav-plan' },
  { type: 'img', src: navTreatments, label: 'Treatments', href: '/treatments', id: 'nav-treatments' },
  { type: 'img', src: navLifestyle, label: 'Lifestyle', href: '/lifestyle', id: 'nav-lifestyle' },
]

const secondaryItems: NavItem[] = [
  { type: 'img', src: navInfo, label: 'Info', href: '/info' },
  { type: 'img', src: navSettings, label: 'Settings', href: '/profile' },
]

const route = useRoute()
const isActive = (href: string) => route.path === href
</script>

<template>
  <aside
    class="hidden md:flex sticky top-0 h-screen w-28 flex-shrink-0 flex-col items-center border-r border-sidebar-border bg-sidebar py-8"
  >
    <!-- Logo -->
    <div class="mb-8">
      <RouterLink to="/dashboard">
        <img :src="kwiltLogo" alt="KWILT" class="h-4 w-auto" />
      </RouterLink>
    </div>

    <!-- User Avatar + Elisa George -->
    <RouterLink to="/profile" class="mb-10 flex flex-col items-center gap-2 group">
      <span class="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-transparent group-hover:ring-primary transition-all">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
          alt="User"
          class="aspect-square h-full w-full"
        />
      </span>
      <span class="text-center text-xs font-medium text-foreground leading-tight group-hover:text-primary transition-colors">
        Elisa<br />George
      </span>
    </RouterLink>

    <!-- Main Navigation -->
    <nav class="flex flex-1 flex-col items-center gap-1 w-full px-3">
      <RouterLink
        v-for="item in mainNavItems"
        :key="item.href"
        :to="item.href"
        :id="item.id"
        :class="cn(
          'flex flex-col items-center gap-2 rounded-xl w-full py-3 transition-all duration-200',
          isActive(item.href) ? 'bg-sidebar-accent' : 'hover:bg-sidebar-accent/50'
        )"
      >
        <template v-if="item.type === 'icon'">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" :class="cn('h-6 w-6', isActive(item.href) ? 'text-foreground' : 'text-foreground/70')">
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        </template>
        <img
          v-else-if="item.src"
          :src="item.src"
          :alt="item.label"
          :class="cn('h-6 w-6 object-contain', !isActive(item.href) && 'opacity-70')"
        />
        <span :class="cn('text-[11px] font-medium leading-tight text-center', isActive(item.href) ? 'text-foreground' : 'text-foreground/70')">
          {{ item.label }}
        </span>
      </RouterLink>

      <!-- Spacer -->
      <div class="flex-1" />

      <!-- Secondary / bottom nav items -->
      <RouterLink
        v-for="item in secondaryItems"
        :key="item.href"
        :to="item.href"
        :class="cn(
          'flex flex-col items-center gap-2 rounded-xl w-full py-3 transition-all duration-200',
          isActive(item.href) ? 'bg-sidebar-accent' : 'hover:bg-sidebar-accent/50'
        )"
      >
        <img
          v-if="item.src"
          :src="item.src"
          :alt="item.label"
          :class="cn('h-6 w-6 object-contain', !isActive(item.href) && 'opacity-70')"
        />
        <span :class="cn('text-[11px] font-medium', isActive(item.href) ? 'text-foreground' : 'text-foreground/70')">
          {{ item.label }}
        </span>
      </RouterLink>
    </nav>
  </aside>
</template>
