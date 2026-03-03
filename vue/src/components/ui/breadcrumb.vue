<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ class?: string }>()
</script>

<template>
  <nav :class="cn('flex', $props.class)" aria-label="breadcrumb">
    <ol class="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground">
      <slot />
    </ol>
  </nav>
</template>
