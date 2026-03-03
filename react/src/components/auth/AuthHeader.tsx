import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AuthHeaderProps {
  activeTab: "login" | "register";
}

const navLinks = [
  { label: "SHOP", href: "/shop" },
  { label: "PLAN", href: "/plan" },
  { label: "LABS", href: "/labs" },
  { label: "SCIENCE", href: "/science" },
  { label: "ABOUT", href: "/about" },
];

export function AuthHeader({ activeTab }: AuthHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-background px-8 py-4">
      {/* Left Navigation */}
      <nav className="hidden items-center gap-6 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="text-xs font-medium tracking-wider text-foreground transition-colors hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Center Logo */}
      <Link
        to="/"
        className="absolute left-1/2 -translate-x-1/2 font-heading text-2xl font-bold tracking-tight text-foreground"
      >
        KWILT<span className="text-[8px] align-super">™</span>
      </Link>

      {/* Right Actions */}
      <div className="ml-auto flex items-center gap-3">
        <Link to="/login?tab=register">
          <Button
            variant={activeTab === "register" ? "default" : "ghost"}
            className={activeTab === "register" 
              ? "rounded-md bg-primary px-6 text-xs font-medium tracking-wider text-primary-foreground hover:bg-primary/90" 
              : "text-xs font-medium tracking-wider"
            }
          >
            JOIN TODAY
          </Button>
        </Link>
        <Link to="/login?tab=login">
          <Button
            variant={activeTab === "login" ? "default" : "ghost"}
            className={activeTab === "login" 
              ? "rounded-md bg-primary px-6 text-xs font-medium tracking-wider text-primary-foreground hover:bg-primary/90" 
              : "text-xs font-medium tracking-wider"
            }
          >
            LOGIN
          </Button>
        </Link>
      </div>
    </header>
  );
}
