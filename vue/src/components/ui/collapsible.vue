<script setup lang="ts">
import { cn } from '@/lib/utils'

const open = defineModel<boolean>({ default: false })
const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <div v-if="$slots.trigger" @click="open = !open">
      <slot name="trigger" :open="open" />
    </div>
    <div v-show="open">
      <slot />
    </div>
  </div>
</template>
