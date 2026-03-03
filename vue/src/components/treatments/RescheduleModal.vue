<script setup lang="ts">
import { ref } from 'vue'
import UiDialog from '@/components/ui/dialog.vue'
import UiButton from '@/components/ui/button.vue'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ 'update:open': [v: boolean] }>()

const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM']
const date = ref('')
const time = ref('')

function close() {
  emit('update:open', false)
}
</script>

<template>
  <UiDialog :open="open" @update:open="(v: unknown) => emit('update:open', v as boolean)">
    <div class="sm:max-w-[440px] p-6 gap-0 max-h-[90vh] overflow-y-auto" style="background: #F5F1F0">
      <div class="pb-4">
        <h2 class="font-heading text-xl font-medium text-foreground">Reschedule Appointment</h2>
      </div>
      <div class="space-y-5">
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Select New Date</label>
          <input v-model="date" type="date" class="w-full rounded-md border border-border bg-white px-3 py-2 text-sm" :min="new Date().toISOString().slice(0,10)" />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Select New Time</label>
          <select v-model="time" class="w-full rounded-md border border-border bg-white px-3 py-2 text-sm">
            <option value="">Select</option>
            <option v-for="t in timeSlots" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>
        <UiButton class="w-full rounded-md bg-primary py-3 text-sm font-light text-foreground hover:bg-primary/90" @click="close">Confirm Reschedule</UiButton>
      </div>
    </div>
  </UiDialog>
</template>
