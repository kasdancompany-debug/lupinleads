import type { FormField } from "./types";
import type { NewLeadInput } from "@/lib/crm/types";

export function mapSubmissionToLead(
  fields: FormField[],
  data: Record<string, string | number>,
  source: string,
  campaign: string | null
): NewLeadInput {
  const lead: NewLeadInput = {
    name: "",
    phone: "",
    email: "",
    serviceRequested: "",
    estimatedValue: 0,
    notes: "",
    source,
  };

  const customNotes: string[] = [];

  for (const field of fields) {
    const raw = data[field.id];
    if (raw === undefined || raw === "") continue;
    const value = String(raw);

    switch (field.mapsTo) {
      case "name":
        lead.name = value;
        break;
      case "phone":
        lead.phone = value;
        break;
      case "email":
        lead.email = value;
        break;
      case "serviceRequested":
        lead.serviceRequested = value;
        break;
      case "notes":
        lead.notes = lead.notes ? `${lead.notes}\n${value}` : value;
        break;
      case "estimatedValue":
        lead.estimatedValue = Number(raw) || 0;
        break;
      case "custom":
        customNotes.push(`${field.label}: ${value}`);
        break;
    }
  }

  if (customNotes.length > 0) {
    const block = customNotes.join("\n");
    lead.notes = lead.notes ? `${lead.notes}\n\n${block}` : block;
  }

  if (campaign) {
    lead.notes = lead.notes
      ? `${lead.notes}\n\nCampaign: ${campaign}`
      : `Campaign: ${campaign}`;
  }

  if (!lead.name) lead.name = "Unknown Lead";

  return lead;
}

export function resolveCampaign(
  tracking: {
    campaign?: string;
    utmCampaign?: string;
  },
  defaultCampaign: string | null
): string | null {
  return tracking.campaign || tracking.utmCampaign || defaultCampaign || null;
}
