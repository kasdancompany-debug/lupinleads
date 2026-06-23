import { renderToBuffer } from "@react-pdf/renderer";
import { getReportData } from "../data";
import type { ClientBranding } from "../types";
import { ExecutiveReportDocument } from "./ExecutiveReportDocument";

export async function generateReportPdf(
  clientSlug: string,
  reportMonth?: string,
  brandingOverride?: Partial<ClientBranding>,
  forPortal = false
): Promise<Buffer> {
  const { report } = await getReportData({
    clientSlug,
    month: reportMonth,
    brandingOverride,
    forPortal,
  });

  if (!report) {
    throw new Error("No report data available");
  }

  const buffer = await renderToBuffer(ExecutiveReportDocument({ report }));
  return Buffer.from(buffer);
}
