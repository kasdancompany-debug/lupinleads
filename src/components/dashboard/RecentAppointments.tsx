import type { Appointment, AppointmentStatus } from "@/lib/dashboard/types";
import { formatDateTime } from "@/lib/dashboard/format";

const STATUS_STYLES: Record<AppointmentStatus, { dot: string; label: string }> = {
  scheduled: { dot: "bg-forest-glow", label: "text-forest-glow" },
  completed: { dot: "bg-silver-muted", label: "text-silver-muted" },
  cancelled: { dot: "bg-red-400/60", label: "text-red-400/70" },
  "no-show": { dot: "bg-amber-400/60", label: "text-amber-400/80" },
};

interface RecentAppointmentsProps {
  appointments: Appointment[];
}

export function RecentAppointments({ appointments }: RecentAppointmentsProps) {
  return (
    <div id="appointments" className="dashboard-card overflow-hidden">
      <div className="px-5 py-4 border-b border-silver/8 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-silver-dim">
            Recent Appointments
          </p>
          <p className="text-sm text-silver-muted mt-0.5">
            Upcoming and recent calls
          </p>
        </div>
        <button
          type="button"
          className="text-[12px] text-silver-muted hover:text-foreground transition-colors"
        >
          View calendar
        </button>
      </div>

      <div className="divide-y divide-silver/6">
        {appointments.map((appt) => {
          const style = STATUS_STYLES[appt.status];
          return (
            <div
              key={appt.id}
              className="px-5 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="shrink-0 w-10 h-10 rounded-md bg-black/50 border border-silver/8 flex flex-col items-center justify-center">
                <span className="text-[10px] text-silver-dim uppercase leading-none">
                  {new Date(appt.scheduledAt).toLocaleDateString("en-US", { month: "short" })}
                </span>
                <span className="text-sm font-medium tabular-nums text-foreground leading-none mt-0.5">
                  {new Date(appt.scheduledAt).getDate()}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-foreground truncate">
                  {appt.leadName}
                </p>
                <p className="text-[12px] text-silver-dim truncate">
                  {appt.company} · {appt.type}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-[12px] text-silver-muted tabular-nums">
                  {formatDateTime(appt.scheduledAt)}
                </p>
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                  <span className={`text-[11px] capitalize ${style.label}`}>
                    {appt.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
