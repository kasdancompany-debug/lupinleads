import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { CTAS } from "@/lib/constants";
import { SITE_URL } from "@/lib/site-metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: CTAS.primary,
  description:
    "Book a free lead strategy call with LUPIN LEADS. We'll review your trade, market, and whether Facebook and Instagram ads make sense for your contracting business.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/book` },
};

export default function BookPage() {
  redirect("/#book-call");
}
