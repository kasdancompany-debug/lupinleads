import { NextRequest, NextResponse } from "next/server";
import { buildExecutiveReport, getAvailableMonths, getClientIds } from "@/lib/reports/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clients = await getClientIds();
  const clientId = searchParams.get("clientId") ?? clients[0]?.id;
  const month = searchParams.get("month") ?? undefined;

  if (!clientId) {
    return NextResponse.json({
      report: null,
      clients: [],
      months: [],
      empty: true,
    });
  }

  const report = await buildExecutiveReport(clientId, month);
  const months = await getAvailableMonths(clientId);

  return NextResponse.json({ report, clients, months, empty: false });
}
