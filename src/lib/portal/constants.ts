import type { PipelineStage } from "@/lib/crm/types";
import type { LeadStatus } from "@/lib/portal/types";

/** Contractor-friendly stage names (portal only). */
export const PORTAL_STAGE_LABELS: Record<PipelineStage, string> = {
  new_lead: "New lead",
  attempted_contact: "Contacted",
  appointment_booked: "Estimate booked",
  estimate_sent: "Estimate sent",
  won: "Job won",
  lost: "Lost",
};

export const PORTAL_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New lead",
  contacted: "Contacted",
  qualified: "Estimate booked",
  converted: "Job won",
  lost: "Lost",
};

/** Plain-language replacements for report highlight bullets. */
export function toPortalHighlight(text: string): string {
  return text
    .replace(/\bCPL and ROAS\b/gi, "cost per lead and return on your ads")
    .replace(/\bMeta ad spend\b/gi, "ad spend")
    .replace(/\bappointments?\b/gi, (m) => (m.toLowerCase().endsWith("s") ? "estimates" : "estimate"))
    .replace(/\bclose rate on new leads\b/gi, "of your leads turned into jobs")
    .replace(/\btracked job value from won leads\b/gi, "in closed job revenue");
}
