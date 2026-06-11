"use client";

import { useState } from "react";
import Link from "next/link";
import { WolfCrest } from "@/components/ui/WolfCrest";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="border-b border-silver/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">
            <Link href="/" className="flex items-center gap-3 group">
              <WolfCrest
                size={40}
                className="text-forest-glow transition-colors group-hover:text-forest-light drop-shadow-[0_0_8px_rgba(82,183,136,0.4)]"
              />
              <span className="font-display text-xl tracking-[0.15em] text-foreground">
                {SITE.name}
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-silver-muted hover:text-foreground transition-colors tracking-wide"
                >
                  {link.label}
                </a>
              ))}
              <Button
                size="sm"
                onClick={() => {
                  document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {SITE.cta}
              </Button>
            </div>

            <button
              type="button"
              className="md:hidden p-2 text-silver-muted hover:text-foreground"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {open ? (
                  <path d="M6 6L18 18M6 18L18 6" />
                ) : (
                  <path d="M4 8H20M4 16H20" />
                )}
              </svg>
            </button>
          </div>

          {open && (
            <div className="md:hidden pb-6 border-t border-silver/10 pt-4 space-y-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-silver-muted hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                size="sm"
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {SITE.cta}
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
