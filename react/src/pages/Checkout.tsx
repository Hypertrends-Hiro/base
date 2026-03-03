import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, CreditCard, MapPin, ChevronDown } from "lucide-react";
import kwiltLogoDark from "@/assets/kwilt-logo-dark.png";

/* ─── Mock saved data (simulates account data) ─── */
const MOCK_USER = {
  firstName: "Sandra",
  lastName: "Mitchell",
  email: "sandra.mitchell@gmail.com",
  dob: "03/15/1985",
  gender: "Female",
};

const MOCK_ADDRESSES = [
  { id: "addr1", label: "Home", street: "13280 Evening Creek Dr S", city: "San Diego", state: "California", zip: "92129", phone: "888-299-5088" },
  { id: "addr2", label: "Work", street: "456 Market Street", city: "San Francisco", state: "California", zip: "94105", phone: "415-555-1234" },
];

const MOCK_PAYMENTS = [
  { id: "pay1", label: "Visa ending in 4242", last4: "4242", brand: "Visa", expiry: "12/27" },
  { id: "pay2", label: "Mastercard ending in 8888", last4: "8888", brand: "Mastercard", expiry: "06/26" },
];

/* ─── Shared input class ─── */
const inputClass =
  "h-12 rounded-md border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none";

function FormField({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[10px] font-semibold uppercase tracking-widest text-foreground">{label}</label>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-6">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground w-28 shrink-0">{label}</span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  );
}

/* ─── Order Summary (right column) ─── */
function OrderSummary() {
  const { items, removeFromCart, subtotal } = useCart();
  const [discountCode, setDiscountCode] = useState("");

  return (
    <div className="sticky top-10">
      <h2 className="font-heading text-2xl font-medium text-foreground mb-6">Summary</h2>

      {/* Cart items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => {
          const total = item.pricePerMonth * item.months * item.quantity;
          return (
            <div key={`${item.name}-${item.plan}`} className="flex gap-3 rounded-lg bg-card border border-border p-3">
              <div className="h-16 w-16 flex-none rounded-md overflow-hidden bg-card">
                <img src={item.image} alt={item.name} className="h-full w-full object-contain p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.plan === "MONTHLY"
                        ? `Member Monthly Subscription – $${item.pricePerMonth}/mo`
                        : `Member ${item.months}-month Subscription – $${item.pricePerMonth}/mo`}
                    </p>
                  </div>
                  <button onClick={() => removeFromCart(item.name, item.plan)} className="text-muted-foreground hover:text-foreground ml-2">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  ${item.pricePerMonth * item.months} for a {item.months === 1 ? "1-month" : `${item.months}-month`} supply
                </p>
                <p className="font-medium text-sm mt-1">${total}</p>
              </div>
            </div>
          );
        })}
      </div>

      <hr className="border-border mb-4" />

      {/* Discount code */}
      <div className="flex items-center gap-2 border border-border rounded-md px-3 py-2 mb-6">
        <input
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Discount or Gift Card Code"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Apply</button>
      </div>

      <hr className="border-border mb-4" />

      {/* Totals */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="font-medium">${subtotal.toLocaleString()}.00</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between pt-2 text-base">
          <span>Total:</span>
          <span className="font-heading text-xl font-semibold">${subtotal.toLocaleString()}.00</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Checkout page ─── */
export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(2); // Start at shipping since info is prefilled

  // Shipping
  const [selectedAddressId, setSelectedAddressId] = useState(MOCK_ADDRESSES[0].id);
  const [shippingForm, setShippingForm] = useState({ street: "", city: "", state: "", zip: "", phone: "" });
  const [useNewAddress, setUseNewAddress] = useState(false);

  // Payment
  const [selectedPaymentId, setSelectedPaymentId] = useState(MOCK_PAYMENTS[0].id);
  const [useNewPayment, setUseNewPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ cardNumber: "", expiry: "", cvv: "", nameOnCard: "", street: "", city: "", state: "", zip: "", phone: "" });
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const selectedAddress = MOCK_ADDRESSES.find((a) => a.id === selectedAddressId);

  const handleShippingContinue = () => setStep(3);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
    const orderState = {
      items: [...items],
      subtotal: items.reduce((sum, i) => sum + i.pricePerMonth * i.months * i.quantity, 0),
      orderNumber,
      firstName: MOCK_USER.firstName,
    };
    clearCart();
    navigate("/thank-you", { state: orderState });
  };

  const set = (setter: React.Dispatch<React.SetStateAction<any>>) => (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setter((f: any) => ({ ...f, [field]: e.target.value }));

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center flex-col gap-4">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Button onClick={() => navigate("/treatments")} variant="outline">Browse Treatments</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Steps */}
      <div className="md:w-[55%] bg-card flex flex-col px-8 py-8 md:px-12 md:py-10 md:min-h-screen md:overflow-y-auto">
        <Link to="/" className="mb-10">
          <img src={kwiltLogoDark} alt="KWILT" className="h-7 w-auto" />
        </Link>

        {/* ── Step 1: Info (always collapsed/read-only) ── */}
        <div className="mb-8">
          <p className="text-xs text-muted-foreground mb-1">1 of 3</p>
          <h2 className={`font-heading text-2xl font-medium ${step > 1 ? "text-muted-foreground" : "text-foreground"}`}>
            Info
          </h2>
          {/* Always show read-only summary */}
          <div className="mt-4 space-y-1.5">
            <InfoRow label="First Name" value={MOCK_USER.firstName} />
            <InfoRow label="Last Name" value={MOCK_USER.lastName} />
            <InfoRow label="Email" value={MOCK_USER.email} />
            <InfoRow label="Date of Birth" value={MOCK_USER.dob} />
            <InfoRow label="Gender" value={MOCK_USER.gender} />
          </div>
        </div>

        <hr className="border-border mb-8" />

        {/* ── Step 2: Shipping ── */}
        <div className="mb-8">
          <p className="text-xs text-muted-foreground mb-1">2 of 3</p>
          <div className="flex items-center justify-between">
            <h2 className={`font-heading text-2xl font-medium ${step !== 2 ? "text-muted-foreground" : "text-foreground"}`}>Shipping</h2>
            {step > 2 && (
              <button onClick={() => setStep(2)} className="text-sm text-primary hover:text-primary/80">Edit</button>
            )}
          </div>

          {step === 2 ? (
            <div className="mt-5 space-y-4">
              {/* Saved address selector */}
              {MOCK_ADDRESSES.length > 0 && !useNewAddress && (
                <FormField label="Saved Addresses">
                  <select
                    className={inputClass + " appearance-none cursor-pointer"}
                    value={selectedAddressId}
                    onChange={(e) => setSelectedAddressId(e.target.value)}
                  >
                    {MOCK_ADDRESSES.map((a) => (
                      <option key={a.id} value={a.id}>{a.label} – {a.street}, {a.city}</option>
                    ))}
                  </select>
                </FormField>
              )}

              {!useNewAddress && (
                <button
                  type="button"
                  onClick={() => setUseNewAddress(true)}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  + Add new address
                </button>
              )}

              {useNewAddress && (
                <>
                  <button type="button" onClick={() => setUseNewAddress(false)} className="text-sm text-primary hover:text-primary/80 mb-2">
                    ← Use saved address
                  </button>
                  <FormField label="Street Address*">
                    <Input className={inputClass} placeholder="Street address" value={shippingForm.street} onChange={set(setShippingForm)("street")} required />
                  </FormField>
                  <FormField label="City*">
                    <Input className={inputClass} placeholder="City" value={shippingForm.city} onChange={set(setShippingForm)("city")} required />
                  </FormField>
                  <FormField label="State*">
                    <Input className={inputClass} placeholder="State" value={shippingForm.state} onChange={set(setShippingForm)("state")} required />
                  </FormField>
                  <FormField label="Zip Code*">
                    <Input className={inputClass} placeholder="Zip code" value={shippingForm.zip} onChange={set(setShippingForm)("zip")} required />
                  </FormField>
                  <FormField label="Phone Number*">
                    <Input className={inputClass} placeholder="Phone number" value={shippingForm.phone} onChange={set(setShippingForm)("phone")} required />
                  </FormField>
                </>
              )}

              <Button
                type="button"
                onClick={handleShippingContinue}
                className="w-full h-12 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 mt-2"
              >
                Continue
              </Button>
            </div>
          ) : step > 2 && selectedAddress ? (
            <div className="mt-4 space-y-1.5">
              <InfoRow label="Street Address" value={selectedAddress.street} />
              <InfoRow label="City" value={selectedAddress.city} />
              <InfoRow label="State" value={selectedAddress.state} />
              <InfoRow label="Zip Code" value={selectedAddress.zip} />
              <InfoRow label="Phone Number" value={selectedAddress.phone} />
            </div>
          ) : null}
        </div>

        <hr className="border-border mb-8" />

        {/* ── Step 3: Payment ── */}
        <div className="mb-8">
          <p className="text-xs text-muted-foreground mb-1">3 of 3</p>
          <h2 className={`font-heading text-2xl font-medium ${step !== 3 ? "text-muted-foreground" : "text-foreground"}`}>Payment</h2>

          {step === 3 ? (
            <form onSubmit={handleSubmitOrder} className="mt-5 space-y-4">
              {/* Terms checkbox */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(c) => setAgreedToTerms(c === true)}
                  className="mt-0.5"
                />
                <label htmlFor="terms" className="text-xs leading-relaxed text-foreground">
                  I understand that I'm agreeing to this{" "}
                  <span className="underline cursor-pointer">Self Payment Agreement</span>. By clicking "Place Order" and submitting this order, I agree to KWILT Health's{" "}
                  <span className="underline cursor-pointer">Terms of Use</span>,{" "}
                  <span className="underline cursor-pointer">Consent for Telehealth Services</span> and{" "}
                  <span className="underline cursor-pointer">Privacy Policy</span>.
                </label>
              </div>

              {/* Saved payment selector */}
              {MOCK_PAYMENTS.length > 0 && !useNewPayment && (
                <FormField label="Saved Payment Methods">
                  <select
                    className={inputClass + " appearance-none cursor-pointer"}
                    value={selectedPaymentId}
                    onChange={(e) => setSelectedPaymentId(e.target.value)}
                  >
                    {MOCK_PAYMENTS.map((p) => (
                      <option key={p.id} value={p.id}>{p.label} (exp {p.expiry})</option>
                    ))}
                  </select>
                </FormField>
              )}

              {!useNewPayment && (
                <button type="button" onClick={() => setUseNewPayment(true)} className="text-sm text-primary hover:text-primary/80">
                  + Add new payment method
                </button>
              )}

              {useNewPayment && (
                <>
                  <button type="button" onClick={() => setUseNewPayment(false)} className="text-sm text-primary hover:text-primary/80 mb-2">
                    ← Use saved payment
                  </button>
                  <FormField label="Card Number*">
                    <Input className={inputClass} placeholder="Card number" value={paymentForm.cardNumber} onChange={set(setPaymentForm)("cardNumber")} required />
                  </FormField>
                  <FormField label="Expiry Date*">
                    <Input className={inputClass} placeholder="Expiry date" value={paymentForm.expiry} onChange={set(setPaymentForm)("expiry")} required />
                  </FormField>
                  <FormField label="CVV*">
                    <Input className={inputClass} placeholder="CVV" value={paymentForm.cvv} onChange={set(setPaymentForm)("cvv")} required />
                  </FormField>
                  <FormField label="Name on Card*">
                    <Input className={inputClass} placeholder="Name on card" value={paymentForm.nameOnCard} onChange={set(setPaymentForm)("nameOnCard")} required />
                  </FormField>

                  {!billingSameAsShipping && (
                    <>
                      <FormField label="Street Address*">
                        <Input className={inputClass} placeholder="Street address" value={paymentForm.street} onChange={set(setPaymentForm)("street")} required />
                      </FormField>
                      <FormField label="City*">
                        <Input className={inputClass} placeholder="City" value={paymentForm.city} onChange={set(setPaymentForm)("city")} required />
                      </FormField>
                      <FormField label="State*">
                        <Input className={inputClass} placeholder="State" value={paymentForm.state} onChange={set(setPaymentForm)("state")} required />
                      </FormField>
                      <FormField label="Zip Code*">
                        <Input className={inputClass} placeholder="Zip code" value={paymentForm.zip} onChange={set(setPaymentForm)("zip")} required />
                      </FormField>
                      <FormField label="Phone Number*">
                        <Input className={inputClass} placeholder="Phone number" value={paymentForm.phone} onChange={set(setPaymentForm)("phone")} required />
                      </FormField>
                    </>
                  )}

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="billing-same"
                      checked={billingSameAsShipping}
                      onCheckedChange={(c) => setBillingSameAsShipping(c === true)}
                    />
                    <label htmlFor="billing-same" className="text-sm text-foreground">Billing address same as shipping</label>
                  </div>
                </>
              )}

              <Button
                type="submit"
                disabled={!agreedToTerms}
                className="w-full h-12 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 mt-2 disabled:opacity-50"
              >
                Submit order
              </Button>
            </form>
          ) : null}
        </div>

        <hr className="border-border mb-6" />

        {/* Footer links */}
        <div className="flex flex-wrap gap-4 text-sm text-primary">
          <span className="underline cursor-pointer">Refund policy</span>
          <span className="underline cursor-pointer">Privacy policy</span>
          <span className="underline cursor-pointer">Terms of service</span>
          <span className="underline cursor-pointer">Cancellations</span>
        </div>
      </div>

      {/* Right: Summary */}
      <div className="flex-1 bg-background px-8 py-8 md:px-12 md:py-10">
        <OrderSummary />
      </div>
    </div>
  );
}
