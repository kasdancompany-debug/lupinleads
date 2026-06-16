"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SlideIn } from "@/components/motion/SlideIn";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Button } from "@/components/ui/Button";
import {
  FOUNDING_PARTNER,
  PRICING_COMPARISON,
  PRICING_PLANS,
  CTAS,
} from "@/lib/constants";
import { scrollToBook } from "@/lib/marketing";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: FOUNDING_PARTNER.currency,
    minimumFractionDigits: 0,
  }).format(price);
}

type CellValue = boolean | "partial";

export function Pricing() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const growthPlan = PRICING_PLANS.find((p) => p.id === "starter")!;
  const upgradePlans = PRICING_PLANS.filter((p) => p.id !== "starter");

  function scrollToBookSection() {
    scrollToBook();
  }

  async function handleCheckout(planId: string) {
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (!res.ok) {
        scrollToBookSection();
        return;
      }
      if (data.url) window.location.href = data.url;
    } catch {
      scrollToBookSection();
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <section id="pricing" className="section-gradient py-16 md:py-24 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 section-glow-top pointer-events-none opacity-75" />
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-30" />
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(100%,800px)] h-[400px] bg-forest-mid/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <SectionIntro
            align="center"
            eyebrow="Pricing"
            title="One plan. Full system."
            highlight="Low risk to start."
            description={`${formatPrice(FOUNDING_PARTNER.regularPrice)}/month covers everything — not just ads. Ad spend runs on your Meta account, paid directly to Meta. No hidden layers, no surprise add-ons for creative or CRM.`}
            className="max-w-3xl mx-auto"
          />
        </FadeIn>

        <FadeIn delay={0.08}>
          <PricingComparison />
        </FadeIn>

        <div className="mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          <SlideIn direction="left" delay={0.1}>
            <article className="value-card rounded-2xl p-8 lg:p-10 relative h-full border-forest-mid/45 glow-green overflow-hidden">
              <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-glow/60 to-transparent" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <span className="bg-forest-mid text-foreground text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-sm whitespace-nowrap shadow-lg">
                  {FOUNDING_PARTNER.slotsRemaining} of {FOUNDING_PARTNER.slotsTotal} spots · Founding
                  Partner
                </span>
              </div>

              <div className="pt-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-forest-glow mb-2 font-medium">
                  Best way to start
                </p>
                <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-3">
                  Try the full system for less
                </h3>
                <p className="text-silver-muted text-sm leading-relaxed mb-8 max-w-lg">
                  {FOUNDING_PARTNER.description}
                </p>

                <div className="rounded-xl border border-silver/10 bg-black-surface/50 p-6 mb-8">
                  <div className="flex flex-wrap items-end gap-x-3 gap-y-1 mb-3">
                    <span className="font-display text-5xl lg:text-6xl text-foreground tabular-nums">
                      {formatPrice(FOUNDING_PARTNER.introPrice)}
                    </span>
                    <span className="text-silver-muted text-sm pb-2">first month</span>
                  </div>
                  <p className="text-foreground font-medium mb-1">
                    Then {formatPrice(FOUNDING_PARTNER.regularPrice)}/month + ad spend
                  </p>
                  <p className="text-[12px] text-silver-dim">
                    Locked in from month 2 · Paid to Meta on your account
                  </p>
                </div>

                <p className="text-[11px] uppercase tracking-[0.15em] text-silver-dim mb-4">
                  Everything included
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                  {FOUNDING_PARTNER.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <CheckIcon />
                      <span className="text-silver-muted">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 mb-8">
                  <TrustBadge>Your Meta ad account</TrustBadge>
                  <TrustBadge>Cancel-friendly guarantee</TrustBadge>
                  <TrustBadge>No long-term lock-in pitch</TrustBadge>
                </div>

                <Button
                  size="lg"
                  emphasis
                  className="w-full sm:w-auto min-w-[240px]"
                  onClick={scrollToBookSection}
                >
                  {CTAS.territory}
                </Button>

                <ul className="space-y-2 mt-6 pt-6 border-t border-silver/10">
                  {FOUNDING_PARTNER.terms.map((term) => (
                    <li key={term} className="text-[12px] text-silver-dim flex items-start gap-2">
                      <span className="text-forest-glow shrink-0">·</span>
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </SlideIn>

          <SlideIn direction="right" delay={0.15}>
            <article className="value-card rounded-2xl p-8 lg:p-10 h-full flex flex-col border-silver/15">
              <p className="text-[11px] uppercase tracking-[0.2em] text-silver-dim mb-2">
                Standard rate
              </p>
              <h3 className="font-display text-2xl text-foreground mb-2">{growthPlan.name}</h3>
              <p className="text-silver-muted text-sm leading-relaxed mb-6">{growthPlan.description}</p>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl lg:text-5xl text-foreground tabular-nums">
                    {formatPrice(growthPlan.price)}
                  </span>
                  <span className="text-silver-dim text-sm">/month</span>
                </div>
                <p className="text-[12px] text-silver-dim mt-2">+ ad spend to Meta on your account</p>
              </div>

              <p className="text-sm text-silver-muted leading-relaxed mb-6 flex-1">
                Same full stack as Founding Partner — the obvious starting point once founding slots
                fill. One management fee, every tool connected from click to closed job.
              </p>

              <div className="rounded-lg border border-forest-mid/25 bg-forest-mid/8 px-4 py-3 mb-6">
                <p className="text-[12px] text-forest-glow font-medium mb-1">Why $499 feels safe</p>
                <p className="text-[12px] text-silver-muted leading-relaxed">
                  Less than a part-time admin — with ads, creative, CRM, AI follow-up, and reporting
                  included. 30-day satisfaction guarantee on management fees.
                </p>
              </div>

              <div className="space-y-3 mt-auto">
                <Button emphasis className="w-full" onClick={scrollToBookSection}>
                  {CTAS.primary}
                </Button>
                <button
                  type="button"
                  className="w-full text-[12px] text-silver-dim hover:text-silver-muted transition-colors"
                  onClick={() => handleCheckout(growthPlan.id)}
                  disabled={loadingPlan === growthPlan.id}
                >
                  {loadingPlan === growthPlan.id ? "Loading..." : "Or start checkout →"}
                </button>
              </div>
            </article>
          </SlideIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-12 max-w-6xl mx-auto">
              <p className="text-center text-[11px] uppercase tracking-[0.2em] text-silver-dim mb-6">
                Need more hands-on support?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {upgradePlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="value-card rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-semibold text-foreground">{plan.name}</h4>
                      <p className="text-sm text-silver-dim mt-0.5">{plan.description}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="font-display text-2xl text-foreground tabular-nums">
                        {formatPrice(plan.price)}
                        <span className="text-sm text-silver-dim font-sans">/mo</span>
                      </span>
                      <Button variant="ghost" size="sm" onClick={scrollToBookSection}>
                        {CTAS.fit}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

        <FadeIn delay={0.25}>
          <div className="mt-12 text-center space-y-2 max-w-2xl mx-auto">
            <p className="text-silver-muted text-sm">
              Management fees in CAD. Ad spend is separate and always yours to control on your Meta
              account.
            </p>
            <p className="text-silver-dim text-[12px]">
              Questions?{" "}
              <a
                href="#book-call"
                className="text-forest-glow hover:text-forest-light transition-colors"
              >
                {CTAS.fit}
              </a>{" "}
              — we&apos;ll recommend ad spend and confirm the fit before you commit.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function PricingComparison() {
  const { columns, rows } = PRICING_COMPARISON;

  return (
    <div className="max-w-6xl mx-auto">
      <p className="text-center text-[11px] uppercase tracking-[0.2em] text-silver-dim mb-6">
        What you&apos;re actually buying
      </p>

      {/* Desktop table */}
      <div className="hidden md:block value-card rounded-2xl overflow-hidden border-silver/12">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-silver/10">
              <th className="p-5 w-[28%] text-[11px] uppercase tracking-wider text-silver-dim font-medium">
                Capability
              </th>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={`p-5 text-center ${
                    col.highlighted
                      ? "bg-forest-mid/12 border-x border-forest-mid/25"
                      : ""
                  }`}
                >
                  <p
                    className={`text-sm font-semibold mb-1 ${
                      col.highlighted ? "text-foreground" : "text-silver-muted"
                    }`}
                  >
                    {col.name}
                  </p>
                  <p
                    className={`text-[10px] uppercase tracking-wider font-medium ${
                      col.highlighted ? "text-forest-glow" : "text-silver-dim"
                    }`}
                  >
                    {col.tagline}
                  </p>
                  <p className="text-[11px] text-silver-dim mt-1 font-normal">{col.subtitle}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                className={i < rows.length - 1 ? "border-b border-silver/8" : ""}
              >
                <td className="p-4 pl-5 text-sm text-silver-muted">{row.label}</td>
                <td className="p-4 text-center">
                  <ComparisonCell value={row.diy} />
                </td>
                <td className="p-4 text-center">
                  <ComparisonCell value={row.agency} />
                </td>
                <td className="p-4 text-center bg-forest-mid/8 border-x border-forest-mid/20">
                  <ComparisonCell value={row.lupin} highlight />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {columns.map((col) => {
          const key = col.id === "diy" ? "diy" : col.id === "agency" ? "agency" : "lupin";
          return (
            <article
              key={col.id}
              className={`value-card rounded-xl p-5 ${
                col.highlighted ? "border-forest-mid/40 glow-green" : ""
              }`}
            >
              <div className="mb-4">
                <p className="font-semibold text-foreground">{col.name}</p>
                <p
                  className={`text-[10px] uppercase tracking-wider mt-1 ${
                    col.highlighted ? "text-forest-glow" : "text-silver-dim"
                  }`}
                >
                  {col.tagline}
                </p>
              </div>
              <ul className="space-y-2.5">
                {rows.map((row) => {
                  const val = row[key as keyof typeof row] as CellValue;
                  return (
                    <li key={row.label} className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-silver-muted text-[13px]">{row.label}</span>
                      <ComparisonCell value={val} highlight={col.highlighted} compact />
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function ComparisonCell({
  value,
  highlight = false,
  compact = false,
}: {
  value: CellValue;
  highlight?: boolean;
  compact?: boolean;
}) {
  const size = compact ? "w-5 h-5" : "w-6 h-6 mx-auto";

  if (value === true) {
    return (
      <span
        className={`inline-flex ${size} items-center justify-center rounded-full ${
          highlight ? "bg-forest-mid/25 text-forest-glow" : "bg-silver/10 text-silver-muted"
        }`}
        aria-label="Included"
      >
        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }

  if (value === "partial") {
    return (
      <span
        className={`inline-flex ${size} items-center justify-center rounded-full bg-amber-400/10 text-amber-300/90`}
        aria-label="Partial"
        title="Partial or inconsistent"
      >
        <span className="text-[10px] font-bold">~</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex ${size} items-center justify-center rounded-full bg-silver/5 text-silver-dim`}
      aria-label="Not included"
    >
      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function TrustBadge({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] px-3 py-1.5 rounded-full border border-silver/12 bg-black-surface/60 text-silver-muted">
      {children}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-forest-glow mt-0.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12L10 17L20 7" />
    </svg>
  );
}
