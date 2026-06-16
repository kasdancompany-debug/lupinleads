"use client";

import { MockupShell, MockupStat } from "./MockupShell";

const PIPELINE = [
  { stage: "New", count: 4, leads: ["Sarah M.", "James K.", "Priya S.", "Tom W."] },
  { stage: "Contact", count: 3, leads: ["Lisa R.", "Mike D.", "Anna L."] },
  { stage: "Appt", count: 2, leads: ["Chris B.", "Nina P."] },
  { stage: "Won", count: 1, leads: ["David H."] },
];

const STAGE_STYLE: Record<string, string> = {
  New: "border-blue-400/25 bg-blue-400/5",
  Contact: "border-amber-400/25 bg-amber-400/5",
  Appt: "border-purple-400/25 bg-purple-400/5",
  Won: "border-forest-glow/35 bg-forest-mid/10",
};

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
      badge="Example"
      compact={compact && !showcase}
      bare={bare}
    >
      <div className={`grid grid-cols-3 gap-3 ${large ? "mb-5" : "mb-3"}`}>
        <MockupStat label="Leads" value="24" sub="This month" />
        <MockupStat label="Estimates" value="11" sub="Booked" />
        <MockupStat label="Won MTD" value="$84K" sub="CAD · sample" />
      </div>

      <div className="flex items-center justify-between mb-3">
        <p className={`uppercase tracking-wider text-silver-dim ${large ? "text-xs" : "text-[10px]"}`}>
          Campaign performance
        </p>
        <span className={`text-silver-dim ${large ? "text-xs" : "text-[10px]"}`}>March 2026</span>
      </div>

      <div className={`rounded-xl border border-silver/10 bg-charcoal/50 p-4 ${large ? "mb-5" : "mb-4"}`}>
        <div className={`flex items-end justify-between gap-1.5 ${large ? "h-24" : "h-16"}`}>
          {[42, 58, 48, 72, 65, 88, 76].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-sm bg-gradient-to-t from-forest-mid/40 to-forest-glow/80"
                style={{ height: `${h}%` }}
              />
              <span className="text-[8px] text-silver-dim">
                {["M", "T", "W", "T", "F", "S", "S"][i]}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3 pt-3 border-t border-silver/8 text-xs">
          <span className="text-silver-dim">
            Ad spend <span className="text-foreground font-medium">$3,240</span>
          </span>
          <span className="text-forest-glow font-medium">CPL $38</span>
        </div>
      </div>

      {large && (
        <>
          <p className="text-xs uppercase tracking-wider text-silver-dim mb-3">Recent leads</p>
          <div className="space-y-2.5">
            {[
              { name: "Sarah M.", project: "Kitchen reno", city: "Brampton", time: "2m ago", hot: true },
              { name: "Marcus T.", project: "Roof replace", city: "Mississauga", time: "14m ago", hot: true },
              { name: "Elena V.", project: "Bathroom", city: "Oakville", time: "1h ago", hot: false },
              { name: "James K.", project: "Deck build", city: "Burlington", time: "3h ago", hot: false },
            ].map((lead) => (
              <div
                key={lead.name}
                className="flex items-center gap-3 rounded-lg border border-silver/10 bg-charcoal/60 px-4 py-3 hover:border-forest-mid/25 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-forest-mid/15 border border-forest-mid/25 flex items-center justify-center text-xs text-forest-glow font-semibold">
                  {lead.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
                    {lead.hot && (
                      <span className="text-[10px] uppercase text-red-300/90 font-medium">Hot</span>
                    )}
                  </div>
                  <p className="text-xs text-silver-dim truncate">
                    {lead.project} · {lead.city}
                  </p>
                </div>
                <span className="text-xs text-silver-dim shrink-0">{lead.time}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </MockupShell>
  );
}

export function LeadDashboardPipelinePreview() {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {PIPELINE.map((col) => (
        <div
          key={col.stage}
          className={`rounded-lg border p-1.5 min-h-[72px] ${STAGE_STYLE[col.stage]}`}
        >
          <p className="text-[8px] uppercase tracking-wider text-silver-dim mb-1.5">{col.stage}</p>
          {col.leads.slice(0, col.count > 2 ? 2 : col.count).map((name) => (
            <div
              key={name}
              className="mb-1 rounded bg-black-surface/80 border border-silver/8 px-1.5 py-1"
            >
              <p className="text-[9px] text-foreground truncate">{name}</p>
            </div>
          ))}
          {col.count > 2 && (
            <p className="text-[8px] text-silver-dim">+{col.count - 2} more</p>
          )}
        </div>
      ))}
    </div>
  );
}
