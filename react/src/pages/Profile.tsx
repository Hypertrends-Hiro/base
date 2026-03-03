import { useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Pencil, Download, ChevronRight, Copy, Info, Lock, Eye, EyeOff, Check } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

/* ── Intake sub-categories ── */
const intakeCategories = [
  "Demographics",
  "Health Goals and Motivation",
  "Medical History and Current Health",
  "Medications and Supplements",
  "Lifestyle and Habits",
  "Substance Use",
  "Subjective Symptoms and Wellness",
  "Biometrics and Measurements",
  "Wearables and Tracking",
];

/* ── Mock Data ── */
const accountFields = [
  { label: "LEGAL NAME", value: "Elisa George" },
  { label: "BIOLOGICAL SEX", value: "Female" },
  { label: "EMAIL", value: "elisa.george@email.com" },
  { label: "DATE OF BIRTH", value: "05/05/1985" },
  { label: "ADDRESS", value: "123 Wellness Ave, Austin TX 78701" },
  { label: "PHONE NUMBER", value: "(512) 555-0198" },
];

const intakeData: Record<string, { label: string; value: string }[]> = {
  Demographics: [
    { label: "AGE", value: "39" },
    { label: "HEIGHT", value: "5'6\"" },
    { label: "WEIGHT", value: "145 lbs" },
    { label: "ETHNICITY", value: "Caucasian" },
    { label: "BIOLOGICAL SEX", value: "Female" },
    { label: "STATE", value: "Texas" },
  ],
  "Health Goals and Motivation": [
    { label: "PRIMARY GOAL", value: "Weight management" },
    { label: "SECONDARY GOAL", value: "Better energy levels" },
    { label: "MOTIVATION", value: "Feel healthier and more confident" },
    { label: "TIMELINE", value: "6 months" },
  ],
  "Medical History and Current Health": [
    { label: "CONDITIONS", value: "None reported" },
    { label: "FAMILY HISTORY", value: "Hypertension (maternal)" },
    { label: "ALLERGIES", value: "Penicillin" },
    { label: "SURGERIES", value: "None" },
  ],
  "Medications and Supplements": [
    { label: "CURRENT MEDICATIONS", value: "None" },
    { label: "SUPPLEMENTS", value: "Vitamin D, Omega-3" },
    { label: "FREQUENCY", value: "Daily" },
  ],
  "Lifestyle and Habits": [
    { label: "EXERCISE FREQUENCY", value: "3-4 times per week" },
    { label: "EXERCISE TYPE", value: "Yoga, Running" },
    { label: "DIET TYPE", value: "Mediterranean" },
    { label: "MEAL FREQUENCY", value: "3 meals, 1 snack" },
  ],
  "Substance Use": [
    { label: "SMOKING", value: "Never" },
    { label: "ALCOHOL", value: "Social (1-2 drinks/week)" },
    { label: "CAFFEINE", value: "2 cups coffee daily" },
  ],
  "Subjective Symptoms and Wellness": [
    { label: "ENERGY LEVEL", value: "Moderate" },
    { label: "SLEEP QUALITY", value: "Good" },
    { label: "STRESS LEVEL", value: "Moderate" },
    { label: "MOOD", value: "Generally positive" },
  ],
  "Biometrics and Measurements": [
    { label: "BLOOD PRESSURE", value: "118/76 mmHg" },
    { label: "RESTING HEART RATE", value: "72 bpm" },
    { label: "BODY FAT %", value: "28%" },
    { label: "WAIST CIRCUMFERENCE", value: "30 in" },
  ],
  "Wearables and Tracking": [
    { label: "DEVICE", value: "Apple Watch Series 9" },
    { label: "CONNECTED", value: "Yes" },
    { label: "TRACKING SINCE", value: "January 2024" },
  ],
};

const documents = [
  { source: "Quest", name: "LAB RESULTS OF 05/05/2025" },
  { source: "Upload", name: "BLOODWORK PANEL 02/12/2025" },
  { source: "Quest", name: "METABOLIC PANEL 11/20/2024" },
  { source: "Upload", name: "ALLERGY TEST RESULTS 08/03/2024" },
];

const initialAddresses = [
  { id: 1, default: true, street: "123 Wellness Ave, Apt 4B,", city: "Austin", state: "TX", zip: "78701", phone: "512-555-0198" },
  { id: 2, default: false, street: "456 Oak Street, Suite 200,", city: "Dallas", state: "TX", zip: "75201", phone: "817-762-1523" },
  { id: 3, default: false, street: "789 Elm Drive,", city: "San Diego", state: "CA", zip: "92628", phone: "619-555-0342" },
];

const initialPaymentMethods = [
  { id: 1, default: true, label: "VISA ****6590", name: "Elisa George", number: "**** **** **** 6590", expiry: "09/27", type: "Visa" },
  { id: 2, default: false, label: "MASTERCARD ****3321", name: "Elisa George", number: "**** **** **** 3321", expiry: "03/26", type: "Mastercard" },
];

const orders = [
  { date: "05/10/2025", item: "KWILT Membership — Monthly", amount: "$99.00" },
  { date: "04/10/2025", item: "KWILT Membership — Monthly", amount: "$99.00" },
  { date: "03/15/2025", item: "Balance Supplement Pack", amount: "$49.00" },
  { date: "03/10/2025", item: "KWILT Membership — Monthly", amount: "$99.00" },
];

/* ── Shared field grid ── */
function FieldGrid({ fields }: { fields: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
      {fields.map((f) => (
        <div key={f.label} className="py-3 border-b border-border">
          <p className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground">{f.label}</p>
          <p className="text-sm mt-1 text-foreground">{f.value}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Notification preference row ── */
function NotificationPrefRow({ label }: { label: string }) {
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center justify-between py-4 border-b border-border">
      <span className="text-sm text-foreground">{label}</span>
      <div className="flex items-center gap-4">
        <button onClick={() => setOn(true)} className="flex items-center gap-1.5">
          <span className={cn("h-3 w-3 rounded-full border-2", on ? "bg-primary border-primary" : "border-muted-foreground")} />
          <span className="text-sm text-foreground">On</span>
        </button>
        <button onClick={() => setOn(false)} className="flex items-center gap-1.5">
          <span className={cn("h-3 w-3 rounded-full border-2", !on ? "bg-primary border-primary" : "border-muted-foreground")} />
          <span className="text-sm text-foreground">Off</span>
        </button>
      </div>
    </div>
  );
}

/* ── Collapsible row ── */
function CollapsibleRow({ label, children }: { label: string; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between py-4 border-b border-border text-left">
        <span className="text-xs font-medium tracking-[0.15em] text-foreground">{label}</span>
        <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-90")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="py-3 text-sm text-muted-foreground">
        {children ?? <p className="text-sm">Content coming soon.</p>}
      </CollapsibleContent>
    </Collapsible>
  );
}

/* ── Change Password Row + Modal ── */
function ChangePasswordRow() {
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    setSuccess(true);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
    setShowNew(false);
    setShowConfirm(false);
  };

  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between py-4 border-b border-border text-left"
      >
        <span className="text-xs font-medium tracking-[0.15em] text-foreground">CHANGE PASSWORD</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </button>

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md p-6" style={{ background: "#F5F1F0" }}>
          {!success ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-foreground" />
                <h2 className="font-heading text-xl font-medium">Change Password</h2>
              </div>
              <p className="text-sm font-light text-muted-foreground mb-6">
                Enter a new password below to change your password
              </p>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">New Password</label>
                  <div className="relative">
                    <Input
                      type={showNew ? "text" : "password"}
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-background border-border/60 pr-16"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      {newPassword.length >= 6 && (
                        <Check className="h-4 w-4 text-green-600" />
                      )}
                      <button onClick={() => setShowNew(!showNew)} className="text-muted-foreground hover:text-foreground">
                        {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Confirm Password</label>
                  <div className="relative">
                    <Input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-background border-border/60 pr-16"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      {passwordsMatch && (
                        <Check className="h-4 w-4 text-green-600" />
                      )}
                      <button onClick={() => setShowConfirm(!showConfirm)} className="text-muted-foreground hover:text-foreground">
                        {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!passwordsMatch}
                  className="w-full rounded-md bg-foreground py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Change Password
                </button>

                <p className="text-xs font-light text-muted-foreground text-center">
                  By continuing, you are to <span className="underline">Kwilt's Terms of Service</span> and <span className="underline">Privacy Policy</span>
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-heading text-xl font-medium mb-2">Reset Password</h2>
              <p className="text-sm font-light text-muted-foreground mb-6">
                Your password has been successfully changed, please use your new password to log in.
              </p>
              <button
                onClick={handleClose}
                className="w-full rounded-md bg-foreground py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
              >
                Close
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ── Delete Account Row + Modal ── */
function DeleteAccountRow() {
  const [open, setOpen] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setAcknowledged(false);
    setDeleted(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between py-4 border-b border-border text-left"
      >
        <span className="text-xs font-medium tracking-[0.15em] text-foreground">DELETE ACCOUNT</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </button>

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-sm p-6">
          {!deleted ? (
            <div className="text-center">
              <h2 className="font-heading text-xl font-medium mb-2">Delete Account</h2>
              <p className="text-sm font-light text-muted-foreground mb-6">
                Are you sure you want to delete<br />'egeorge@gmail.com' from kwilt?
              </p>
              <div className="flex items-start gap-2 text-left mb-6">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
                />
                <span className="text-xs font-light text-muted-foreground leading-relaxed">
                  I acknowledge this is an irreversible action and that this account will be permanently deleted upon removal
                </span>
              </div>
              <button
                onClick={() => setDeleted(true)}
                disabled={!acknowledged}
                className="w-full rounded-md bg-destructive py-3 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="font-heading text-xl font-medium mb-2">Success</h2>
              <p className="text-sm font-light text-muted-foreground mb-6">
                You have successfully deleted your account.
              </p>
              <button
                onClick={handleClose}
                className="w-full rounded-md bg-foreground py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ── Shipping Address Section ── */
type Address = { id: number; default: boolean; street: string; city: string; state: string; zip: string; phone: string };

function EditAddressModal({ address, open, onOpenChange }: { address: Address; open: boolean; onOpenChange: (v: boolean) => void }) {
  const [street, setStreet] = useState(address.street);
  const [city, setCity] = useState(address.city);
  const [state, setState] = useState(address.state);
  const [zip, setZip] = useState(address.zip);
  const [phone, setPhone] = useState(address.phone);
  const [defaultBilling, setDefaultBilling] = useState(false);
  const [defaultShipping, setDefaultShipping] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6" style={{ background: "#F5F1F0" }}>
        <h2 className="font-heading text-xl font-medium mb-4">Edit an address</h2>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground mb-1 block">STREET ADDRESS*</label>
            <Input value={street} onChange={(e) => setStreet(e.target.value)} className="bg-background" />
          </div>
          <div>
            <label className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground mb-1 block">CITY*</label>
            <Input value={city} onChange={(e) => setCity(e.target.value)} className="bg-background" />
          </div>
          <div>
            <label className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground mb-1 block">STATE*</label>
            <Input value={state} onChange={(e) => setState(e.target.value)} className="bg-background" />
          </div>
          <div>
            <label className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground mb-1 block">ZIP CODE*</label>
            <Input value={zip} onChange={(e) => setZip(e.target.value)} className="bg-background" />
          </div>
          <div>
            <label className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground mb-1 block">PHONE NUMBER*</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-background" />
          </div>
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={defaultBilling} onChange={(e) => setDefaultBilling(e.target.checked)} className="h-4 w-4 rounded border-border accent-primary" />
              <span className="text-sm text-foreground">Set as default billing address</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={defaultShipping} onChange={(e) => setDefaultShipping(e.target.checked)} className="h-4 w-4 rounded border-border accent-primary" />
              <span className="text-sm text-foreground">Set as default shipping address</span>
            </label>
          </div>
          <div className="flex items-center justify-between pt-2">
            <button onClick={() => onOpenChange(false)} className="text-sm font-medium text-foreground hover:text-foreground/80">Cancel</button>
            <button onClick={() => onOpenChange(false)} className="rounded-md bg-foreground px-8 py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors">Save</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ShippingAddressSection() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [editAddr, setEditAddr] = useState<Address | null>(null);

  const formatLine = (a: Address) => `${a.street} ${a.city} ${a.state} ${a.zip}`.toUpperCase();

  const handleSetDefault = (id: number) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, default: a.id === id })));
  };

  const defaultAddr = addresses.find((a) => a.default)!;
  const otherAddrs = addresses.filter((a) => !a.default);

  return (
    <section>
      <SectionHeading>Shipping address</SectionHeading>
      <div className="divide-y divide-border">
        {/* Default address — always first row */}
        <div key={defaultAddr.id} className="flex items-center gap-3 px-6 py-4">
          <DefaultBadge />
          <span className="text-xs font-medium tracking-[0.1em] text-foreground flex-1">{formatLine(defaultAddr)}</span>
          <button onClick={() => setEditAddr(defaultAddr)} className="text-muted-foreground hover:text-foreground">
            <Pencil className="h-4 w-4" />
          </button>
        </div>

        {/* Other addresses — single collapsible */}
        {otherAddrs.length > 0 && (
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center gap-3 px-6 py-4 text-left">
              <span className="text-xs font-medium tracking-[0.1em] text-muted-foreground flex-1">OTHER ADDRESSES</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 pb-4 space-y-3">
              {otherAddrs.map((addr) => (
                <div key={addr.id} className="flex items-center gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                  <span className="text-xs font-medium tracking-[0.1em] text-foreground flex-1">{formatLine(addr)}</span>
                  <button onClick={() => handleSetDefault(addr.id)} className="text-xs text-primary hover:underline mr-2">Set as default</button>
                  <button onClick={() => setEditAddr(addr)} className="text-muted-foreground hover:text-foreground">
                    <Pencil className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
      {editAddr && (
        <EditAddressModal address={editAddr} open={!!editAddr} onOpenChange={(v) => { if (!v) setEditAddr(null); }} />
      )}
    </section>
  );
}

/* ── Payment Method Section ── */
type PaymentMethod = { id: number; default: boolean; label: string; name: string; number: string; expiry: string; type: string };

function EditPaymentModal({ pm, open, onOpenChange }: { pm: PaymentMethod; open: boolean; onOpenChange: (v: boolean) => void }) {
  const [name, setName] = useState(pm.name);
  const [number, setNumber] = useState(pm.number);
  const [expiry, setExpiry] = useState(pm.expiry);
  const [setAsDefault, setSetAsDefault] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6" style={{ background: "#F5F1F0" }}>
        <h2 className="font-heading text-xl font-medium mb-4">Edit payment method</h2>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground mb-1 block">CARDHOLDER NAME*</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-background" />
          </div>
          <div>
            <label className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground mb-1 block">CARD NUMBER*</label>
            <Input value={number} onChange={(e) => setNumber(e.target.value)} className="bg-background" />
          </div>
          <div>
            <label className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground mb-1 block">EXPIRY DATE*</label>
            <Input value={expiry} onChange={(e) => setExpiry(e.target.value)} className="bg-background" placeholder="MM/YY" />
          </div>
          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={setAsDefault} onChange={(e) => setSetAsDefault(e.target.checked)} className="h-4 w-4 rounded border-border accent-primary" />
              <span className="text-sm text-foreground">Set as default payment method</span>
            </label>
          </div>
          <div className="flex items-center justify-between pt-2">
            <button onClick={() => onOpenChange(false)} className="text-sm font-medium text-foreground hover:text-foreground/80">Cancel</button>
            <button onClick={() => onOpenChange(false)} className="rounded-md bg-foreground px-8 py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors">Save</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PaymentMethodSection() {
  const [methods, setMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [editPm, setEditPm] = useState<PaymentMethod | null>(null);

  const handleSetDefault = (id: number) => {
    setMethods((prev) => prev.map((m) => ({ ...m, default: m.id === id })));
  };

  const defaultPm = methods.find((m) => m.default)!;
  const otherPms = methods.filter((m) => !m.default);

  return (
    <section>
      <SectionHeading>Payment method</SectionHeading>
      <div className="divide-y divide-border">
        <div className="flex items-center gap-3 px-6 py-4">
          <DefaultBadge />
          <span className="text-xs font-medium tracking-[0.1em] text-foreground flex-1">{defaultPm.label}</span>
          <button onClick={() => setEditPm(defaultPm)} className="text-muted-foreground hover:text-foreground">
            <Pencil className="h-4 w-4" />
          </button>
        </div>
        {otherPms.map((pm) => (
          <Collapsible key={pm.id}>
            <CollapsibleTrigger className="flex w-full items-center gap-3 px-6 py-4 text-left">
              <span className="text-xs font-medium tracking-[0.1em] text-muted-foreground flex-1">OTHER PAYMENT METHOD</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium tracking-[0.1em] text-foreground flex-1">{pm.label}</span>
                <button onClick={() => handleSetDefault(pm.id)} className="text-xs text-primary hover:underline mr-2">Set as default</button>
                <button onClick={() => setEditPm(pm)} className="text-muted-foreground hover:text-foreground">
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
      {editPm && (
        <EditPaymentModal pm={editPm} open={!!editPm} onOpenChange={(v) => { if (!v) setEditPm(null); }} />
      )}
    </section>
  );
}

/* ── Default pill ── */
function DefaultBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-medium text-primary-foreground">
      Default
    </span>
  );
}

/* ── Source badge ── */
function SourceBadge({ source }: { source: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium text-accent-foreground">
      {source}
    </span>
  );
}

/* ── Section heading ── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-heading text-xl tracking-tight text-foreground mb-4">{children}</h2>;
}

/* ══════════════════════ PROFILE PAGE ══════════════════════ */

export default function Profile() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [activeIntake, setActiveIntake] = useState(intakeCategories[0]);
  const intakeRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [navOffset, setNavOffset] = useState(0);
  const [logoutOpen, setLogoutOpen] = useState(false);

  useLayoutEffect(() => {
    if (isMobile || !intakeRef.current || !rightColRef.current) return;
    const updateOffset = () => {
      const rightTop = rightColRef.current!.getBoundingClientRect().top;
      const intakeTop = intakeRef.current!.getBoundingClientRect().top;
      setNavOffset(intakeTop - rightTop);
    };
    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    observer.observe(rightColRef.current);
    window.addEventListener("resize", updateOffset);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateOffset);
    };
  }, [isMobile]);

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* ── LEFT COLUMN ── */}
          {!isMobile && (
            <div className="md:w-[200px] shrink-0 md:sticky md:top-8 md:self-start">
              <h1 className="font-heading text-2xl tracking-tight text-foreground mb-6 text-right">
                KWILT<span className="text-[10px] align-super">™</span> profile
              </h1>
              <nav className="flex flex-col gap-0.5" style={{ marginTop: navOffset > 0 ? navOffset - 24 : 0 }}>
                {intakeCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveIntake(cat)}
                    className={cn(
                      "text-[11px] leading-tight font-medium text-right py-1 pr-4 relative transition-colors uppercase tracking-[0.08em]",
                      activeIntake === cat ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {activeIntake === cat && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                    {cat}
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* ── RIGHT COLUMN ── */}
          <div className="flex-1 space-y-12 min-w-0" ref={rightColRef}>
            {/* Account Settings */}
            <section>
              <div className="flex items-center justify-between">
                <SectionHeading>Account settings</SectionHeading>
                <button
                  onClick={() => setLogoutOpen(true)}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Log out
                </button>
              </div>
              <div className="bg-card rounded-md p-6 shadow-soft relative">
                <button className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                  <Pencil className="h-4 w-4" />
                </button>
                <FieldGrid fields={accountFields} />
              </div>
              <div className="mt-2">
                <ChangePasswordRow />
                <CollapsibleRow label="NOTIFICATION PREFERENCES">
                  <div className="space-y-0">
                    {["Newsletters", "Email notifications", "SMS notifications"].map((pref) => (
                      <NotificationPrefRow key={pref} label={pref} />
                    ))}
                  </div>
                </CollapsibleRow>
                <DeleteAccountRow />
              </div>
            </section>

            {/* Intake Responses */}
            <section ref={intakeRef}>
            {/* Mobile: intake category selector */}
            {isMobile && (
              <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none mb-4">
                {intakeCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveIntake(cat)}
                    className={cn(
                      "text-xs font-medium px-3 py-1.5 rounded-full border border-border whitespace-nowrap",
                      activeIntake === cat
                        ? "bg-primary text-primary-foreground border-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <div className="bg-card rounded-md p-6 shadow-soft" style={{ minHeight: "320px" }}>
              <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground mb-3">{activeIntake.toUpperCase()}</p>
              <FieldGrid fields={intakeData[activeIntake] || []} />
            </div>
          </section>

          {/* Your Documents */}
          <section>
            <SectionHeading>Your documents</SectionHeading>
            <div className="bg-card rounded-md shadow-soft divide-y divide-border">
              {documents.map((doc) => (
                <div key={doc.name} className="flex items-center gap-3 px-6 py-4">
                  <SourceBadge source={doc.source} />
                  <span className="text-xs font-medium tracking-[0.1em] text-foreground flex-1">{doc.name}</span>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Shipping Address */}
          <ShippingAddressSection />

          {/* Payment Method */}
          <PaymentMethodSection />

          {/* Order History */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl tracking-tight text-foreground">Order history</h2>
              <button
                onClick={() => navigate("/order-history")}
                className="text-xs font-medium tracking-[0.1em] text-primary hover:underline"
              >
                View all
              </button>
            </div>
            <CollapsibleRow label="VIEW ORDER HISTORY">
              <div className="divide-y divide-border">
                {orders.map((o, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-xs font-medium tracking-[0.1em] text-foreground">{o.item}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{o.date}</p>
                    </div>
                    <span className="text-sm font-medium text-foreground">{o.amount}</span>
                  </div>
                ))}
              </div>
            </CollapsibleRow>
          </section>

          {/* Referrals */}
          <section>
            <SectionHeading>Referrals</SectionHeading>
            <div className="space-y-0">
              {/* Copy referral link */}
              <div className="flex items-center justify-between py-4 border-b border-border">
                <span className="text-xs font-medium tracking-[0.15em] text-foreground">COPY YOUR REFERRAL LINK</span>
                <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-medium text-primary-foreground hover:bg-primary/90">
                  <Copy className="h-3 w-3" />
                  COPY
                </button>
              </div>
              <p className="text-xs text-muted-foreground py-2">
                Wallet balance gets applied to next membership billing cycle.
              </p>
              {/* Credits */}
              <div className="flex items-center justify-between py-4 border-b border-border">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.15em] text-foreground">
                  YOUR CREDITS
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </span>
                <span className="text-sm font-medium text-foreground">$100.00</span>
              </div>
              {/* Referral history */}
              <CollapsibleRow label="CREDIT HISTORY">
                <div className="divide-y divide-border">
                  {[
                    { description: "mike.tyson@gmail.com", date: "10/16/2025", amount: "$100.00" },
                    { description: "Redeemed (order #2134)", date: "8/16/2025", amount: "-$49.00" },
                    { description: "manny.p@gmail.com", date: "6/26/2025", amount: "$49.00" },
                  ].map((entry, i) => (
                    <div key={i} className="flex items-center justify-between py-3">
                      <span className="text-xs font-normal tracking-[0.1em] text-foreground flex-1">{entry.description}</span>
                      <span className="text-xs font-normal text-muted-foreground w-28">{entry.date}</span>
                      <span className="text-sm font-normal text-foreground text-right w-20">{entry.amount}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleRow>
            </div>
          </section>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="sm:max-w-[440px] p-6 gap-0" style={{ background: "#F5F1F0" }}>
          <DialogHeader className="pb-4 border-b border-border">
            <DialogTitle className="font-heading text-xl font-medium text-foreground">
              Logout
            </DialogTitle>
          </DialogHeader>
          <div className="py-10 text-center">
            <p className="font-heading text-lg text-foreground">Are you sure you want to logout?</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setLogoutOpen(false)}
              className="flex-1 rounded-md border border-border bg-card py-3.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => { setLogoutOpen(false); navigate("/login"); }}
              className="flex-1 rounded-md bg-primary py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Confirm
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
