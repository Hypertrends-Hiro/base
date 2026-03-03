import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, getDaysInMonth, startOfMonth, getDay, isAfter, isSameDay } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1919 }, (_, i) => currentYear - 1 - i);

interface DobPickerProps {
  value: Date | undefined;
  onChange: (date: Date) => void;
  inputClass?: string;
}

export function DobPicker({ value, onChange, inputClass = "" }: DobPickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? 1990);
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? 0);

  const daysInMonth = getDaysInMonth(new Date(viewYear, viewMonth, 1));
  const firstDayOfWeek = getDay(startOfMonth(new Date(viewYear, viewMonth, 1)));

  // Pad with previous month's trailing days
  const leadingBlanks = firstDayOfWeek;
  const totalCells = Math.ceil((leadingBlanks + daysInMonth) / 7) * 7;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(v => v - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(v => v + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleDayClick = (day: number) => {
    const selected = new Date(viewYear, viewMonth, day);
    if (isAfter(selected, today)) return;
    onChange(selected);
    setOpen(false);
  };

  const selectClass =
    "h-9 rounded-md border border-border bg-card px-3 text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            inputClass,
            "flex items-center justify-between w-full text-left",
            !value && "text-foreground/30"
          )}
        >
          {value ? format(value, "MM/dd/yyyy") : "MM/DD/YYYY"}
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-foreground shrink-0">
            <path d="M4.5 1V3M10.5 1V3M1 5.5H14M2.5 2.5H12.5C13.05 2.5 13.5 2.95 13.5 3.5V12.5C13.5 13.05 13.05 13.5 12.5 13.5H2.5C1.95 13.5 1.5 13.05 1.5 12.5V3.5C1.5 2.95 1.95 2.5 2.5 2.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[300px] p-0 z-50 bg-card border border-border shadow-xl rounded-lg overflow-hidden"
        align="start"
        sideOffset={4}
      >
        {/* Year + Month dropdowns */}
        <div className="flex gap-2 p-3 border-b border-border bg-card">
          <div className="relative flex-1">
            <select
              className={selectClass + " w-full pr-7"}
              value={viewYear}
              onChange={e => setViewYear(Number(e.target.value))}
            >
              {YEARS.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <ChevronRight size={12} className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-foreground pointer-events-none" />
          </div>
          <div className="relative flex-1">
            <select
              className={selectClass + " w-full pr-7"}
              value={viewMonth}
              onChange={e => setViewMonth(Number(e.target.value))}
            >
              {MONTHS.map((m, i) => (
                <option key={m} value={i}>{m}</option>
              ))}
            </select>
            <ChevronRight size={12} className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-foreground pointer-events-none" />
          </div>
        </div>

        {/* Month title + prev/next arrows */}
        <div className="flex items-center justify-between px-4 py-2.5">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1 rounded hover:bg-background transition-colors text-foreground hover:text-foreground"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-semibold text-foreground">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1 rounded hover:bg-background transition-colors text-foreground hover:text-foreground"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Day of week headers */}
        <div className="grid grid-cols-7 px-3 pb-1">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
            <div key={d} className="text-center text-[11px] font-semibold text-foreground py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 px-3 pb-3 gap-y-0.5">
          {Array.from({ length: totalCells }, (_, i) => {
            const day = i - leadingBlanks + 1;
            const isCurrentMonth = day >= 1 && day <= daysInMonth;
            const cellDate = new Date(viewYear, viewMonth, day);
            const isFuture = isAfter(cellDate, today);
            const isSelected = value && isSameDay(cellDate, value);

            return (
              <button
                key={i}
                type="button"
                disabled={!isCurrentMonth || isFuture}
                onClick={() => isCurrentMonth && handleDayClick(day)}
                className={cn(
                  "h-8 w-full text-sm rounded-md transition-colors flex items-center justify-center",
                  !isCurrentMonth && "text-foreground/20 cursor-default",
                  isCurrentMonth && !isFuture && !isSelected &&
                    "text-foreground hover:bg-primary/10 cursor-pointer",
                  isCurrentMonth && isFuture && "text-foreground/25 cursor-not-allowed",
                  isSelected &&
                    "bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                )}
              >
                {isCurrentMonth ? day : ""}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
