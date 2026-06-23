"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HeroGrowthVisual } from "@/components/ui/HeroGrowthVisual";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { SITE, CTAS, HERO_BENEFITS, FOUNDING_PARTNER } from "@/lib/constants";
import { formatFoundingPriceLine, scrollToHowItWorks } from "@/lib/marketing";
import {
  defaultTransition,
  fadeIn,
  slideLeft,
  slideRight,
  staggerContainer,
  defaultViewport,
} from "@/lib/motion-config";

const BENEFIT_ICONS: Record<(typeof HERO_BENEFITS)[number]["id"], ReactNode> = {
  "see-leads": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="5" height="16" rx="1" />
      <rect x="10" y="4" width="5" height="16" rx="1" />
      <rect x="17" y="4" width="4" height="16" rx="1" />
    </svg>
  ),
  "follow-up": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L4 14h7l-1 8 10-14H13L13 2z" strokeLinejoin="round" />
    </svg>
  ),
  revenue: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 18V6M8 18v-5M12 18v-8M16 18v-3M20 18V9" strokeLinecap="round" />
      <path d="M3 20h18" strokeLinecap="round" />
    </svg>
  ),
  contractors: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 11.5L12 5l8 6.5V19a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-7.5z" strokeLinejoin="round" />
    </svg>
  ),
};

export function Hero() {
  const reduce = useReducedMotion();
  const mount = reduce ? false : "visible";
  const ctaMicrocopy = `${FOUNDING_PARTNER.slotsLabel} · ${formatFoundingPriceLine("·")}`;

  return (
    <section className="relative min-h-[auto] lg:min-h-[100svh] flex items-center hero-soil overflow-hidden">
      <div className="absolute inset-0 hero-soil-horizon pointer-events-none" />
      <div className="absolute inset-0 hero-vignette pointer-events-none" />
      <div className="absolute inset-0 hero-spotlight-left pointer-events-none" />
      <div
        className="absolute inset-y-0 right-0 w-[58%] hero-spotlight-right pointer-events-none hidden lg:block"
        aria-hidden
      />
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-[0.18]" />
      <div className="relative page-container pt-28 pb-14 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-8 xl:gap-12 items-center">
          <motion.div
            className="max-w-[44rem] order-1 relative z-20"
            initial={reduce ? false : "hidden"}
            animate={mount}
            variants={slideLeft}
            transition={defaultTransition}
          >
            <motion.div
              className="hero-eyebrow-stack"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.04 }}
            >
              <span className="hero-purple-accent" aria-hidden="true" />
              <p className="section-eyebrow !mb-0">
                {SITE.tagline} · Canada
              </p>
            </motion.div>

            <motion.h1
              className="mb-6 sm:mb-8"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.08 }}
            >
              <span className="hero-headline-lead block">{SITE.headlineLead}</span>
              <span className="hero-headline-display block">
                <em>{SITE.headlineHighlight}</em>
              </span>
              <span className="hero-headline-underline" aria-hidden="true" />
            </motion.h1>

            <motion.div
              className="lg:hidden mb-8 -mx-2 sm:mx-0"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.12 }}
            >
              <HeroGrowthVisual variant="compact" />
            </motion.div>

            <motion.p
              className="hero-subhead mb-4"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.14 }}
            >
              {SITE.heroSubheadline}
            </motion.p>

            <motion.p
              className="hero-trades-line max-w-xl mb-8 sm:mb-10"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.16 }}
            >
              {SITE.heroTrades}
            </motion.p>

            <motion.div
              className="hero-cta-stack mb-3"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.2 }}
            >
              <div className="hero-cta-primary hero-cta-rail rounded-xl p-2 sm:p-2.5">
                <BookCallButton
                  size="lg"
                  emphasis
                  className="w-full text-base sm:text-lg min-h-[52px] px-6 sm:px-8"
                >
                  {CTAS.strategyCall}
                </BookCallButton>
              </div>
              <Button
                size="lg"
                variant="secondary"
                onClick={scrollToHowItWorks}
                className="w-full sm:w-auto sm:shrink-0 min-h-[52px] px-6"
              >
                {CTAS.howItWorks}
              </Button>
            </motion.div>

            <motion.p
              className="type-label text-silver-dim leading-relaxed max-w-md"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.24 }}
            >
              {ctaMicrocopy}
            </motion.p>
          </motion.div>

          <motion.div
            className="relative order-2 hidden lg:flex items-center justify-end w-full z-10"
            initial={reduce ? false : "hidden"}
            animate={mount}
            variants={slideRight}
            transition={{ ...defaultTransition, delay: 0.18 }}
          >
            <HeroGrowthVisual variant="full" className="w-full" />
          </motion.div>
        </div>

        <div className="hero-benefits-strip mt-14 lg:mt-20 pt-10 sm:pt-12">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "visible"}
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            {HERO_BENEFITS.map((benefit, index) => (
              <motion.article
                key={benefit.id}
                className="hero-benefit-card rounded-xl p-5 lg:p-6 h-full"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ ...defaultTransition, delay: index * 0.05 }}
              >
                <div className="brand-icon-chip w-9 h-9 mb-4">
                  {BENEFIT_ICONS[benefit.id]}
                </div>
                <h3 className="type-card-title mb-2">{benefit.title}</h3>
                <p className="type-card-body">{benefit.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
