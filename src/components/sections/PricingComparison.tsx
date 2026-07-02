"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { ComparisonCellIcon } from "@/components/ui/ComparisonCellIcon";
import { PRICING_COMPARISON, PRICING_COMPARISON_DISCLAIMER } from "@/lib/constants";

export function PricingComparison() {
  const { columns, rows } = PRICING_COMPARISON;

  return (
    <FadeIn delay={0.12}>
      <div className="max-w-4xl mx-auto mt-14 lg:mt-16">
        <div className="text-center mb-8">
          <p className="type-eyebrow mb-2">Why Lupin</p>
          <h3 className="type-card-title text-xl sm:text-2xl text-foreground">
            Full setup vs. ads-only or DIY
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
                      <ComparisonCellIcon value={row.diy} />
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      <ComparisonCellIcon value={row.agency} />
                    </td>
                    <td className="p-4 sm:p-5 text-center bg-lupin-purple/5">
                      <ComparisonCellIcon value={row.lupin} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-[11px] sm:text-xs text-silver-dim text-center max-w-2xl mx-auto mt-4 leading-relaxed">
          {PRICING_COMPARISON_DISCLAIMER}
        </p>
      </div>
    </FadeIn>
  );
}
