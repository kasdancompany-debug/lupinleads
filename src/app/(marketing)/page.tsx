import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PlatformShowcase } from "@/components/sections/PlatformShowcase";
import { BuilderCredibility } from "@/components/sections/BuilderCredibility";
import { CtaBanner } from "@/components/sections/CtaBanner";

const ClickToClosedJob = dynamic(
  () => import("@/components/sections/ClickToClosedJob").then((m) => m.ClickToClosedJob),
  { loading: () => <SectionPlaceholder /> }
);

const LaunchIn48Hours = dynamic(
  () => import("@/components/sections/LaunchIn48Hours").then((m) => m.LaunchIn48Hours),
  { loading: () => <SectionPlaceholder /> }
);

const ResultsSection = dynamic(
  () => import("@/components/sections/ResultsSection").then((m) => m.ResultsSection),
  { loading: () => <SectionPlaceholder /> }
);

const TrustSection = dynamic(
  () => import("@/components/sections/TrustSection").then((m) => m.TrustSection),
  { loading: () => <SectionPlaceholder /> }
);

const Pricing = dynamic(
  () => import("@/components/sections/Pricing").then((m) => m.Pricing),
  { loading: () => <SectionPlaceholder tall /> }
);

const BookACall = dynamic(
  () => import("@/components/sections/BookACall").then((m) => m.BookACall),
  { loading: () => <SectionPlaceholder tall /> }
);

const FAQ = dynamic(() => import("@/components/sections/FAQ").then((m) => m.FAQ), {
  loading: () => <SectionPlaceholder />,
});

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
      <ProblemSection />
      <HowItWorks />
      <PlatformShowcase />
      <BuilderCredibility />
      <ClickToClosedJob />
      <CtaBanner />
      <LaunchIn48Hours />
      <ResultsSection />
      <TrustSection />
      <Pricing />
      <BookACall />
      <FAQ />
    </>
  );
}
