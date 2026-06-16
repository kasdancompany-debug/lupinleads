import Link from "next/link";
import { WolfMark } from "@/components/ui/WolfMark";
import { WolfWatermark } from "@/components/ui/WolfWatermark";
import { NAV_LINKS, SITE, CTAS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="border-t border-forest-mid/15 section-footer relative overflow-hidden">
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-20" />
      <WolfWatermark className="absolute right-0 bottom-0 w-[400px] h-[400px] translate-x-1/6 translate-y-1/6 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <WolfMark size={32} className="text-forest-glow" />
              <span className="font-display text-2xl text-foreground">{SITE.name}</span>
            </Link>
            <p className="text-silver-muted max-w-sm leading-relaxed mb-4 text-sm">
              {SITE.heroOneLiner} {SITE.subheadline}
            </p>
            <a
              href="#book-call"
              className="inline-flex text-sm font-semibold text-forest-glow hover:text-forest-light transition-colors"
            >
              {CTAS.primary} →
            </a>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-silver-dim mb-4">
              Navigate
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-silver-muted hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-silver-dim mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-silver-muted">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-foreground transition-colors"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider my-10" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-silver-dim">
          <p>&copy; {year} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-silver-muted transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-silver-muted transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
