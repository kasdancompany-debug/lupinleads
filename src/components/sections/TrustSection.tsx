"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionShell } from "@/components/motion/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { CONTRACTOR_SALES_TRUST_SECTION, CTAS } from "@/lib/constants";
import { defaultTransition, defaultViewport, staggerContainer } from "@/lib/motion-config";

const CARD_ICONS: Record<
  (typeof CONTRACTOR_SALES_TRUST_SECTION.cards)[number]["id"],
  ReactNode
> = {
  "missed-leads": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M4 6h16v12H4V6z" strokeLinejoin="round" />
      <path d="M4 8l8 5 8-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 13v4" strokeLinecap="round" />
      <circle cx="18" cy="6" r="3" fill="currentColor" stroke="none" className="text-lupin-purple" />
    </svg>
  ),
  "slow-follow-up": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "no-pipeline": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <rect x="3" y="5" width="5" height="14" rx="1" />
      <rect x="10" y="5" width="5" height="14" rx="1" />
      <rect x="17" y="5" width="4" height="14" rx="1" />
      <path d="M5.5 10h0M12.5 14h0M19 8h0" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  ),
  "no-clear-roi": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M4 20h16M7 16V11M12 16V7M17 16v-4" strokeLinecap="round" />
    </svg>
  ),
};

export function TrustSection() {
  const reduce = useReducedMotion();
  const { eyebrow, title, highlight, description, foundingNote, cards } =
    CONTRACTOR_SALES_TRUST_SECTION;

  return (
    <SectionShell id="contractor-trust" variant="deep">
      <div className="section-body max-w-6xl mx-auto">
        <FadeIn>
          <SectionIntro
            align="center"
            variant="display"
            eyebrow={eyebrow}
            title={title}
            highlight={highlight}
            description={description}
            className="max-w-3xl mx-auto"
          />
        </FadeIn>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mt-10 lg:mt-14"
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ ...defaultTransition, delay: index * 0.06 }}
              className="sales-trust-card brand-card-lift rounded-2xl p-6 sm:p-7 h-full flex flex-col"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="brand-icon-chip w-11 h-11 shrink-0">{CARD_ICONS[card.id]}</div>
                <h3 className="type-card-title pt-2">{card.title}</h3>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-silver-dim mb-2">
                    The problem
                  </p>
                  <p className="text-sm text-silver-muted leading-relaxed">{card.problem}</p>
                </div>

                <div className="sales-trust-solution rounded-xl border border-forest-mid/20 bg-forest-mid/8 p-4 sm:p-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-forest-glow font-medium mb-2">
                    How Lupin helps
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">{card.solution}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <FadeIn delay={0.2}>
          <div className="sales-trust-footnote mt-10 lg:mt-12 rounded-xl border border-silver/10 bg-charcoal/50 px-5 py-5 sm:px-8 sm:py-6 text-center max-w-3xl mx-auto">
            <p className="text-sm sm:text-[15px] text-silver-muted leading-relaxed">
              {foundingNote}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <BookCallButton size="lg" emphasis>
                {CTAS.primary}
              </BookCallButton>
              <p className="text-xs text-silver-dim max-w-xs leading-relaxed">
                Founding partners get locked-in pricing and hands-on setup — only 5 spots.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}
