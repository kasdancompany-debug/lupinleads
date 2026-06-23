"use client";

import { MockupShell, MockupStat } from "./MockupShell";
import { MockupCard, StemCompareBar, StemBarChart } from "./MockupBrand";

const ROWS = [
  { month: "Jan 2026", leads: 18, cpl: 44, roas: "3.8×", won: "$62K" },
  { month: "Feb 2026", leads: 24, cpl: 41, roas: "4.2×", won: "$78K" },
  { month: "Mar 2026", leads: 31, cpl: 38, roas: "4.6×", won: "$84K" },
];

export function MonthlyReportMockup({ compact = false }: { compact?: boolean }) {
  return (
    <MockupShell title="Executive Report · March 2026" badge="Sample" compact={compact}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="mockup-avatar mockup-avatar--sm">SC</div>
        <div>
          <p className="text-sm font-medium text-foreground">Sample Contractor</p>
          <p className="text-[10px] text-silver-dim">GTA West · sample data</p>
        </div>
      </div>

      <div className={`grid grid-cols-3 gap-2 ${compact ? "mb-3" : "mb-4"}`}>
        <MockupStat label="Leads" value="31" sub="March" highlight trend="up" />
        <MockupStat label="CPL" value="$38" sub="CAD" highlight />
        <MockupStat label="ROAS" value="4.6×" sub="On spend" highlight trend="up" />
      </div>

      {!compact && (
        <MockupCard className="!p-0 overflow-hidden mb-3">
          <table className="mockup-table text-[11px]">
            <thead>
              <tr>
                <th>Month</th>
                <th>Leads</th>
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
                  <td>${r.cpl}</td>
                  <td className="!text-sage-green font-medium">{r.roas}</td>
                  <td className="!text-foreground">{r.won}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </MockupCard>
      )}

      <StemCompareBar
        spendLabel="Spend"
        spendValue="$3,240"
        closedLabel="Closed"
        closedValue="$84,000"
        closedPct={76}
      />

      {!compact && (
        <MockupCard className="mt-3">
          <p className="mockup-section-label mb-2">Lead growth</p>
          <StemBarChart values={[18, 24, 31]} labels={["Jan", "Feb", "Mar"]} height={56} />
        </MockupCard>
      )}
    </MockupShell>
  );
}
