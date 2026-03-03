import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import kwiltLogoDark from "@/assets/kwilt-logo-dark.png";
import { CartItem } from "@/contexts/CartContext";
import { useScenario } from "@/contexts/ScenarioContext";

interface ThankYouState {
  items: CartItem[];
  subtotal: number;
  orderNumber: string;
  firstName: string;
}

export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const { scenario, setScenario } = useScenario();
  const state = location.state as ThankYouState | null;

  if (!state || !state.items?.length) {
    return <Navigate to="/dashboard" replace />;
  }

  const { items, subtotal, orderNumber, firstName } = state;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left column — confirmation */}
      <div className="md:w-[55%] bg-card flex flex-col justify-between px-8 py-8 md:px-12 md:py-10 md:min-h-screen">
        <div>
          <Link to="/" className="mb-14 inline-block">
            <img src={kwiltLogoDark} alt="KWILT" className="h-7 w-auto" />
          </Link>

          <p className="text-sm text-muted-foreground mb-2">Order #{orderNumber}</p>
          <h1 className="font-heading text-3xl md:text-5xl font-light text-foreground mb-4">
            Thank you {firstName}!
          </h1>
          <p className="text-muted-foreground text-sm max-w-md">
            A confirmation email has been sent to your email with order and shipping details.
          </p>
        </div>

        <button
          onClick={() => {
            if (scenario === "default-with-wizard") {
              setScenario("new-rx-ordered");
            }
            navigate("/dashboard");
          }}
          className="inline-flex items-center justify-center mt-12 mb-4 h-12 w-full max-w-xs rounded-md border border-primary text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
        >
          Back to dashboard
        </button>
      </div>

      {/* Right column — order summary */}
      <div className="md:w-[45%] bg-background px-8 py-8 md:px-12 md:py-10">
        <div className="sticky top-10">
          <h2 className="font-heading text-2xl font-medium text-foreground mb-6">Summary</h2>

          <hr className="border-border mb-6" />

          {/* Items */}
          <div className="space-y-4 mb-6">
            {items.map((item) => {
              const total = item.pricePerMonth * item.months * item.quantity;
              return (
                <div key={`${item.name}-${item.plan}`} className="flex gap-3 rounded-lg bg-card border border-border p-3">
                  <div className="h-16 w-16 flex-none rounded-md overflow-hidden bg-card">
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.plan === "MONTHLY"
                        ? `Monthly Subscription – $${item.pricePerMonth}/mo`
                        : `${item.months}-month Subscription – $${item.pricePerMonth}/mo`}
                    </p>
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

          {/* Discount placeholder */}
          <div className="flex items-center gap-2 border border-border rounded-md px-3 py-2 mb-6">
            <span className="flex-1 text-sm text-muted-foreground">Discount or Gift Card Code</span>
            <span className="text-sm font-medium text-primary">Apply</span>
          </div>

          <hr className="border-border mb-4" />

          {/* Totals */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal:</span>
              <span>${subtotal.toLocaleString()}.00</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between pt-2 text-base">
              <span className="font-medium">Total:</span>
              <span className="font-heading text-xl font-semibold">${subtotal.toLocaleString()}.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
