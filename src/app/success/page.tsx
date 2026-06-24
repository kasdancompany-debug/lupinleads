import Link from "next/link";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Welcome",
  description: "Your LUPIN LEADS subscription is confirmed.",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen min-h-[100dvh] hero-gradient flex items-center justify-center px-5 sm:px-6">
      <div className="absolute inset-0 grain-overlay pointer-events-none" />
      <div className="relative text-center max-w-lg">
        <SiteLogo href="" height={36} priority className="justify-center mb-8" />
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
