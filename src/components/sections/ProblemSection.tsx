"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SectionShell } from "@/components/motion/SectionShell";
import { FadeIn } from "@/components/motion/FadeIn";
import { SlideIn } from "@/components/motion/SlideIn";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Button } from "@/components/ui/Button";
import { PROBLEM_CARDS, CTAS, SITE } from "@/lib/constants";
import { scrollToBook } from "@/lib/marketing";
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
            eyebrow="The real bottleneck"
            title="You don't have a lead problem."
            highlight="You have a follow-up problem."
            description="Interest isn't the problem. After the click, slow follow-up and scattered notes kill booked jobs."
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
              <article className="problem-card group rounded-2xl p-7 lg:p-8 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/5 rounded-full blur-[50px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-red-400/8 border border-red-400/20 flex items-center justify-center text-red-300/90 shrink-0">
                      {ICONS[card.icon]}
                    </div>
                    <span className="text-[11px] font-medium text-silver-dim tabular-nums tracking-wider">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-silver-muted leading-relaxed">{card.description}</p>
                </div>
              </article>
            </SlideIn>
          </motion.div>
        ))}
      </motion.div>

      <FadeIn delay={0.1}>
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-forest-mid/20 via-forest-deep/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 grain-overlay pointer-events-none opacity-20" />
          <div className="relative value-card rounded-2xl border-forest-mid/35 glow-green p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-forest-glow mb-4 font-medium">
                  The fix
                </p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4 leading-tight">
                  Lupin connects the full path —{" "}
                  <span className="text-gradient-hero">click to closed job.</span>
                </h3>
                <p className="text-silver-muted text-base lg:text-lg leading-relaxed max-w-2xl">
                  One system from ad click to booked job: Meta Ads and creative bring leads in,
                  branded forms capture them, CRM tracks every stage, AI follow-up keeps your team
                  moving, and reporting shows which spend became revenue. You own your ad account.
                </p>
              </div>
              <div className="shrink-0">
                <Button size="lg" emphasis onClick={scrollToBook} className="w-full sm:w-auto whitespace-nowrap">
                  {CTAS.primary}
                </Button>
                <p className="mt-3 text-center sm:text-left">
                  <Link
                    href="#how-it-works"
                    className="text-sm text-silver-dim hover:text-silver-muted transition-colors"
                  >
                    See how it works →
                  </Link>
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-silver/10 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[
                "Meta Ads + creative",
                "Lead capture & CRM",
                "AI follow-up",
                "Monthly reporting",
              ].map((item) => (
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
