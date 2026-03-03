import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RescheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

export function RescheduleModal({ open, onOpenChange }: RescheduleModalProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");

  const handleReschedule = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[440px] p-6 gap-0 max-h-[90vh] overflow-y-auto"
        style={{ background: "#F5F1F0" }}
      >
        <DialogHeader className="pb-4">
          <DialogTitle className="font-heading text-xl font-medium text-foreground">
            Reschedule Appointment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Select New Date</label>
            <div className="bg-white rounded-md p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date()}
                className={cn("p-2 pointer-events-auto w-full [&_table]:w-full [&_td]:w-[14.28%] [&_th]:w-[14.28%] [&_.rdp-head_row]:w-full [&_.rdp-tbody]:w-full [&_.rdp-caption]:flex [&_.rdp-caption]:justify-between [&_.rdp-caption]:w-full [&_.rdp-nav]:flex [&_.rdp-nav]:gap-1")}
              />
            </div>
          </div>

          {/* Time */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Preferred Time</label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="w-full bg-white border-border rounded-md">
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {timeSlots.map((t) => (
                  <SelectItem key={t} value={t}>
                    <span className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      {t}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Confirm button */}
          <button
            onClick={handleReschedule}
            className="w-full rounded-md bg-primary py-3.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Clock className="h-4 w-4" />
            Confirm Reschedule
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
