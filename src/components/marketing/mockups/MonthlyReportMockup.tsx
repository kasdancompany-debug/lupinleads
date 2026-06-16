"use client";

import { MockupShell, MockupStat } from "./MockupShell";

const ROWS = [
  { month: "Jan 2026", leads: 18, spend: "$2,880", cpl: 44, roas: "3.8×", won: "$62K" },
  { month: "Feb 2026", leads: 24, spend: "$3,120", cpl: 41, roas: "4.2×", won: "$78K" },
  { month: "Mar 2026", leads: 31, spend: "$3,240", cpl: 38, roas: "4.6×", won: "$84K" },
];

export function MonthlyReportMockup({ compact = false }: { compact?: boolean }) {
  return (
    <MockupShell title="Executive Report · March 2026" badge="Example" compact={compact}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-forest-mid/20 border border-forest-mid/30 flex items-center justify-center text-[10px] text-forest-glow font-bold">
          SC
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Sample Contractor</p>
          <p className="text-[10px] text-silver-dim">Demo report · GTA West</p>
        </div>
      </div>

      <div className={`grid grid-cols-3 gap-2 ${compact ? "mb-3" : "mb-4"}`}>
        <MockupStat label="Leads" value="31" sub="Example" highlight />
        <MockupStat label="CPL" value="$38" sub="Sample" highlight />
        <MockupStat label="ROAS" value="4.6×" sub="Demo data" highlight />
      </div>

      {!compact && (
        <div className="rounded-lg border border-silver/10 overflow-hidden mb-4">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-silver/10 bg-black-surface/50 text-silver-dim">
                <th className="text-left px-3 py-2 font-medium">Month</th>
                <th className="text-right px-3 py-2 font-medium">Leads</th>
                <th className="text-right px-3 py-2 font-medium">CPL</th>
                <th className="text-right px-3 py-2 font-medium">ROAS</th>
                <th className="text-right px-3 py-2 font-medium">Won</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.month} className="border-b border-silver/5 last:border-0">
                  <td className="px-3 py-2 text-foreground">{r.month}</td>
                  <td className="px-3 py-2 text-right text-silver-muted tabular-nums">{r.leads}</td>
                  <td className="px-3 py-2 text-right text-silver-muted tabular-nums">${r.cpl}</td>
                  <td className="px-3 py-2 text-right text-forest-glow font-medium">{r.roas}</td>
                  <td className="px-3 py-2 text-right text-foreground tabular-nums">{r.won}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="rounded-lg border border-silver/10 bg-black-surface/40 p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] uppercase tracking-wider text-silver-dim">Revenue vs ad spend</p>
          <span className="text-[10px] text-forest-glow">Example trend</span>
        </div>
        <div className="h-2 w-full rounded-full bg-silver/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-forest-mid to-forest-glow"
            style={{ width: "76%" }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-silver-dim">
          <span>Spend $3,240</span>
          <span className="text-foreground font-medium">Closed $84,000</span>
        </div>
      </div>
    </MockupShell>
  );
}
