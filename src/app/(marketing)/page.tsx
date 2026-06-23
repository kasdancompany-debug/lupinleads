import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { GrowthDivider } from "@/components/ui/GrowthDivider";

const ClickToClosedJob = dynamic(
  () => import("@/components/sections/ClickToClosedJob").then((m) => m.ClickToClosedJob),
  { loading: () => <SectionPlaceholder tall /> }
);

const Pricing = dynamic(
  () => import("@/components/sections/Pricing").then((m) => m.Pricing),
  { loading: () => <SectionPlaceholder tall /> }
);

const TrustSection = dynamic(
  () => import("@/components/sections/TrustSection").then((m) => m.TrustSection),
  { loading: () => <SectionPlaceholder /> }
);

const FAQ = dynamic(() => import("@/components/sections/FAQ").then((m) => m.FAQ), {
  loading: () => <SectionPlaceholder />,
});

const BookACall = dynamic(
  () => import("@/components/sections/BookACall").then((m) => m.BookACall),
  { loading: () => <SectionPlaceholder tall /> }
);

function SectionPlaceholder({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={`section-charcoal ${tall ? "min-h-[480px]" : "min-h-[320px]"} animate-pulse`}
      aria-hidden
    />
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <GrowthDivider variant="stem" />
      <ProblemSection />
      <HowItWorks />
      <ClickToClosedJob />
      <GrowthDivider variant="branch" align="left" />
      <Features />
      <Pricing />
      <GrowthDivider variant="whisper" />
      <TrustSection />
      <FAQ />
      <GrowthDivider variant="stem" align="right" />
      <BookACall />
    </>
  );
}
