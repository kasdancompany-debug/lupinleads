"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { PRICING_COMPARISON } from "@/lib/constants";

type CellValue = boolean | "partial";

function CellIcon({ value }: { value: CellValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-forest-mid/20 text-forest-glow">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12L10 17L20 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }

  if (value === "partial") {
    return (
      <span className="text-[11px] uppercase tracking-wider font-medium text-silver-muted">Partial</span>
    );
  }

  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-silver/5 text-silver-dim">
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function PricingComparison() {
  const { columns, rows } = PRICING_COMPARISON;

  return (
    <FadeIn delay={0.12}>
      <div className="max-w-4xl mx-auto mt-14 lg:mt-16">
        <div className="text-center mb-8">
          <p className="type-eyebrow mb-2">Why Lupin</p>
          <h3 className="type-card-title text-xl sm:text-2xl text-foreground">
            Full system vs. ads-only or DIY
          </h3>
        </div>

        <div className="value-card rounded-2xl overflow-hidden border border-silver/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left border-collapse">
              <thead>
                <tr className="border-b border-silver/10">
                  <th className="p-4 sm:p-5 text-[11px] uppercase tracking-wider text-silver-dim font-medium w-[38%]">
                    What you get
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.id}
                      className={`p-4 sm:p-5 text-center align-bottom ${
                        col.highlighted ? "bg-lupin-purple/8" : ""
                      }`}
                    >
                      <p
                        className={`text-sm font-semibold ${
                          col.highlighted ? "text-foreground" : "text-silver-muted"
                        }`}
                      >
                        {col.name}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-forest-glow mt-1">
                        {col.tagline}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.label}
                    className={index < rows.length - 1 ? "border-b border-silver/8" : ""}
                  >
                    <td className="p-4 sm:p-5 text-sm text-silver-muted">{row.label}</td>
                    <td className="p-4 sm:p-5 text-center">
                      <CellIcon value={row.diy} />
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      <CellIcon value={row.agency} />
                    </td>
                    <td className="p-4 sm:p-5 text-center bg-lupin-purple/5">
                      <CellIcon value={row.lupin} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
