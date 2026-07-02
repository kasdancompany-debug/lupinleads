"use client";

import dynamic from "next/dynamic";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionShell } from "@/components/motion/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Button } from "@/components/ui/Button";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { TradeLandingFaq } from "@/components/marketing/TradeLandingFaq";
import { CTAS } from "@/lib/constants";
import {
  TRADE_LANDING_SYSTEM_FEATURES,
  type TradeLandingPageData,
} from "@/lib/trade-landing-pages";
import { scrollToPricing } from "@/lib/marketing";

const BookACall = dynamic(
  () => import("@/components/sections/BookACall").then((m) => m.BookACall),
  { loading: () => <div className="section-emerald home-section-pad min-h-[320px] section-skeleton" aria-hidden /> }
);

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-forest-glow mt-0.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M5 12L10 17L20 7" />
    </svg>
  );
}

export function TradeLandingPageView({ page }: { page: TradeLandingPageData }) {
  const { hero, painPoints, howWeHelp, faq, tradeName } = page;

  return (
    <>
      <section className="relative hero-soil overflow-hidden">
        <div className="absolute inset-0 hero-soil-horizon pointer-events-none" />
        <div className="absolute inset-0 hero-vignette pointer-events-none" />
        <div className="absolute inset-0 grain-overlay pointer-events-none opacity-[0.16]" />
        <div className="relative page-container pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
          <FadeIn>
            <p className="section-eyebrow mb-5">{hero.eyebrow}</p>
            <h1 className="mb-6 sm:mb-8 max-w-3xl">
              <span className="hero-headline-lead block">{hero.headlineLead}</span>
              <span className="hero-headline-display block">
                <em>{hero.headlineHighlight}</em>
              </span>
              <span className="hero-headline-underline" aria-hidden="true" />
            </h1>
            <p className="hero-subhead max-w-2xl mb-8 sm:mb-10">{hero.subheadline}</p>
            <div className="hero-cta-stack max-w-lg mb-4">
              <BookCallButton size="lg" emphasis>
                {CTAS.primary}
              </BookCallButton>
              <Button
                size="lg"
                variant="secondary"
                onClick={scrollToPricing}
                className="w-full sm:w-auto min-h-[52px] px-6"
              >
                {CTAS.viewPricing}
              </Button>
            </div>
            <p className="text-sm text-silver-dim max-w-xl">
              Founder-led setup for {tradeName} · CRM and landing pages included · Ad spend paid
              directly to Meta
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionShell id="trade-pain-points" variant="charcoal">
        <div className="section-body max-w-5xl mx-auto">
          <FadeIn>
            <SectionIntro
              align="center"
              eyebrow="Sound familiar?"
              title="What holds"
              highlight={`${tradeName} back.`}
              description="These are the patterns we hear on strategy calls — before ads, landing pages, and follow-up live in one place."
              className="max-w-2xl mx-auto"
            />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-10 lg:mt-12">
            {painPoints.map((point, index) => (
              <FadeIn key={point.title} delay={index * 0.08}>
                <article className="value-card brand-card-lift rounded-xl p-6 sm:p-7 h-full">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-silver-dim mb-3 block">
                    Problem {index + 1}
                  </span>
                  <h2 className="type-card-title mb-3">{point.title}</h2>
                  <p className="type-card-body">{point.description}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell id="how-lupin-helps" variant="emerald">
        <div className="section-body max-w-5xl mx-auto">
          <FadeIn>
            <SectionIntro
              align="center"
              eyebrow="How Lupin helps"
              title="Ads plus the system"
              highlight="after the click."
              description="We run Meta campaigns and build the stack so quote requests don't die in your inbox."
              className="max-w-2xl mx-auto"
            />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-10 lg:mt-12">
            {howWeHelp.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.08}>
                <article className="rounded-xl border border-forest-mid/20 bg-charcoal/40 p-6 sm:p-7 h-full">
                  <div className="brand-icon-chip w-10 h-10 mb-4 text-sm font-semibold text-forest-glow">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h2 className="type-card-title mb-3">{item.title}</h2>
                  <p className="type-card-body">{item.description}</p>
                </article>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <div className="text-center mt-10">
              <BookCallButton size="lg" emphasis>
                {CTAS.primary}
              </BookCallButton>
            </div>
          </FadeIn>
        </div>
      </SectionShell>

      <SectionShell id="trade-features" variant="deep">
        <div className="section-body max-w-4xl mx-auto">
          <FadeIn>
            <SectionIntro
              align="center"
              eyebrow="What's included"
              title="What's included"
              highlight="for your trade."
              description="One monthly management fee — ads, landing page, CRM, and reporting built to book more estimates."
              className="max-w-2xl mx-auto"
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 mt-10 value-card rounded-2xl p-8 sm:p-10">
              {TRADE_LANDING_SYSTEM_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <CheckIcon />
                  <span className="text-silver-muted leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </SectionShell>

      <section id="trade-faq" className="section-surface home-section-pad relative overflow-hidden">
        <div className="absolute inset-0 grain-overlay pointer-events-none opacity-[0.1]" />
        <div className="relative page-container max-w-3xl">
          <FadeIn>
            <SectionIntro
              align="center"
              eyebrow="FAQ"
              title="Questions from"
              highlight={`${tradeName}`}
              description="Short answers about Meta ads, ad spend, and how the system works for your trade."
              className="max-w-2xl mx-auto !mb-10"
            />
          </FadeIn>
          <TradeLandingFaq items={faq} />
        </div>
      </section>

      <BookACall />
    </>
  );
}
