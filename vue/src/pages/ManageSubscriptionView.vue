<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const treatmentName = route.params.treatmentName as string
</script>

<template>
  <div class="p-6">
    <h1 class="font-heading text-2xl">Manage: {{ treatmentName }} (placeholder)</h1>
  </div>
</template>
