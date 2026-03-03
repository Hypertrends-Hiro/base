<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const categoryId = route.params.categoryId as string
</script>

<template>
  <div class="p-6">
    <h1 class="font-heading text-2xl">Plan: {{ categoryId }} (placeholder)</h1>
  </div>
</template>
