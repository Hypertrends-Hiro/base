import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { X, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CartDrawer() {
  const { items, cartOpen, setCartOpen, removeFromCart, updateQuantity, subtotal } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const navigate = useNavigate();

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" hideClose className="flex flex-col w-full sm:max-w-md p-0" style={{ background: "#F5F1F0" }}>
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-heading text-2xl font-medium">Your cart</SheetTitle>
            <button
              onClick={() => setCartOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              EXIT <span className="text-xs">→</span>
            </button>
          </div>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Your cart is empty</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => {
                const totalPrice = item.pricePerMonth * item.months * item.quantity;
                return (
                  <div key={`${item.name}-${item.plan}`} className="flex gap-4 rounded-lg bg-white p-3">
                    {/* Thumbnail */}
                    <div className="h-20 w-20 flex-none rounded-md overflow-hidden" style={{ background: "#F5EEEC" }}>
                      <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
                    </div>
                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.plan === "MONTHLY"
                              ? `Monthly Subscription – $${item.pricePerMonth}/mo`
                              : `${item.plan.replace("MONTHS", "month")} Subscription – $${item.pricePerMonth}/mo`}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.name, item.plan)}
                          className="text-muted-foreground hover:text-foreground transition-colors ml-2"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        ${item.pricePerMonth * item.months} for a {item.months === 1 ? "1-month" : `${item.months}-month`} supply
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="font-medium text-sm">${totalPrice}</p>
                        <div className="flex items-center gap-2 border border-border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.name, item.plan, -1)}
                            className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.name, item.plan, 1)}
                            className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4" style={{ background: "#FFFFFF" }}>
            {/* Discount code */}
            <div className="flex items-center gap-2 border border-border rounded-md px-3 py-2">
              <input
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Discount or Gift Card Code"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                Apply
              </button>
            </div>

            {/* Totals */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span className="uppercase text-xs tracking-wide">Free Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Total:</span>
                <span className="text-xl font-medium">${subtotal.toLocaleString()}.00</span>
              </div>
            </div>

            {/* Checkout */}
            <button
              onClick={() => { setCartOpen(false); navigate("/checkout"); }}
              className="w-full rounded-md bg-primary py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
