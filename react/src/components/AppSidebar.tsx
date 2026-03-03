import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import kwiltLogo from "@/assets/kwilt-logo-dark.png";
import navResults from "@/assets/nav-results.svg";
import navPlan from "@/assets/nav-plan.svg";
import navLifestyle from "@/assets/nav-lifestyle.svg";
import navTreatments from "@/assets/nav-treatments.svg";
import navInfo from "@/assets/nav-info.svg";
import navSettings from "@/assets/nav-settings.svg";

const mainNavItems = [
  { type: "lucide", icon: Home, label: "Home", href: "/dashboard" },
  { type: "img",   src: navResults,    label: "Results",    href: "/results",    id: "nav-results" },
  { type: "img",   src: navPlan,       label: "Your Plan",  href: "/plan",       id: "nav-plan" },
  { type: "img",   src: navTreatments, label: "Treatments", href: "/treatments", id: "nav-treatments" },
  { type: "img",   src: navLifestyle,  label: "Lifestyle",  href: "/lifestyle",  id: "nav-lifestyle" },
];

const secondaryItems = [
  { type: "img", src: navInfo,     label: "Info",     href: "/info" },
  { type: "img", src: navSettings, label: "Settings", href: "/profile" },
];

export function AppSidebar() {
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <aside className="hidden md:flex sticky top-0 h-screen w-28 flex-shrink-0 flex-col items-center border-r border-sidebar-border bg-sidebar py-8">
      {/* Logo */}
      <div className="mb-8">
        <Link to="/dashboard">
          <img src={kwiltLogo} alt="KWILT" className="h-4 w-auto" />
        </Link>
      </div>

      {/* User Avatar */}
      <Link to="/profile" className="mb-10 flex flex-col items-center gap-2 group">
        <Avatar className="h-16 w-16 ring-2 ring-transparent group-hover:ring-primary transition-all">
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User" />
          <AvatarFallback className="bg-primary/10 font-medium text-primary">EG</AvatarFallback>
        </Avatar>
        <span className="text-center text-xs font-medium text-foreground leading-tight group-hover:text-primary transition-colors">
          Elisa<br />George
        </span>
      </Link>

      {/* Main Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-1 w-full px-3">
        {mainNavItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              id={(item as any).id}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl w-full py-3 transition-all duration-200",
                active
                  ? "bg-sidebar-accent"
                  : "hover:bg-sidebar-accent/50"
              )}
            >
              {item.type === "lucide" ? (
                <Home
                  className={cn("h-6 w-6", active ? "text-foreground" : "text-foreground/70")}
                  strokeWidth={1.5}
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.label}
                  className={cn("h-6 w-6 object-contain", !active && "opacity-70")}
                />
              )}
              <span className={cn(
                "text-[11px] font-medium leading-tight text-center",
                active ? "text-foreground" : "text-foreground/70"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Spacer pushes secondary items to bottom */}
        <div className="flex-1" />

        {/* Secondary / bottom nav items */}
        {secondaryItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl w-full py-3 transition-all duration-200",
                active
                  ? "bg-sidebar-accent"
                  : "hover:bg-sidebar-accent/50"
              )}
            >
              <img
                src={item.src}
                alt={item.label}
                className={cn("h-6 w-6 object-contain", !active && "opacity-70")}
              />
              <span className={cn(
                "text-[11px] font-medium",
                active ? "text-foreground" : "text-foreground/70"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
