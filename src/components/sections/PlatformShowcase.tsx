"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { SectionShell } from "@/components/motion/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Button } from "@/components/ui/Button";
import { ProductScreenshot } from "@/components/marketing/mockups/BrowserWindowMockup";
import { LeadDashboardMockup } from "@/components/marketing/mockups/LeadDashboardMockup";
import { CrmPipelineMockup } from "@/components/marketing/mockups/CrmPipelineMockup";
import { ReportingDashboardMockup } from "@/components/marketing/mockups/ReportingDashboardMockup";
import { CTAS } from "@/lib/constants";
import { scrollToBook } from "@/lib/marketing";

export function PlatformShowcase() {
  return (
    <SectionShell id="platform" variant="surface" className="!overflow-visible">
      <div className="section-body">
        <FadeIn>
          <SectionIntro
            align="center"
            eyebrow="The platform"
            title="Track every step from"
            highlight="ad click to booked job."
            description="Dashboard, CRM, and reporting for the full path — not just lead volume. Previews below use sample data."
            className="max-w-3xl"
          />
        </FadeIn>

        <div className="space-y-10 lg:space-y-14">
          <FadeIn delay={0.06}>
            <ProductScreenshot
              label="Lead Dashboard"
              caption="Campaign performance, cost per lead, and incoming leads in one view."
              url="app.lupinleads.com/dashboard"
            >
              <LeadDashboardMockup showcase bare />
            </ProductScreenshot>
          </FadeIn>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-12">
            <FadeIn delay={0.1}>
              <ProductScreenshot
                label="CRM Pipeline"
                caption="Every lead staged from first contact through won job — with job value on every card."
                url="app.lupinleads.com/crm"
                className="h-full"
              >
                <CrmPipelineMockup showcase bare />
              </ProductScreenshot>
            </FadeIn>

            <FadeIn delay={0.14}>
              <ProductScreenshot
                label="Reporting Dashboard"
                caption="Monthly executive reports tied to your pipeline — spend, CPL, ROAS, and closed revenue."
                url="app.lupinleads.com/reports"
                className="h-full"
              >
                <ReportingDashboardMockup showcase bare />
              </ProductScreenshot>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.18}>
          <div className="text-center pt-4 border-t border-silver/10">
            <p className="text-xs text-silver-dim max-w-lg mx-auto leading-relaxed mb-6">
              Screenshots show the Lupin Leads product interface with illustrative sample data — not
              fabricated client results.
            </p>
            <div className="section-cta-row section-cta-row--center">
              <Button size="lg" emphasis onClick={scrollToBook}>
                {CTAS.primary}
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}
