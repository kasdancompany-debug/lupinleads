import { NextRequest, NextResponse } from "next/server";
import { buildExecutiveReport, getAvailableMonths, getClientIds } from "@/lib/reports/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId") ?? "apex-outdoors";
  const month = searchParams.get("month") ?? undefined;

  const report = buildExecutiveReport(clientId, month);
  const clients = getClientIds();
  const months = getAvailableMonths(clientId);

  return NextResponse.json({ report, clients, months });
}
