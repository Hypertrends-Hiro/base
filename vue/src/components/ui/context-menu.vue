<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'

const open = ref(false)
defineProps<{ class?: string }>()
defineExpose({ open })
</script>

<template>
  <div :class="cn('relative', $props.class)" @contextmenu.prevent="open = true">
    <slot />
  </div>
</template>
