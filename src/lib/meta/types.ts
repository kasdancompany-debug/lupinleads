export type MetaFieldData = {
  name: string;
  values: string[];
};

export type MetaLeadgenValue = {
  leadgen_id: string;
  page_id?: string;
  form_id?: string;
  ad_id?: string;
  adgroup_id?: string;
  created_time?: number;
};

export type MetaWebhookChange = {
  field?: string;
  value?: MetaLeadgenValue;
};

export type MetaWebhookEntry = {
  id?: string;
  time?: number;
  changes?: MetaWebhookChange[];
};

export type MetaWebhookPayload = {
  object?: string;
  entry?: MetaWebhookEntry[];
};

export type MetaLeadIntakeInput = {
  leadgenId: string;
  formId: string;
  pageId?: string;
  adId?: string;
  adgroupId?: string;
  fieldData?: MetaFieldData[];
  rawPayload?: unknown;
  /** Skip Graph API fetch when field data is already provided (dev simulate). */
  skipFetch?: boolean;
};

export type MetaLeadIntakeResult = {
  ok: boolean;
  status: "processed" | "duplicate" | "error" | "ignored";
  crmLeadId?: string;
  clientSlug?: string;
  logId?: string;
  error?: string;
};
