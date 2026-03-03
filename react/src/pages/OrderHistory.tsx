import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import productSemaglutide from "@/assets/product-semaglutide.png";
import productBalance from "@/assets/product-balance.png";

/* ── Mock order data ── */
const mockOrders = [
  {
    id: "123455789",
    date: "Dec 20, 2025",
    total: "$1,250.00",
    status: "delivered" as const,
    shippingAddress: { street: "12345 Test Address", cityState: "Test City, Test State", zip: "55555" },
    payment: { type: "VISA", last4: "5555", name: "Elisa George", expiry: "12/26" },
    summary: { subtotal: "$1,250.00", shipping: "$0.00", discount: "–", tax: "–", total: "$1,250.00" },
    items: [
      { name: "Semaglutide", plan: "6-month Subscription – $200/mo", price: "$1200 for a 6-month supply", qty: 1, image: productSemaglutide },
      { name: "Semaglutide", plan: "1-month Subscription – $50/mo", price: "$50 for a 1-month supply", qty: 1, image: productSemaglutide },
    ],
  },
  {
    id: "123455790",
    date: "Nov 15, 2025",
    total: "$49.00",
    status: "shipped" as const,
    shippingAddress: { street: "123 Wellness Ave, Apt 4B", cityState: "Austin, TX", zip: "78701" },
    payment: { type: "VISA", last4: "6590", name: "Elisa George", expiry: "09/27" },
    summary: { subtotal: "$49.00", shipping: "$0.00", discount: "–", tax: "–", total: "$49.00" },
    items: [
      { name: "Balance Supplement Pack", plan: "One-time purchase", price: "$49.00", qty: 1, image: productBalance },
    ],
  },
  {
    id: "123455791",
    date: "Oct 10, 2025",
    total: "$99.00",
    status: "cancelled" as const,
    shippingAddress: { street: "123 Wellness Ave, Apt 4B", cityState: "Austin, TX", zip: "78701" },
    payment: { type: "MASTERCARD", last4: "3321", name: "Elisa George", expiry: "03/26" },
    summary: { subtotal: "$99.00", shipping: "$0.00", discount: "–", tax: "–", total: "$99.00" },
    items: [
      { name: "Semaglutide", plan: "1-month Subscription – $99/mo", price: "$99 for a 1-month supply", qty: 1, image: productSemaglutide },
    ],
  },
];

type FilterTab = "all" | "shipped" | "delivered" | "cancelled";

const filters: { label: string; value: FilterTab }[] = [
  { label: "ALL", value: "all" },
  { label: "SHIPPED", value: "shipped" },
  { label: "DELIVERED", value: "delivered" },
  { label: "CANCELLED", value: "cancelled" },
];

export default function OrderHistory() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const filtered = activeFilter === "all" ? mockOrders : mockOrders.filter((o) => o.status === activeFilter);

  const toggleExpand = (id: string) => {
    setExpandedOrders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      <div className="max-w-4xl mx-auto pt-8 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl md:text-4xl tracking-tight text-foreground">Order history</h1>
          <button
            onClick={() => navigate("/profile")}
            className="text-xs font-medium tracking-[0.15em] text-foreground hover:text-foreground/70 flex items-center gap-1"
          >
            CLOSE→
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-6 mb-8 border-b border-border pb-3">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                "text-xs font-medium tracking-[0.15em] pb-1 transition-colors",
                activeFilter === f.value
                  ? "text-foreground border-b-2 border-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Orders */}
        <div className="space-y-6">
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground py-8 text-center">No orders found.</p>
          )}
          {filtered.map((order) => {
            const isExpanded = expandedOrders.has(order.id);
            return (
              <div key={order.id} className="bg-card rounded-md shadow-soft overflow-hidden">
                {/* Order header */}
                <div className="flex items-start justify-between p-6">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-foreground">Placed: {order.date}</p>
                    <p className="text-sm text-foreground">Order #{order.id}</p>
                    <p className="text-sm text-foreground">Order Total: {order.total}</p>
                  </div>
                  <button
                    onClick={() => toggleExpand(order.id)}
                    className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
                  >
                    {isExpanded ? "Hide order details" : "Show order details"}
                  </button>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-6 pb-2">
                    <div className="border-t border-border pt-5 pb-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Sent to */}
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-2">Sent to</p>
                        <p className="text-sm text-foreground">{order.shippingAddress.street}</p>
                        <p className="text-sm text-foreground">{order.shippingAddress.cityState}</p>
                        <p className="text-sm text-foreground">{order.shippingAddress.zip}</p>
                      </div>
                      {/* Paid with */}
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-2">Paid with</p>
                        <p className="text-sm text-foreground">{order.payment.type} **** {order.payment.last4}</p>
                        <p className="text-sm text-foreground">{order.payment.name}</p>
                        <p className="text-sm text-foreground">{order.payment.expiry}</p>
                      </div>
                      {/* Summary */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-semibold text-foreground">Summary</p>
                          <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                        </div>
                        <div className="space-y-1">
                          {[
                            ["Subtotal", order.summary.subtotal],
                            ["Shipping", order.summary.shipping],
                            ["Discount", order.summary.discount],
                            ["Tax", order.summary.tax],
                          ].map(([label, val]) => (
                            <div key={label} className="flex justify-between text-sm text-foreground">
                              <span>{label}</span>
                              <span>{val}</span>
                            </div>
                          ))}
                          <div className="flex justify-between text-sm font-semibold text-foreground pt-1 border-t border-border">
                            <span>Total</span>
                            <span>{order.summary.total}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Line items */}
                <div className="border-t border-border">
                  <div className="flex justify-end px-6 pt-3">
                    <span className="text-sm text-muted-foreground">{order.items.length} items</span>
                  </div>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 px-6 py-4">
                      <div className="w-16 h-20 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.plan}</p>
                        <p className="text-xs text-muted-foreground mt-2">{item.price}</p>
                        <p className="text-xs font-medium text-foreground mt-0.5">Quantity: {item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
