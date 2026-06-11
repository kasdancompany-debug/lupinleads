import Link from "next/link";
import { WolfMark } from "@/components/ui/WolfMark";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export default function SuccessPage() {
  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-6">
      <div className="absolute inset-0 grain-overlay pointer-events-none" />
      <div className="relative text-center max-w-lg">
        <WolfMark size={64} className="text-forest-glow mx-auto mb-8" />
        <h1 className="font-display text-4xl text-gradient-silver mb-4">
          Welcome to LUPIN LEADS
        </h1>
        <p className="text-silver-muted text-lg mb-8 leading-relaxed">
          Your subscription is confirmed. Our team will reach out within 24 hours
          to begin onboarding you to {SITE.name}.
        </p>
        <Link href="/">
          <Button size="lg">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
