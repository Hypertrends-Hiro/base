<script setup lang="ts">
import UiDialog from '@/components/ui/dialog.vue'
import UiButton from '@/components/ui/button.vue'

defineProps<{ open: boolean; appointmentType?: string; appointmentDate?: string }>()
const emit = defineEmits<{ 'update:open': [v: boolean] }>()
</script>

<template>
  <UiDialog :open="open" @update:open="(v: unknown) => emit('update:open', v as boolean)">
    <div class="sm:max-w-[400px] p-6 gap-0" style="background: #F5F1F0">
      <div class="pb-4">
        <h2 class="font-heading text-xl font-medium text-foreground">Cancel Appointment</h2>
      </div>
      <div class="space-y-5">
        <div class="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-muted-foreground flex-none mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          <div>
            <p class="text-sm font-medium">Are you sure you want to cancel?</p>
            <p class="text-sm text-muted-foreground mt-1">
              <span v-if="appointmentType" class="font-medium text-foreground">{{ appointmentType }}</span>
              <span v-if="appointmentDate"> on {{ appointmentDate }}</span>
            </p>
            <p class="text-xs text-muted-foreground mt-2">This action cannot be undone. You will need to book a new appointment.</p>
          </div>
        </div>
        <div class="flex gap-3">
          <UiButton variant="outline" class="flex-1 py-3" @click="emit('update:open', false)">Keep Appointment</UiButton>
          <UiButton class="flex-1 rounded-md bg-foreground py-3 text-sm font-light text-background hover:opacity-90" @click="emit('update:open', false)">Yes, Cancel</UiButton>
        </div>
      </div>
    </div>
  </UiDialog>
</template>
