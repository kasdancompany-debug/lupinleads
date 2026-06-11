import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Features } from "@/components/sections/Features";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { BookACall } from "@/components/sections/BookACall";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Features />
      <CaseStudies />
      <Testimonials />
      <CtaBanner />
      <Pricing />
      <FAQ />
      <BookACall />
    </>
  );
}
