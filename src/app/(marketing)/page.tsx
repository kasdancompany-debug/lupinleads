import dynamic from "next/dynamic";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { GrowthDivider } from "@/components/ui/GrowthDivider";

const LaunchIn48Hours = dynamic(
  () => import("@/components/sections/LaunchIn48Hours").then((m) => m.LaunchIn48Hours),
  { loading: () => <SectionPlaceholder /> }
);

const ClickToClosedJob = dynamic(
  () => import("@/components/sections/ClickToClosedJob").then((m) => m.ClickToClosedJob),
  { loading: () => <SectionPlaceholder tall /> }
);

const AgencyComparisonSection = dynamic(
  () =>
    import("@/components/sections/AgencyComparisonSection").then((m) => m.AgencyComparisonSection),
  { loading: () => <SectionPlaceholder /> }
);

const GoodMonthSection = dynamic(
  () => import("@/components/sections/GoodMonthSection").then((m) => m.GoodMonthSection),
  { loading: () => <SectionPlaceholder /> }
);

const FounderLedSection = dynamic(
  () => import("@/components/sections/FounderLedSection").then((m) => m.FounderLedSection),
  { loading: () => <SectionPlaceholder /> }
);

const Pricing = dynamic(
  () => import("@/components/sections/Pricing").then((m) => m.Pricing),
  { loading: () => <SectionPlaceholder tall /> }
);

const BuilderCredibility = dynamic(
  () => import("@/components/sections/BuilderCredibility").then((m) => m.BuilderCredibility),
  { loading: () => <SectionPlaceholder /> }
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
      className={`section-charcoal ${tall ? "min-h-[480px]" : "min-h-[320px]"} section-skeleton`}
      aria-hidden
    />
  );
}

export default function Home() {
  return (
    <>
      <FaqJsonLd />
      <Hero />
      <GrowthDivider variant="stem" />
      <ProblemSection />
      <HowItWorks />
      <LaunchIn48Hours />
      <GrowthDivider variant="branch" align="left" />
      <ClickToClosedJob />
      <Features />
      <GrowthDivider variant="whisper" />
      <AgencyComparisonSection />
      <GoodMonthSection />
      <GrowthDivider variant="stem" align="left" />
      <FounderLedSection />
      <GrowthDivider variant="whisper" />
      <Pricing />
      <BuilderCredibility />
      <TrustSection />
      <FAQ />
      <GrowthDivider variant="stem" align="right" />
      <BookACall />
    </>
  );
}
