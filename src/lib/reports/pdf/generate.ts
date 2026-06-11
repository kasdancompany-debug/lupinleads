import { renderToBuffer } from "@react-pdf/renderer";
import { buildExecutiveReport } from "../data";
import type { ClientBranding } from "../types";
import { ExecutiveReportDocument } from "./ExecutiveReportDocument";

export async function generateReportPdf(
  clientId: string,
  reportMonth?: string,
  brandingOverride?: Partial<ClientBranding>
): Promise<Buffer> {
  const report = buildExecutiveReport(clientId, reportMonth, brandingOverride);
  const buffer = await renderToBuffer(
    ExecutiveReportDocument({ report })
  );
  return Buffer.from(buffer);
}
