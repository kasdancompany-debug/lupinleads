import Link from "next/link";

interface PortalEmptyStateProps {
  title: string;
  description: string;
  action?: { label: string; href: string };
  icon?: "leads" | "reports" | "connect";
}

export function PortalEmptyState({
  title,
  description,
  action,
  icon = "leads",
}: PortalEmptyStateProps) {
  return (
    <div className="dashboard-card px-5 py-8 sm:py-10 text-center border border-silver/8 border-dashed">
      <div className="w-11 h-11 rounded-full bg-forest-mid/15 border border-forest-mid/25 flex items-center justify-center mx-auto mb-4">
        <EmptyIcon type={icon} />
      </div>
      <p className="text-[15px] font-medium text-foreground mb-2">{title}</p>
      <p className="text-[13px] text-silver-muted leading-relaxed max-w-md mx-auto">
        {description}
      </p>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex items-center justify-center mt-5 px-4 py-2 rounded-md text-[13px] font-medium bg-forest-mid/80 text-foreground hover:bg-forest-mid border border-forest-light/20 transition-colors"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}

function EmptyIcon({ type }: { type: PortalEmptyStateProps["icon"] }) {
  const className = "w-5 h-5 text-forest-glow";

  if (type === "reports") {
    return (
      <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 16V9M7 16V5M11 16V3M15 16V7" />
      </svg>
    );
  }

  if (type === "connect") {
    return (
      <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="7" />
        <path d="M10 7v3.5l2 1.5" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="7" r="3" />
      <path d="M4 17c0-3.3 2.7-5 6-5s6 1.7 6 5" />
    </svg>
  );
}
