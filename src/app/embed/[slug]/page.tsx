import { notFound } from "next/navigation";
import { getFormBySlug } from "@/lib/forms/db";
import { EmbedFormClient } from "@/components/forms/EmbedFormClient";

export default async function EmbedPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const query = await searchParams;

  const form = await getFormBySlug(slug);
  if (!form) notFound();

  const tracking = {
    campaign: typeof query.campaign === "string" ? query.campaign : undefined,
    utmSource: typeof query.utm_source === "string" ? query.utm_source : undefined,
    utmMedium: typeof query.utm_medium === "string" ? query.utm_medium : undefined,
    utmCampaign: typeof query.utm_campaign === "string" ? query.utm_campaign : undefined,
    utmContent: typeof query.utm_content === "string" ? query.utm_content : undefined,
    utmTerm: typeof query.utm_term === "string" ? query.utm_term : undefined,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md dashboard-card p-6">
        <h1 className="text-lg font-medium text-foreground mb-1">{form.name}</h1>
        {form.description && (
          <p className="text-silver-muted text-sm mb-5">{form.description}</p>
        )}
        <EmbedFormClient form={form} tracking={tracking} />
      </div>
    </div>
  );
}
