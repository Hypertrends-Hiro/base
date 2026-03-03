import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarDays, FileText, Clock, Calendar, Download, Mail } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BookAppointmentModal } from "@/components/treatments/BookAppointmentModal";
import { RescheduleModal } from "@/components/treatments/RescheduleModal";
import { CancelAppointmentModal } from "@/components/treatments/CancelAppointmentModal";
import { cn } from "@/lib/utils";

/* ── Mock Data ── */

type AppointmentStatus = "confirmed" | "missed" | "completed";

interface Appointment {
  id: string;
  provider: string;
  providerAvatar: string;
  status: AppointmentStatus;
  type: string;
  date: string;
  time: string;
  complaint?: string;
}

const upcomingAppointments: Appointment[] = [
  {
    id: "u1",
    provider: "Dr. Sarah Wilson",
    providerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    status: "confirmed",
    type: "Follow-up Visit",
    date: "Tuesday, March 10, 2026",
    time: "10:30 AM",
  },
  {
    id: "u2",
    provider: "Dr. Sarah Wilson",
    providerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    status: "confirmed",
    type: "Mid-point Lab Review",
    date: "Thursday, April 2, 2026",
    time: "2:00 PM",
  },
];

const recentAppointments: Appointment[] = [
  {
    id: "r1",
    provider: "Dr. Sarah Wilson",
    providerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    status: "missed",
    type: "Lab Review",
    date: "Monday, February 16, 2026",
    time: "9:00 AM",
  },
  {
    id: "r2",
    provider: "Dr. Sarah Wilson",
    providerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    status: "completed",
    type: "Routine Check-up",
    date: "Wednesday, January 28, 2026",
    time: "11:00 AM",
  },
  {
    id: "r3",
    provider: "Dr. Sarah Wilson",
    providerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    status: "completed",
    type: "New Treatment Consultation",
    date: "Friday, December 12, 2025",
    time: "3:30 PM",
  },
];

interface VisitSummary {
  id: string;
  provider: string;
  providerAvatar: string;
  date: string;
  type: string;
  visitType: string;
  complaint: string;
  medications: { name: string; dosage: string; instructions: string; quantity: string; refills: string }[];
  labResults: { name: string; value: string; status: string }[];
  careInstructions: string[];
  providerNotes: string;
  nextAppointment: string;
}

const visitSummaries: VisitSummary[] = [
  {
    id: "v1",
    provider: "Dr. Sarah Wilson",
    providerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    date: "Wednesday, January 28, 2026",
    type: "Routine Check-up",
    visitType: "Routine Check-up",
    complaint: "Follow-up for hypertension management",
    medications: [
      { name: "Lisinopril 10mg", dosage: "10mg", instructions: "Take once daily in the morning", quantity: "30 tablets", refills: "2 refills remaining" },
    ],
    labResults: [
      { name: "Total Cholesterol", value: "185 mg/dL", status: "Normal" },
      { name: "LDL Cholesterol", value: "110 mg/dL", status: "Borderline High" },
    ],
    careInstructions: [
      "Continue current blood pressure medication as prescribed",
      "Monitor blood pressure at home daily",
      "Follow low-sodium diet (less than 2300mg per day)",
      "Exercise 30 minutes daily, 5 days per week",
      "Schedule follow-up appointment in 3 months",
    ],
    providerNotes: "Patient reports good compliance with medications. Blood pressure well controlled. Continue current regime.",
    nextAppointment: "Scheduled for: March 10, 2026",
  },
  {
    id: "v2",
    provider: "Dr. Sarah Wilson",
    providerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    date: "Friday, December 12, 2025",
    type: "New Treatment Consultation",
    visitType: "New Treatment Consultation",
    complaint: "Initial consultation for hormone therapy evaluation",
    medications: [
      { name: "Progesterone 100mg", dosage: "100mg", instructions: "Take at bedtime", quantity: "30 capsules", refills: "3 refills remaining" },
    ],
    labResults: [
      { name: "Estradiol", value: "45 pg/mL", status: "Low" },
      { name: "TSH", value: "2.1 mIU/L", status: "Normal" },
    ],
    careInstructions: [
      "Begin prescribed hormone therapy as directed",
      "Track symptoms daily in journal",
      "Return for follow-up labs in 6 weeks",
    ],
    providerNotes: "Patient presents with fatigue and mood changes. Labs consistent with perimenopause. Starting low-dose HRT. Will reassess at follow-up.",
    nextAppointment: "Scheduled for: January 28, 2026",
  },
];

/* ── Status Badge ── */

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const styles: Record<AppointmentStatus, string> = {
    confirmed: "bg-primary text-primary-foreground",
    missed: "bg-foreground text-background",
    completed: "bg-primary text-primary-foreground",
  };
  const labels: Record<AppointmentStatus, string> = {
    confirmed: "Confirmed",
    missed: "Missed",
    completed: "Completed",
  };
  return (
    <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-medium", styles[status])}>
      {labels[status]}
    </span>
  );
}

/* ── Appointment Card ── */

function AppointmentCard({ appointment, variant, onReschedule, onCancel, onViewSummary }: { appointment: Appointment; variant: "upcoming" | "recent"; onReschedule?: () => void; onCancel?: () => void; onViewSummary?: () => void }) {
  return (
    <div className={cn(
      "rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4",
      appointment.status === "missed" ? "bg-background border border-border" : "bg-card"
    )}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <p className="font-heading text-base font-medium">{appointment.provider}</p>
          <StatusBadge status={appointment.status} />
          <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-foreground">
            {appointment.type}
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {appointment.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {appointment.time}
          </span>
        </div>
      </div>

      <div className="flex gap-2 flex-none">
        {variant === "upcoming" && (
          <>
            <button onClick={onReschedule} className="rounded-md bg-primary px-4 py-2 text-sm font-light text-foreground hover:bg-primary/90 transition-colors flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              Reschedule
            </button>
            <button onClick={onCancel} className="rounded-md bg-primary px-4 py-2 text-sm font-light text-foreground hover:bg-primary/90 transition-colors flex items-center gap-1.5">
              ✕ Cancel
            </button>
          </>
        )}
        {variant === "recent" && appointment.status === "missed" && (
          <button onClick={onReschedule} className="rounded-md bg-primary px-4 py-2 text-sm font-light text-foreground hover:bg-primary/90 transition-colors">
            Reschedule
          </button>
        )}
        {variant === "recent" && appointment.status === "completed" && (
          <button onClick={onViewSummary} className="rounded-md bg-primary px-4 py-2 text-sm font-light text-foreground hover:bg-primary/90 transition-colors">
            View Summary
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Visit Summary Detail ── */

function VisitSummaryDetail({ summary }: { summary: VisitSummary }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-heading text-lg font-medium">Visit Summaries</h3>
          </div>
          <p className="text-sm text-muted-foreground">{summary.date} – {summary.provider}</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-light text-foreground hover:bg-primary/90 transition-colors flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </button>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-light text-foreground hover:bg-primary/90 transition-colors flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            Email Summary
          </button>
        </div>
      </div>

      {/* Visit Information */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <p className="text-sm font-medium mb-1">Visit Information</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground">Date :</span> {summary.date}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            <span className="font-medium text-foreground">Visit Type :</span> {summary.visitType}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            <span className="font-medium text-foreground">Chief Complaint :</span> {summary.complaint}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <span className="font-medium text-foreground">Provider :</span> {summary.provider}
          </p>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Medications */}
      {summary.medications.map((med, i) => (
        <div key={i} className="rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">💊</span>
            <h4 className="text-sm font-medium">Medications</h4>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium">{med.name}</p>
              <p className="text-xs text-muted-foreground">{med.instructions}</p>
              <p className="text-sm font-medium mt-1">Quantity: {med.quantity}</p>
            </div>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-foreground whitespace-nowrap">
              {med.refills}
            </span>
          </div>
        </div>
      ))}

      <div className="h-px bg-border border-dashed" style={{ borderTopStyle: 'dashed' }} />

      {/* Lab Results */}
      <div>
        <h4 className="font-heading text-base font-medium mb-3">Lab Results</h4>
        <div className="space-y-3">
          {summary.labResults.map((lab, i) => (
            <div key={i} className="rounded-xl border border-border p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{lab.name}</p>
                <p className="text-xs text-muted-foreground">{lab.value}</p>
              </div>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-foreground">
                {lab.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Care Instructions */}
      <div>
        <h4 className="font-heading text-base font-medium mb-3">Care Instructions</h4>
        <ul className="space-y-2">
          {summary.careInstructions.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-none" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Provider Notes */}
      <div className="rounded-xl border border-border p-4">
        <h4 className="text-sm font-medium mb-2">Provider Notes</h4>
        <p className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-none" />
          {summary.providerNotes}
        </p>
      </div>

      {/* Next Appointment */}
      <div className="rounded-xl border border-border p-4">
        <h4 className="text-sm font-medium mb-2">Next Appointment</h4>
        <p className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-none" />
          {summary.nextAppointment}
        </p>
      </div>
    </div>
  );
}

/* ── Main Page ── */

export default function PatientPortal() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") === "visit-summary" ? "visit-summary" : "appointments";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [bookOpen, setBookOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null);
  const [selectedVisit, setSelectedVisit] = useState<VisitSummary>(visitSummaries[0]);

  const handleViewSummary = (appointment: Appointment) => {
    const match = visitSummaries.find((v) => v.date === appointment.date && v.type === appointment.type);
    if (match) setSelectedVisit(match);
    setActiveTab("visit-summary");
  };

  return (
    <>
      <div className="p-4 lg:p-12 max-w-6xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-2xl font-light lg:text-4xl">Patient Portal</h1>
            <p className="text-muted-foreground mt-1 text-sm">Manage your health records and appointments</p>
          </div>
          <button
            onClick={() => setBookOpen(true)}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-light text-foreground hover:bg-primary/90 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            + Book New Appointment
          </button>
        </header>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="bg-transparent p-0 h-auto gap-2 mb-6">
            <TabsTrigger
              value="appointments"
              className="rounded-full px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground border-0 shadow-none flex items-center gap-1.5"
            >
              <CalendarDays className="h-3.5 w-3.5" />
              Appointments
            </TabsTrigger>
            <TabsTrigger
              value="visit-summary"
              className="rounded-full px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground border-0 shadow-none flex items-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5" />
              Visit Summary
            </TabsTrigger>
          </TabsList>

          {/* ── Appointments Tab ── */}
          <TabsContent value="appointments" className="space-y-8">
            {/* Upcoming */}
            <section className="rounded-2xl p-6" style={{ background: "#F5F1F0" }}>
              <h2 className="font-heading text-xl font-medium mb-4">Upcoming Appointments</h2>
              <div className="space-y-3">
                 {upcomingAppointments.map((a) => (
                  <AppointmentCard key={a.id} appointment={a} variant="upcoming" onReschedule={() => setRescheduleOpen(true)} onCancel={() => { setCancelTarget(a); setCancelOpen(true); }} />
                ))}
              </div>
            </section>

            {/* Recent */}
            <section className="rounded-2xl p-6" style={{ background: "#F5F1F0" }}>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <h2 className="font-heading text-xl font-medium">Recent Appointments</h2>
              </div>
              <div className="space-y-3">
                {recentAppointments.map((a) => (
                  <AppointmentCard key={a.id} appointment={a} variant="recent" onReschedule={() => setRescheduleOpen(true)} onViewSummary={() => handleViewSummary(a)} />
                ))}
              </div>
            </section>
          </TabsContent>

          {/* ── Visit Summary Tab ── */}
          <TabsContent value="visit-summary" className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <h2 className="font-heading text-lg font-medium">Visit Summaries</h2>
              </div>
              <p className="text-sm text-muted-foreground">Review detailed summaries from your recent medical visits.</p>
            </div>

            <h3 className="font-heading text-base font-medium">Recent Visits</h3>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
              {/* Left: Visit list */}
              <div className="space-y-3">
                {visitSummaries.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVisit(v)}
                    className={cn(
                      "w-full text-left rounded-xl p-4 transition-colors",
                      selectedVisit.id === v.id ? "bg-card shadow-soft ring-1 ring-primary/20" : "bg-card/50 hover:bg-card"
                    )}
                  >
                    <span className="inline-flex rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-medium text-primary-foreground mb-1">
                      {v.type}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">{v.date}</span>
                    <p className="text-sm font-medium mt-1">{v.provider}</p>
                    <p className="text-xs text-muted-foreground">{v.complaint}</p>
                  </button>
                ))}
              </div>

              {/* Right: Detail */}
              <div className="rounded-2xl p-6" style={{ background: "#F5F1F0" }}>
                <VisitSummaryDetail summary={selectedVisit} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BookAppointmentModal open={bookOpen} onOpenChange={setBookOpen} />
      <RescheduleModal open={rescheduleOpen} onOpenChange={setRescheduleOpen} />
      <CancelAppointmentModal
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        appointmentType={cancelTarget?.type}
        appointmentDate={cancelTarget?.date}
      />
    </>
  );
}
