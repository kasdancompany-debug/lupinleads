import { SiteLogo } from "@/components/ui/SiteLogo";
import { GrowthDivider } from "@/components/ui/GrowthDivider";
import { GrowthPattern } from "@/components/ui/GrowthPattern";
import { NAV_LINKS, SITE, CTAS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="border-t border-forest-mid/15 section-footer relative overflow-hidden">
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-20" />
      <GrowthPattern tone="dark" intensity="whisper" placement="corners" className="opacity-25" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12">
          <div className="md:col-span-2">
            <SiteLogo layout="footer" className="mb-6" />
            <p className="text-silver-muted max-w-sm leading-relaxed mb-4 text-sm">
              {SITE.footerTagline}
            </p>
            <a
              href="#book-call"
              className="inline-flex text-sm font-semibold text-forest-glow hover:text-forest-light transition-colors"
            >
              {CTAS.primary} →
            </a>
          </div>

          <div>
            <h4 className="type-label text-silver-dim mb-4">
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
            <h4 className="type-label text-silver-dim mb-4">
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

        <GrowthDivider variant="whisper" className="my-8 sm:my-10" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-silver-dim">
          <p>&copy; {year} {SITE.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 gap-y-2">
            <a href="/privacy" className="hover:text-silver-muted transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-silver-muted transition-colors">
              Terms
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="hover:text-silver-muted transition-colors"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
