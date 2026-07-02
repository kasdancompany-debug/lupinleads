export const CTAS = {
  primary: "Book a Strategy Call",
  short: "Book a Call",
  founding: "Apply for Founding Partner Access",
  howItWorks: "See How It Works",
  viewPricing: "View Pricing",
  calendar: "Book on the Calendar",
} as const;

export const SITE = {
  name: "LUPIN LEADS",
  tagline: "Meta ads for contractors · Canada",
  headline: "Turn Meta Ads into booked contractor estimates.",
  headlineLead: "Turn Meta Ads into",
  headlineHighlight: "booked contractor estimates.",
  coreLine: {
    lead: "You're not short on skill.",
    highlight: "You're short on quote requests.",
  },
  heroSubheadline:
    "Facebook and Instagram ads, landing pages, CRM, and follow-up in one place — so quote requests turn into booked estimates on your calendar.",
  heroOneLiner:
    "Facebook and Instagram ads that bring in homeowner quote requests — managed on your account, tracked through booked estimates.",
  heroTrades:
    "Roofers · HVAC · Plumbers · Landscapers · Electricians · General contractors",
  footerTagline:
    "Facebook and Instagram lead generation for Canadian contractors. You own your Meta account and pay ad spend directly.",
  subheadline:
    "Contractor lead generation through Facebook and Instagram ads. You own your Meta account and ad spend.",
  description:
    "Lupin Leads helps Canadian contractors turn Meta ad spend into quote requests, booked estimates, and tracked pipeline — ads, landing pages, CRM, and reporting in one fee.",
  cta: CTAS.primary,
  ctaShort: CTAS.short,
  email: "hello@lupinleads.com",
  typicalAllIn:
    "Typical all-in: $2,300–$5,300/mo (Lupin fee + $2K–5K Meta ad spend on your account).",
  guaranteeShort:
    "Not satisfied in the first 30 days? Full refund on your Lupin management fee.",
} as const;

export const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "What You Get", href: "#what-you-get" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const HERO_BENEFITS = [
  {
    id: "see-leads",
    title: "Quote requests, not noise",
    description:
      "Homeowners submit project details through branded forms — name, phone, and what they need quoted.",
  },
  {
    id: "follow-up",
    title: "Respond while they're hot",
    description:
      "Leads land in your pipeline with follow-up prompts so good inquiries don't sit in voicemail.",
  },
  {
    id: "revenue",
    title: "Know what paid off",
    description:
      "See which ads produced estimates and jobs — not just clicks and likes.",
  },
  {
    id: "contractors",
    title: "Built for local trades",
    description:
      "Set up for busy owners who need booked estimates, not another marketing dashboard to babysit.",
  },
] as const;

export const HERO_TRUST_BULLETS = [
  "Built for contractors",
  "CRM included",
  "Founder-led setup",
] as const;

export const TRADES_SECTION = {
  title: "Built for trades that live and die by",
  highlight: "estimates.",
  description:
    "Whether you need emergency calls, seasonal installs, renovation estimates, or quote requests, Lupin is built to track the path from ad click to booked job.",
  trades: [
    "Plumbers",
    "Roofers",
    "HVAC",
    "Electricians",
    "Landscapers",
    "Renovators",
    "Deck builders",
    "Bathroom remodelers",
  ],
} as const;

export const SAMPLE_MONTH = {
  statusLabel: "Illustrative example",
  period: "Sample month · home remodeling contractor",
  disclaimer:
    "Sample contractor data shown for illustration. Your results depend on market, offer, budget, follow-up speed, and close rate.",
  funnel: [
    { id: "spend", value: "$3,240", label: "Ad spend" },
    { id: "leads", value: "31", label: "Leads" },
    { id: "estimates", value: "14", label: "Estimates booked" },
    { id: "jobs", value: "4", label: "Jobs won" },
    {
      id: "revenue",
      value: "$84,000",
      label: "Closed revenue",
      sample: true,
      highlight: true,
    },
  ],
  efficiency: [
    { id: "cpl", value: "$38", label: "CPL", sample: true },
    { id: "roas", value: "4.6x", label: "ROAS", sample: true },
  ],
} as const;

export const TRUST_GUARANTEES = [
  {
    id: "canadian-owned",
    title: "Canadian contractors",
    description: "Pricing and support built for local trades — not imported playbooks from unrelated industries.",
  },
  {
    id: "home-service",
    title: "Estimate-based trades",
    description: "Roofers, HVAC, plumbers, landscapers, electricians, GCs — if you quote jobs, this is for you.",
  },
  {
    id: "strategist",
    title: "Direct account contact",
    description: "Work with the same strategist on your account — not a rotating call centre that re-reads your file every month.",
  },
  {
    id: "your-leads",
    title: "Exclusive quote requests",
    description:
      "Leads from your ads go only to you. We don't resell names or dump you into a shared inbox with competitors.",
  },
  {
    id: "launch",
    title: "Live in ~48 hours",
    description: "Ads, forms, and pipeline wired together fast — so you're not waiting weeks to see if this works.",
  },
  {
    id: "no-lock-in",
    title: "Your account, your spend",
    description: "Month-to-month management. Ad spend bills to your Meta account. Cancel the fee anytime.",
  },
] as const;

export const PROBLEM_CARDS = [
  {
    title: "Referrals aren't enough",
    description:
      "Word of mouth is great until winter hits or a crew has a slow week. You need a steady pipe of quote requests.",
    icon: "clock",
  },
  {
    title: "DIY ads waste money",
    description:
      "Boosting posts or guessing at targeting burns budget without filling your calendar with real estimates.",
    icon: "spend",
  },
  {
    title: "Shared leads are a race",
    description:
      "Marketplaces like Angi and HomeAdvisor often sell the same homeowner inquiry to multiple contractors at once — so you're competing with several other pros, not owning the lead.",
    icon: "pipeline",
  },
  {
    title: "Good inquiries slip away",
    description:
      "A homeowner fills out a form at 7pm. Nobody calls until Thursday. By then they've booked someone else.",
    icon: "forgot",
  },
] as const;

export const PROBLEM_SECTION = {
  eyebrow: "Sound familiar?",
  title: "You do great work.",
  highlight: "Your calendar doesn't always show it.",
  description:
    "Most contractors don't need another generic agency pitch. They need homeowners in their service area asking for a quote — and a simple way to book the estimate.",
  fixTitle: "Your own demand, on your terms.",
  fixHighlight: "Facebook and Instagram → quote request → booked estimate.",
  fixDescription:
    "Lupin runs Meta ads on your account, captures exclusive quote requests on your forms, and tracks every lead through follow-up and close. You pay Meta directly. We handle the system.",
  fixBullets: [
    "Facebook & Instagram ad management",
    "Branded quote request forms",
    "Lead pipeline & follow-up",
    "Monthly performance reporting",
  ],
} as const;

export const WHAT_YOU_GET_SECTION = {
  eyebrow: "What you get",
  title: "Everything to turn ad spend into",
  highlight: "booked estimates.",
  description:
    "One monthly fee covers Meta ads, landing pages, CRM, follow-up, and reporting. Ad spend stays on your Meta account.",
} as const;

export const WHY_LUPIN_SECTION = {
  eyebrow: "Why Lupin Leads",
  title: "Straight talk.",
  highlight: "No agency fluff.",
  description:
    "We're built for contractors who sell estimates — not e-commerce brands or national franchises. Here's what that means in practice.",
} as const;

export const CONTRACTOR_SALES_TRUST_SECTION = {
  eyebrow: "Trust & proof",
  title: "Built for real",
  highlight: "contractor sales problems.",
  description:
    "No fabricated reviews — just the gaps we see on every strategy call, and how Lupin is built to close them.",
  foundingNote:
    "We're currently accepting founding contractor partners while we build our first public case studies.",
  cards: [
    {
      id: "missed-leads",
      title: "Missed Leads",
      problem:
        "Quote requests land in email, voicemail, or DMs — and disappear when you're on a job site or driving between estimates.",
      solution:
        "Every inquiry from your ads flows into one pipeline with instant alerts — so new leads don't sit unread while a competitor calls back first.",
    },
    {
      id: "slow-follow-up",
      title: "Slow Follow-Up",
      problem:
        "Homeowners often contact two or three contractors. Whoever responds while they're still motivated usually wins the estimate.",
      solution:
        "Leads are prioritized with follow-up templates and draft messages — so your crew can reply in minutes, not the next morning.",
    },
    {
      id: "no-pipeline",
      title: "No Pipeline",
      problem:
        "Without clear stages, you can't tell what's new, quoted, or won — and good jobs quietly fall through the cracks.",
      solution:
        "A simple CRM from first click to booked job — stages, notes, and a client portal so everyone sees the same truth.",
    },
    {
      id: "no-clear-roi",
      title: "No Clear ROI",
      problem:
        "Ad dashboards show clicks and spend, but not which leads became estimates, jobs, or revenue on your calendar.",
      solution:
        "Reporting tied to your pipeline — ad spend, cost per lead, appointments, and closed jobs in one place you can read in five minutes.",
    },
  ],
} as const;

export const FINAL_CTA_SECTION = {
  eyebrow: "Strategy call",
  title: "See if Meta ads can fill your",
  highlight: "estimate calendar.",
  description:
    "Tell us your trade, service area, and how booked you want to be. We'll walk through ad budget, follow-up, and whether a founding partner spot makes sense — no pressure.",
} as const;

export const ONBOARDING_STEPS = [
  {
    id: "connect",
    title: "Connect",
    description:
      "We get access to your Meta business assets or help you set them up.",
    timing: "0–12 hrs",
    icon: "connect",
  },
  {
    id: "build",
    title: "Build",
    description:
      "We create your ads, lead form, CRM pipeline, and reporting dashboard.",
    timing: "12–36 hrs",
    icon: "build",
  },
  {
    id: "launch",
    title: "Launch",
    description:
      "Your campaign goes live with your credit card connected directly to Meta.",
    timing: "36–48 hrs",
    icon: "launch",
  },
  {
    id: "track",
    title: "Track",
    description:
      "Every lead appears in your Lupin dashboard and moves through the pipeline.",
    timing: "Day 1+",
    icon: "track",
  },
  {
    id: "optimize",
    title: "Optimize",
    description:
      "We review performance monthly and improve creative, targeting, and follow-up.",
    timing: "Monthly",
    icon: "optimize",
  },
] as const;

export const FOUNDING_PARTNER = {
  name: "Founding Partner Growth System",
  introPrice: 299,
  regularPrice: 499,
  slotsTotal: 5,
  currency: "CAD" as const,
  description:
    "Meta ads, landing page, CRM, lead tracking, and monthly reporting — built and supported founder-led, from your first strategy call through booked estimates.",
  includes: [
    "Meta Ads setup",
    "Campaign management",
    "Landing page",
    "CRM pipeline",
    "Lead tracking",
    "Monthly reporting",
    "Founder-led support",
  ],
  adSpendNote: "Ad spend is separate and paid directly to Meta.",
  urgencyNote:
    "We're onboarding a limited number of founding contractor partners as we publish our first case studies.",
  footnote:
    "Management fees in CAD plus applicable taxes (e.g. HST). Founding rate locked from month 2. Typical ad spend: $2,000–$5,000/month on your Meta account, depending on market and goals.",
} as const;

export const PRICING_SECTION = {
  eyebrow: "Founding partner offer",
  title: "One fee.",
  highlight: "Booked estimates in mind.",
  description:
    "Starting at $299 for month one — ads, landing pages, CRM, and reporting priced for contractors who need estimate appointments, not another ads-only retainer.",
} as const;

export const PRICING_COMPARISON_DISCLAIMER =
  "Comparisons reflect typical setups we see with contractors. DIY results, agency packages, and marketplace lead programs vary by provider and market.";

export const AGENCY_COMPARISON_SECTION = {
  eyebrow: "The difference",
  title: "Most agencies stop at the click.",
  highlight: "We build the system after it.",
  description:
    "Leads only matter if they turn into conversations, estimates, and booked jobs.",
  disclaimer:
    "Many agencies run strong ad campaigns — this compares what usually happens after the click. Setups vary by provider and market.",
  columns: {
    typical: {
      name: "Typical Ad Agency",
      tagline: "Ads & reports",
    },
    lupin: {
      name: "Lupin Leads",
      tagline: "Ads + CRM + estimates",
    },
  },
  rows: [
    { label: "Runs Facebook/Instagram ads", typical: true, lupin: true },
    { label: "Builds dedicated landing pages", typical: "partial", lupin: true },
    { label: "Includes CRM pipeline", typical: false, lupin: true },
    { label: "Tracks every lead", typical: "partial", lupin: true },
    { label: "Shows booked estimates", typical: false, lupin: true },
    { label: "Provides simple reporting", typical: "partial", lupin: true },
    { label: "Helps improve follow-up", typical: false, lupin: true },
    { label: "Built for contractors", typical: false, lupin: true },
    { label: "Founder-led service", typical: false, lupin: true },
  ],
} as const;

/** Update status to "claimed" when a spot is sold — labels and counts update sitewide. */
export type FoundingPartnerSpotStatus = "open" | "claimed";

export type FoundingPartnerSpot = {
  id: number;
  label: string;
  status: FoundingPartnerSpotStatus;
};

export const FOUNDING_PARTNER_SPOTS: FoundingPartnerSpot[] = [
  { id: 1, label: "Spot 1", status: "open" },
  { id: 2, label: "Spot 2", status: "open" },
  { id: 3, label: "Spot 3", status: "open" },
  { id: 4, label: "Spot 4", status: "open" },
  { id: 5, label: "Spot 5", status: "open" },
];

export type CaseStudyStatus = "published" | "sample" | "pending";

export type CaseStudyMetric = {
  value: string;
  label: string;
  highlight?: boolean;
};

export type CaseStudy = {
  id: string;
  client: string;
  trade: string;
  market: string;
  period: string;
  summary: string;
  metrics: readonly CaseStudyMetric[];
  status: CaseStudyStatus;
  statusLabel: string;
  featured?: boolean;
};

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: "sample-remodeling-gta",
    client: "Sample Contractor",
    trade: "Home Remodeling",
    market: "GTA West",
    period: "First 90 days",
    summary:
      "Illustrative results from a representative Lupin workflow — Meta Ads through CRM to closed jobs. Founding partner case studies will publish here with client approval and dashboard data.",
    status: "sample",
    statusLabel: "Illustrative example",
    featured: true,
    metrics: [
      { value: "17", label: "Qualified Leads" },
      { value: "8", label: "Appointments" },
      { value: "4", label: "Jobs Won" },
      { value: "$18,000", label: "Revenue Generated", highlight: true },
    ],
  },
  {
    id: "founding-slot-2",
    client: "Founding Partner",
    trade: "Your trade",
    market: "Your market",
    period: "—",
    summary:
      "Reserved for a founding partner ready to document real campaign results — leads, appointments, jobs won, and revenue from your Lupin dashboard.",
    status: "pending",
    statusLabel: "Case study pending",
    metrics: [
      { value: "—", label: "Qualified Leads" },
      { value: "—", label: "Appointments" },
      { value: "—", label: "Jobs Won" },
      { value: "—", label: "Revenue Generated" },
    ],
  },
  {
    id: "founding-slot-3",
    client: "Founding Partner",
    trade: "Your trade",
    market: "Your market",
    period: "—",
    summary:
      "Second open slot for a contractor who wants the full system and optional published results with their sign-off.",
    status: "pending",
    statusLabel: "Case study pending",
    metrics: [
      { value: "—", label: "Qualified Leads" },
      { value: "—", label: "Appointments" },
      { value: "—", label: "Jobs Won" },
      { value: "—", label: "Revenue Generated" },
    ],
  },
] as const;

export const PRICING_COMPARISON = {
  columns: [
    {
      id: "diy",
      name: "DIY Meta Ads",
      tagline: "Guesswork",
      subtitle: "You run ads yourself",
      highlighted: false,
    },
    {
      id: "agency",
      name: "Generic Agency",
      tagline: "Ads only",
      subtitle: "Management fee, limited stack",
      highlighted: false,
    },
    {
      id: "lupin",
      name: "Lupin Leads",
      tagline: "Full system",
      subtitle: "Ads + CRM + follow-up + reporting",
      highlighted: true,
    },
  ],
  rows: [
    { label: "Meta Ads setup & management", diy: "partial", agency: true, lupin: true },
    { label: "Custom ad creative", diy: false, agency: "partial", lupin: true },
    { label: "Lead capture forms", diy: false, agency: false, lupin: true },
    { label: "CRM pipeline", diy: false, agency: false, lupin: true },
    { label: "AI follow-up assistant", diy: false, agency: false, lupin: true },
    { label: "Monthly performance report", diy: false, agency: "partial", lupin: true },
    { label: "Click-to-closed job tracking", diy: false, agency: false, lupin: true },
  ],
} as const;

export const TESTIMONIALS: readonly {
  quote: string;
  name: string;
  role: string;
  company: string;
  result: string;
}[] = [];

export const FEATURES = [
  {
    title: "Facebook & Instagram Ads",
    description:
      "Campaigns built for your trade and service area — set up, managed, and optimized on your own Meta account.",
    icon: "target",
  },
  {
    title: "Custom Ad Creative",
    description:
      "Copy and visuals tailored to your brand and offer. Creative is included — not a separate line item.",
    icon: "bolt",
  },
  {
    title: "Quote Request Forms",
    description:
      "Branded forms capture project details and contact info. Every inquiry is exclusive to you — never resold.",
    icon: "shield",
  },
  {
    title: "Lead Pipeline",
    description:
      "Every quote request from first click to won job in one place — stages, notes, and follow-ups your team can actually use.",
    icon: "map",
  },
  {
    title: "Follow-Up Support",
    description:
      "Leads scored and prioritized with draft texts and emails — so your crew responds while the homeowner is still interested.",
    icon: "users",
  },
  {
    title: "Monthly Reporting",
    description:
      "Clear numbers on quote requests, cost per lead, and closed jobs — tied to real pipeline data, not guesswork.",
    icon: "chart",
  },
] as const;

export const HOW_IT_WORKS_SECTION = {
  eyebrow: "How it works",
  title: "Five steps from",
  highlight: "call to booked estimates.",
  description:
    "We learn your trade and market, build your ads and pipeline, then improve what fills your estimate calendar — not just what looks good in a dashboard.",
} as const;

export const HOW_IT_WORKS_STEPS = [
  {
    id: "strategy-call",
    title: "Strategy Call",
    description:
      "We learn your trade, service area, offer, and current sales process.",
    icon: "call",
  },
  {
    id: "campaign-setup",
    title: "Campaign Setup",
    description:
      "We build the Meta Ads, landing page, tracking, and lead capture flow.",
    icon: "build",
  },
  {
    id: "lead-pipeline",
    title: "Lead Pipeline",
    description: "Every lead enters your CRM so nothing gets lost.",
    icon: "pipeline",
  },
  {
    id: "follow-up-system",
    title: "Follow-Up System",
    description:
      "You can track calls, messages, estimates, and booked jobs.",
    icon: "followup",
  },
  {
    id: "monthly-optimization",
    title: "Monthly Optimization",
    description:
      "We improve the ads and pipeline based on what is actually converting.",
    icon: "optimize",
  },
] as const;

/** @deprecated Use HOW_IT_WORKS_STEPS — kept for GrowthJourneyFlow */
export const HOW_IT_WORKS_JOURNEY = [
  {
    id: "meta-ads",
    title: "We run your ads",
    description:
      "Facebook and Instagram campaigns built for your trade and service area — on your Meta account, your ad spend.",
  },
  {
    id: "quote-request",
    title: "Homeowner requests a quote",
    description:
      "Branded forms capture project details, contact info, and timing. Every inquiry is yours alone.",
  },
  {
    id: "book-estimate",
    title: "You book the estimate",
    description:
      "Leads hit your pipeline with follow-up prompts. Your team calls, texts, and gets a time on the calendar.",
  },
  {
    id: "track-results",
    title: "Track what closed",
    description:
      "See which ads produced quote requests, estimates, and jobs — so you know where to put budget next month.",
  },
] as const;

export const FOUNDER_LED_SECTION = {
  eyebrow: "Founder-led",
  title: "Founder-led,",
  highlight: "not handed off.",
  description:
    "Lupin Leads is run directly by Dan — not a junior media buyer, account coordinator, or outsourced fulfilment team you'll never meet.",
  paragraphs: [
    "When you work with Lupin, you get one operator building your ads, landing pages, CRM, reporting, and follow-up — tuned for how contractors actually book estimates.",
    "No handoffs to a white-label agency. No mystery about who's reading your lead data or adjusting your campaigns. You know exactly who you're working with.",
  ],
  founder: {
    name: "Dan",
    role: "Founder · Lupin Leads",
    /** Drop a headshot at this path to replace the placeholder frame. */
    photoSrc: null as string | null,
    /** Optional intro video URL — enables play overlay on the media frame. */
    videoUrl: null as string | null,
  },
  stack: [
    {
      title: "Meta ads & creative",
      description: "Campaigns, targeting, and creative built for your trade and service area.",
    },
    {
      title: "Landing pages & forms",
      description: "Branded quote flows that capture name, phone, and project details.",
    },
    {
      title: "CRM & pipeline",
      description: "Every lead in one place — stages, notes, and client portal access.",
    },
    {
      title: "Reporting dashboard",
      description: "Spend, cost per lead, and pipeline activity you can actually read.",
    },
    {
      title: "Follow-up systems",
      description: "Templates and workflows so quote requests don't die in the inbox.",
    },
  ],
} as const;

export const BUILDER_CREDIBILITY = {
  eyebrow: "Behind Lupin",
  title: "Built By Someone Who Lives This Every Day.",
  paragraphs: [
    "Lupin wasn't built in a boardroom. It came from running campaigns, answering leads, and watching capable contractors lose jobs because follow-up was slow or scattered across inboxes.",
    "I've spent years in paid marketing — writing ads, reading form submissions, and learning which leads are worth a call. I've also run businesses where payroll, reputation, and a slow winter month matter more than a slide deck.",
    "Local contractors don't need another agency pitch. They need someone who understands that a lead on Tuesday affects your crew schedule on Thursday — and that ad spend feels personal when it's your account and your money.",
    "That's why Lupin is a working system: your Meta account, your pipeline, your reporting. Built the way I'd want it if I were in your chair.",
  ],
  pillars: [
    {
      title: "Paid marketing",
      body: "Meta campaigns run hands-on — targeting, creative, and spend reviewed regularly, not handed off and forgotten.",
    },
    {
      title: "Lead generation",
      body: "Forms and follow-up designed around how homeowners actually inquire — not shared lists or race-to-call chaos.",
    },
    {
      title: "Business ownership",
      body: "Recommendations weighed against payroll, seasonality, and cash flow — not vanity metrics on a monthly report.",
    },
    {
      title: "Local markets",
      body: "Realistic ad budgets for your trade and service area. An honest conversation before you commit to anything.",
    },
  ],
  pullQuote:
    "Hiring marketing help shouldn't feel like gambling. You should know what you're buying — and who you're working with.",
  assurance: [
    "The strategy call is a conversation, not a pressure close.",
    "We'll tell you plainly if Lupin isn't the right fit for your market or trade.",
    "Pricing and founding partner terms are on the page — no surprises on the call.",
  ],
} as const;

export const FAQ_ITEMS = [
  {
    question: "What is the Founding Partner Growth System?",
    answer:
      "$299 CAD plus applicable taxes for your first month, then $499/mo plus applicable taxes locked in. Includes Meta Ads setup, campaign management, landing page, CRM pipeline, lead tracking, monthly reporting, and founder-led support.",
  },
  {
    question: "Why shouldn't I just hire a regular Facebook Ads agency?",
    answer:
      "Most agencies focus only on clicks and leads. Lupin Leads includes the landing page, CRM, pipeline, tracking, and follow-up visibility so you can see what happens after the lead comes in.",
  },
  {
    question: "Is ad spend included?",
    answer:
      "No. The monthly fee covers the system and management. Ad spend is paid separately and directly to Meta.",
  },
  {
    question: "Do I need a website?",
    answer: "No. Lupin can use dedicated landing pages built for your campaign.",
  },
  {
    question: "What kinds of contractors is this for?",
    answer:
      "Home service and local contractors such as roofers, HVAC, plumbers, landscapers, electricians, cleaners, painters, and similar service businesses.",
  },
  {
    question: "What happens after a lead comes in?",
    answer:
      "The lead enters your CRM pipeline so you can track contact attempts, estimates, follow-up, and booked jobs.",
  },
  {
    question: "How is this different from HomeAdvisor or Angi?",
    answer:
      "Marketplaces like Angi and HomeAdvisor typically match one homeowner inquiry to multiple contractors at once. Lupin builds demand through your ads and delivers quote requests to you alone — not a shared inbox where competitors bought the same contact.",
  },
  {
    question: "How fast can we launch?",
    answer:
      "Most accounts go live in about 48 hours — ads, landing page, and pipeline connected. Timing depends on Meta access and creative approvals.",
  },
  {
    question: "What does the 30-day guarantee cover?",
    answer:
      "If you're not satisfied with our management in the first 30 days, we refund your Lupin fee. Ad spend you've paid to Meta stays on your account.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No. Founding partner pricing is month-to-month after the first month. Cancel the management fee anytime. Your Meta account and leads stay yours.",
  },
] as const;

export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Growth System",
    price: 499,
    interval: "month" as const,
    description: "The complete contractor growth system — your low-risk starting point.",
    features: [
      "Meta Ads setup and management",
      "Custom ad creative",
      "Lead capture forms",
      "CRM pipeline",
      "AI follow-up assistant",
      "Monthly performance report",
      "30-day satisfaction guarantee",
    ],
    highlighted: true,
    stripePriceEnvKey: "STRIPE_PRICE_SCOUT",
  },
  {
    id: "growth",
    name: "Growth",
    price: 699,
    interval: "month" as const,
    description: "For contractors ready to scale estimate volume with hands-on strategy.",
    features: [
      "Everything in Starter",
      "Dedicated strategist",
      "Weekly campaign optimization",
      "AI SMS & email drafts",
      "Branded PDF executive reports",
      "Priority support",
      "Click-to-closed job tracking",
    ],
    highlighted: false,
    stripePriceEnvKey: "STRIPE_PRICE_ALPHA",
  },
  {
    id: "scale",
    name: "Scale",
    price: 999,
    interval: "month" as const,
    description: "For established companies running serious ad spend across markets.",
    features: [
      "Everything in Growth",
      "Multi-location campaigns",
      "Custom integrations",
      "Executive reporting suite",
      "Quarterly strategy sessions",
      "Slack + phone support",
      "Dedicated account lead",
    ],
    highlighted: false,
    stripePriceEnvKey: "STRIPE_PRICE_PACK",
  },
] as const;
