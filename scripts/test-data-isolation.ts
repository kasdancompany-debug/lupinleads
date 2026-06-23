/**
 * Agency / client isolation test suite (CLI).
 *
 * Usage:
 *   npm run test:isolation
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   AGENCY_ADMIN_EMAILS (for agency role checks)
 *
 * Apply migrations 006 + 008 before running data-layer tests.
 */

import { config } from "dotenv";
import { resolve } from "path";
import {
  formatIsolationReport,
  runFullIsolationTests,
} from "../src/lib/testing/data-isolation";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

async function main() {
  console.log("Running agency / client isolation tests...\n");

  const report = await runFullIsolationTests();
  const text = formatIsolationReport(report);
  console.log(text);

  if (!report.allPassed) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("\nIsolation test runner crashed:\n");
  if (error instanceof Error) {
    console.error(`  ${error.name}: ${error.message}`);
    if (error.stack) {
      console.error(`\n${error.stack}`);
    }
  } else {
    console.error(error);
  }
  process.exit(1);
});
