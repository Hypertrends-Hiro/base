<script setup lang="ts">
import { useToast } from './use-toast'
import UiToast from './toast.vue'

const { toasts } = useToast()
</script>

<template>
  <div class="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
    <template v-for="t in toasts" :key="t.id">
      <UiToast v-bind="t">
        <div class="grid gap-1">
          <span v-if="t.title" class="text-sm font-semibold">{{ t.title }}</span>
          <span v-if="t.description" class="text-sm opacity-90">{{ t.description }}</span>
        </div>
      </UiToast>
    </template>
  </div>
</template>
