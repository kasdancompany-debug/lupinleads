"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Button } from "@/components/ui/Button";
import { FOUNDING_PARTNER, CTAS } from "@/lib/constants";
import { formatFoundingPriceLine, scrollToBook } from "@/lib/marketing";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: FOUNDING_PARTNER.currency,
    minimumFractionDigits: 0,
  }).format(price);
}

export function Pricing() {
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
            title="Founding Partner Plan."
            highlight="$299 to start."
            description={`${formatFoundingPriceLine("·")}. Book a strategy call to confirm fit, market, and ad budget.`}
            className="max-w-2xl mx-auto"
          />
        </FadeIn>

        <FadeIn delay={0.08}>
          <article className="value-card rounded-2xl p-8 sm:p-10 lg:p-12 relative max-w-3xl mx-auto mt-10 lg:mt-12 border-forest-mid/45 glow-green overflow-hidden">
            <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-glow/60 to-transparent" />

            <div className="text-center mb-8">
              <span className="inline-block bg-forest-mid/80 text-foreground text-[10px] tracking-[0.18em] uppercase px-4 py-1.5 rounded-full border border-forest-mid/40 mb-5">
                {FOUNDING_PARTNER.slotsLabel}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-foreground mb-3">
                {FOUNDING_PARTNER.name}
              </h3>
              <p className="text-silver-muted text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
                {FOUNDING_PARTNER.description}
              </p>
            </div>

            <div className="rounded-xl border border-silver/10 bg-black-surface/50 p-6 sm:p-8 mb-8 text-center">
              <div className="flex flex-wrap items-end justify-center gap-x-3 gap-y-1 mb-2">
                <span className="font-display text-5xl sm:text-6xl text-foreground tabular-nums tracking-tight">
                  {formatPrice(FOUNDING_PARTNER.introPrice)}
                </span>
                <span className="text-silver-muted text-sm sm:text-base pb-2">first month</span>
              </div>
              <p className="text-foreground font-medium text-lg">
                then {formatPrice(FOUNDING_PARTNER.regularPrice)}/mo + ad spend
              </p>
              <p className="text-[12px] sm:text-sm text-silver-dim mt-2">
                Founding rate locked from month 2 · Month-to-month after that
              </p>
            </div>

            <p className="text-[11px] uppercase tracking-[0.15em] text-silver-dim mb-4 text-center">
              Everything included
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 mb-10 max-w-2xl mx-auto">
              {FOUNDING_PARTNER.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckIcon />
                  <span className="text-silver-muted leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                emphasis
                onClick={scrollToBook}
                className="w-full sm:w-auto min-w-[280px] text-base"
              >
                {CTAS.primary}
              </Button>
              <p className="text-[12px] sm:text-sm text-silver-dim text-center max-w-md leading-relaxed">
                {FOUNDING_PARTNER.footnote}
              </p>
            </div>
          </article>
        </FadeIn>
      </div>
    </section>
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
