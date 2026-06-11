"use client";

import { FormEvent, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WolfCrest } from "@/components/ui/WolfCrest";
import { WolfDivider } from "@/components/ui/WolfDivider";
import { Button } from "@/components/ui/Button";

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

export function BookACall() {
  const [form, setForm] = useState<FormState>(initialForm);
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
    "w-full bg-black-surface border border-silver/15 rounded-sm px-4 py-3 text-foreground placeholder:text-silver-dim text-sm focus:outline-none focus:border-forest-mid/50 focus:ring-1 focus:ring-forest-mid/30 transition-colors";

  return (
    <section id="book-call" className="py-28 bg-black-elevated relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 px-6 lg:px-8">
        <WolfDivider variant="crest" className="max-w-lg mx-auto" />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-forest-mid/10 rounded-full blur-[150px] pointer-events-none" />
      <WolfCrest
        size={300}
        className="absolute -left-16 bottom-8 text-forest-glow/20 pointer-events-none hidden xl:block"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionHeading
              eyebrow="Free Strategy Call"
              title="Book A Strategy Call"
              description="Tell us about your trade, market, and goals. We'll show you exactly how many leads and estimates you can expect — no pitch deck, no pressure."
              align="left"
              ornament={false}
            />

            <div className="space-y-6 text-sm text-silver-muted">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-sm border border-forest-mid/30 flex items-center justify-center text-forest-glow shrink-0">
                  01
                </div>
                <div>
                  <p className="text-foreground font-medium mb-1">Market Analysis</p>
                  <p>We review your service area, competition, and current lead sources.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-sm border border-forest-mid/30 flex items-center justify-center text-forest-glow shrink-0">
                  02
                </div>
                <div>
                  <p className="text-foreground font-medium mb-1">Custom Plan</p>
                  <p>Projected leads, cost per lead, and revenue based on your trade.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-sm border border-forest-mid/30 flex items-center justify-center text-forest-glow shrink-0">
                  03
                </div>
                <div>
                  <p className="text-foreground font-medium mb-1">Launch in 48 Hours</p>
                  <p>If it&apos;s a fit, we launch Meta Ads and your AI follow-up system fast.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-sm p-8 glow-green">
            {status === "success" ? (
              <div className="text-center py-12">
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
                  You&apos;re on the list
                </h3>
                <p className="text-silver-muted">
                  We&apos;ll reach out within 24 hours to schedule your strategy call.
                </p>
                <Button
                  variant="ghost"
                  className="mt-6"
                  onClick={() => setStatus("idle")}
                >
                  Submit another request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    placeholder="What are you looking to achieve with lead generation?"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm">{errorMessage}</p>
                )}

                <Button type="submit" size="lg" className="w-full" loading={loading}>
                  Book A Strategy Call
                </Button>

                <p className="text-silver-dim text-xs text-center">
                  No spam. No sharing your data. Ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
