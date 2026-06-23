import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, requireClientApiAccess } from "@/lib/auth";
import { getReportData } from "@/lib/reports/data";

export async function GET(request: NextRequest) {
  try {
    const client = await requireClientApiAccess();

    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month") ?? undefined;

    const result = await getReportData({
      clientSlug: client.clientSlug,
      month,
      forPortal: true,
    });

    if (!result.report) {
      return NextResponse.json({
        report: null,
        months: result.months,
        clientId: client.clientSlug,
        adSpendEntered: false,
        empty: true,
      });
    }

    const adSpendEntered = result.report.current.adSpendEntered;

    return NextResponse.json({
      report: result.report,
      months: result.months,
      clientId: client.clientSlug,
      adSpendEntered,
      empty: false,
    });
  } catch (error) {
    return apiAuthError(error);
  }
}
