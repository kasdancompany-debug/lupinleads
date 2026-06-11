"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WolfMark } from "@/components/ui/WolfMark";
import { SITE } from "@/lib/constants";

const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/dashboard",
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
    label: "Lead Forms",
    href: "/dashboard/forms",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="12" height="12" rx="1" />
        <path d="M5 6H11M5 8.5H9M5 11H11" />
      </svg>
    ),
  },
  {
    label: "AI Assistant",
    href: "/dashboard/assistant",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 1.5L9.5 6H14L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L2 6H6.5L8 1.5Z" />
      </svg>
    ),
  },
  {
    label: "CRM Pipeline",
    href: "/dashboard/crm",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="2" width="4" height="12" rx="0.5" />
        <rect x="6" y="2" width="4" height="8" rx="0.5" />
        <rect x="11" y="2" width="4" height="10" rx="0.5" />
      </svg>
    ),
  },
  {
    label: "Leads",
    href: "/dashboard#leads",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="5" r="2.5" />
        <path d="M3 14C3 11 5.5 9 8 9C10.5 9 13 11 13 14" />
      </svg>
    ),
  },
  {
    label: "Appointments",
    href: "/dashboard#appointments",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="12" height="11" rx="1" />
        <path d="M2 6H14M5 1V4M11 1V4" />
      </svg>
    ),
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 13V8M6 13V5M10 13V3M14 13V7" />
      </svg>
    ),
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-silver/8 bg-black h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-silver/8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <WolfMark size={28} className="text-forest-glow" />
          <p className="text-sm font-medium text-foreground leading-none tracking-wide">
            {SITE.name}
          </p>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const basePath = item.href.split("#")[0];
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : item.href.includes("#")
                ? pathname === basePath
                : pathname === basePath || pathname.startsWith(`${basePath}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors
                ${active
                  ? "bg-white/[0.06] text-foreground"
                  : "text-silver-muted hover:text-foreground hover:bg-white/[0.03]"
                }
              `}
            >
              <span className={active ? "text-forest-glow" : "text-silver-dim"}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-silver/8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-forest-mid/30 border border-forest-mid/40 flex items-center justify-center text-xs font-medium text-forest-glow">
            AO
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground truncate">Apex Outdoors</p>
            <p className="text-[11px] text-silver-dim truncate">Alpha Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
