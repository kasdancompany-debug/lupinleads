"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FOUNDING_PARTNER, CTAS } from "@/lib/constants";
import { scrollToBook, scrollToPricing } from "@/lib/marketing";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: FOUNDING_PARTNER.currency,
    minimumFractionDigits: 0,
  }).format(price);
}

const HIDE_NEAR_IDS = ["pricing", "book-call", "site-footer"];

export function StickyCta() {
  const [visible, setVisible] = useState(false);
  const [hiddenBySection, setHiddenBySection] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 320);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observers: IntersectionObserver[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        const shouldHide = entries.some((e) => e.isIntersecting);
        setHiddenBySection(shouldHide);
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.05 }
    );

    HIDE_NEAR_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    observers.push(observer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  if (!visible || hiddenBySection) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sticky-cta-bar pointer-events-none pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 pointer-events-auto">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={scrollToPricing}
            className="flex items-center gap-3 text-left sm:flex-1 min-w-0 rounded-lg sm:rounded-none hover:opacity-90 transition-opacity"
          >
            <span className="hidden sm:flex w-9 h-9 rounded-lg bg-forest-glow/15 border border-forest-glow/35 items-center justify-center text-forest-glow shrink-0 font-bold text-[10px]">
              $299
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                From {formatPrice(FOUNDING_PARTNER.introPrice)} · full growth system
              </p>
              <p className="text-[11px] text-silver-dim truncate">
                {FOUNDING_PARTNER.slotsRemaining} founding spots · then{" "}
                {formatPrice(FOUNDING_PARTNER.regularPrice)}/mo
              </p>
            </div>
          </button>
          <div className="flex gap-2 w-full sm:w-auto shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToPricing}
              className="hidden sm:inline-flex flex-1 sm:flex-none text-silver-muted"
            >
              {CTAS.pricing}
            </Button>
            <Button
              size="sm"
              emphasis
              onClick={scrollToBook}
              className="flex-1 sm:flex-none sm:min-w-[168px]"
            >
              {CTAS.short}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
