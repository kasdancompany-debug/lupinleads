"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { SectionShell } from "@/components/motion/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { ComparisonCellIcon } from "@/components/ui/ComparisonCellIcon";
import { AGENCY_COMPARISON_SECTION, CTAS } from "@/lib/constants";

export function AgencyComparisonSection() {
  const { eyebrow, title, highlight, description, disclaimer, columns, rows } = AGENCY_COMPARISON_SECTION;

  return (
    <SectionShell id="agency-comparison" variant="charcoal">
      <div className="section-body max-w-5xl mx-auto">
        <FadeIn>
          <SectionIntro
            align="center"
            variant="display"
            eyebrow={eyebrow}
            title={title}
            highlight={highlight}
            description={description}
            className="max-w-3xl mx-auto"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          {/* Desktop / tablet table */}
          <div className="hidden sm:block value-card rounded-2xl overflow-hidden border border-silver/10 mt-10 lg:mt-12">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-silver/10">
                  <th className="p-4 lg:p-5 text-[11px] uppercase tracking-wider text-silver-dim font-medium w-[44%]">
                    Capability
                  </th>
                  <th className="p-4 lg:p-5 text-center align-bottom w-[28%]">
                    <p className="text-sm font-semibold text-silver-muted">{columns.typical.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-silver-dim mt-1">
                      {columns.typical.tagline}
                    </p>
                  </th>
                  <th className="p-4 lg:p-5 text-center align-bottom w-[28%] bg-forest-mid/8 border-l border-forest-mid/15">
                    <p className="text-sm font-semibold text-foreground">{columns.lupin.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-forest-glow mt-1">
                      {columns.lupin.tagline}
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.label}
                    className={index < rows.length - 1 ? "border-b border-silver/8" : ""}
                  >
                    <td className="p-4 lg:p-5 text-sm text-silver-muted leading-snug">{row.label}</td>
                    <td className="p-4 lg:p-5 text-center">
                      <ComparisonCellIcon value={row.typical} />
                    </td>
                    <td className="p-4 lg:p-5 text-center bg-forest-mid/5 border-l border-forest-mid/10">
                      <ComparisonCellIcon value={row.lupin} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-3 mt-8">
            {rows.map((row) => (
              <article
                key={row.label}
                className="agency-comparison-card rounded-xl border border-silver/10 bg-charcoal/40 p-4"
              >
                <p className="text-sm font-medium text-foreground leading-snug mb-4">{row.label}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-silver/10 bg-black-surface/30 px-3 py-3 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-silver-dim mb-2.5">
                      {columns.typical.name}
                    </p>
                    <ComparisonCellIcon value={row.typical} />
                  </div>
                  <div className="rounded-lg border border-forest-mid/20 bg-forest-mid/8 px-3 py-3 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-forest-glow mb-2.5">
                      {columns.lupin.name}
                    </p>
                    <ComparisonCellIcon value={row.lupin} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="text-[11px] sm:text-xs text-silver-dim text-center max-w-2xl mx-auto mt-6 leading-relaxed">
            {disclaimer}
          </p>
          <div className="flex justify-center mt-8">
            <BookCallButton size="lg" emphasis>
              {CTAS.primary}
            </BookCallButton>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}
