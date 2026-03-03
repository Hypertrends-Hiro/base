import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import kwiltLogo from "@/assets/kwilt-logo-dark.png";

const navLinks = [
  { label: "SHOP", href: "/shop" },
  { label: "PLAN", href: "/plan" },
  { label: "LABS", href: "/labs" },
  { label: "SCIENCE", href: "/science" },
  { label: "ABOUT", href: "/about" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-300",
        isScrolled
          ? "bg-background shadow-sm"
          : "bg-transparent"
      )}
    >
      {/* Left Navigation */}
      <nav className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className={cn(
              "text-sm font-medium tracking-wider transition-colors",
              isScrolled
                ? "text-foreground hover:text-primary"
                : "text-white/90 hover:text-white"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Center Logo */}
      <Link
        to="/"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <img
          src={kwiltLogo}
          alt="KWILT"
          className={cn(
            "h-8 w-auto transition-all duration-300",
            isScrolled ? "brightness-0" : "brightness-0 invert"
          )}
        />
      </Link>

      {/* Right Actions */}
      <div className="ml-auto flex items-center gap-6">
        <Link
          to="/register"
          className={cn(
            "text-sm font-medium tracking-wider transition-colors",
            isScrolled
              ? "text-foreground hover:text-primary"
              : "text-white/90 hover:text-white"
          )}
        >
          JOIN TODAY
        </Link>
        <Link
          to="/login"
          className={cn(
            "text-sm font-medium tracking-wider transition-colors",
            isScrolled
              ? "text-foreground hover:text-primary"
              : "text-white/90 hover:text-white"
          )}
        >
          LOGIN
        </Link>
      </div>
    </header>
  );
}
