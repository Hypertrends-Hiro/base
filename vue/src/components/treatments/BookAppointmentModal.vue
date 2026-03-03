<script setup lang="ts">
import { ref } from 'vue'
import UiDialog from '@/components/ui/dialog.vue'
import UiSelect from '@/components/ui/select.vue'
import UiButton from '@/components/ui/button.vue'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ 'update:open': [v: boolean] }>()

const providers = ['Kate Cordisco, NP', 'Brian Crenshaw, MD', 'Sarah Johnson, DO']
const appointmentTypes = ['Routine Check-up', 'Follow-up Visit', 'New Treatment Consultation', 'Lab Review', 'Mid-point Lab Review']
const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM']

const provider = ref('')
const appointmentType = ref('')
const time = ref('')

function close() {
  emit('update:open', false)
}
function handleBook() {
  close()
}
</script>

<template>
  <UiDialog :open="open" @update:open="(v: unknown) => emit('update:open', v as boolean)">
    <div class="sm:max-w-[440px] p-6 gap-0 max-h-[90vh] overflow-y-auto" style="background: #F5F1F0">
      <div class="pb-4">
        <h2 class="font-heading text-xl font-medium text-foreground">Book New Appointment</h2>
      </div>
      <div class="space-y-5">
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Select Provider</label>
          <UiSelect v-model="provider" class="w-full bg-white border-border rounded-md">
            <option value="">Select</option>
            <option v-for="p in providers" :key="p" :value="p">{{ p }}</option>
          </UiSelect>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Appointment Type</label>
          <UiSelect v-model="appointmentType" class="w-full bg-white border-border rounded-md">
            <option value="">Select</option>
            <option v-for="t in appointmentTypes" :key="t" :value="t">{{ t }}</option>
          </UiSelect>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Time</label>
          <UiSelect v-model="time" class="w-full bg-white border-border rounded-md">
            <option value="">Select</option>
            <option v-for="s in timeSlots" :key="s" :value="s">{{ s }}</option>
          </UiSelect>
        </div>
        <UiButton type="button" class="w-full" @click="handleBook">Book Appointment</UiButton>
      </div>
    </div>
  </UiDialog>
</template>
