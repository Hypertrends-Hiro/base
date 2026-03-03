<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'

const openItem = ref<string | null>(null)
const props = defineProps<{ type?: 'single' | 'multiple'; class?: string }>()
defineExpose({ openItem })
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <slot :open-item="openItem" :set-open="(v: string | null) => (openItem = v)" />
  </div>
</template>
