"use client";

import { NotificationBell } from "./NotificationBell";

export function DashboardTopBar() {
  return (
    <div className="hidden lg:flex items-center justify-end px-6 py-3 border-b border-silver/8 bg-black/50">
      <NotificationBell />
    </div>
  );
}
