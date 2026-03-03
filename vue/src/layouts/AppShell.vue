<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import UiButton from '@/components/ui/button.vue'
import DashboardLayout from '@/components/DashboardLayout.vue'

const route = useRoute()
const isLandingOrShop = computed(() => route.name === 'landing' || route.name === 'shop')

const dashboardLayoutRouteNames = [
  'dashboard',
  'profile',
  'results',
  'plan',
  'plan-detail',
  'treatments',
  'manage-subscription',
  'lifestyle',
  'info',
  'order-history',
  'patient-portal',
]
const useDashboardLayout = computed(() =>
  route.name != null && dashboardLayoutRouteNames.includes(route.name as string)
)
</script>

<template>
  <div
    id="app-shell"
    class="min-h-screen text-foreground"
    :class="{ 'bg-background': !isLandingOrShop && !useDashboardLayout }"
  >
    <!-- Landing / Shop: no header, no sidebar -->
    <template v-if="isLandingOrShop">
      <RouterView />
    </template>
    <!-- Dashboard routes: sidebar + main + mobile bottom nav (no top header) -->
    <DashboardLayout v-else-if="useDashboardLayout">
      <RouterView />
    </DashboardLayout>
    <!-- Other routes (e.g. checkout, payment, thank-you): simple header + content -->
    <template v-else>
      <header class="border-b border-border px-4 py-2 flex items-center justify-between">
        <span class="font-heading text-lg">KWILT</span>
        <UiButton variant="outline" size="sm">Login</UiButton>
      </header>
      <RouterView />
    </template>
  </div>
</template>
