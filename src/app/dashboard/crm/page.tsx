import { PipelineBoard } from "@/components/crm/PipelineBoard";

export const metadata = {
  title: "CRM Pipeline — LUPIN LEADS",
  description: "View and manage contractor leads by client.",
};

export default async function CrmPage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string }>;
}) {
  const params = await searchParams;
  const clientSlug = params.client?.trim() || undefined;

  return <PipelineBoard clientSlug={clientSlug} />;
}
