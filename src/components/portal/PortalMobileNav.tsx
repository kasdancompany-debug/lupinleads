"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WolfMark } from "@/components/ui/WolfMark";
import { PortalSignOutButton } from "@/components/auth/PortalSignOutButton";
import { usePortalContext } from "@/components/portal/PortalContext";

const NAV_ITEMS = [
  { label: "Overview", href: "/portal" },
  { label: "Leads", href: "/portal/pipeline" },
  { label: "Reports", href: "/portal/reports" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/portal") return pathname === "/portal";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PortalMobileNav() {
  const pathname = usePathname();
  const { clientName } = usePortalContext();

  return (
    <header className="lg:hidden sticky top-0 z-40 border-b border-silver/8 bg-black/95 backdrop-blur-xl">
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/portal" className="flex items-center gap-2 min-w-0">
          <WolfMark size={24} className="text-forest-glow shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{clientName}</p>
            <p className="text-[10px] text-silver-dim">Client portal</p>
          </div>
        </Link>
        <PortalSignOutButton />
      </div>

      <nav className="flex border-t border-silver/8">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 py-2.5 text-center text-[11px] font-medium tracking-wide transition-colors ${
                active
                  ? "text-forest-glow border-b-2 border-forest-glow bg-white/[0.03]"
                  : "text-silver-dim"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
