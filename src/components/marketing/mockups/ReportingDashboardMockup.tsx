"use client";

import { MockupShell, MockupStat } from "./MockupShell";
import {
  MockupCard,
  StemCompareBar,
  StemProgressRow,
  StemBarChart,
} from "./MockupBrand";

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
      badge="Sample"
      compact={compact && !showcase}
      bare={bare}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="mockup-avatar mockup-avatar--md">SC</div>
        <div className="min-w-0 flex-1">
          <p className={`font-medium text-foreground ${large ? "text-base" : "text-sm"}`}>
            Sample Contractor
          </p>
          <p className={`text-silver-dim ${large ? "text-xs" : "text-[10px]"}`}>
            Executive reporting · GTA West
          </p>
        </div>
        {large && (
          <div className="hidden sm:flex gap-1 shrink-0">
            {["Overview", "Pipeline", "Reports"].map((tab, i) => (
              <span
                key={tab}
                className={`text-[10px] px-2 py-1 rounded-md ${
                  i === 2
                    ? "bg-forest-green-deep/40 text-sage-green border border-forest-green-bright/25"
                    : "text-silver-dim"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2.5 ${large ? "mb-5" : "mb-3"}`}>
        <MockupStat label="Leads" value="31" sub="This month" highlight trend="up" />
        <MockupStat label="CPL" value="$38" sub="CAD avg" highlight />
        <MockupStat label="ROAS" value="4.6×" sub="On spend" highlight trend="up" />
        <MockupStat label="Closed" value="$84K" sub="Won jobs" highlight />
      </div>

      {large && (
        <>
          <MockupCard className="!p-0 overflow-hidden mb-4">
            <table className="mockup-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Leads</th>
                  <th className="hidden sm:table-cell">Spend</th>
                  <th>CPL</th>
                  <th>ROAS</th>
                  <th>Won</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.month}>
                    <td>{r.month}</td>
                    <td>{r.leads}</td>
                    <td className="hidden sm:table-cell">{r.spend}</td>
                    <td>${r.cpl}</td>
                    <td className="!text-sage-green font-semibold">{r.roas}</td>
                    <td className="!text-foreground font-medium">{r.won}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </MockupCard>

          <div className="grid sm:grid-cols-2 gap-3">
            <StemCompareBar
              spendLabel="Spend"
              spendValue="$3,240"
              closedLabel="Closed"
              closedValue="$84,000"
              closedPct={76}
            />
            <MockupCard>
              <p className="mockup-section-label mb-4">Pipeline on the stem</p>
              <div className="space-y-3">
                <StemProgressRow label="New leads" value="8" pct={32} />
                <StemProgressRow label="In follow-up" value="14" pct={56} />
                <StemProgressRow label="Won this month" value="4" pct={100} />
              </div>
            </MockupCard>
          </div>

          <MockupCard className="mt-4">
            <p className="mockup-section-label mb-3">Monthly lead growth</p>
            <StemBarChart
              values={[18, 24, 31]}
              labels={["Jan", "Feb", "Mar"]}
              height={72}
            />
          </MockupCard>
        </>
      )}
    </MockupShell>
  );
}
