import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface CancelAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentType?: string;
  appointmentDate?: string;
}

export function CancelAppointmentModal({ open, onOpenChange, appointmentType, appointmentDate }: CancelAppointmentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-6 gap-0" style={{ background: "#F5F1F0" }}>
        <DialogHeader className="pb-4">
          <DialogTitle className="font-heading text-xl font-medium text-foreground">
            Cancel Appointment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
            <AlertTriangle className="h-5 w-5 text-muted-foreground flex-none mt-0.5" />
            <div>
              <p className="text-sm font-medium">Are you sure you want to cancel?</p>
              <p className="text-sm text-muted-foreground mt-1">
                {appointmentType && <span className="font-medium text-foreground">{appointmentType}</span>}
                {appointmentDate && <span> on {appointmentDate}</span>}
              </p>
              <p className="text-xs text-muted-foreground mt-2">This action cannot be undone. You will need to book a new appointment.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-md border border-border bg-background py-3 text-sm font-light text-foreground hover:bg-muted transition-colors"
            >
              Keep Appointment
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-md bg-foreground py-3 text-sm font-light text-background hover:opacity-90 transition-opacity"
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
