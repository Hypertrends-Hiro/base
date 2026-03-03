import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Mail } from "lucide-react";
import { z } from "zod";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const resetSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

// Validation schemas
const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  biologicalSex: z.string().optional(),
  dateOfBirth: z.string().optional(),
  agreeTerms: z.boolean().refine(val => val === true, "You must agree to the terms"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Auth() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") === "register" ? "register" : "login";
  const { toast } = useToast();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});

  // Reset password state
  const [resetOpen, setResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  // Register state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [biologicalSex, setBiologicalSex] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrors({});
    
    const result = loginSchema.safeParse({ email: loginEmail, password: loginPassword });
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) errors[err.path[0].toString()] = err.message;
      });
      setLoginErrors(errors);
      return;
    }

    toast({
      title: "Login",
      description: "Login functionality requires Lovable Cloud to be enabled.",
    });
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    const result = resetSchema.safeParse({ email: resetEmail });
    if (!result.success) {
      setResetError(result.error.errors[0].message);
      return;
    }
    // In production this would call supabase.auth.resetPasswordForEmail
    setResetSent(true);
  };

  const openResetModal = () => {
    setResetEmail("");
    setResetError("");
    setResetSent(false);
    setResetOpen(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterErrors({});

    const result = registerSchema.safeParse({
      firstName,
      lastName,
      email: registerEmail,
      phone,
      password: registerPassword,
      confirmPassword,
      biologicalSex,
      dateOfBirth,
      agreeTerms,
    });

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) errors[err.path[0].toString()] = err.message;
      });
      setRegisterErrors(errors);
      return;
    }

    toast({
      title: "Create Account",
      description: "Registration functionality requires Lovable Cloud to be enabled.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthHeader activeTab={tab} />

      <main className="mx-auto max-w-lg px-6 py-16">
        {tab === "login" ? (
          <div className="text-center">
            <h1 className="font-heading text-4xl font-semibold text-foreground">
              Member Login
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Questions? Visit{" "}
              <Link to="/faq" className="text-primary hover:underline">
                FAQ
              </Link>
            </p>

            <form onSubmit={handleLogin} className="mt-10 space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="h-12 rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground"
                />
                {loginErrors.email && (
                  <p className="mt-1 text-left text-xs text-destructive">{loginErrors.email}</p>
                )}
              </div>

              <div className="relative">
                <Input
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="h-12 rounded-lg border-border bg-card pr-12 text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showLoginPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {loginErrors.password && (
                  <p className="mt-1 text-left text-xs text-destructive">{loginErrors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                className="mt-6 h-12 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Login
              </Button>
            </form>

            <div className="mt-6 border-t border-border pt-6">
              <button
                type="button"
                onClick={openResetModal}
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Not a member yet? -{" "}
              <Link to="/login?tab=register" className="text-primary hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center">
              <h1 className="font-heading text-4xl font-semibold text-foreground">
                Create Account
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Join us to start your health journey today.
              </p>
            </div>

            <form onSubmit={handleRegister} className="mt-10 space-y-5">
              {/* Legal Name */}
              <div>
                <Label className="text-xs font-medium text-foreground">Legal Name</Label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <div>
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-12 rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground"
                    />
                    {registerErrors.firstName && (
                      <p className="mt-1 text-xs text-destructive">{registerErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="h-12 rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground"
                    />
                    {registerErrors.lastName && (
                      <p className="mt-1 text-xs text-destructive">{registerErrors.lastName}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium text-foreground">Email</Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="mt-2 h-12 rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground"
                  />
                  {registerErrors.email && (
                    <p className="mt-1 text-xs text-destructive">{registerErrors.email}</p>
                  )}
                </div>
                <div>
                  <Label className="text-xs font-medium text-foreground">Phone Number</Label>
                  <Input
                    type="tel"
                    placeholder="(---) ---/----"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 h-12 rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium text-foreground">Password</Label>
                  <div className="relative mt-2">
                    <Input
                      type={showRegisterPassword ? "text" : "password"}
                      placeholder="Password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="h-12 rounded-lg border-border bg-card pr-12 text-foreground placeholder:text-muted-foreground"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showRegisterPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {registerErrors.password && (
                    <p className="mt-1 text-xs text-destructive">{registerErrors.password}</p>
                  )}
                </div>
                <div>
                  <Label className="text-xs font-medium text-foreground">Confirm Password</Label>
                  <div className="relative mt-2">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 rounded-lg border-border bg-card pr-12 text-foreground placeholder:text-muted-foreground"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {registerErrors.confirmPassword && (
                    <p className="mt-1 text-xs text-destructive">{registerErrors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Biological Sex & DOB */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium text-foreground">Biological Sex</Label>
                  <Select value={biologicalSex} onValueChange={setBiologicalSex}>
                    <SelectTrigger className="mt-2 h-12 rounded-lg border-border bg-card text-foreground">
                      <SelectValue placeholder="Biological sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-medium text-foreground">Date of Birth</Label>
                  <Input
                    type="text"
                    placeholder="MM/DD/YYYY"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="mt-2 h-12 rounded-lg border-border bg-card text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                    className="mt-0.5"
                  />
                  <label htmlFor="terms" className="text-sm leading-relaxed text-foreground">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary underline">Terms of Use</Link>
                    {" "}and{" "}
                    <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>
                  </label>
                </div>
                {registerErrors.agreeTerms && (
                  <p className="text-xs text-destructive">{registerErrors.agreeTerms}</p>
                )}

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="marketing"
                    checked={agreeMarketing}
                    onCheckedChange={(checked) => setAgreeMarketing(checked === true)}
                    className="mt-0.5"
                  />
                  <label htmlFor="marketing" className="text-sm leading-relaxed text-foreground">
                    I want to receive offers, updates, marketing emails & SMS from KWILT Health.
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="mt-4 h-12 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Create Account
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login?tab=login" className="text-foreground underline hover:text-primary">
                Sign In
              </Link>
            </p>
          </div>
        )}
      </main>

      {/* Reset Password Modal */}
      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent hideClose className="sm:max-w-md p-8 bg-card border-border rounded-xl">
          {!resetSent ? (
            <>
              <div className="flex justify-end -mt-2 -mr-2">
                <button
                  onClick={() => setResetOpen(false)}
                  className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors flex items-center gap-0.5"
                >
                  EXIT<ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="text-center mb-6">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  Reset your password
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter your email address, and we'll send instructions to reset your password.
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-foreground mb-1.5 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="h-12 rounded-lg border-border bg-background text-foreground placeholder:text-muted-foreground"
                  />
                  {resetError && (
                    <p className="mt-1 text-xs text-destructive">{resetError}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Continue
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="flex justify-end -mt-2 -mr-2">
                <button
                  onClick={() => setResetOpen(false)}
                  className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors flex items-center gap-0.5"
                >
                  EXIT<ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="text-center py-6">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-7 w-7 text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  Check your email
                </h2>
                <p className="mt-3 text-sm text-muted-foreground max-w-xs mx-auto">
                  We've sent password reset instructions to <span className="font-medium text-foreground">{resetEmail}</span>. Please check your inbox and follow the link to reset your password.
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  Didn't receive it?{" "}
                  <button
                    type="button"
                    onClick={() => setResetSent(false)}
                    className="text-primary hover:underline"
                  >
                    Try again
                  </button>
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
