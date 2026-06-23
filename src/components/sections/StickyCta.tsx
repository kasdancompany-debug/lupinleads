"use client";

import { useEffect, useState } from "react";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { CTAS } from "@/lib/constants";
import { formatFoundingPriceLine } from "@/lib/marketing";

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

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  if (!visible || hiddenBySection) return null;

  const priceLine = formatFoundingPriceLine("·");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sticky-cta-bar pointer-events-none pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 pointer-events-auto">
        <div className="flex flex-col gap-2.5">
          <div className="min-w-0 text-center sm:text-left">
            <p className="type-nav-mobile font-semibold text-foreground leading-snug">
              Turn ad clicks into booked jobs
            </p>
            <p className="type-label text-silver-muted mt-0.5 leading-relaxed">
              {priceLine}
            </p>
          </div>
          <BookCallButton
            size="md"
            emphasis
            className="w-full min-h-[48px] text-sm font-semibold"
          >
            {CTAS.primary}
          </BookCallButton>
        </div>
      </div>
    </div>
  );
}
