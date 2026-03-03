import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import productSemaglutide from "@/assets/product-semaglutide.png";
import productBalance from "@/assets/product-balance.png";

const subscriptionData: Record<string, {
  name: string;
  plan: string;
  pricePerMonth: number;
  months: number;
  image: string;
  billsOn: string;
  shipsOn: string;
}> = {
  metformin: {
    name: "Metformin",
    plan: "1-month Subscription",
    pricePerMonth: 200,
    months: 1,
    image: productBalance,
    billsOn: "2/3",
    shipsOn: "2/6",
  },
  semaglutide: {
    name: "Semaglutide",
    plan: "6-month Subscription",
    pricePerMonth: 200,
    months: 6,
    image: productSemaglutide,
    billsOn: "2/3",
    shipsOn: "2/6",
  },
};

export default function ManageSubscription() {
  const { treatmentName } = useParams();
  const navigate = useNavigate();
  const [billingOpen, setBillingOpen] = useState(false);
  const [editingShipping, setEditingShipping] = useState(false);
  const [editingPayment, setEditingPayment] = useState(false);
  const [shippingForm, setShippingForm] = useState({
    street: "", city: "", state: "", zip: "", phone: "",
  });
  // "none" | "confirm" | "cancelled"
  const [cancelState, setCancelState] = useState<"none" | "confirm" | "cancelled">("none");
  const [shipmentModalOpen, setShipmentModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "", expiry: "", cvv: "", nameOnCard: "", sameAsShipping: false,
  });

  const key = treatmentName?.toLowerCase() || "";
  const sub = subscriptionData[key];

  if (!sub) {
    return (
      <div className="p-4 lg:p-12">
        <p className="text-muted-foreground">Subscription not found.</p>
      </div>
    );
  }

  const orderTotal = sub.pricePerMonth * sub.months;
  const headerTitle = `Manage ${sub.name} subscription`;

  return (
    <>
      <div className="p-4 lg:p-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-2xl font-light lg:text-4xl">
            {headerTitle}
          </h1>
          <button
            onClick={() => navigate("/treatments")}
            className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors flex items-center gap-1"
          >
            CLOSE<span className="text-lg">→</span>
          </button>
        </header>

        {/* Subscription card */}
        <div className="rounded-2xl" style={{ background: "#F5F1F0" }}>
          {/* Top section — billing info + actions */}
          <div className="p-5 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Billing details */}
              <div className="space-y-1">
                <p className="text-sm font-light">
                  <span className="font-medium">Bills on:</span> {sub.billsOn}
                </p>
                <p className="text-sm font-light">
                  <span className="font-medium">Ships on:</span> {sub.shipsOn}
                </p>
                <p className="text-sm font-light">
                  <span className="font-medium">Order Total:</span> ${orderTotal.toFixed(2)}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShipmentModalOpen(true)}
                  className="rounded-md bg-primary px-6 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  Change shipment date
                </button>
                <button
                  onClick={() => setBillingOpen(!billingOpen)}
                  className="rounded-md bg-primary px-6 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  {billingOpen ? "Close billing & shipping" : "Open billing & shipping"}
                </button>
              </div>
            </div>
          </div>

          {/* Expanded billing & shipping section */}
          {billingOpen && (
            <>
              <div className="mx-5 lg:mx-6 border-t border-border/40" />
              <div className="p-5 lg:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Send to */}
                  <div>
                    <p className="text-sm font-medium mb-3">Send to</p>
                    {editingShipping ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">Street Address*</label>
                          <Input placeholder="Street address" value={shippingForm.street} onChange={(e) => setShippingForm(f => ({ ...f, street: e.target.value }))} className="bg-background border-border/60" />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">City*</label>
                          <Input placeholder="City" value={shippingForm.city} onChange={(e) => setShippingForm(f => ({ ...f, city: e.target.value }))} className="bg-background border-border/60" />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">State*</label>
                          <Input placeholder="State" value={shippingForm.state} onChange={(e) => setShippingForm(f => ({ ...f, state: e.target.value }))} className="bg-background border-border/60" />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">Zip Code*</label>
                          <Input placeholder="Zip code" value={shippingForm.zip} onChange={(e) => setShippingForm(f => ({ ...f, zip: e.target.value }))} className="bg-background border-border/60" />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">Phone Number*</label>
                          <Input placeholder="Phone number" value={shippingForm.phone} onChange={(e) => setShippingForm(f => ({ ...f, phone: e.target.value }))} className="bg-background border-border/60" />
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                          <button onClick={() => setEditingShipping(false)} className="text-sm font-medium underline hover:text-primary transition-colors">Cancel</button>
                          <button onClick={() => setEditingShipping(false)} className="rounded-md bg-primary px-8 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors">Save</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm font-light">12345 Test Address</p>
                        <p className="text-sm font-light">Test City, Test State</p>
                        <p className="text-sm font-light">55555</p>
                        <button onClick={() => setEditingShipping(true)} className="text-sm font-medium underline mt-3 hover:text-primary transition-colors">Edit</button>
                      </>
                    )}
                  </div>

                  {/* Pay with */}
                  <div>
                    <p className="text-sm font-medium mb-3">Pay with</p>
                    {editingPayment ? (
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="payment-agreement"
                            className="mt-1"
                          />
                          <label htmlFor="payment-agreement" className="text-xs font-light leading-relaxed">
                            I understand that I'm agreeing to this <span className="underline">Self Payment Agreement</span>. By clicking "Place Order" and submitting this order, I agree to KWILT Health's <span className="underline">Terms of Use</span>, <span className="underline">Consent for Telehealth Services</span> and <span className="underline">Privacy Policy</span>.
                          </label>
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">Card Number*</label>
                          <Input placeholder="Card number" value={paymentForm.cardNumber} onChange={(e) => setPaymentForm(f => ({ ...f, cardNumber: e.target.value }))} className="bg-background border-border/60" />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">Expiry Date*</label>
                          <Input placeholder="Expiry date" value={paymentForm.expiry} onChange={(e) => setPaymentForm(f => ({ ...f, expiry: e.target.value }))} className="bg-background border-border/60" />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">CVV*</label>
                          <Input placeholder="CVV" value={paymentForm.cvv} onChange={(e) => setPaymentForm(f => ({ ...f, cvv: e.target.value }))} className="bg-background border-border/60" />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase tracking-wider text-foreground/70 mb-1 block">Name on Card*</label>
                          <Input placeholder="Name on card" value={paymentForm.nameOnCard} onChange={(e) => setPaymentForm(f => ({ ...f, nameOnCard: e.target.value }))} className="bg-background border-border/60" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="same-as-shipping"
                            checked={paymentForm.sameAsShipping}
                            onCheckedChange={(checked) => setPaymentForm(f => ({ ...f, sameAsShipping: checked === true }))}
                          />
                          <label htmlFor="same-as-shipping" className="text-sm font-light">Billing address same as shipping</label>
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                          <button onClick={() => setEditingPayment(false)} className="text-sm font-medium underline hover:text-primary transition-colors">Cancel</button>
                          <button onClick={() => setEditingPayment(false)} className="rounded-md bg-primary px-8 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors">Save</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm font-light">VISA **** 5555</p>
                        <p className="text-sm font-light">Firstname Lastname</p>
                        <p className="text-sm font-light">12/26</p>
                        <button onClick={() => setEditingPayment(true)} className="text-sm font-medium underline mt-3 hover:text-primary transition-colors">Edit</button>
                      </>
                    )}
                  </div>

                  {/* Summary */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium">Summary</p>
                      <p className="text-sm font-light text-muted-foreground">1 item</p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm font-light">
                        <span>Subtotal</span>
                        <span>${orderTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-light">
                        <span>Shipping</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between text-sm font-light">
                        <span>Discount</span>
                        <span>-</span>
                      </div>
                      <div className="flex justify-between text-sm font-light">
                        <span>Tax</span>
                        <span>-</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium pt-1">
                        <span>Total</span>
                        <span>${orderTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Divider */}
          <div className="mx-5 lg:mx-6 border-t border-border/40" />

          {/* Product details */}
          <div className="p-5 lg:p-6">
            <div className="flex items-start gap-4">
              {/* Product image */}
              <div
                className="h-24 w-24 flex-none rounded-md overflow-hidden"
                style={{ background: "#EDE8E2" }}
              >
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="h-full w-full object-contain p-3"
                />
              </div>

              {/* Product info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-heading text-base font-medium">{sub.name}</p>
                  {cancelState === "none" ? (
                    <button
                      onClick={() => setCancelState("confirm")}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setCancelState("none")}
                      className="text-sm font-medium underline hover:text-primary transition-colors"
                    >
                      Close
                    </button>
                  )}
                </div>

                {cancelState === "none" && (
                  <>
                    <p className="text-sm font-light text-muted-foreground mt-0.5">
                      {sub.plan} – ${sub.pricePerMonth}/mo
                    </p>
                    <p className="text-sm font-light text-muted-foreground mt-2">
                      ${orderTotal} for a {sub.months}-month supply
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Quantity:</span>{" "}
                      <span className="font-light">1</span>
                    </p>
                  </>
                )}

                {cancelState === "confirm" && (
                  <div className="mt-2 max-w-md">
                    <p className="text-sm font-medium">Are you sure you want to cancel?</p>
                    <p className="text-sm font-light mt-2">
                      Your subscription will be canceled on {sub.shipsOn}.
                    </p>
                    <p className="text-sm font-light mt-3">
                      If you just need a break, you can easily{" "}
                      <span className="underline">change your next shipment date</span>
                      —no need to cancel today.
                    </p>
                    <button
                      onClick={() => setCancelState("none")}
                      className="mt-5 w-full max-w-xs rounded-md bg-primary py-3 text-sm font-light text-foreground hover:bg-primary/90 transition-colors"
                    >
                      No, don't cancel
                    </button>
                    <div className="mt-3">
                      <button
                        onClick={() => setCancelState("cancelled")}
                        className="text-sm font-medium underline hover:text-primary transition-colors"
                      >
                        Yes, cancel
                      </button>
                    </div>
                  </div>
                )}

                {cancelState === "cancelled" && (
                  <p className="text-sm font-medium mt-2">Your subscription has been cancelled.</p>
                )}
              </div>

              {/* Item count */}
              <p className="text-sm font-light text-muted-foreground flex-none">1 item</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shipment Date Modal */}
      <Dialog open={shipmentModalOpen} onOpenChange={setShipmentModalOpen}>
        <DialogContent className="sm:max-w-md" style={{ background: "#F5F1F0" }}>
          <DialogHeader>
            <DialogTitle className="font-heading text-xl font-medium">
              Set your next shipment date
            </DialogTitle>
          </DialogHeader>

          <div className="mt-2">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: new Date() }}
              className="rounded-xl border-0 w-full"
            />
          </div>

          {/* Quick skip options */}
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wider text-foreground/70 mb-3">Quick skip</p>
            <div className="flex gap-2">
              {[30, 60, 90].map((days) => (
                <button
                  key={days}
                  onClick={() => setSelectedDate(addDays(new Date(), days))}
                  className="flex-1 rounded-md border border-border/60 bg-background py-2.5 text-sm font-light text-foreground hover:bg-primary/20 transition-colors"
                >
                  {days} days
                </button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <p className="text-sm font-light mt-3 text-center text-muted-foreground">
              New shipment date: <span className="font-medium text-foreground">{format(selectedDate, "MMMM d, yyyy")}</span>
            </p>
          )}

          <button
            onClick={() => setShipmentModalOpen(false)}
            disabled={!selectedDate}
            className="mt-4 w-full rounded-md bg-primary py-3 text-sm font-light text-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm date
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
