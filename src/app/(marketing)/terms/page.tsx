import type { Metadata } from "next";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { LEGAL } from "@/lib/legal";
import { FOUNDING_PARTNER } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of ${LEGAL.companyName} marketing services and platform.`,
  alternates: { canonical: `${LEGAL.siteUrl}/terms` },
};

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms of Service">
      <LegalSection title="Agreement">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of {LEGAL.companyName} (
          {LEGAL.siteUrl}) and our lead generation services. By using the site, booking a call, or
          becoming a client, you agree to these Terms.
        </p>
      </LegalSection>

      <LegalSection title="Services">
        <p>
          {LEGAL.companyName} provides marketing and lead-generation services for home-service
          contractors, including Meta (Facebook/Instagram) advertising management, lead capture,
          CRM/pipeline tools, follow-up support, and reporting. Specific deliverables are described
          on our website and in your service agreement or onboarding materials.
        </p>
        <p>
          <strong className="text-foreground">Ad spend</strong> is paid directly by you to Meta on
          your own advertising account unless otherwise agreed in writing. Our management fee is
          separate from ad spend.
        </p>
      </LegalSection>

      <LegalSection title="Founding partner pricing">
        <p>
          Founding partner offers (currently ${FOUNDING_PARTNER.introPrice} CAD plus applicable
          taxes for the first month, then ${FOUNDING_PARTNER.regularPrice} CAD/month management fee
          plus applicable taxes, plus ad spend) are limited in availability and described on our
          pricing page. Promotional pricing applies only while the offer is active and while your
          account remains in good standing.
        </p>
      </LegalSection>

      <LegalSection title="Client responsibilities">
        <ul className="list-disc pl-5 space-y-2">
          <li>Provide accurate business information and timely access to Meta business assets</li>
          <li>Respond to leads promptly and move pipeline stages accurately in the CRM</li>
          <li>Comply with Meta advertising policies and applicable laws (including CASL for email/SMS)</li>
          <li>Maintain appropriate licences and insurance for your trade</li>
          <li>Pay management fees and any agreed charges on time</li>
        </ul>
      </LegalSection>

      <LegalSection title="30-day management fee guarantee">
        <p>
          If stated on our website, we offer a satisfaction guarantee on the Lupin management fee
          within the first 30 days of service. Ad spend paid to Meta is not refundable by us. Guarantee
          terms apply to management fees only and require good-faith participation in onboarding and
          campaign launch. Contact {LEGAL.contactEmail} to request a review.
        </p>
      </LegalSection>

      <LegalSection title="No guaranteed results">
        <p>
          Lead volume, cost per lead, appointments, and revenue depend on market conditions, ad
          budget, offer, competition, and your follow-up. We do not guarantee a specific number of
          leads, jobs, or revenue. Sample metrics on our site are illustrative unless explicitly
          labelled as a published client result with permission.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          Website content, branding, and platform software are owned by {LEGAL.companyName} or its
          licensors. Ad creative produced for you may be used for your campaigns; broader usage rights
          can be confirmed in writing.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, {LEGAL.companyName} is not liable for indirect,
          incidental, or consequential damages, or for lost profits arising from use of our services.
          Our total liability for any claim related to the services is limited to the management fees
          you paid us in the three months before the claim.
        </p>
      </LegalSection>

      <LegalSection title="Termination">
        <p>
          Either party may end the service relationship according to the notice terms in your
          agreement. You remain responsible for fees incurred and ad spend on your Meta account. Upon
          termination, we will provide reasonable transition assistance for account access where
          applicable.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>
          These Terms are governed by the laws of {LEGAL.jurisdiction}, without regard to conflict of
          law principles. Disputes will be resolved in the courts of that jurisdiction, unless
          otherwise required by consumer protection law.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these Terms:{" "}
          <a href={`mailto:${LEGAL.contactEmail}`} className="text-forest-glow hover:text-forest-light">
            {LEGAL.contactEmail}
          </a>
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
