export const FIELD_TYPES = [
  "text",
  "email",
  "phone",
  "textarea",
  "select",
  "number",
] as const;

export type FormFieldType = (typeof FIELD_TYPES)[number];

export type CrmFieldMap =
  | "name"
  | "phone"
  | "email"
  | "serviceRequested"
  | "notes"
  | "estimatedValue"
  | "custom";

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  mapsTo: CrmFieldMap;
}

export interface CaptureForm {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  fields: FormField[];
  defaultCampaign: string | null;
  notifyEmail: string | null;
  successMessage: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, string | number>;
  campaign: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  referrer: string | null;
  crmLeadId: string | null;
  createdAt: string;
}

export interface CampaignTracking {
  campaign?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
}

export type CreateFormInput = Pick<
  CaptureForm,
  "name" | "description" | "fields" | "defaultCampaign" | "notifyEmail" | "successMessage"
>;

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  metadata: Record<string, unknown>;
  read: boolean;
  createdAt: string;
}
