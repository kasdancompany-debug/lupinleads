"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { SectionShell } from "@/components/motion/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { SAMPLE_MONTH, CTAS } from "@/lib/constants";

type FunnelMetric = (typeof SAMPLE_MONTH.funnel)[number];
type EfficiencyMetric = (typeof SAMPLE_MONTH.efficiency)[number];

export function GoodMonthSection() {
  const { statusLabel, period, disclaimer, funnel, efficiency } = SAMPLE_MONTH;

  return (
    <SectionShell id="good-month" variant="charcoal">
      <div className="section-body">
        <FadeIn>
          <SectionIntro
            align="center"
            eyebrow={statusLabel}
            title="What a good month"
            highlight="can look like."
            description="Sample month for a home remodeling contractor — ad spend, estimates booked, and closed revenue tracked in one report."
            className="max-w-2xl mx-auto"
          />
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="sample-month-panel rounded-2xl overflow-hidden max-w-5xl mx-auto">
            <div className="sample-month-panel-header flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-silver/10">
              <div className="flex items-center gap-3 min-w-0">
                <span className="sample-month-panel-dot w-2 h-2 rounded-full bg-forest-glow/80 shrink-0" />
                <p className="text-[11px] sm:text-xs text-silver-muted truncate">
                  LUPIN LEADS · Reporting
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full border border-silver/15 bg-charcoal/60 text-silver-muted">
                  {statusLabel}
                </span>
                <span className="text-[10px] text-silver-dim hidden sm:inline">{period}</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 lg:p-8">
              <div className="sample-month-funnel grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
                {funnel.map((metric, index) => (
                  <div key={metric.id} className="relative">
                    {index > 0 && (
                      <span
                        className="hidden lg:block absolute -left-3 top-[1.125rem] text-silver/20 text-xs select-none"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    )}
                    <MetricBlock metric={metric} />
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-silver/10 grid grid-cols-2 gap-6 sm:max-w-md">
                {efficiency.map((metric) => (
                  <MetricBlock key={metric.id} metric={metric} compact />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <p className="text-center text-xs sm:text-sm text-silver-dim max-w-2xl mx-auto leading-relaxed mt-8">
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

function MetricBlock({
  metric,
  compact = false,
}: {
  metric: FunnelMetric | EfficiencyMetric;
  compact?: boolean;
}) {
  const isHighlight = "highlight" in metric && metric.highlight;
  const isSample = "sample" in metric && metric.sample;

  return (
    <div className={compact ? "text-left" : "text-left sm:text-center lg:text-left"}>
      <div
        className={`sample-month-metric-value text-foreground ${
          isHighlight ? "sample-month-metric-value--highlight" : ""
        } ${compact ? "sample-month-metric-value--compact" : ""}`}
      >
        {metric.value}
      </div>
      <p className="sample-month-metric-label">
        {metric.label}
        {isSample && <span className="text-silver-dim normal-case tracking-normal"> · sample</span>}
      </p>
    </div>
  );
}
