import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignupLayout } from "@/components/signup/SignupLayout";


// Simulated address suggestions (Google Places prototype)
const MOCK_ADDRESSES = [
{ display: "123 Main Street, Austin, TX 78701", city: "Austin", state: "TX", zip: "78701" },
{ display: "456 Oak Avenue, Los Angeles, CA 90001", city: "Los Angeles", state: "CA", zip: "90001" },
{ display: "789 Park Boulevard, New York, NY 10001", city: "New York", state: "NY", zip: "10001" },
{ display: "321 Elm Drive, Miami, FL 33101", city: "Miami", state: "FL", zip: "33101" },
{ display: "654 Maple Lane, Chicago, IL 60601", city: "Chicago", state: "IL", zip: "60601" },
{ display: "987 Cedar Court, Seattle, WA 98101", city: "Seattle", state: "WA", zip: "98101" },
{ display: "147 Birch Road, Denver, CO 80201", city: "Denver", state: "CO", zip: "80201" },
{ display: "258 Willow Street, Phoenix, AZ 85001", city: "Phoenix", state: "AZ", zip: "85001" }];


const US_STATES = [
"AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
"KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
"NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT",
"VA", "WA", "WV", "WI", "WY"];


function FormField({ label, children, className = "" }: {label: string;children: React.ReactNode;className?: string;}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
        {label}
      </label>
      {children}
    </div>);

}

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {firstName?: string;lastName?: string;email?: string;} | null;

  const inputClass =
  "h-12 rounded-md border border-border bg-card px-4 text-sm text-foreground placeholder:text-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none";

  const [form, setForm] = useState({
    firstName: state?.firstName || "Sandra",
    lastName: state?.lastName || "Mitchell",
    cardNumber: "",
    expDate: "",
    securityCode: "",
    address: "",
    apartment: "",
    city: "",
    stateCode: "",
    zip: ""
  });

  const [addressQuery, setAddressQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof MOCK_ADDRESSES>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const addressRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (addressRef.current && !addressRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAddressChange = (val: string) => {
    setAddressQuery(val);
    setForm((f) => ({ ...f, address: val }));
    if (val.length >= 2) {
      const filtered = MOCK_ADDRESSES.filter((a) =>
      a.display.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered.length > 0 ? filtered : MOCK_ADDRESSES.slice(0, 4));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectAddress = (addr: (typeof MOCK_ADDRESSES)[0]) => {
    setAddressQuery(addr.display.split(",")[0]);
    setForm((f) => ({
      ...f,
      address: addr.display.split(",")[0],
      city: addr.city,
      stateCode: addr.state,
      zip: addr.zip
    }));
    setShowSuggestions(false);
  };

  const formatCard = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExp = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
  setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/welcome", { state: { firstName: form.firstName } });
  };

  return (
    <SignupLayout
      leftContent={
      <div className="max-w-xs">
          <h1 className="font-heading text-3xl font-semibold leading-snug text-foreground mb-5">
            Become a KWILT™ member
          </h1>
          <div className="mb-6 rounded-lg bg-background/60 border border-border p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-1">Annual Membership</p>
            <p className="font-heading text-3xl font-semibold text-foreground">$449</p>
          </div>
          <p className="text-sm leading-relaxed text-foreground">
            Unlock a deeper understanding of your health for $449 a year. Gain
            invaluable insights with our comprehensive Mega Panel, exploring over
            100 key biomarkers. Cancel anytime. Membership auto renews each year.
          </p>
          <div className="mt-8 flex items-center gap-2 text-xs text-foreground">
            <Lock size={12} />
            <span>Secured with 256-bit SSL encryption</span>
          </div>
        </div>
      }
      rightContent={
      <div className="max-w-xl w-full mx-auto">
          {/* Membership summary card */}
          <div className="rounded-lg border border-border bg-card p-5 mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-0.5">Annual Membership</p>
              <p className="text-sm text-foreground">Cancel anytime. Membership auto renews each year.</p>
            </div>
            <p className="font-heading text-2xl font-semibold text-foreground ml-4 whitespace-nowrap">$449</p>
          </div>

          <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <CreditCard size={20} className="text-primary" />
            Payment Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="grid grid-cols-2 gap-3">
              <FormField label="First Name">
                <Input className={inputClass} value={form.firstName} onChange={set("firstName")} required />
              </FormField>
              <FormField label="Last Name">
                <Input className={inputClass} value={form.lastName} onChange={set("lastName")} required />
              </FormField>
            </div>

            {/* Card details */}
            <FormField label="Card Number">
              <div className="relative">
                <Input
                className={inputClass + " pl-10"}
                placeholder="4433 2211 4433 2211"
                value={form.cardNumber}
                onChange={(e) => setForm((f) => ({ ...f, cardNumber: formatCard(e.target.value) }))}
                maxLength={19}
                required />

                <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
              </div>
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Exp Date">
                <Input
                className={inputClass}
                placeholder="12/29"
                value={form.expDate}
                onChange={(e) => setForm((f) => ({ ...f, expDate: formatExp(e.target.value) }))}
                maxLength={5}
                required />

              </FormField>
              <FormField label="Security Code">
                <Input
                className={inputClass}
                placeholder="123"
                value={form.securityCode}
                onChange={set("securityCode")}
                maxLength={4}
                required />

              </FormField>
            </div>

            {/* Address — simulated Google Places */}
            <FormField label="Address">
              <div ref={addressRef} className="relative">
                <div className="relative">
                  <Input
                  className={inputClass + " pl-10"}
                  placeholder="Start typing your address..."
                  value={addressQuery}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  onFocus={() => addressQuery.length >= 2 && setShowSuggestions(true)}
                  autoComplete="off"
                  required />

                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
                </div>
                {showSuggestions && suggestions.length > 0 &&
              <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border border-border bg-card shadow-lg overflow-hidden">
                    {suggestions.map((addr) =>
                <button
                  key={addr.display}
                  type="button"
                  className="flex items-start gap-3 w-full px-4 py-3 text-left text-sm hover:bg-background transition-colors border-b border-border/50 last:border-0"
                  onMouseDown={() => selectAddress(addr)}>

                        <MapPin size={14} className="text-primary mt-0.5 shrink-0" />
                        <span className="text-foreground">{addr.display}</span>
                      </button>
                )}
                    <div className="px-4 py-2 bg-background/50 text-[10px] text-foreground flex items-center gap-1">
                      <span>Powered by</span>
                      <span className="font-semibold">Google Places</span>
                    </div>
                  </div>
              }
              </div>
            </FormField>

            {/* Apartment */}
            <FormField label="Apartment / Suite (Optional)">
              <Input
              className={inputClass}
              placeholder="Apartment"
              value={form.apartment}
              onChange={set("apartment")} />

            </FormField>

            {/* City / State / ZIP */}
            <div className="grid grid-cols-3 gap-3">
              <FormField label="City" className="col-span-1">
                <Input
                className={inputClass}
                placeholder="City"
                value={form.city}
                onChange={set("city")}
                required />

              </FormField>
              <FormField label="State">
                <select
                className={inputClass + " appearance-none cursor-pointer"}
                value={form.stateCode}
                onChange={set("stateCode")}
                required>

                  <option value="">Select State</option>
                  {US_STATES.map((s) =>
                <option key={s} value={s}>{s}</option>
                )}
                </select>
              </FormField>
              <FormField label="ZIP Code">
                <Input
                className={inputClass}
                placeholder="ZIP"
                value={form.zip}
                onChange={set("zip")}
                maxLength={10}
                required />

              </FormField>
            </div>

            <Button
            type="submit"
            className="w-full h-12 rounded-md bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:bg-primary/90 mt-2">

              Submit &amp; Activate Membership
            </Button>

            <p className="text-center text-[11px] text-foreground pt-1 flex items-center justify-center gap-1.5">
              <Lock size={11} />
              Your payment is secured and encrypted
            </p>
          </form>
        </div>
      } />);


}