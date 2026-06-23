import { notFound } from "next/navigation";
import { getClientContext } from "@/lib/auth/session";
import { getPortalOverviewData } from "@/lib/portal/overview";
import { PortalOverviewHeader, PortalSpendNote } from "@/components/portal/PortalOverviewHeader";
import { PortalOverviewMetrics } from "@/components/portal/PortalOverviewMetrics";
import { PortalEmptyState } from "@/components/portal/PortalEmptyState";
import { LatestLeads } from "@/components/dashboard/LatestLeads";
import { PORTAL_STATUS_LABELS } from "@/lib/portal/constants";

export const dynamic = "force-dynamic";

export default async function PortalOverviewPage() {
  const client = await getClientContext();
  if (!client) {
    notFound();
  }

  const data = await getPortalOverviewData({
    clientSlug: client.clientSlug,
    clientName: client.clientName,
  });

  const hasActivity =
    data.totalLeads > 0 ||
    data.leadsThisMonth > 0 ||
    data.recentLeads.length > 0;

  return (
    <div className="px-4 sm:px-6 py-6 sm:py-8 lg:px-10 max-w-[1400px]">
      <PortalOverviewHeader
        clientName={data.clientName}
        periodLabel={data.periodLabel}
        isLive={data.isLive}
      />

      {!data.isLive ? (
        <PortalEmptyState
          icon="connect"
          title="Your portal is almost ready"
          description="We're connecting your ad accounts and lead tracking. Check back soon — your numbers will show up here automatically."
        />
      ) : (
        <div className="space-y-6">
          <PortalOverviewMetrics data={data} />

          {!data.adSpendEntered ? <PortalSpendNote /> : null}

          {hasActivity ? null : (
            <PortalEmptyState
              title="No leads yet this month"
              description="When someone fills out your ad form or calls from a campaign, they'll show up here. Move them through estimates to jobs as you close work."
              action={{ label: "View your leads", href: "/portal/pipeline" }}
            />
          )}

          <LatestLeads
            leads={data.recentLeads}
            crmHref="/portal/pipeline"
            title="Recent leads"
            subtitle={
              data.recentLeads.length === 0
                ? "New leads from your ads land here first"
                : `${data.recentLeads.length} most recent`
            }
            emptyTitle="No leads yet"
            emptyDescription="Leads from your Lupin ad campaigns will appear here as they come in."
            emptyAction={{ label: "Go to leads board", href: "/portal/pipeline" }}
            statusLabels={PORTAL_STATUS_LABELS}
            pipelineLinkLabel="All leads"
          />
        </div>
      )}
    </div>
  );
}
