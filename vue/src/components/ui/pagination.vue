<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ class?: string }>()
</script>

<template>
  <nav :class="cn('mx-auto flex w-full justify-center', $props.class)" role="navigation">
    <slot />
  </nav>
</template>
