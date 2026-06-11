import type { PipelineStage } from "./types";

export const STAGE_CONFIG: Record<
  PipelineStage,
  { label: string; color: string; accent: string }
> = {
  new_lead: {
    label: "New Lead",
    color: "text-blue-300/90",
    accent: "border-blue-400/30 bg-blue-400/10",
  },
  attempted_contact: {
    label: "Attempted Contact",
    color: "text-amber-300/90",
    accent: "border-amber-400/30 bg-amber-400/10",
  },
  appointment_booked: {
    label: "Appointment Booked",
    color: "text-purple-300/90",
    accent: "border-purple-400/30 bg-purple-400/10",
  },
  estimate_sent: {
    label: "Estimate Sent",
    color: "text-cyan-300/90",
    accent: "border-cyan-400/30 bg-cyan-400/10",
  },
  won: {
    label: "Won",
    color: "text-forest-glow",
    accent: "border-forest-glow/30 bg-forest-mid/15",
  },
  lost: {
    label: "Lost",
    color: "text-red-400/80",
    accent: "border-red-400/30 bg-red-400/10",
  },
};

export const LEAD_SOURCES = [
  "Google Ads",
  "Referral",
  "Website",
  "Yard Sign",
  "HomeAdvisor",
  "Facebook",
  "Repeat Customer",
  "Other",
] as const;

export const STORAGE_KEY = "lupin-crm-leads";
