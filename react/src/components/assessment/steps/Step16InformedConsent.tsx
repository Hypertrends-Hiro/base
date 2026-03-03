import { useState } from "react";
import { AssessmentStep } from "../AssessmentStep";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ExternalLink, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerPortal, DrawerOverlay } from "@/components/ui/drawer";
import kwiltLogo from "@/assets/kwilt-logo-dark.png";

interface Props {
  answers: Record<string, unknown>;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  direction?: "forward" | "back";
}

function TelemedicineContent() {
  return (
    <div className="space-y-5 text-sm leading-relaxed text-foreground">
      <h2 className="font-heading text-lg font-semibold text-foreground">TELEMEDICINE INFORMED CONSENT</h2>

      <section>
        <h3 className="font-semibold text-foreground mb-1">1. Purpose</h3>
        <p>
          This consent form explains telemedicine services provided by KWILT and its licensed medical practitioners.
          Telemedicine involves the use of electronic communications to enable healthcare providers to evaluate and
          treat patients without an in-person office visit. By agreeing, you consent to participate in a telemedicine
          consultation.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-1">2. How It Works</h3>
        <p>
          Your health information — including your completed assessment, lab results, and any communications — will
          be transmitted electronically to a licensed KWILT medical practitioner. All transmissions are encrypted
          and comply with applicable privacy regulations including HIPAA.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-1">3. Risks & Benefits</h3>
        <p>
          <strong>Benefits:</strong> Convenient access to licensed practitioners, no travel required, faster response times.
        </p>
        <p className="mt-1">
          <strong>Risks:</strong> Technical failures may interrupt care. In emergencies, always call 911 or visit an
          emergency room. Telemedicine is not a substitute for in-person emergency care.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-1">4. Patient Rights</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>You may withdraw consent at any time without affecting your right to future care.</li>
          <li>You may request an in-person evaluation at any time.</li>
          <li>You have the right to inspect and receive copies of your medical records.</li>
          <li>Completed prescription orders cannot be canceled, refunded, or returned.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-1">5. Contact Information</h3>
        <p>
          If you have questions about your care or this consent, contact a KWILT medical practitioner at any time
          via in-app messaging, telephone, or email. Our team is here to support you throughout your journey.
        </p>
      </section>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div className="space-y-5 text-sm leading-relaxed text-foreground">
      <h2 className="font-heading text-lg font-semibold text-foreground">NOTICE OF PRIVACY PRACTICES</h2>
      <p className="text-xs text-foreground uppercase tracking-widest">Effective Date: January 1, 2025</p>

      <p>
        This notice describes how medical information about you may be used and disclosed and how you can get
        access to this information. <strong>Please review it carefully.</strong>
      </p>

      <section>
        <h3 className="font-semibold text-foreground mb-1">Uses & Disclosures</h3>
        <p>
          KWILT may use and disclose your protected health information (PHI) for treatment, payment, and healthcare
          operations without your authorization, as permitted by HIPAA. We may share information with other
          healthcare providers involved in your care.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-1">Treatment</h3>
        <p>
          We may use your health information to provide and coordinate your medical care — including sharing
          relevant records with specialists, pharmacies, or labs as needed.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-1">Payment</h3>
        <p>
          Your PHI may be used to obtain payment for services rendered, including billing and insurance
          verification purposes.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-1">Healthcare Operations</h3>
        <p>
          We may use de-identified data for internal quality improvement, training, and operational purposes.
          Individual identifiers are never shared in these activities.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-1">Authorization</h3>
        <p>
          Uses and disclosures beyond the above require your written authorization. You may revoke authorization
          at any time in writing, except where we have already relied on it.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-1">Your Rights</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Right to access and copy your health records.</li>
          <li>Right to request corrections to your records.</li>
          <li>Right to receive a list of disclosures made by KWILT.</li>
          <li>Right to request restrictions on certain uses or disclosures.</li>
          <li>Right to receive this notice in an alternate format.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-1">Contact Us</h3>
        <p>
          For questions about this notice or to exercise your rights, contact KWILT's Privacy Officer via
          in-app support or at privacy@kwilt.com.
        </p>
      </section>
    </div>
  );
}

export function Step16InformedConsent({ answers, onAnswer, onNext, onBack, direction }: Props) {
  const consentTelemedicine = (answers.consentTelemedicine as boolean) ?? false;
  const consentPrivacy = (answers.consentPrivacy as boolean) ?? false;
  const [activeModal, setActiveModal] = useState<"telemedicine" | "privacy" | null>(null);

  const bothChecked = consentTelemedicine && consentPrivacy;

  return (
    <AssessmentStep
      sectionLabel="Section 16 of 16"
      sectionTitle="Informed Consent"
      sectionDescription="I have read and understand the TELEMEDICINE INFORMED CONSENT AND NOTICE OF PRIVACY PRACTICES (See links above). I understand that completed prescription orders cannot be canceled, refunded, or returned. I understand that I can contact a KWILT medical practitioner at any time via telephone or email with any further questions and concerns. By completing my purchase, I agree that all of my questions have been answered and I give informed consent to proceed with the prescription product treatment."
      questionTitle="Please review and agree to the following before submitting"
      onBack={onBack}
      onNext={onNext}
      nextLabel="Submit"
      stepKey="step-16"
      direction={direction}
    >
      {/* Telemedicine Informed Consent */}
      <button
        type="button"
        onClick={() => onAnswer("consentTelemedicine", !consentTelemedicine)}
        className={cn(
          "flex items-center gap-3 w-full rounded-lg border px-4 py-3.5 text-left transition-colors",
          consentTelemedicine
            ? "border-primary bg-primary/10"
            : "border-border bg-background/50 hover:border-primary/50 hover:bg-background"
        )}
      >
        <Checkbox
          checked={consentTelemedicine}
          onCheckedChange={() => onAnswer("consentTelemedicine", !consentTelemedicine)}
          className="pointer-events-none shrink-0"
          aria-hidden
        />
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-widest text-foreground">
            Telemedicine Informed Consent
          </span>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveModal("telemedicine"); }}
            className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline shrink-0"
          >
            <ExternalLink className="h-3 w-3" />
            Click to view
          </a>
          <span className="text-primary font-bold">*</span>
        </div>
      </button>

      {/* Notice of Privacy Practices */}
      <button
        type="button"
        onClick={() => onAnswer("consentPrivacy", !consentPrivacy)}
        className={cn(
          "flex items-center gap-3 w-full rounded-lg border px-4 py-3.5 text-left transition-colors",
          consentPrivacy
            ? "border-primary bg-primary/10"
            : "border-border bg-background/50 hover:border-primary/50 hover:bg-background"
        )}
      >
        <Checkbox
          checked={consentPrivacy}
          onCheckedChange={() => onAnswer("consentPrivacy", !consentPrivacy)}
          className="pointer-events-none shrink-0"
          aria-hidden
        />
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-widest text-foreground">
            Notice of Privacy Practices
          </span>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveModal("privacy"); }}
            className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline shrink-0"
          >
            <ExternalLink className="h-3 w-3" />
            Click to view
          </a>
          <span className="text-primary font-bold">*</span>
        </div>
      </button>

      {/* Validation hint */}
      {!bothChecked && (
        <p className="text-xs text-foreground italic">
          Both consents are required to submit.
        </p>
      )}

      {/* Slide-up Drawer Modal */}
      <Drawer open={activeModal !== null} onOpenChange={(open) => { if (!open) setActiveModal(null); }}>
        <DrawerPortal>
          <DrawerOverlay className="fixed inset-0 bg-black/40 z-50" />
          <DrawerContent className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl bg-background max-h-[85dvh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
              <img src={kwiltLogo} alt="KWILT" className="h-5 object-contain" />
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="rounded-full p-1.5 text-foreground/50 hover:text-foreground hover:bg-border/40 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 px-6 py-6">
              {activeModal === "telemedicine" ? <TelemedicineContent /> : <PrivacyContent />}
            </div>
            {/* Footer CTA */}
            <div className="px-6 py-4 border-t border-border shrink-0">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="h-11 w-full rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </AssessmentStep>
  );
}
