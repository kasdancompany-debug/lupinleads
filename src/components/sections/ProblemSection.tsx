"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionShell } from "@/components/motion/SectionShell";
import { FadeIn } from "@/components/motion/FadeIn";
import { SlideIn } from "@/components/motion/SlideIn";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Button } from "@/components/ui/Button";
import { PROBLEM_CARDS, CTAS, SITE, PROBLEM_SECTION } from "@/lib/constants";
import { scrollToBook, scrollToHowItWorks } from "@/lib/marketing";
import { defaultTransition, defaultViewport, staggerContainer } from "@/lib/motion-config";

const ICONS: Record<string, ReactNode> = {
  clock: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pipeline: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="5" height="16" rx="1" />
      <rect x="10" y="4" width="5" height="16" rx="1" />
      <rect x="17" y="4" width="4" height="16" rx="1" />
      <path d="M5.5 9h0M12.5 13h0M19 17h0" strokeLinecap="round" strokeWidth="2" />
    </svg>
  ),
  spend: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v18M8 7c0-2 1.5-3 4-3s4 1 4 3-1.5 3-4 3-4 1-4 3 1.5 3 4 3 4-1 4-3" strokeLinecap="round" />
    </svg>
  ),
  forgot: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 8h16M4 12h10M4 16h6" strokeLinecap="round" />
      <path d="M18 14l2 2-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export function ProblemSection() {
  const reduce = useReducedMotion();

  return (
    <SectionShell id="the-problem" variant="charcoal">
      <div className="section-body">
        <FadeIn>
          <header className="section-header section-header--center mx-auto max-w-4xl text-center">
            <h2 className="problem-core-line">
              {SITE.coreLine.lead}{" "}
              <span className="text-gradient-forest">{SITE.coreLine.highlight}</span>
            </h2>
          </header>
        </FadeIn>

        <FadeIn delay={0.04}>
          <SectionIntro
            align="center"
            eyebrow={PROBLEM_SECTION.eyebrow}
            title={PROBLEM_SECTION.title}
            highlight={PROBLEM_SECTION.highlight}
            description={PROBLEM_SECTION.description}
            className="max-w-4xl mx-auto"
          />
        </FadeIn>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6"
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "visible"}
        viewport={defaultViewport}
        variants={staggerContainer}
      >
        {PROBLEM_CARDS.map((card, index) => (
          <motion.div
            key={card.title}
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ ...defaultTransition, delay: index * 0.06 }}
          >
            <SlideIn direction={index % 2 === 0 ? "left" : "right"} delay={index * 0.05}>
              <article className="problem-card brand-card-lift group rounded-2xl p-6 sm:p-7 lg:p-8 h-full relative overflow-hidden">
                <div className="relative">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="brand-icon-chip w-11 h-11 shrink-0">
                      {ICONS[card.icon]}
                    </div>
                    <span className="type-label text-silver-dim tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="type-card-title mb-2">{card.title}</h3>
                  <p className="type-card-body">{card.description}</p>
                </div>
              </article>
            </SlideIn>
          </motion.div>
        ))}
      </motion.div>

      <FadeIn delay={0.1}>
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-forest-green-deep/15 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 grain-overlay pointer-events-none opacity-[0.12]" />
          <div className="relative value-card rounded-2xl border-forest-green-bright/20 p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
              <div>
                <p className="type-eyebrow !mb-4 text-sage-green">
                  The fix
                </p>
                <h3 className="type-section-title !text-[clamp(1.5rem,3.5vw,2.25rem)] !mb-4">
                  {PROBLEM_SECTION.fixTitle}{" "}
                  <span className="text-gradient-hero">{PROBLEM_SECTION.fixHighlight}</span>
                </h3>
                <p className="type-body-lg max-w-2xl">
                  {PROBLEM_SECTION.fixDescription}
                </p>
              </div>
              <div className="shrink-0">
                <Button size="lg" emphasis onClick={scrollToBook} className="w-full sm:w-auto whitespace-nowrap">
                  {CTAS.primary}
                </Button>
                <p className="mt-3 text-center sm:text-left">
                  <button
                    type="button"
                    onClick={scrollToHowItWorks}
                    className="text-sm text-silver-dim hover:text-silver-muted transition-colors"
                  >
                    {CTAS.howItWorks} →
                  </button>
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-silver/10 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {PROBLEM_SECTION.fixBullets.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-silver-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-glow shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
      </div>
    </SectionShell>
  );
}
