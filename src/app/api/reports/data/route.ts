import { NextRequest, NextResponse } from "next/server";
import { apiAuthError, requireAgencyApiAccess, resolveApiDataScope } from "@/lib/auth";
import { getReportData } from "@/lib/reports/data";

export async function GET(request: NextRequest) {
  try {
    await requireAgencyApiAccess(request);

    const { searchParams } = new URL(request.url);
    const scope = await resolveApiDataScope(searchParams.get("clientId"));
    const month = searchParams.get("month") ?? undefined;

    let clientSlug = scope.clientSlug;
    if (scope.isAgency && !clientSlug) {
      const bootstrap = await getReportData();
      clientSlug = searchParams.get("clientId") ?? bootstrap.clients[0]?.id;
    }

    if (!clientSlug) {
      const bootstrap = await getReportData();
      return NextResponse.json({
        report: null,
        clients: bootstrap.clients,
        months: [],
        empty: true,
      });
    }

    const result = await getReportData({ clientSlug, month });

    return NextResponse.json({
      report: result.report,
      clients: result.clients,
      months: result.months,
      clientId: result.clientId,
      empty: result.empty,
      adSpendEntered: result.report?.current.adSpendEntered ?? false,
    });
  } catch (error) {
    return apiAuthError(error);
  }
}
