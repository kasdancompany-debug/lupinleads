"use client";

import Link from "next/link";
import { WolfMark } from "@/components/ui/WolfMark";
import { NotificationBell } from "./NotificationBell";

export function DashboardMobileNav() {
  return (
    <header className="lg:hidden sticky top-0 z-40 border-b border-silver/8 bg-black/90 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
      <Link href="/dashboard" className="flex items-center gap-2">
        <WolfMark size={24} className="text-forest-glow" />
        <span className="text-sm font-medium text-foreground tracking-wide">LUPIN LEADS</span>
      </Link>
      <div className="flex items-center gap-2">
        <NotificationBell />
        <Link
          href="/"
          className="text-[12px] text-silver-muted hover:text-foreground transition-colors"
        >
          Site
        </Link>
      </div>
    </header>
  );
}
