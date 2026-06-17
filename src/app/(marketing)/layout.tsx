import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCta } from "@/components/sections/StickyCta";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pb-[7.5rem] sm:pb-32 md:pb-0">{children}</main>
      <Footer />
      <StickyCta />
    </>
  );
}
