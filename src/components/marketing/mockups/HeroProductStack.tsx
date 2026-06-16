"use client";

import { LeadDashboardMockup } from "./LeadDashboardMockup";
import { MonthlyReportMockup } from "./MonthlyReportMockup";
import { NewLeadNotificationMockup } from "./NewLeadNotificationMockup";

export function HeroProductStack({ className = "" }: { className?: string }) {
  return (
    <div className={`relative min-h-[340px] sm:min-h-[380px] ${className}`}>
      <div className="absolute -inset-12 bg-forest-mid/12 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[90%] h-[55%] bg-forest-glow/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="absolute top-2 left-0 sm:left-2 z-30 w-[min(100%,210px)] animate-float-delayed">
        <NewLeadNotificationMockup compact />
      </div>

      <div className="relative z-10 pt-10 sm:pt-12 animate-float-slow drop-shadow-[0_32px_64px_rgba(0,0,0,0.55)]">
        <LeadDashboardMockup />
      </div>

      <div className="absolute bottom-0 right-0 sm:right-2 z-20 w-[min(48%,190px)] hidden sm:block animate-float-reverse drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)]">
        <MonthlyReportMockup compact />
      </div>
    </div>
  );
}
