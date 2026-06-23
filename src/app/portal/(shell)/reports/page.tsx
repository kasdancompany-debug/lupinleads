import { PortalReportsDashboard } from "@/components/portal/PortalReportsDashboard";
import { getClientContext } from "@/lib/auth/session";

export const metadata = {
  title: "Reports — Lupin Client Portal",
  description: "Monthly leads, estimates, jobs, and revenue from your ad campaigns.",
};

export const dynamic = "force-dynamic";

export default async function PortalReportsPage() {
  const client = await getClientContext();

  return (
    <div className="px-4 sm:px-6 py-6 sm:py-8 lg:px-10 max-w-[1400px]">
      <PortalReportsDashboard clientName={client?.clientName} />
    </div>
  );
}
