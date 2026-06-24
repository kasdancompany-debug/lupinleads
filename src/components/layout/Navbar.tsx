"use client";

import { useEffect, useState } from "react";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { NAV_LINKS, CTAS } from "@/lib/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-forest-mid/25 bg-forest-black/95 backdrop-blur-xl shadow-lg shadow-forest-black/30"
            : "border-b border-transparent bg-forest-black/50 backdrop-blur-sm"
        }`}
        aria-label="Main"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-[4.5rem]">
            <SiteLogo layout="nav" priority className="shrink-0" />

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="type-nav text-silver-muted hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <BookCallButton size="sm" emphasis>
                {CTAS.primary}
              </BookCallButton>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <BookCallButton
                size="sm"
                emphasis
                className="text-[10px] sm:text-xs px-2.5 sm:px-3 leading-tight min-h-[40px]"
              >
                {CTAS.short}
              </BookCallButton>
              <button
                type="button"
                className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-silver-muted hover:text-foreground"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-nav"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  {open ? <path d="M6 6L18 18M6 18L18 6" /> : <path d="M4 8H20M4 16H20" />}
                </svg>
              </button>
            </div>
          </div>

          {open ? (
            <div
              id="mobile-nav"
              className="md:hidden pb-5 border-t border-silver/10 pt-3 space-y-1 max-h-[calc(100dvh-4rem)] overflow-y-auto"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="type-nav-mobile block py-3 px-1 text-silver-muted hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#book-call"
                className="type-nav-mobile block py-3 px-1 text-sage-green font-semibold"
                onClick={() => setOpen(false)}
              >
                {CTAS.primary}
              </a>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
