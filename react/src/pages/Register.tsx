import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DobPicker } from "@/components/signup/DobPicker";
import { SignupLayout } from "@/components/signup/SignupLayout";

const US_PHONE_PLACEHOLDER = "888-299-5088";

function FormField({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[10px] font-semibold uppercase tracking-widest text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [terms, setTerms] = useState(false);
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [errors, setErrors] = useState<{ sex?: string; age?: string }>({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    biologicalSex: "",
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const getAge = (date: Date) => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) age--;
    return age;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { sex?: string; age?: string } = {};

    if (form.biologicalSex !== "female") {
      newErrors.sex = "At this time, KWILT membership is available for females only.";
    }
    if (!dob || getAge(dob) < 18) {
      newErrors.age = "You must be 18 or older to create an account.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    navigate("/payment", {
      state: { firstName: form.firstName, lastName: form.lastName, email: form.email },
    });
  };

  const inputClass =
    "h-12 rounded-md border border-border bg-card px-4 text-sm text-foreground placeholder:text-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none";

  return (
    <SignupLayout
      leftContent={
        <div className="max-w-xs">
          <h1 className="font-heading text-3xl font-semibold leading-snug text-foreground mb-5">
            Become a KWILT™ member
          </h1>
          <p className="text-sm leading-relaxed text-foreground">
            It's time to truly own your health narrative. Track and understand
            vital aspects like your heart, hormones, potential cancer indicators,
            thyroid health, and more. Create an account to stay empowered and
            proactive.
          </p>
        </div>
      }
      rightContent={
        <div className="max-w-xl w-full mx-auto">
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-1">
            Your Information
          </h2>
          <p className="text-xs text-foreground mb-8">
            All fields are required unless marked optional.
          </p>

          <form onSubmit={handleContinue} className="space-y-5">
            {/* Legal Name */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground mb-1.5">
                Legal Name
              </p>
              <p className="text-[11px] text-foreground mb-3 italic">
                *Your name must match the ID you present at each lab visit.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  className={inputClass}
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={set("firstName")}
                  required
                />
                <Input
                  className={inputClass}
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={set("lastName")}
                  required
                />
              </div>
            </div>

            {/* Email / Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField label="Email">
                <Input
                  className={inputClass}
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={set("email")}
                  required
                />
              </FormField>
              <FormField label="Phone">
                <Input
                  className={inputClass}
                  type="tel"
                  placeholder={US_PHONE_PLACEHOLDER}
                  value={form.phone}
                  onChange={set("phone")}
                />
              </FormField>
            </div>

            {/* Biological Sex / DOB */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField label="Select Biological Sex">
                <select
                  className={inputClass + " appearance-none cursor-pointer"}
                  value={form.biologicalSex}
                  onChange={(e) => { set("biologicalSex")(e); setErrors((err) => ({ ...err, sex: undefined })); }}
                >
                  <option value="">Select an option</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="intersex">Intersex</option>
                </select>
                {errors.sex && (
                  <p className="text-xs text-destructive mt-1">{errors.sex}</p>
                )}
              </FormField>
              <FormField label="Date of Birth">
                <DobPicker
                  value={dob}
                  onChange={(d) => { setDob(d); setErrors((err) => ({ ...err, age: undefined })); }}
                  inputClass={inputClass}
                />
                {errors.age && (
                  <p className="text-xs text-destructive mt-1">{errors.age}</p>
                )}
              </FormField>
            </div>

            {/* Password / Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField label="Password">
                <div className="relative">
                  <Input
                    className={inputClass + " pr-10"}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={set("password")}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </FormField>
              <FormField label="Confirm Password">
                <div className="relative">
                  <Input
                    className={inputClass + " pr-10"}
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={set("confirmPassword")}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
                    onClick={() => setShowConfirm((v) => !v)}
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </FormField>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="marketing"
                  checked={marketing}
                  onCheckedChange={(v) => setMarketing(!!v)}
                  className="mt-0.5"
                />
                <Label htmlFor="marketing" className="text-xs leading-relaxed text-foreground cursor-pointer">
                  I want to receive offers, updates, marketing emails &amp; SMS from KWILT Health
                </Label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={terms}
                  onCheckedChange={(v) => setTerms(!!v)}
                  className="mt-0.5"
                  required
                />
                <Label htmlFor="terms" className="text-xs leading-relaxed text-foreground cursor-pointer">
                  I agree to KWILT's{" "}
                  <span className="underline cursor-pointer text-foreground">Terms of Service</span>{" "}
                  and{" "}
                  <span className="underline cursor-pointer text-foreground">Privacy Policy</span>
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-md bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:bg-primary/90 mt-4"
            >
              Continue to Payment
            </Button>

            <p className="text-center text-xs text-foreground pt-1">
              Already have an account?{" "}
              <a href="/login" className="text-foreground underline">
                Log in
              </a>
            </p>
          </form>
        </div>
      }
    />
  );
}
