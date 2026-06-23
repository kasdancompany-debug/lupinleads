import { PipelineBoard } from "@/components/crm/PipelineBoard";
import { getClientContext } from "@/lib/auth/session";

export const metadata = {
  title: "Leads — Lupin Client Portal",
  description: "Track leads from your ads through estimates to won jobs.",
};

export const dynamic = "force-dynamic";

export default async function PortalPipelinePage() {
  const client = await getClientContext();

  return (
    <PipelineBoard
      variant="portal"
      clientName={client?.clientName}
    />
  );
}
