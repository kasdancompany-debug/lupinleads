"use client";

import { MockupShell, MockupStat, MockupAvatar } from "./MockupShell";
import {
  MockupCard,
  MockupNode,
  MockupStatus,
  StemBarChart,
} from "./MockupBrand";

const RECENT_LEADS = [
  {
    name: "Sarah M.",
    project: "Kitchen reno",
    city: "Brampton",
    time: "2m ago",
    status: "hot" as const,
  },
  {
    name: "Marcus T.",
    project: "Roof replace",
    city: "Mississauga",
    time: "14m ago",
    status: "hot" as const,
  },
];

export function LeadDashboardMockup({
  compact = false,
  showcase = false,
  bare = false,
}: {
  compact?: boolean;
  showcase?: boolean;
  bare?: boolean;
}) {
  const large = showcase || !compact;

  return (
    <MockupShell
      title="LUPIN LEADS · Dashboard"
      badge="Sample"
      compact={compact && !showcase}
      bare={bare}
    >
      <div className={`grid grid-cols-3 gap-2.5 ${large ? "mb-5" : "mb-3"}`}>
        <MockupStat label="Leads" value="24" sub="This month" highlight trend="up" />
        <MockupStat label="Estimates" value="11" sub="Booked" />
        <MockupStat label="Won MTD" value="$84K" sub="CAD" highlight />
      </div>

      <MockupCard className={large ? "mb-5" : "mb-4"}>
        <div className="flex items-center justify-between mb-3">
          <p className="mockup-section-label">Lead volume</p>
          <span className="text-[10px] text-silver-dim">March 2026</span>
        </div>
        <StemBarChart
          values={[42, 58, 48, 72, 65, 88, 76]}
          labels={["M", "T", "W", "T", "F", "S", "S"]}
          height={large ? 96 : 72}
        />
        <div className="flex justify-between mt-4 pt-3 border-t border-silver/8 text-xs">
          <span className="text-silver-dim">
            Ad spend <span className="text-foreground font-medium">$3,240</span>
          </span>
          <span className="text-sage-green font-medium">CPL $38</span>
        </div>
      </MockupCard>

      {large && (
        <>
          <p className="mockup-section-label mb-3">On the path</p>
          <div className="space-y-2">
            {RECENT_LEADS.map((lead) => (
              <div key={lead.name} className="mockup-lead-row">
                <MockupNode variant={lead.status} pulse={lead.status === "hot"} />
                <MockupAvatar name={lead.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
                    <MockupStatus variant={lead.status} label="Hot" />
                  </div>
                  <p className="text-xs text-silver-muted truncate">
                    {lead.project} · {lead.city}
                  </p>
                </div>
                <span className="text-[11px] text-silver-dim shrink-0">{lead.time}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </MockupShell>
  );
}

export function LeadDashboardPipelinePreview() {
  const cols = [
    { stage: "New", count: 3, theme: "new" as const },
    { stage: "Contact", count: 2, theme: "contact" as const },
    { stage: "Appt", count: 2, theme: "appt" as const },
    { stage: "Won", count: 1, theme: "won" as const },
  ];

  return (
    <div className="mockup-pipeline grid grid-cols-4 gap-1.5 !pt-6">
      {cols.map((col) => (
        <div
          key={col.stage}
          className={`mockup-pipeline-col mockup-pipeline-col--${col.theme} !p-2 min-h-[4.5rem]`}
        >
          <p className="text-[8px] uppercase tracking-wider text-silver-dim mb-1.5 flex items-center gap-1">
            <MockupNode variant={col.theme === "won" ? "won" : col.theme === "new" ? "new" : "warm"} />
            {col.stage}
          </p>
          <div className="h-1 w-full rounded-full bg-silver/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-forest-green-deep to-forest-green-bright"
              style={{ width: `${col.count * 25}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
