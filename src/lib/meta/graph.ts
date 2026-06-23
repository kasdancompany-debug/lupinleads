import { getMetaGraphAccessToken } from "./config";
import type { MetaFieldData } from "./types";

type GraphLeadResponse = {
  id?: string;
  created_time?: string;
  field_data?: MetaFieldData[];
  ad_id?: string;
  form_id?: string;
  page_id?: string;
  error?: { message?: string };
};

export async function fetchMetaLeadFromGraph(
  leadgenId: string
): Promise<{ fieldData: MetaFieldData[]; adId?: string; formId?: string; pageId?: string } | null> {
  const token = getMetaGraphAccessToken();
  if (!token) return null;

  const url = new URL(`https://graph.facebook.com/v21.0/${leadgenId}`);
  url.searchParams.set(
    "fields",
    "id,created_time,field_data,ad_id,form_id,page_id"
  );
  url.searchParams.set("access_token", token);

  try {
    const res = await fetch(url.toString(), { method: "GET", cache: "no-store" });
    const data = (await res.json()) as GraphLeadResponse;

    if (!res.ok || data.error) {
      console.error("Meta Graph API error:", data.error?.message ?? res.status);
      return null;
    }

    return {
      fieldData: data.field_data ?? [],
      adId: data.ad_id,
      formId: data.form_id,
      pageId: data.page_id,
    };
  } catch (error) {
    console.error("Meta Graph API fetch failed:", error);
    return null;
  }
}
