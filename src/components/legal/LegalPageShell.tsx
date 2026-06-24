import Link from "next/link";
import { LEGAL } from "@/lib/legal";

type LegalPageShellProps = {
  title: string;
  children: React.ReactNode;
};

export function LegalPageShell({ title, children }: LegalPageShellProps) {
  return (
    <article className="page-container py-14 sm:py-20 max-w-3xl">
      <header className="mb-10 sm:mb-12">
        <p className="type-eyebrow mb-3">Legal</p>
        <h1 className="type-section-title text-foreground mb-3">{title}</h1>
        <p className="type-body-sm text-silver-muted">
          Last updated {LEGAL.lastUpdated} ·{" "}
          <a href={`mailto:${LEGAL.contactEmail}`} className="text-forest-glow hover:text-forest-light">
            {LEGAL.contactEmail}
          </a>
        </p>
      </header>

      <div className="legal-prose space-y-8 text-silver-muted leading-relaxed">{children}</div>

      <footer className="mt-12 pt-8 border-t border-silver/10 flex flex-wrap gap-4 text-sm">
        <Link href="/privacy" className="text-forest-glow hover:text-forest-light">
          Privacy Policy
        </Link>
        <Link href="/terms" className="text-forest-glow hover:text-forest-light">
          Terms of Service
        </Link>
        <Link href="/" className="text-silver-muted hover:text-foreground">
          Back to home
        </Link>
      </footer>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="type-card-title text-foreground mb-3">{title}</h2>
      <div className="space-y-3 text-sm sm:text-[15px]">{children}</div>
    </section>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <Section title={title}>{children}</Section>;
}
