import type { Metadata } from "next";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${LEGAL.companyName} collects, uses, and protects your information.`,
  alternates: { canonical: `${LEGAL.siteUrl}/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Privacy Policy">
      <LegalSection title="Who we are">
        <p>
          {LEGAL.companyName} ({LEGAL.siteUrl}) provides lead generation and marketing services for
          Canadian home-service contractors. Questions about this policy:{" "}
          <a href={`mailto:${LEGAL.contactEmail}`} className="text-forest-glow hover:text-forest-light">
            {LEGAL.contactEmail}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Information we collect">
        <p>We may collect information you provide directly, including:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Name, email, phone number, business name, trade, city, and project details</li>
          <li>Messages submitted through our strategy call or contact forms</li>
          <li>Scheduling details when you book a call through Calendly</li>
          <li>Account information when you sign in to our agency dashboard or client portal</li>
        </ul>
        <p>
          For contractor clients, we also process homeowner lead data submitted through Meta
          (Facebook/Instagram) lead forms and branded capture forms — on behalf of the client,
          under their advertising campaigns.
        </p>
        <p>
          We automatically collect basic technical data (IP address, browser type, pages visited)
          through hosting and, if enabled, privacy-friendly analytics. See Cookies below.
        </p>
      </LegalSection>

      <LegalSection title="How we use information">
        <ul className="list-disc pl-5 space-y-2">
          <li>Respond to inquiries and book strategy calls</li>
          <li>Deliver lead generation, CRM, reporting, and portal services to paying clients</li>
          <li>Send service-related emails and lead notifications</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>We do not sell personal information to third-party lead marketplaces.</p>
      </LegalSection>

      <LegalSection title="Service providers">
        <p>We use trusted providers to operate the service, including:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-foreground">Vercel</strong> — website hosting
          </li>
          <li>
            <strong className="text-foreground">Supabase</strong> — database and authentication
          </li>
          <li>
            <strong className="text-foreground">Resend</strong> — transactional email
          </li>
          <li>
            <strong className="text-foreground">Calendly</strong> — appointment scheduling
          </li>
          <li>
            <strong className="text-foreground">Meta (Facebook)</strong> — advertising and lead
            forms for clients
          </li>
          <li>
            <strong className="text-foreground">Stripe</strong> — payment processing (when used)
          </li>
        </ul>
        <p>These providers process data under their own privacy policies and our instructions.</p>
      </LegalSection>

      <LegalSection title="Client portal and contractor data">
        <p>
          If you are a contractor client, leads in your portal are scoped to your account. We use
          role-based access so client users only see their own campaign data. Agency administrators
          can access client accounts for service delivery and support.
        </p>
      </LegalSection>

      <LegalSection title="Retention">
        <p>
          We retain information as long as needed to provide services, meet legal requirements, and
          resolve disputes. You may request deletion of your personal data by emailing{" "}
          {LEGAL.contactEmail}. Client lead records may need to be retained for reporting and
          contractual obligations.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          Depending on your location, you may have rights to access, correct, or delete personal
          information, or to withdraw consent where applicable. Canadian residents may have rights
          under applicable privacy laws. Contact us at {LEGAL.contactEmail} to make a request.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and analytics">
        <p>
          We use cookies and similar technologies to measure site traffic and advertising
          performance. Depending on configuration, this may include:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-foreground">Google Analytics</strong> — page views and general
            usage (Google&apos;s privacy policy applies)
          </li>
          <li>
            <strong className="text-foreground">Meta Pixel</strong> — ad measurement and
            remarketing related to our own marketing (Meta&apos;s privacy policy applies)
          </li>
          <li>
            <strong className="text-foreground">Plausible</strong> — privacy-focused analytics, if
            enabled
          </li>
        </ul>
        <p>
          You can control cookies through your browser settings. Some analytics tools offer opt-out
          browser extensions. Disabling cookies may not affect core site functionality.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top
          reflects the latest version. Continued use of the site after changes constitutes acceptance
          of the updated policy.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
