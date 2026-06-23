import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, requireClientApiAccess } from "@/lib/auth";
import { generateReportPdf } from "@/lib/reports/pdf/generate";

export async function POST(request: NextRequest) {
  try {
    const client = await requireClientApiAccess();

    const body = await request.json();
    const reportMonth =
      typeof body.reportMonth === "string" ? body.reportMonth : undefined;

    const pdf = await generateReportPdf(client.clientSlug, reportMonth, undefined, true);
    const month = reportMonth ?? "latest";
    const filename = `executive-report-${client.clientSlug}-${month}.pdf`;

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return apiAuthError(error);
  }
}
