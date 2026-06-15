export const SITE = {
  name: "LUPIN LEADS",
  tagline: "",
  headline: "More Estimates. More Jobs. Less Guesswork.",
  subheadline:
    "LUPIN LEADS helps contractors generate qualified leads through Meta Ads and AI-powered follow-up systems.",
  description:
    "LUPIN LEADS helps contractors generate qualified leads through Meta Ads and AI-powered follow-up systems.",
  cta: "Book A Strategy Call",
  email: "hello@lupinleads.com",
} as const;

export const NAV_LINKS = [
  { label: "How It Works", href: "#features" },
  { label: "Results", href: "#results" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const TRUST_POINTS = [
  { value: "48hr", label: "Typical Launch Time" },
  { value: "< 5 min", label: "Lead Alert Target" },
  { value: "30-day", label: "Satisfaction Guarantee" },
  { value: "1 per market", label: "Territory Exclusivity" },
] as const;

export const FOUNDING_PARTNER = {
  name: "Founding Partner",
  introPrice: 299,
  regularPrice: 499,
  slotsTotal: 5,
  slotsRemaining: 5,
  currency: "CAD" as const,
  description:
    "We're onboarding our first 5 contractor partners across Canada. Lock in founding partner pricing, help shape the platform, and get priority support while we build your lead engine.",
  features: [
    "Everything in Starter",
    "$299 CAD first month, then $499/mo locked in",
    "Meta Ads setup, forms, CRM & follow-up",
    "30-day satisfaction guarantee on management fees",
    "Direct line for feedback — you shape what we build",
    "Case study & testimonial opportunity",
  ],
  terms: [
    "One contractor per trade per market",
    "You pay Meta ad spend directly ($2K–5K/mo typical)",
    "Limited to 5 founding partners total",
  ],
} as const;

export const CASE_STUDIES: readonly {
  client: string;
  industry: string;
  headline: string;
  description: string;
  metrics: readonly { label: string; value: string }[];
}[] = [];

export const TESTIMONIALS: readonly {
  quote: string;
  name: string;
  role: string;
  company: string;
  result: string;
}[] = [];

export const FEATURES = [
  {
    title: "Meta Ads That Convert",
    description:
      "Hyper-targeted Facebook & Instagram campaigns built for homeowners actively searching for contractors in your service area.",
    icon: "target",
  },
  {
    title: "AI Follow-Up System",
    description:
      "Instant SMS and email responses, lead scoring, and next-action recommendations — so no lead goes cold.",
    icon: "bolt",
  },
  {
    title: "Estimate-Ready Leads",
    description:
      "Every lead is qualified with project details, budget signals, and contact info — ready for your sales team.",
    icon: "shield",
  },
  {
    title: "CRM Pipeline Built In",
    description:
      "Drag-and-drop pipeline from new lead to won job. Track every estimate, appointment, and close.",
    icon: "map",
  },
  {
    title: "Executive Reporting",
    description:
      "Monthly PDF reports with leads, cost per lead, close rate, revenue, and ROAS — branded for your business.",
    icon: "chart",
  },
  {
    title: "Dedicated Strategist",
    description:
      "A real person who knows your market, optimizes campaigns weekly, and answers the phone when you call.",
    icon: "users",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "What's the Founding Partner program?",
    answer:
      "We're onboarding our first 5 contractors at $299 CAD for month one, then $499/mo after that — locked in as long as you stay. You get everything in Starter, priority support, and a direct say in how we build the platform. One contractor per trade per market. Book a strategy call to apply.",
  },
  {
    question: "What types of contractors do you work with?",
    answer:
      "We specialize in home services and trades — roofing, remodeling, HVAC, plumbing, electrical, landscaping, fencing, painting, and general contracting. If you sell estimates to homeowners, we can help.",
  },
  {
    question: "How quickly will I start getting leads?",
    answer:
      "Most clients see their first qualified leads within 7–14 days of launch. We handle ad creative, landing pages, and CRM setup so you can focus on selling.",
  },
  {
    question: "What makes your leads different from HomeAdvisor or Angi?",
    answer:
      "Our leads are exclusive to you — not sold to five competitors. They come from Meta Ads targeting homeowners in your area, and our AI system follows up instantly so you beat competitors to the phone.",
  },
  {
    question: "Do I need to manage the ads myself?",
    answer:
      "No. We build, launch, and optimize everything. You get a dedicated strategist, weekly performance updates, and a dashboard to track every lead from first click to closed job.",
  },
  {
    question: "How does the AI follow-up system work?",
    answer:
      "When a lead submits a form, our AI scores them hot, warm, or cold, sends personalized SMS and email responses within minutes, and recommends your next action — call immediately, follow up tomorrow, or send an estimate.",
  },
  {
    question: "What's the minimum contract or commitment?",
    answer:
      "We recommend a 90-day initial engagement to properly optimize campaigns. All plans include a 30-day satisfaction guarantee — if you're not happy, we'll make it right.",
  },
  {
    question: "How much should I budget for ad spend?",
    answer:
      "Most contractors start with $2,000–$5,000/month in Meta ad spend on top of our management fee. We'll recommend a budget based on your market, trade, and revenue goals during your strategy call.",
  },
] as const;

export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 499,
    interval: "month" as const,
    description: "For solo operators and small crews getting started with paid leads.",
    features: [
      "Meta Ads setup & management",
      "Custom lead capture forms",
      "AI follow-up system",
      "CRM pipeline access",
      "Up to $3K ad spend management",
      "Monthly performance report",
      "Email support",
    ],
    highlighted: false,
    stripePriceEnvKey: "STRIPE_PRICE_SCOUT",
  },
  {
    id: "growth",
    name: "Growth",
    price: 699,
    interval: "month" as const,
    description: "For growing contractors ready to scale estimate volume.",
    features: [
      "Everything in Starter",
      "Dedicated strategist",
      "AI lead scoring & SMS drafts",
      "Weekly optimization calls",
      "Up to $8K ad spend management",
      "Branded PDF reports",
      "Priority support",
    ],
    highlighted: true,
    stripePriceEnvKey: "STRIPE_PRICE_ALPHA",
  },
  {
    id: "scale",
    name: "Scale",
    price: 999,
    interval: "month" as const,
    description: "For established companies dominating their market.",
    features: [
      "Everything in Growth",
      "Multi-location campaigns",
      "Custom integrations",
      "Executive reporting suite",
      "Unlimited ad spend management",
      "Slack + phone support",
      "Quarterly strategy sessions",
    ],
    highlighted: false,
    stripePriceEnvKey: "STRIPE_PRICE_PACK",
  },
] as const;
