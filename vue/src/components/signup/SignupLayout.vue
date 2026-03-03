<script setup lang="ts">
import { RouterLink } from 'vue-router'
import kwiltLogoDark from '@/assets/kwilt-logo-dark.png'
</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <div class="md:w-[42%] bg-card flex flex-col px-10 py-10 md:min-h-screen">
      <router-link to="/" class="mb-12">
        <img :src="kwiltLogoDark" alt="KWILT" class="h-7 w-auto" />
      </router-link>
      <div>
        <slot name="left" />
      </div>
    </div>
    <div class="flex-1 bg-background flex flex-col px-8 py-10 md:px-16 md:overflow-y-auto">
      <div class="hidden md:block h-[76px] shrink-0" />
      <slot name="right" />
    </div>
  </div>
</template>
