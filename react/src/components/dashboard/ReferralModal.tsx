import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, Copy } from "lucide-react";

interface ReferralModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const REFERRAL_LINK = "https://devapp.kwilthealth.com/referral/8fc78328";

export function ReferralModal({ open, onOpenChange }: ReferralModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_LINK);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement("input");
      input.value = REFERRAL_LINK;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] p-6 gap-0" style={{ background: "#F5F1F0" }}>
        <DialogHeader className="pb-2">
          <DialogTitle className="font-heading text-xl font-medium text-foreground">
            Refer a friend
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <div className="text-center">
            <h3 className="font-heading text-2xl font-medium text-foreground">Give $20 Get $50</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Get $50 in credits when someone signs up using your referral link and places their first order. Your friend also gets $20 off.
            </p>
          </div>

          <div className="rounded-md border border-border bg-background px-4 py-3">
            <p className="text-sm text-foreground break-all">{REFERRAL_LINK}</p>
          </div>

          <button
            onClick={handleCopy}
            className="w-full rounded-md bg-foreground py-3.5 text-sm font-light text-background hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
