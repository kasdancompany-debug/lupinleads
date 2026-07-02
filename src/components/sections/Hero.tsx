"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HeroGrowthVisual } from "@/components/ui/HeroGrowthVisual";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { SITE, CTAS, HERO_TRUST_BULLETS } from "@/lib/constants";
import { getFoundingPartnerAvailability } from "@/lib/founding-partner";
import { formatFoundingPriceLine, scrollToHowItWorks } from "@/lib/marketing";
import {
  defaultTransition,
  fadeIn,
  slideLeft,
  slideRight,
} from "@/lib/motion-config";

export function Hero() {
  const reduce = useReducedMotion();
  const mount = reduce ? false : "visible";
  const availability = getFoundingPartnerAvailability();
  const ctaMicrocopy = `${availability.slotsLabel} · ${formatFoundingPriceLine("·")}`;

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
      <div className="relative page-container pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 w-full z-10">
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
              className="mb-5 sm:mb-7"
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
              className="lg:hidden mb-7 -mx-2 sm:mx-0"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.12 }}
            >
              <HeroGrowthVisual variant="compact" />
            </motion.div>

            <motion.p
              className="hero-subhead mb-8 sm:mb-9 max-w-xl"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.14 }}
            >
              {SITE.heroSubheadline}
            </motion.p>

            <motion.div
              className="hero-cta-stack mb-4"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.2 }}
            >
              <div className="hero-cta-primary hero-cta-rail rounded-xl p-2 sm:p-2.5">
                <BookCallButton size="lg" emphasis>
                  {CTAS.primary}
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

            <motion.ul
              className="hero-trust-bullets flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-x-5 sm:gap-y-2 mb-4"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.22 }}
              aria-label="Key benefits"
            >
              {HERO_TRUST_BULLETS.map((bullet) => (
                <li
                  key={bullet}
                  className="inline-flex items-center gap-2 text-sm text-silver-muted"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-forest-glow shrink-0"
                    aria-hidden="true"
                  />
                  {bullet}
                </li>
              ))}
            </motion.ul>

            <motion.p
              className="type-label text-silver-dim leading-relaxed max-w-md"
              initial={reduce ? false : "hidden"}
              animate={mount}
              variants={fadeIn}
              transition={{ ...defaultTransition, delay: 0.26 }}
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
      </div>
    </section>
  );
}
