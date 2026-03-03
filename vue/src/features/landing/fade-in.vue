<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{ delay?: number; class?: string }>(), { delay: 0 })
const el = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) visible.value = true }, { threshold: 0.15 })
  if (el.value) observer.observe(el.value)
})
onUnmounted(() => { observer?.disconnect() })
</script>

<template>
  <div
    ref="el"
    class="transition-all duration-700 ease-out"
    :class="[visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6', props.class]"
    :style="{ transitionDelay: `${props.delay}ms` }"
  >
    <slot />
  </div>
</template>
