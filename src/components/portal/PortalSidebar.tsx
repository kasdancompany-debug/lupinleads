"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WolfMark } from "@/components/ui/WolfMark";
import { usePortalContext } from "@/components/portal/PortalContext";

const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/portal",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="5" height="5" rx="1" />
        <rect x="9" y="2" width="5" height="5" rx="1" />
        <rect x="2" y="9" width="5" height="5" rx="1" />
        <rect x="9" y="9" width="5" height="5" rx="1" />
      </svg>
    ),
  },
  {
    label: "Leads",
    href: "/portal/pipeline",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="2" width="4" height="12" rx="0.5" />
        <rect x="6" y="2" width="4" height="8" rx="0.5" />
        <rect x="11" y="2" width="4" height="10" rx="0.5" />
      </svg>
    ),
  },
  {
    label: "Reports",
    href: "/portal/reports",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 13V8M6 13V5M10 13V3M14 13V7" />
      </svg>
    ),
  },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/portal") {
    return pathname === "/portal";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function clientInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "CL";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function PortalSidebar() {
  const pathname = usePathname();
  const { clientName } = usePortalContext();

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-silver/8 bg-black h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-silver/8">
        <Link href="/portal" className="flex items-center gap-2.5 group">
          <WolfMark size={28} className="text-forest-glow" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground leading-none tracking-wide truncate">
              Lupin Leads
            </p>
            <p className="text-[10px] text-silver-dim mt-1 tracking-wide">Client portal</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors
                ${
                  active
                    ? "bg-white/[0.06] text-foreground"
                    : "text-silver-muted hover:text-foreground hover:bg-white/[0.03]"
                }
              `}
            >
              <span className={active ? "text-forest-glow" : "text-silver-dim"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-silver/8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-forest-mid/30 border border-forest-mid/40 flex items-center justify-center text-[10px] font-semibold text-forest-glow">
            {clientInitials(clientName)}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{clientName}</p>
            <p className="text-[11px] text-silver-dim truncate">Your account</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
