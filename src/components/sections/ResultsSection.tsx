"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionShell } from "@/components/motion/SectionShell";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Button } from "@/components/ui/Button";
import {
  CASE_STUDIES,
  FOUNDING_PARTNER,
  CTAS,
  type CaseStudy,
} from "@/lib/constants";
import { scrollToBook } from "@/lib/marketing";
import { defaultTransition, defaultViewport, staggerContainer } from "@/lib/motion-config";

export function ResultsSection() {
  const reduce = useReducedMotion();
  const featured = CASE_STUDIES.find((s) => s.featured) ?? CASE_STUDIES[0];
  const upcoming = CASE_STUDIES.filter((s) => s.id !== featured.id);

  return (
    <SectionShell id="results" variant="gradient">
      <div className="section-body">
        <FadeIn>
          <SectionIntro
            eyebrow="Results"
            title="Ad click to"
            highlight="booked job — measured."
            description="Leads, appointments, jobs won, and revenue tracked in Lupin from first click to close. Published case studies use real dashboard data with client approval."
          />
        </FadeIn>

      <FadeIn delay={0.06}>
        <CaseStudyCard study={featured} variant="featured" />
      </FadeIn>

      {upcoming.length > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mt-6 lg:mt-8"
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {upcoming.map((study, index) => (
            <motion.div
              key={study.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ ...defaultTransition, delay: index * 0.08 }}
            >
              <CaseStudyCard study={study} variant="compact" />
            </motion.div>
          ))}
        </motion.div>
      )}

      <FadeIn delay={0.14}>
        <div className="mt-10 lg:mt-14 pt-8 border-t border-silver/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <p className="text-sm text-silver-dim max-w-xl leading-relaxed">
            {FOUNDING_PARTNER.slotsLabel}. Be the first published result — with your numbers and
            your approval.
          </p>
          <Button size="lg" emphasis onClick={scrollToBook} className="shrink-0 w-full sm:w-auto">
            {CTAS.primary}
          </Button>
        </div>
      </FadeIn>
      </div>
    </SectionShell>
  );
}

function CaseStudyCard({
  study,
  variant,
}: {
  study: CaseStudy;
  variant: "featured" | "compact";
}) {
  const isFeatured = variant === "featured";
  const isPending = study.status === "pending";
  const isSample = study.status === "sample";

  return (
    <article
      className={`case-study-card rounded-2xl overflow-hidden ${
        isFeatured ? "case-study-card--featured p-8 sm:p-10 lg:p-12" : "p-6 lg:p-8 opacity-90"
      } ${isPending ? "opacity-75" : ""}`}
    >
      <div
        className={`flex flex-col gap-6 ${
          isFeatured ? "lg:flex-row lg:items-end lg:justify-between mb-10 lg:mb-12" : "mb-6"
        }`}
      >
        <div className={isFeatured ? "lg:max-w-md" : ""}>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <StatusBadge status={study.status} label={study.statusLabel} />
            {!isPending && (
              <span className="text-[11px] text-silver-dim">{study.period}</span>
            )}
          </div>
          <h3
            className={`font-semibold text-foreground tracking-tight mb-1 ${
              isFeatured ? "text-xl sm:text-2xl" : "text-lg"
            }`}
          >
            {study.client}
          </h3>
          <p className="text-sm text-silver-dim">
            {study.trade} · {study.market}
          </p>
        </div>

        {isFeatured && !isPending && (
          <p className="text-sm text-silver-muted leading-relaxed lg:max-w-sm lg:text-right">
            {study.summary}
          </p>
        )}
      </div>

      <div className="case-study-metrics-grid">
        {study.metrics.map((metric) => (
          <MetricBlock
            key={metric.label}
            value={metric.value}
            label={metric.label}
            highlight={metric.highlight}
            hero={isFeatured}
            muted={isPending || metric.value === "—"}
          />
        ))}
      </div>

      {!isFeatured && (
        <p className="text-sm text-silver-muted leading-relaxed mt-6 pt-6 border-t border-silver/10">
          {study.summary}
        </p>
      )}

      {isFeatured && isSample && (
        <p className="text-xs text-silver-dim mt-8 pt-6 border-t border-silver/10 leading-relaxed">
          Numbers above illustrate a typical contractor workflow — not a claim about a specific
          client. Published founding partner studies will replace this card with verified data.
        </p>
      )}

      {isPending && (
        <button
          type="button"
          onClick={scrollToBook}
          className="mt-6 text-sm font-medium text-forest-glow hover:text-forest-light transition-colors"
        >
          {CTAS.primary} →
        </button>
      )}
    </article>
  );
}

function MetricBlock({
  value,
  label,
  highlight,
  hero,
  muted,
}: {
  value: string;
  label: string;
  highlight?: boolean;
  hero?: boolean;
  muted?: boolean;
}) {
  const isCurrency = value.startsWith("$");

  return (
    <div className="text-left sm:text-center">
      <div
        className={`case-study-metric-value ${
          hero ? "case-study-metric-value--hero" : ""
        } ${highlight ? "case-study-metric-value--highlight" : ""} ${
          muted ? "case-study-metric-value--muted" : "text-foreground"
        } ${isCurrency && hero ? "font-display" : ""}`}
      >
        {value}
      </div>
      <p className="case-study-metric-label">{label}</p>
    </div>
  );
}

function StatusBadge({
  status,
  label,
}: {
  status: CaseStudy["status"];
  label: string;
}) {
  const styles = {
    published: "text-forest-glow border-forest-mid/35 bg-forest-mid/10",
    sample: "text-silver-muted border-silver/15 bg-charcoal/60",
    pending: "text-silver-dim border-silver/12 bg-charcoal/40",
  };

  return (
    <span
      className={`text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full border ${styles[status]}`}
    >
      {label}
    </span>
  );
}
