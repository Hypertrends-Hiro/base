import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/contexts/CartContext";
import { Pencil, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import surferSunset from "@/assets/surfer-sunset.png";
import { SingleSelect } from "@/components/assessment/SingleSelect";

interface QualificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    name: string;
    category: string;
    image: string;
  } | null;
  plan: {
    label: string;
    pricePerMonth: number;
    months: number;
  } | null;
}

/* ── "Has Anything Changed?" category data ── */
const biometricsQuestions = [
  { id: "height", label: "Height", value: "5 ft 6 in" },
  { id: "weight", label: "Current weight", value: "145 lbs" },
  { id: "goalWeight", label: "Goal weight", value: "130 lbs" },
  { id: "bp", label: "Blood pressure", value: "Normal (below 120/80)" },
];

const medicalHistoryQuestions = [
  { id: "conditions", label: "Diagnosed conditions", value: "None" },
  { id: "allergies", label: "Allergies / intolerances", value: "Penicillin" },
  { id: "surgeries", label: "Past surgeries", value: "None" },
];

const medicationsQuestions = [
  { id: "rxMeds", label: "Prescription medications", value: "None" },
  { id: "otcSupplements", label: "OTC vitamins / supplements", value: "Vitamin D, Omega-3" },
];

/* ── GLP-1 kick-out conditions ── */
const kickoutConditions = [
  "Personal or family history of MTC or MEN2",
  "History of pancreatitis",
  "Gastroparesis or severe delayed gastric emptying",
  "Eating disorder (anorexia or bulimia)",
  "Allergy to GLP-1, Tirzepatide, or components",
  "Type 1 diabetes",
  "Currently on insulin or sulfonylurea",
  "Currently on meglitinides",
  "Actively being treated with chemotherapy",
  "Active psychosis or suicidal/homicidal ideation",
  "None of the above",
];

/* ── GLP-1 caution conditions ── */
const cautionConditions = [
  "Cardiovascular event (MI/stroke) within 6 months",
  "Tachyarrhythmias or EKG abnormalities",
  "Liver disease (cirrhosis, hepatitis)",
  "History of thyroid cancer (non-MTC)",
  "Diabetic retinopathy",
  "Gallbladder disease history",
  "Bariatric surgery within 1 year",
  "Uncontrolled hypothyroidism",
  "On narrow-therapeutic-index meds (OCPs, warfarin, digoxin)",
  "Gout",
  "None of the above",
];

/* ── Pregnancy options ── */
const PREGNANCY_OPTIONS = [
  { value: "not_pregnant", label: "No" },
  { value: "pregnant", label: "Yes, I am currently pregnant" },
  { value: "breastfeeding", label: "Yes, I am currently breastfeeding" },
  { value: "trying", label: "I am trying to conceive" },
];

/* ── GLP-1 history options ── */
const GLP1_HISTORY_OPTIONS = [
  { value: "no", label: "No" },
  { value: "currently", label: "Yes, currently taking" },
  { value: "previously", label: "Yes, have taken in the past" },
];

const TOTAL_QUESTION_STEPS = 8; // steps 1–8

export function QualificationModal({
  open,
  onOpenChange,
  product,
  plan,
}: QualificationModalProps) {
  const { addToCart } = useCart();
  const [step, setStep] = useState(0);

  // "Has anything changed?" editable state
  const [biometrics, setBiometrics] = useState<Record<string, string>>(
    () => Object.fromEntries(biometricsQuestions.map((q) => [q.id, q.value]))
  );
  const [medHistory, setMedHistory] = useState<Record<string, string>>(
    () => Object.fromEntries(medicalHistoryQuestions.map((q) => [q.id, q.value]))
  );
  const [medications, setMedications] = useState<Record<string, string>>(
    () => Object.fromEntries(medicationsQuestions.map((q) => [q.id, q.value]))
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  // Step 4: Pregnancy
  const [pregnancyStatus, setPregnancyStatus] = useState("");

  // Step 5: Kick-out conditions
  const [selectedKickout, setSelectedKickout] = useState<string[]>([]);

  // Step 6: Caution conditions
  const [selectedCaution, setSelectedCaution] = useState<string[]>([]);

  // Step 7: GLP-1 history
  const [glp1History, setGlp1History] = useState("");
  const [lastDoseDate, setLastDoseDate] = useState("");

  // Step 8: Informed consent
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentExpanded, setConsentExpanded] = useState(false);

  const resetState = () => {
    setStep(0);
    setBiometrics(Object.fromEntries(biometricsQuestions.map((q) => [q.id, q.value])));
    setMedHistory(Object.fromEntries(medicalHistoryQuestions.map((q) => [q.id, q.value])));
    setMedications(Object.fromEntries(medicationsQuestions.map((q) => [q.id, q.value])));
    setEditingId(null);
    setPregnancyStatus("");
    setSelectedKickout([]);
    setSelectedCaution([]);
    setGlp1History("");
    setLastDoseDate("");
    setConsentChecked(false);
    setConsentExpanded(false);
  };

  const handleClose = (val: boolean) => {
    if (!val) resetState();
    onOpenChange(val);
  };

  const handleStartEdit = (id: string, currentValue: string) => {
    setEditingId(id);
    setEditValue(currentValue);
  };

  const handleSaveEdit = (setter: React.Dispatch<React.SetStateAction<Record<string, string>>>) => {
    if (editingId && editValue.trim()) {
      setter((prev) => ({ ...prev, [editingId]: editValue.trim() }));
    }
    setEditingId(null);
  };

  const toggleCondition = (
    condition: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (condition === "None of the above") {
      setSelected((prev) => (prev.includes(condition) ? [] : [condition]));
    } else {
      setSelected((prev) => {
        const without = prev.filter((c) => c !== "None of the above");
        return without.includes(condition)
          ? without.filter((c) => c !== condition)
          : [...without, condition];
      });
    }
  };

  const handleSubmit = () => {
    if (!product || !plan) return;
    addToCart({
      name: product.name,
      category: product.category,
      image: product.image,
      plan: plan.label,
      pricePerMonth: plan.pricePerMonth,
      months: plan.months,
    });
    handleClose(false);
  };

  const canProceedStep = () => {
    switch (step) {
      case 0: case 1: case 2: case 3: return true;
      case 4: return pregnancyStatus !== "";
      case 5: return selectedKickout.length > 0;
      case 6: return selectedCaution.length > 0;
      case 7: return glp1History !== "" && (glp1History !== "previously" || lastDoseDate.trim() !== "");
      case 8: return consentChecked;
      default: return true;
    }
  };

  if (!product || !plan) return null;

  /* ── Shared "Has Anything Changed?" list renderer ── */
  const renderReviewList = (
    questions: { id: string; label: string; value: string }[],
    answers: Record<string, string>,
    setter: React.Dispatch<React.SetStateAction<Record<string, string>>>
  ) => (
    <div className="max-h-[280px] overflow-y-auto -mx-1 px-1 space-y-0 divide-y divide-border">
      {questions.map((q) => {
        const isEditing = editingId === q.id;
        return (
          <div key={q.id} className="py-3 flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground uppercase">
                {q.label}
              </p>
              {isEditing ? (
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="h-8 text-sm bg-background"
                    autoFocus
                    onKeyDown={(e) => { if (e.key === "Enter") handleSaveEdit(setter); }}
                  />
                  <button
                    onClick={() => handleSaveEdit(setter)}
                    className="flex-shrink-0 h-8 w-8 rounded-md bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                  >
                    <Check className="h-3.5 w-3.5 text-primary-foreground" />
                  </button>
                </div>
              ) : (
                <p className={cn(
                  "text-sm mt-0.5 text-foreground",
                  answers[q.id] !== q.value && "text-primary font-medium"
                )}>
                  {answers[q.id]}
                  {answers[q.id] !== q.value && (
                    <span className="text-[10px] ml-1.5 text-primary">(updated)</span>
                  )}
                </p>
              )}
            </div>
            {!isEditing && (
              <button
                onClick={() => handleStartEdit(q.id, answers[q.id])}
                className="flex-shrink-0 mt-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );

  /* ── Shared condition checklist renderer ── */
  const renderConditionList = (
    conditions: string[],
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => (
    <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
      {conditions.map((c) => (
        <label key={c} className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={selected.includes(c)}
            onCheckedChange={() => toggleCondition(c, selected, setSelected)}
            className="mt-0.5"
          />
          <span className="text-sm font-light text-foreground">{c}</span>
        </label>
      ))}
    </div>
  );

  /* ── Progress bar ── */
  const renderProgress = () => (
    <div className="flex items-center gap-2">
      {Array.from({ length: TOTAL_QUESTION_STEPS }).map((_, i) => (
        <div
          key={i}
          className="h-1 flex-1 rounded-full transition-colors"
          style={{ background: i < step ? "hsl(var(--primary))" : "#D9D5D3" }}
        />
      ))}
    </div>
  );

  /* ── Navigation buttons ── */
  const renderNav = (isLast = false) => (
    <div className="flex gap-3 mt-2">
      <button
        onClick={() => setStep((s) => s - 1)}
        className="flex-1 rounded-md border border-foreground/20 py-3 text-sm font-light text-foreground hover:bg-foreground/5 transition-colors"
      >
        Back
      </button>
      {isLast ? (
        <button
          onClick={handleSubmit}
          disabled={!canProceedStep()}
          className="flex-1 rounded-md bg-primary py-3 text-sm font-light text-foreground hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      ) : (
        <button
          onClick={() => setStep((s) => s + 1)}
          disabled={!canProceedStep()}
          className="flex-1 rounded-md bg-primary py-3 text-sm font-light text-foreground hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[500px] p-0 gap-0 overflow-hidden"
        style={{ background: "#F5F1F0" }}
      >
        {/* Step 0 — Intro */}
        {step === 0 && (
          <div className="flex flex-col">
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <img src={surferSunset} alt="Longevity optimized" className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/50 to-transparent">
                <span className="font-heading text-white text-2xl font-light leading-tight">
                  Longevity.<br />Optimized.
                </span>
              </div>
            </div>
            <div className="px-6 pt-5 pb-6 flex flex-col gap-3">
              <h2 className="font-heading text-2xl font-light text-foreground">Before You Check Out</h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                We'll quickly review your health profile, then ask a few questions specific to this treatment.
              </p>
              <button
                onClick={() => setStep(1)}
                className="mt-3 w-full rounded-md bg-primary py-3.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Steps 1–8 share wrapper */}
        {step >= 1 && (
          <div className="px-6 pt-6 pb-6 flex flex-col gap-5">
            {renderProgress()}

            {/* Step 1 — Biometrics review */}
            {step === 1 && (
              <>
                <div>
                  <p className="text-xs font-light text-muted-foreground tracking-wide uppercase">Biometrics</p>
                  <h3 className="font-heading text-lg font-medium text-foreground mt-1">Has anything changed?</h3>
                  <p className="text-xs font-light text-muted-foreground mt-1 leading-relaxed">
                    Review your answers below. Changes may affect treatment eligibility. Tap the pencil to edit.
                  </p>
                </div>
                {renderReviewList(biometricsQuestions, biometrics, setBiometrics)}
                <button
                  onClick={() => setStep(2)}
                  className="w-full rounded-md bg-primary py-3 text-sm font-light text-foreground hover:bg-primary/90 transition-colors"
                >
                  Confirm &amp; continue
                </button>
              </>
            )}

            {/* Step 2 — Medical History review */}
            {step === 2 && (
              <>
                <div>
                  <p className="text-xs font-light text-muted-foreground tracking-wide uppercase">Medical History</p>
                  <h3 className="font-heading text-lg font-medium text-foreground mt-1">Has anything changed?</h3>
                  <p className="text-xs font-light text-muted-foreground mt-1 leading-relaxed">
                    Review your answers below. Tap the pencil to edit.
                  </p>
                </div>
                {renderReviewList(medicalHistoryQuestions, medHistory, setMedHistory)}
                {renderNav()}
              </>
            )}

            {/* Step 3 — Medications review */}
            {step === 3 && (
              <>
                <div>
                  <p className="text-xs font-light text-muted-foreground tracking-wide uppercase">Medications &amp; Supplements</p>
                  <h3 className="font-heading text-lg font-medium text-foreground mt-1">Has anything changed?</h3>
                  <p className="text-xs font-light text-muted-foreground mt-1 leading-relaxed">
                    Review your answers below. Tap the pencil to edit.
                  </p>
                </div>
                {renderReviewList(medicationsQuestions, medications, setMedications)}
                {renderNav()}
              </>
            )}

            {/* Step 4 — Pregnancy */}
            {step === 4 && (
              <>
                <div>
                  <p className="text-xs font-light text-muted-foreground tracking-wide uppercase">Pregnancy</p>
                  <h3 className="font-heading text-lg font-medium text-foreground mt-1">
                    Are you currently pregnant or breastfeeding?
                  </h3>
                </div>
                <SingleSelect
                  options={PREGNANCY_OPTIONS}
                  value={pregnancyStatus}
                  onChange={setPregnancyStatus}
                />
                {(pregnancyStatus === "pregnant" || pregnancyStatus === "breastfeeding") && (
                  <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 animate-fade-in">
                    <p className="text-sm text-foreground leading-relaxed">
                      <strong>Please note:</strong> Some prescription treatments may not be available during pregnancy or while breastfeeding. Our medical team will review your responses.
                    </p>
                  </div>
                )}
                {renderNav()}
              </>
            )}

            {/* Step 5 — GLP-1 Kick-out conditions */}
            {step === 5 && (
              <>
                <div>
                  <p className="text-xs font-light text-muted-foreground tracking-wide uppercase">GLP-1 Medical Screening</p>
                  <h3 className="font-heading text-lg font-medium text-foreground mt-1">
                    Have you been diagnosed with any of the following?
                  </h3>
                  <p className="text-xs font-light text-muted-foreground mt-1 leading-relaxed">
                    Select all that apply. These conditions may affect your eligibility.
                  </p>
                </div>
                {renderConditionList(kickoutConditions, selectedKickout, setSelectedKickout)}
                {renderNav()}
              </>
            )}

            {/* Step 6 — GLP-1 Caution conditions */}
            {step === 6 && (
              <>
                <div>
                  <p className="text-xs font-light text-muted-foreground tracking-wide uppercase">GLP-1 Medical Screening</p>
                  <h3 className="font-heading text-lg font-medium text-foreground mt-1">
                    Do any of the following apply to you?
                  </h3>
                  <p className="text-xs font-light text-muted-foreground mt-1 leading-relaxed">
                    Select all that apply. These may require additional clinical review.
                  </p>
                </div>
                {renderConditionList(cautionConditions, selectedCaution, setSelectedCaution)}
                {renderNav()}
              </>
            )}

            {/* Step 7 — GLP-1 History */}
            {step === 7 && (
              <>
                <div>
                  <p className="text-xs font-light text-muted-foreground tracking-wide uppercase">GLP-1 History</p>
                  <h3 className="font-heading text-lg font-medium text-foreground mt-1">
                    Are you currently taking or have you previously taken any GLP-1 or GLP-1 + GIP medications?
                  </h3>
                </div>
                <SingleSelect
                  options={GLP1_HISTORY_OPTIONS}
                  value={glp1History}
                  onChange={(v) => { setGlp1History(v); if (v !== "previously") setLastDoseDate(""); }}
                />
                {glp1History === "previously" && (
                  <div className="animate-fade-in space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
                      When was your last dose?
                    </p>
                    <Input
                      type="date"
                      value={lastDoseDate}
                      onChange={(e) => setLastDoseDate(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                )}
                {renderNav()}
              </>
            )}

            {/* Step 8 — Informed Consent */}
            {step === 8 && (
              <>
                <div>
                  <p className="text-xs font-light text-muted-foreground tracking-wide uppercase">Informed Consent</p>
                  <h3 className="font-heading text-lg font-medium text-foreground mt-1">
                    GLP-1 Medication Consent
                  </h3>
                </div>

                {/* Expandable consent document */}
                <button
                  onClick={() => setConsentExpanded(!consentExpanded)}
                  className="flex items-center justify-between w-full rounded-lg border border-border bg-background p-4 text-left hover:bg-background/80 transition-colors"
                >
                  <span className="text-sm font-medium text-foreground">Informed Consent for GLP-1 Medication</span>
                  {consentExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                {consentExpanded && (
                  <div className="rounded-lg border border-border bg-background p-4 max-h-[200px] overflow-y-auto animate-fade-in">
                    <div className="text-xs font-light text-muted-foreground leading-relaxed space-y-3">
                      <p className="font-medium text-foreground text-sm">INFORMED CONSENT FOR GLP-1 MEDICATION</p>
                      <p>By signing this consent, you acknowledge that you have been informed about the potential benefits, risks, and side effects associated with GLP-1 receptor agonist medications, including but not limited to semaglutide and tirzepatide.</p>
                      <p><strong>Common side effects</strong> may include nausea, vomiting, diarrhea, constipation, abdominal pain, headache, fatigue, and injection site reactions.</p>
                      <p><strong>Serious risks</strong> may include pancreatitis, gallbladder disease, kidney problems, allergic reactions, thyroid tumors (including medullary thyroid carcinoma), and hypoglycemia (especially when used with insulin or sulfonylureas).</p>
                      <p>You understand that this medication is prescribed as part of a comprehensive treatment plan and should be used in conjunction with lifestyle modifications including diet and exercise.</p>
                      <p>You agree to report any adverse effects to your healthcare provider promptly and to attend all scheduled follow-up appointments.</p>
                    </div>
                  </div>
                )}

                {/* Consent checkbox */}
                <label className="flex items-start gap-3 cursor-pointer mt-1">
                  <Checkbox
                    checked={consentChecked}
                    onCheckedChange={(checked) => setConsentChecked(checked === true)}
                    className="mt-0.5"
                  />
                  <span className="text-sm font-light text-foreground leading-relaxed">
                    I have read and understand the Informed Consent for GLP-1 Medication
                  </span>
                </label>

                {renderNav(true)}
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
