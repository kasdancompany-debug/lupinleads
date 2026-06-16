"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { WolfCrest } from "@/components/ui/WolfCrest";
import { FloatingMockup } from "@/components/motion/FloatingMockup";
import { HeroProductStack } from "@/components/marketing/mockups/HeroProductStack";
import { FOUNDING_PARTNER, SITE, CTAS, TRUST_POINTS } from "@/lib/constants";
import { scrollToBook } from "@/lib/marketing";
import {
  defaultTransition,
  fadeIn,
  slideLeft,
  slideRight,
} from "@/lib/motion-config";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: FOUNDING_PARTNER.currency,
    minimumFractionDigits: 0,
  }).format(price);
}

export function Hero() {
  const reduce = useReducedMotion();
  const mount = reduce ? false : "visible";

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
            className="max-w-[42rem] order-1"
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
              className="font-bold tracking-[-0.04em] leading-[0.95] mb-6 sm:mb-8 text-[clamp(2.875rem,6.5vw,4.5rem)] sm:text-[clamp(3.25rem,7vw,5rem)] lg:text-[clamp(4.5rem,4.8vw,5.75rem)] xl:text-[6rem]"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.08 }}
            >
              <span className="block text-foreground">More estimates.</span>
              <span className="block text-foreground">More jobs.</span>
              <span className="block text-gradient-hero mt-1 sm:mt-2">Less guesswork.</span>
            </motion.h1>

            <motion.p
              className="text-foreground text-lg sm:text-xl font-medium leading-snug max-w-xl mb-5 sm:mb-6"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.14 }}
            >
              {SITE.heroOneLiner}
            </motion.p>

            <motion.div
              className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 mb-5 sm:mb-6"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.18 }}
            >
              <span className="hero-price-pill text-sm sm:text-[15px] font-semibold text-forest-glow px-4 py-2 rounded-full">
                {formatPrice(FOUNDING_PARTNER.introPrice)} first month
              </span>
              <span className="text-sm text-silver-muted">
                then {formatPrice(FOUNDING_PARTNER.regularPrice)}/mo + ad spend
              </span>
            </motion.div>

            <motion.p
              className="text-silver-muted text-sm sm:text-[15px] leading-relaxed max-w-lg mb-8 sm:mb-10"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.2 }}
            >
              {SITE.subheadline}
            </motion.p>

            <motion.div
              className="hero-cta-rail rounded-xl p-2 sm:p-2.5 mb-7 sm:mb-8 max-w-md lg:max-w-none"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.24 }}
            >
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Button
                  size="lg"
                  emphasis
                  onClick={scrollToBook}
                  className="w-full sm:flex-1 lg:flex-none text-base sm:text-lg min-h-[52px] px-8 sm:px-10 font-semibold"
                >
                  {CTAS.primary}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToBook}
                  className="w-full sm:w-auto min-h-[52px]"
                >
                  {CTAS.fit}
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-x-6 sm:gap-y-2.5 text-[12px] sm:text-[13px] text-silver-muted"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.28 }}
            >
              <span className="flex items-center gap-2">
                <CheckIcon />
                30-day mgmt fee guarantee
              </span>
              <span className="hidden sm:block w-px h-3.5 bg-silver/15 self-center" aria-hidden="true" />
              <span className="flex items-center gap-2">
                <CheckIcon />
                Launch in ~48 hours
              </span>
              <span className="hidden sm:block w-px h-3.5 bg-silver/15 self-center" aria-hidden="true" />
              <span className="flex items-center gap-2">
                <CheckIcon />
                Your Meta account · your spend
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative order-2 hidden lg:flex items-center justify-center min-h-[520px] xl:min-h-[560px]"
            initial={reduce ? false : "hidden"}
            animate={mount}
            variants={slideRight}
            transition={{ ...defaultTransition, delay: 0.2 }}
          >
            <div className="hero-visual-stage w-full max-w-[540px] xl:max-w-[580px] mx-auto">
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

        <div className="hero-trust-strip mt-14 lg:mt-20 pt-10 sm:pt-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TRUST_POINTS.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center lg:text-left ${
                  i > 0 ? "lg:border-l lg:border-silver/10 lg:pl-8" : ""
                }`}
              >
                <p className="text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-foreground tracking-tight mb-1">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-[11px] text-silver-dim uppercase tracking-[0.12em] leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-forest-glow shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 8L6 11L13 4" />
    </svg>
  );
}
