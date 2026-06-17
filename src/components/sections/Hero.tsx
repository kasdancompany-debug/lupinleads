"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { WolfCrest } from "@/components/ui/WolfCrest";
import { FloatingMockup } from "@/components/motion/FloatingMockup";
import { HeroProductStack } from "@/components/marketing/mockups/HeroProductStack";
import { LeadDashboardMockup } from "@/components/marketing/mockups/LeadDashboardMockup";
import { SITE, CTAS, HERO_BENEFITS } from "@/lib/constants";
import { formatFoundingPriceLine, scrollToBook } from "@/lib/marketing";
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

  const ctaMicrocopy = `${formatFoundingPriceLine("•")} • launch in ~48 hours`;

  return (
    <section className="relative min-h-[auto] lg:min-h-[100svh] flex items-center hero-mesh overflow-hidden">
      <div className="absolute inset-0 hero-vignette pointer-events-none" />
      <div className="absolute inset-0 hero-spotlight-left pointer-events-none" />
      <div className="absolute inset-0 hero-spotlight-right pointer-events-none hidden lg:block" />
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-60" />
      <div className="absolute top-0 left-0 right-0 section-divider pointer-events-none z-10" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 pb-14 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-10 xl:gap-14 items-center">
          <motion.div
            className="max-w-[42rem] order-1 relative z-20"
            initial={reduce ? false : "hidden"}
            animate={mount}
            variants={slideLeft}
            transition={defaultTransition}
          >
            <motion.div
              className="flex items-center gap-3 mb-6 sm:mb-8"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.04 }}
            >
              <span className="hero-eyebrow-rule shrink-0" aria-hidden="true" />
              <p className="section-eyebrow !mb-0">
                {SITE.tagline} · Canada
              </p>
            </motion.div>

            <motion.h1
              className="font-bold tracking-[-0.03em] leading-[1.05] sm:leading-[1.08] mb-6 sm:mb-8 text-[clamp(2.5rem,5.5vw,4.25rem)] sm:text-[clamp(2.875rem,6vw,4.75rem)] lg:text-[clamp(3.5rem,4.2vw,5rem)] xl:text-[5.25rem] overflow-visible"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.08 }}
            >
              <span className="block text-foreground">Turn ad clicks into</span>
              <span className="block mt-1 sm:mt-2 overflow-visible pb-1">
                <span className="text-gradient-hero">booked jobs.</span>
              </span>
            </motion.h1>

            <motion.p
              className="text-silver-muted text-lg sm:text-xl leading-relaxed max-w-xl mb-8 sm:mb-10"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.14 }}
            >
              {SITE.heroSubheadline}
            </motion.p>

            <motion.div
              className="hero-cta-rail rounded-xl p-2 sm:p-2.5 mb-3 max-w-md"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.2 }}
            >
              <Button
                size="lg"
                emphasis
                onClick={scrollToBook}
                className="w-full text-base sm:text-lg min-h-[52px] px-8 sm:px-10 font-semibold"
              >
                {CTAS.primary}
              </Button>
            </motion.div>

            <motion.p
              className="text-[12px] sm:text-[13px] text-silver-dim leading-relaxed max-w-md mb-8"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.24 }}
            >
              {ctaMicrocopy}
            </motion.p>
          </motion.div>

          <motion.div
            className="relative order-2 lg:hidden mt-4 max-w-sm mx-auto w-full z-10"
            initial={reduce ? false : "hidden"}
            animate={mount}
            variants={fadeIn}
            transition={{ ...defaultTransition, delay: 0.22 }}
          >
            <LeadDashboardMockup />
            <p className="text-center text-[10px] text-silver-dim mt-3 uppercase tracking-wider">
              Product preview · sample data
            </p>
          </motion.div>

          <motion.div
            className="relative order-2 hidden lg:flex xl:hidden items-center justify-center w-full z-10"
            initial={reduce ? false : "hidden"}
            animate={mount}
            variants={fadeIn}
            transition={{ ...defaultTransition, delay: 0.22 }}
          >
            <LeadDashboardMockup />
          </motion.div>

          <motion.div
            className="relative order-2 hidden xl:flex items-center justify-center min-h-[520px] z-10"
            initial={reduce ? false : "hidden"}
            animate={mount}
            variants={slideRight}
            transition={{ ...defaultTransition, delay: 0.2 }}
          >
            <div className="hero-visual-stage w-full max-w-[480px] mx-auto overflow-hidden">
              <div className="hero-visual-ring-outer" aria-hidden="true" />
              <div className="hero-visual-ring" aria-hidden="true" />
              <WolfCrest
                size={380}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[48%] text-forest-glow/[0.07] pointer-events-none z-0 select-none"
                aria-hidden="true"
              />
              <div className="relative z-10 pt-4">
                <FloatingMockup>
                  <HeroProductStack className="mx-auto" />
                </FloatingMockup>
              </div>
            </div>
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
                <div className="w-9 h-9 rounded-lg bg-forest-mid/15 border border-forest-mid/30 flex items-center justify-center text-forest-glow mb-4">
                  {BENEFIT_ICONS[benefit.id]}
                </div>
                <h3 className="text-[15px] sm:text-base font-semibold text-foreground tracking-tight mb-2">
                  {benefit.title}
                </h3>
                <p className="text-[13px] sm:text-sm text-silver-muted leading-relaxed">
                  {benefit.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
