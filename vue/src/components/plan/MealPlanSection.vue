<script setup lang="ts">
import { ref } from 'vue'

const days = [
  { label: 'Day 1' },
  { label: 'Day 2' },
  { label: 'Day 3' },
  { label: 'Day 4' },
  { label: 'Day 5' },
  { label: 'Day 6' },
  { label: 'Day 7' },
]
const selectedDay = ref(0)
</script>

<template>
  <div class="space-y-5">
    <p class="text-sm text-muted-foreground">
      7-Day Meal Plan: Focuses on heart-healthy fats, lean protein, and a variety of
      micronutrients for metabolic support.
    </p>
    <div class="flex gap-2 flex-wrap">
      <button
        v-for="(day, i) in days"
        :key="i"
        type="button"
        class="px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
        :class="selectedDay === i ? 'bg-kwilt-peach text-foreground' : 'border border-border bg-white text-foreground hover:bg-secondary'"
        @click="selectedDay = i"
      >
        {{ day.label }}
      </button>
    </div>
    <div class="bg-white rounded-xl p-6 shadow-soft">
      <h3 class="font-heading text-2xl font-light text-foreground mb-6">Today's agenda</h3>
      <p class="text-sm text-muted-foreground">Meal cards for the selected day (local fixture).</p>
    </div>
    <div class="mt-8 pt-6">
      <p class="text-sm font-semibold text-foreground mb-3">©2025 kwilthealth</p>
      <p class="text-xs text-foreground/70 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a nisi in enim consectetur varius. In lacinia eleifend magna porttitor pretium. Aenean nec bibendum felis, eget tincidunt libero. Sed at diam in massa pretium sollicitudin eleifend nec risus. Praesent sed neque a dolor vestibulum molestie sit amet nec massa. Nunc id fringilla diam. Etiam eget volutpat enim. Donec accumsan, lectus in tristique pharetra, massa mauris rhoncus enim, vitae tempus sapien mauris id enim.
      </p>
    </div>
  </div>
</template>
