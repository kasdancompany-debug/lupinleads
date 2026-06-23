"use client";

import { PortalSignOutButton } from "@/components/auth/PortalSignOutButton";
import { usePortalContext } from "@/components/portal/PortalContext";

export function PortalTopBar() {
  const { clientName } = usePortalContext();

  return (
    <div className="hidden lg:flex items-center justify-between gap-4 px-6 py-3.5 border-b border-silver/8 bg-black/50 backdrop-blur-sm">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{clientName}</p>
        <p className="text-[11px] text-silver-dim tracking-wide">Client portal</p>
      </div>
      <PortalSignOutButton />
    </div>
  );
}
