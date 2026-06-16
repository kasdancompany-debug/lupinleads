"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CalendlyBooking } from "@/components/sections/CalendlyBooking";
import { SlideIn } from "@/components/motion/SlideIn";
import { StepFlow } from "@/components/motion/StepFlow";
import { RiseOnScroll } from "@/components/motion/RiseOnScroll";
import { getCalendlyUrl } from "@/lib/calendly";
import { CTAS } from "@/lib/constants";
import { SectionIntro } from "@/components/ui/SectionIntro";

type FormState = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  message: "",
};

const STEPS = [
  {
    title: "Review your market",
    body: "We look at your trade, service area, competition, and current lead sources — what’s working and what isn’t.",
    tag: "15 min",
  },
  {
    title: "Map the full system",
    body: "We walk through Meta Ads, creative, capture, CRM, follow-up, and reporting — and what a realistic ad budget looks like on your account.",
    tag: "No pitch deck",
  },
  {
    title: "Launch if it’s a fit",
    body: "If we’re aligned, we set up your Meta account access, forms, CRM, and follow-up — typically live within 48 hours.",
    tag: "Go live",
  },
];

export function BookACall() {
  const calendlyUrl = getCalendlyUrl();
  const [form, setForm] = useState<FormState>(initialForm);
  const [bookingPrefill, setBookingPrefill] = useState<{ name: string; email: string } | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      setStatus("success");
      setBookingPrefill({
        name: form.name.trim(),
        email: form.email.trim(),
      });
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-black-surface border border-silver/15 rounded-lg px-4 py-3 text-foreground placeholder:text-silver-dim text-sm focus:outline-none focus:border-forest-mid/50 focus:ring-1 focus:ring-forest-mid/30 transition-colors";

  return (
    <section id="book-call" className="section-emerald py-16 md:py-24 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 section-glow-corner pointer-events-none opacity-70" />
      <div className="absolute inset-0 mesh-gradient pointer-events-none opacity-50" />
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-forest-mid/15 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <SlideIn direction="left">
            <SectionIntro
              eyebrow="Free strategy call"
              title="Let's map your"
              highlight="growth system"
              description="Tell us about your trade and market. We'll show you how the full system fits — ads, creative, capture, CRM, follow-up, and reporting. No pressure, no jargon."
              className="!mb-8"
            />

            <StepFlow steps={STEPS} slideFrom="left" />
          </SlideIn>

          <SlideIn direction="right" delay={0.15}>
          <RiseOnScroll offset={20}>
          <div className="value-card rounded-2xl p-8 glow-green border-forest-mid/30">
            {status === "success" ? (
              <div className="py-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full border border-forest-glow/30 flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-forest-glow"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M5 12L10 17L20 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-3">
                    {calendlyUrl ? "One more step — pick your time" : "You're on the list"}
                  </h3>
                  <p className="text-silver-muted text-sm">
                    {calendlyUrl
                      ? "Your details are saved. Choose a slot below for your free strategy call."
                      : "We'll reach out within 24 hours to schedule your strategy call."}
                  </p>
                </div>

                {calendlyUrl ? (
                  <CalendlyBooking
                    calendlyUrl={calendlyUrl}
                    prefill={bookingPrefill ?? undefined}
                    compact
                  />
                ) : null}

                <div className="text-center mt-6">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setStatus("idle");
                      setBookingPrefill(null);
                    }}
                  >
                    Submit another request
                  </Button>
                </div>
              </div>
            ) : calendlyUrl ? (
              <div className="space-y-6">
                <div className="text-center pb-2 border-b border-silver/10">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-forest-glow mb-2">
                    Fastest option
                  </p>
                  <Button
                    type="button"
                    size="lg"
                    emphasis
                    className="w-full"
                    onClick={() => window.location.assign("/book")}
                  >
                    {CTAS.calendar}
                  </Button>
                </div>
                <p className="text-center text-[11px] uppercase tracking-[0.15em] text-silver-dim">
                  Or send a message
                </p>
                <BookCallForm
                  form={form}
                  loading={loading}
                  status={status}
                  errorMessage={errorMessage}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  inputClass={inputClass}
                />
              </div>
            ) : (
              <BookCallForm
                form={form}
                loading={loading}
                status={status}
                errorMessage={errorMessage}
                onChange={handleChange}
                onSubmit={handleSubmit}
                inputClass={inputClass}
              />
            )}
          </div>
          </RiseOnScroll>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}

function BookCallForm({
  form,
  loading,
  status,
  errorMessage,
  onChange,
  onSubmit,
  inputClass,
}: {
  form: FormState;
  loading: boolean;
  status: "idle" | "success" | "error";
  errorMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
  inputClass: string;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs tracking-wider uppercase text-silver-dim mb-2">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={onChange}
            className={inputClass}
            placeholder="Alex Morgan"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs tracking-wider uppercase text-silver-dim mb-2">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={onChange}
            className={inputClass}
            placeholder="alex@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company" className="block text-xs tracking-wider uppercase text-silver-dim mb-2">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={form.company}
            onChange={onChange}
            className={inputClass}
            placeholder="Your company"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs tracking-wider uppercase text-silver-dim mb-2">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={onChange}
            className={inputClass}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs tracking-wider uppercase text-silver-dim mb-2">
          Tell us about your goals
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={onChange}
          className={`${inputClass} resize-none`}
          placeholder="What are you looking to achieve with lead generation?"
        />
      </div>

      {status === "error" && <p className="text-red-400 text-sm">{errorMessage}</p>}

      <Button type="submit" size="lg" emphasis className="w-full" loading={loading}>
        {CTAS.primary}
      </Button>

      <p className="text-silver-dim text-xs text-center">No spam. No sharing your data. Ever.</p>
    </form>
  );
}
