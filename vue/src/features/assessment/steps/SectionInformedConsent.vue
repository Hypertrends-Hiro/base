<script setup lang="ts">
import { ref, computed } from 'vue'
import AssessmentStep from '../AssessmentStep.vue'
import UiCheckbox from '@/components/ui/checkbox.vue'
import UiDrawer from '@/components/ui/drawer.vue'
import kwiltLogo from '@/assets/kwilt-logo-dark.png'

const props = defineProps<{ answers: Record<string, unknown>; direction?: 'forward' | 'back' }>()
const emit = defineEmits<{ answer: [key: string, value: unknown]; next: []; back: [] }>()

const consentTelemedicine = computed(() => (props.answers.consentTelemedicine as boolean) ?? false)
const consentPrivacy = computed(() => (props.answers.consentPrivacy as boolean) ?? false)
const activeModal = ref<'telemedicine' | 'privacy' | null>(null)
const bothChecked = computed(() => consentTelemedicine.value && consentPrivacy.value)

const drawerOpen = computed({
  get: () => activeModal.value !== null,
  set: (v) => { if (!v) activeModal.value = null }
})

function setConsentTelemedicine() {
  emit('answer', 'consentTelemedicine', !consentTelemedicine.value)
}
function setConsentPrivacy() {
  emit('answer', 'consentPrivacy', !consentPrivacy.value)
}

const sectionDescription = "I have read and understand the TELEMEDICINE INFORMED CONSENT AND NOTICE OF PRIVACY PRACTICES (See links above). I understand that completed prescription orders cannot be canceled, refunded, or returned. I understand that I can contact a KWILT medical practitioner at any time via telephone or email with any further questions and concerns. By completing my purchase, I agree that all of my questions have been answered and I give informed consent to proceed with the prescription product treatment."
</script>

<template>
  <AssessmentStep
    section-label="Informed Consent"
    section-title="Informed Consent"
    :section-description="sectionDescription"
    question-title="Please review and agree to the following before submitting"
    next-label="Submit"
    step-key="section-consent"
    :direction="direction"
    @next="emit('next')"
    @back="emit('back')"
  >
    <button
      type="button"
      class="flex items-center gap-3 w-full rounded-lg border px-4 py-3.5 text-left transition-colors"
      :class="consentTelemedicine ? 'border-primary bg-primary/10' : 'border-border bg-background/50 hover:border-primary/50 hover:bg-background'"
      @click="setConsentTelemedicine"
    >
      <UiCheckbox :checked="consentTelemedicine" class="pointer-events-none shrink-0" aria-hidden @update:checked="setConsentTelemedicine" />
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-[11px] font-bold uppercase tracking-widest text-foreground">Telemedicine Informed Consent</span>
        <a href="#" class="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline shrink-0" @click.prevent="activeModal = 'telemedicine'">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          Click to view
        </a>
        <span class="text-primary font-bold">*</span>
      </div>
    </button>

    <button
      type="button"
      class="flex items-center gap-3 w-full rounded-lg border px-4 py-3.5 text-left transition-colors"
      :class="consentPrivacy ? 'border-primary bg-primary/10' : 'border-border bg-background/50 hover:border-primary/50 hover:bg-background'"
      @click="setConsentPrivacy"
    >
      <UiCheckbox :checked="consentPrivacy" class="pointer-events-none shrink-0" aria-hidden @update:checked="setConsentPrivacy" />
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-[11px] font-bold uppercase tracking-widest text-foreground">Notice of Privacy Practices</span>
        <a href="#" class="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline shrink-0" @click.prevent="activeModal = 'privacy'">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          Click to view
        </a>
        <span class="text-primary font-bold">*</span>
      </div>
    </button>

    <p v-if="!bothChecked" class="text-xs text-foreground italic">Both consents are required to submit.</p>

    <UiDrawer v-model:open="drawerOpen" class="flex flex-col rounded-t-2xl max-h-[85dvh]">
      <div class="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
        <img :src="kwiltLogo" alt="KWILT" class="h-5 object-contain" />
        <button type="button" class="rounded-full p-1.5 text-foreground/50 hover:text-foreground hover:bg-border/40 transition-colors" @click="activeModal = null">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>
      </div>
      <div class="overflow-y-auto flex-1 px-6 py-6">
        <div v-if="activeModal === 'telemedicine'" class="space-y-5 text-sm leading-relaxed text-foreground">
          <h2 class="font-heading text-lg font-semibold text-foreground">TELEMEDICINE INFORMED CONSENT</h2>
          <section>
            <h3 class="font-semibold text-foreground mb-1">1. Purpose</h3>
            <p>This consent form explains telemedicine services provided by KWILT and its licensed medical practitioners. Telemedicine involves the use of electronic communications to enable healthcare providers to evaluate and treat patients without an in-person office visit. By agreeing, you consent to participate in a telemedicine consultation.</p>
          </section>
          <section>
            <h3 class="font-semibold text-foreground mb-1">2. How It Works</h3>
            <p>Your health information — including your completed assessment, lab results, and any communications — will be transmitted electronically to a licensed KWILT medical practitioner. All transmissions are encrypted and comply with applicable privacy regulations including HIPAA.</p>
          </section>
          <section>
            <h3 class="font-semibold text-foreground mb-1">3. Risks & Benefits</h3>
            <p><strong>Benefits:</strong> Convenient access to licensed practitioners, no travel required, faster response times.</p>
            <p class="mt-1"><strong>Risks:</strong> Technical failures may interrupt care. In emergencies, always call 911 or visit an emergency room. Telemedicine is not a substitute for in-person emergency care.</p>
          </section>
          <section>
            <h3 class="font-semibold text-foreground mb-1">4. Patient Rights</h3>
            <ul class="list-disc list-inside space-y-1">
              <li>You may withdraw consent at any time without affecting your right to future care.</li>
              <li>You may request an in-person evaluation at any time.</li>
              <li>You have the right to inspect and receive copies of your medical records.</li>
              <li>Completed prescription orders cannot be canceled, refunded, or returned.</li>
            </ul>
          </section>
          <section>
            <h3 class="font-semibold text-foreground mb-1">5. Contact Information</h3>
            <p>If you have questions about your care or this consent, contact a KWILT medical practitioner at any time via in-app messaging, telephone, or email.</p>
          </section>
        </div>
        <div v-else-if="activeModal === 'privacy'" class="space-y-5 text-sm leading-relaxed text-foreground">
          <h2 class="font-heading text-lg font-semibold text-foreground">NOTICE OF PRIVACY PRACTICES</h2>
          <p class="text-xs text-foreground uppercase tracking-widest">Effective Date: January 1, 2025</p>
          <p>This notice describes how medical information about you may be used and disclosed and how you can get access to this information. <strong>Please review it carefully.</strong></p>
          <section>
            <h3 class="font-semibold text-foreground mb-1">Uses & Disclosures</h3>
            <p>KWILT may use and disclose your protected health information (PHI) for treatment, payment, and healthcare operations without your authorization, as permitted by HIPAA.</p>
          </section>
          <section>
            <h3 class="font-semibold text-foreground mb-1">Your Rights</h3>
            <ul class="list-disc list-inside space-y-1">
              <li>Right to access and copy your health records.</li>
              <li>Right to request corrections to your records.</li>
              <li>Right to receive a list of disclosures made by KWILT.</li>
              <li>Right to request restrictions on certain uses or disclosures.</li>
            </ul>
          </section>
          <section>
            <h3 class="font-semibold text-foreground mb-1">Contact Us</h3>
            <p>For questions about this notice or to exercise your rights, contact KWILT's Privacy Officer via in-app support or at privacy@kwilt.com.</p>
          </section>
        </div>
      </div>
      <div class="px-6 py-4 border-t border-border shrink-0">
        <button type="button" class="h-11 w-full rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors" @click="activeModal = null">Close</button>
      </div>
    </UiDrawer>
  </AssessmentStep>
</template>
