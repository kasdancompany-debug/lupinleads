"use client";

import { MockupShell, MockupStat } from "./MockupShell";

const ROWS = [
  { month: "Jan 2026", leads: 18, spend: "$2,880", cpl: 44, roas: "3.8×", won: "$62K" },
  { month: "Feb 2026", leads: 24, spend: "$3,120", cpl: 41, roas: "4.2×", won: "$78K" },
  { month: "Mar 2026", leads: 31, spend: "$3,240", cpl: 38, roas: "4.6×", won: "$84K" },
];

export function ReportingDashboardMockup({
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
      title="LUPIN LEADS · Reports"
      badge="Example"
      compact={compact && !showcase}
      bare={bare}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`rounded-lg bg-forest-mid/20 border border-forest-mid/30 flex items-center justify-center text-forest-glow font-bold shrink-0 ${
            large ? "w-10 h-10 text-xs" : "w-8 h-8 text-[10px]"
          }`}
        >
          SC
        </div>
        <div>
          <p className={`font-medium text-foreground ${large ? "text-base" : "text-sm"}`}>
            Sample Contractor
          </p>
          <p className={`text-silver-dim ${large ? "text-xs" : "text-[10px]"}`}>
            Executive reporting · GTA West
          </p>
        </div>
        {large && (
          <div className="ml-auto flex gap-1">
            {["Overview", "Pipeline", "Reports"].map((tab, i) => (
              <span
                key={tab}
                className={`text-[10px] px-2.5 py-1 rounded-md ${
                  i === 2
                    ? "bg-forest-mid/20 text-forest-glow border border-forest-mid/30"
                    : "text-silver-dim"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${large ? "mb-5" : "mb-3"}`}>
        <MockupStat label="Leads" value="31" sub="This month" highlight />
        <MockupStat label="CPL" value="$38" sub="CAD avg" highlight />
        <MockupStat label="ROAS" value="4.6×" sub="On ad spend" highlight />
        <MockupStat label="Closed" value="$84K" sub="Won jobs" highlight />
      </div>

      {large && (
        <>
          <div className="rounded-xl border border-silver/10 overflow-hidden mb-5">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-silver/10 bg-charcoal/80 text-silver-dim">
                  <th className="text-left px-4 py-3 font-medium">Month</th>
                  <th className="text-right px-4 py-3 font-medium">Leads</th>
                  <th className="text-right px-4 py-3 font-medium hidden sm:table-cell">Spend</th>
                  <th className="text-right px-4 py-3 font-medium">CPL</th>
                  <th className="text-right px-4 py-3 font-medium">ROAS</th>
                  <th className="text-right px-4 py-3 font-medium">Won</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr
                    key={r.month}
                    className="border-b border-silver/5 last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3 text-foreground font-medium">{r.month}</td>
                    <td className="px-4 py-3 text-right text-silver-muted tabular-nums">
                      {r.leads}
                    </td>
                    <td className="px-4 py-3 text-right text-silver-muted tabular-nums hidden sm:table-cell">
                      {r.spend}
                    </td>
                    <td className="px-4 py-3 text-right text-silver-muted tabular-nums">
                      ${r.cpl}
                    </td>
                    <td className="px-4 py-3 text-right text-forest-glow font-semibold">
                      {r.roas}
                    </td>
                    <td className="px-4 py-3 text-right text-foreground font-medium tabular-nums">
                      {r.won}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-silver/10 bg-charcoal/40 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] uppercase tracking-wider text-silver-dim">
                  Revenue vs ad spend
                </p>
                <span className="text-[11px] text-forest-glow font-medium">+26% MoM</span>
              </div>
              <div className="h-3 w-full rounded-full bg-silver/10 overflow-hidden mb-3">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-forest-mid to-forest-glow"
                  style={{ width: "76%" }}
                />
              </div>
              <div className="flex justify-between text-xs text-silver-dim">
                <span>Spend $3,240</span>
                <span className="text-foreground font-semibold">Closed $84,000</span>
              </div>
            </div>
            <div className="rounded-xl border border-silver/10 bg-charcoal/40 p-4">
              <p className="text-[11px] uppercase tracking-wider text-silver-dim mb-3">
                Pipeline snapshot
              </p>
              <div className="space-y-2">
                {[
                  { label: "New leads", value: "8", pct: 32 },
                  { label: "In follow-up", value: "14", pct: 56 },
                  { label: "Won this month", value: "4", pct: 100 },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-silver-muted">{row.label}</span>
                      <span className="text-foreground font-medium tabular-nums">{row.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-silver/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-forest-mid/80"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </MockupShell>
  );
}
