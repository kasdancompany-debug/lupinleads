"use client";

import { LeadDashboardMockup } from "./LeadDashboardMockup";
import { MonthlyReportMockup } from "./MonthlyReportMockup";
import { NewLeadNotificationMockup } from "./NewLeadNotificationMockup";

export function HeroProductStack({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-16 bg-forest-mid/12 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[90%] h-[55%] bg-forest-glow/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[35%] bg-forest-deep/25 rounded-full blur-[60px] pointer-events-none" />

      <div className="absolute -top-3 -left-1 sm:left-2 z-30 w-[min(100%,240px)] animate-float-delayed">
        <NewLeadNotificationMockup compact />
      </div>

      <div className="relative z-10 animate-float-slow drop-shadow-[0_32px_64px_rgba(0,0,0,0.55)]">
        <LeadDashboardMockup />
      </div>

      <div className="absolute -bottom-4 -right-1 sm:-right-4 z-20 w-[min(55%,220px)] hidden sm:block animate-float-reverse drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)]">
        <MonthlyReportMockup compact />
      </div>
    </div>
  );
}
