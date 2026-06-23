import Link from "next/link";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { Button } from "@/components/ui/Button";
import { CTAS } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-black flex flex-col">
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-40" />

      <header className="relative z-10 px-5 sm:px-6 py-5">
        <SiteLogo size={36} nameClassName="font-display text-lg tracking-[0.1em] text-foreground" />
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-5 sm:px-6 py-12">
        <div className="text-center max-w-md">
          <p className="text-[11px] uppercase tracking-[0.2em] text-forest-glow mb-4">404</p>
          <h1 className="font-bold text-3xl sm:text-4xl text-foreground tracking-tight mb-4">
            Page not found
          </h1>
          <p className="text-silver-muted text-sm sm:text-base leading-relaxed mb-8">
            This link may be outdated or mistyped. Head back to the homepage or book a free strategy
            call — we&apos;ll point you in the right direction.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto min-h-[48px]">
                Back to homepage
              </Button>
            </Link>
            <BookCallButton size="lg" emphasis className="w-full sm:w-auto min-h-[48px]">
              {CTAS.short}
            </BookCallButton>
          </div>
        </div>
      </main>
    </div>
  );
}
