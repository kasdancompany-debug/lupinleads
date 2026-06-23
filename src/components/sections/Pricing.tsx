"use client";

import { GrowthPattern } from "@/components/ui/GrowthPattern";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { FOUNDING_PARTNER, CTAS, FOUNDING_PARTNER_SPOTS } from "@/lib/constants";
import { formatFoundingPriceLine } from "@/lib/marketing";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: FOUNDING_PARTNER.currency,
    minimumFractionDigits: 0,
  }).format(price);
}

export function Pricing() {
  return (
    <section id="pricing" className="section-gradient home-section-pad relative overflow-hidden">
      <GrowthPattern tone="dark" intensity="whisper" placement="corners" />
      <div className="absolute inset-0 section-glow-top pointer-events-none opacity-45" />
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-[0.14]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(100%,700px)] h-[320px] bg-forest-mid/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative page-container">
        <FadeIn>
          <SectionIntro
            align="center"
            eyebrow="Founding partner offer"
            title="Lock in your rate."
            highlight="$299 to start."
            description={`${FOUNDING_PARTNER.slotsLabel}. ${formatFoundingPriceLine("·")} You pay ad spend directly to Meta.`}
            className="max-w-2xl mx-auto"
          />
        </FadeIn>

        <FadeIn delay={0.08}>
          <article className="value-card glow-purple rounded-2xl p-8 sm:p-10 lg:p-12 relative max-w-3xl mx-auto mt-10 lg:mt-12 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lupin-purple-light/50 to-transparent" />

            <div className="text-center mb-8">
              <span className="type-label inline-block bg-forest-mid/80 text-foreground px-4 py-1.5 rounded-full border border-forest-mid/40 mb-5">
                {FOUNDING_PARTNER.slotsLabel}
              </span>
              <div className="flex flex-wrap justify-center gap-2 mb-6" aria-label="Founding partner availability">
                {FOUNDING_PARTNER_SPOTS.map((spot) => (
                  <span
                    key={spot.id}
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full border border-forest-mid/35 bg-forest-mid/10 text-forest-glow"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-forest-glow" aria-hidden />
                    {spot.label} · Open
                  </span>
                ))}
              </div>
              <h3 className="type-price-title mb-3">
                {FOUNDING_PARTNER.name}
              </h3>
              <p className="type-body-lg max-w-lg mx-auto text-center">
                {FOUNDING_PARTNER.description}
              </p>
            </div>

            <div className="rounded-xl border border-silver/10 bg-black-surface/50 p-6 sm:p-8 mb-8 text-center">
              <div className="flex flex-wrap items-end justify-center gap-x-3 gap-y-1 mb-2">
                <span className="type-price-display">
                  {formatPrice(FOUNDING_PARTNER.introPrice)}
                </span>
                <span className="type-body-sm text-silver-muted pb-2">first month</span>
              </div>
              <p className="text-foreground font-medium text-lg">
                then {formatPrice(FOUNDING_PARTNER.regularPrice)}/mo + ad spend
              </p>
              <p className="text-[12px] sm:text-sm text-silver-dim mt-2">
                Founding rate locked from month 2 · Ad spend billed by Meta on your account
              </p>
            </div>

            <p className="type-label mb-4 text-center text-silver-dim">
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
              <BookCallButton
                size="lg"
                emphasis
                className="w-full sm:w-auto min-w-[280px] text-base"
              >
                {CTAS.primary}
              </BookCallButton>
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
