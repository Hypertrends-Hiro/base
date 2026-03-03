import { ReactNode } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { Home, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import navResults from "@/assets/nav-results.svg";
import navPlan from "@/assets/nav-plan.svg";
import navTreatments from "@/assets/nav-treatments.svg";
import navLifestyle from "@/assets/nav-lifestyle.svg";
import navSettings from "@/assets/nav-settings.svg";

const mobileNavItems = [
  { type: "lucide", label: "Home", href: "/dashboard" },
  { type: "img", src: navResults, label: "Results", href: "/results", id: "mobile-nav-results" },
  { type: "img", src: navPlan, label: "Plan", href: "/plan", id: "mobile-nav-plan" },
  { type: "img", src: navTreatments, label: "Treatments", href: "/treatments", id: "mobile-nav-treatments" },
  { type: "img", src: navLifestyle, label: "Lifestyle", href: "/lifestyle", id: "mobile-nav-lifestyle" },
  { type: "img", src: navSettings, label: "Settings", href: "/profile", id: undefined },
];

interface DashboardLayoutProps {
  children?: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const { setCartOpen, totalItems } = useCart();
  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      {/* Cart icon — top right */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed top-4 right-14 z-50 md:right-6 flex items-center justify-center"
        aria-label="Open cart"
      >
        <ShoppingBag className="h-5 w-5 text-foreground" strokeWidth={1.5} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            {totalItems}
          </span>
        )}
      </button>
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        {children ?? <Outlet />}
      </main>

      {/* Mobile bottom nav bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-border bg-sidebar">
        {mobileNavItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              id={item.id}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-3 transition-all",
                active ? "text-foreground" : "text-foreground/50"
              )}
            >
              {item.type === "lucide" ? (
                <Home className="h-5 w-5" strokeWidth={1.5} />
              ) : (
                <img
                  src={item.src}
                  alt={item.label}
                  className={cn("h-5 w-5 object-contain", !active && "opacity-50")}
                />
              )}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
