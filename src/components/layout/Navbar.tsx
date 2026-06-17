"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WolfCrest } from "@/components/ui/WolfCrest";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE, CTAS } from "@/lib/constants";
import { scrollToBook } from "@/lib/marketing";

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-forest-mid/25 bg-forest-black/95 backdrop-blur-xl shadow-lg shadow-forest-black/30"
            : "border-b border-transparent bg-forest-black/50 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-[4.5rem]">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
              <WolfCrest
                size={32}
                className="sm:w-9 sm:h-9 text-forest-glow transition-colors group-hover:text-forest-light shrink-0"
              />
              <span className="font-display text-base sm:text-lg lg:text-xl tracking-[0.1em] text-foreground truncate">
                {SITE.name}
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-silver-muted hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button size="sm" emphasis onClick={scrollToBook}>
                {CTAS.primary}
              </Button>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <Button
                size="sm"
                emphasis
                onClick={scrollToBook}
                className="text-[10px] sm:text-xs px-2.5 sm:px-3 leading-tight"
              >
                {CTAS.primary}
              </Button>
              <button
                type="button"
                className="p-2 text-silver-muted hover:text-foreground"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {open ? <path d="M6 6L18 18M6 18L18 6" /> : <path d="M4 8H20M4 16H20" />}
                </svg>
              </button>
            </div>
          </div>

          {open && (
            <div className="md:hidden pb-5 border-t border-silver/10 pt-3 space-y-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block py-1 text-silver-muted hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#book-call"
                className="block py-1 text-silver-muted hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                {CTAS.primary}
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
