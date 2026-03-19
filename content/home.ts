// ─── Hero ───────────────────────────────────────────────────────────────────
export type HeroContent = {
  badgeInner: string;
  badgeOuter: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  heroImageLight: string;
  heroImageDark: string;
  heroImageAlt: string;
};

// ─── Sponsors ───────────────────────────────────────────────────────────────
export type SponsorItem = { icon: string; name: string };
export type SponsorsContent = {
  heading: string;
  items: SponsorItem[];
};

// ─── Benefits ───────────────────────────────────────────────────────────────
export type BenefitItem = { icon: string; title: string; description: string };
export type BenefitsContent = {
  eyebrow: string;
  heading: string;
  description: string;
  items: BenefitItem[];
};

// ─── Feature Grid ───────────────────────────────────────────────────────────
export type FeatureItem = { icon: string; title: string; description: string };
export type FeaturesContent = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  items: FeatureItem[];
};

// ─── Services ───────────────────────────────────────────────────────────────
export type ServiceItem = { title: string; description: string; pro: boolean };
export type ServicesContent = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  items: ServiceItem[];
};

// ─── Testimonials ───────────────────────────────────────────────────────────
export type TestimonialItem = {
  image: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
};
export type TestimonialsContent = {
  eyebrow: string;
  heading: string;
  reviews: TestimonialItem[];
};

// ─── Team ───────────────────────────────────────────────────────────────────
export type SocialLink = { name: string; url: string };
export type TeamMember = {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialLink[];
};
export type TeamContent = {
  eyebrow: string;
  heading: string;
  members: TeamMember[];
};

// ─── Pricing ────────────────────────────────────────────────────────────────
export type PricingPlan = {
  title: string;
  popular: boolean;
  price: number;
  description: string;
  buttonText: string;
  benefits: string[];
};
export type PricingContent = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  priceSuffix: string;
  plans: PricingPlan[];
};

// ─── Contact ────────────────────────────────────────────────────────────────
export type ContactInfoBlock = { label: string; value: string | string[] };
export type ContactContent = {
  eyebrow: string;
  heading: string;
  description: string;
  mailtoAddress: string;
  info: {
    address: ContactInfoBlock;
    phone: ContactInfoBlock;
    email: ContactInfoBlock;
    hours: ContactInfoBlock;
  };
  formSubjects: string[];
  formSubmitLabel: string;
};

// ─── FAQ ────────────────────────────────────────────────────────────────────
export type FaqItem = { question: string; answer: string };
export type FaqContent = {
  eyebrow: string;
  heading: string;
  items: FaqItem[];
};

// ─── Footer ─────────────────────────────────────────────────────────────────
export type FooterLink = { label: string; href: string };
export type FooterColumn = { heading: string; links: FooterLink[] };
export type FooterContent = {
  brandName: string;
  columns: FooterColumn[];
  copyright: string;
  attribution: { label: string; href: string };
};

// ─── Navbar ─────────────────────────────────────────────────────────────────
export type NavRoute = { href: string; label: string };
export type NavFeature = { title: string; description: string };
export type NavbarContent = {
  brandName: string;
  routes: NavRoute[];
  featureDropdownLabel: string;
  featureImage: { src: string; alt: string };
  features: NavFeature[];
  signInLabel: string;
  signUpLabel: string;
  dashboardLabel: string;
  githubLink: { href: string; ariaLabel: string };
};

// ─── Root ───────────────────────────────────────────────────────────────────
export type HomeContent = {
  hero: HeroContent;
  sponsors: SponsorsContent;
  benefits: BenefitsContent;
  features: FeaturesContent;
  services: ServicesContent;
  testimonials: TestimonialsContent;
  team: TeamContent;
  pricing: PricingContent;
  contact: ContactContent;
  faq: FaqContent;
  footer: FooterContent;
  navbar: NavbarContent;
};

// ─── Defaults ───────────────────────────────────────────────────────────────

export const defaultHomeContent: HomeContent = {
  // ── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    badgeInner: "CRM",
    badgeOuter: "LeadNest powers your growth",
    titleBefore: "Grow Your Business with",
    titleHighlight: "LeadNest",
    titleAfter: "",
    subtitle: "The smart CRM that helps you track leads, manage contacts, and close more deals—fast.",
    primaryCta: { label: "Get Started Free", href: "#pricing" },
    secondaryCta: { label: "Explore features", href: "#features" },
    heroImageLight: "/hero-image-light.jpeg",
    heroImageDark: "/hero-image-dark.jpeg",
    heroImageAlt: "LeadNest dashboard preview",
  },

  // ── Sponsors ─────────────────────────────────────────────────────────────
  sponsors: {
    heading: "Built with trusted tools",
    items: [
      { icon: "Crown", name: "Vercel" },
      { icon: "Vegan", name: "Stripe" },
      { icon: "Ghost", name: "OpenAI" },
      { icon: "Puzzle", name: "Supabase" },
      { icon: "Squirrel", name: "Clerk" },
      { icon: "Cookie", name: "Resend" },
      { icon: "Drama", name: "Sentry" },
    ],
  },

  // ── Benefits ─────────────────────────────────────────────────────────────
  benefits: {
    eyebrow: "Why LeadNest",
    heading: "A smart CRM for your growing team",
    description:
      "Designed for small businesses and sales teams ready to build relationships and accelerate revenue with less hassle.",
    items: [
      {
        icon: "Blocks",
        title: "Organized & Simple",
        description: "Keep contacts, deals, and activities neat—no more sticky notes or scattered sheets.",
      },
      {
        icon: "LineChart",
        title: "Track Progress Easily",
        description: "Monitor your pipeline and never lose sight of a hot lead or critical follow-up.",
      },
      {
        icon: "Wallet",
        title: "Affordable & Modern",
        description: "Get powerful CRM tools without the enterprise price tag or legacy clutter.",
      },
      {
        icon: "Sparkle",
        title: "Instant Insights",
        description: "Smart dashboards and reminders help you and your team stay one step ahead.",
      },
    ],
  },

  // ── Features ─────────────────────────────────────────────────────────────
  features: {
    eyebrow: "Everything Your Team Needs",
    heading: "Everything Your Team Needs in a CRM",
    subtitle: "LeadNest brings together the essential CRM tools for modern teams—organized, intuitive, and ready to help you close more deals.",
    items: [
      {
        icon: "TabletSmartphone",
        title: "Organize contacts and companies in one place",
        description: "Centralized, searchable, and easy to update—your database of relationships built for teamwork.",
      },
      {
        icon: "Goal",
        title: "Track deals through every stage of your sales pipeline",
        description: "Visualize and manage deals as they move from lead to win, with a clean, customizable pipeline view.",
      },
      {
        icon: "Users",
        title: "Collaborate with your team and never miss a follow-up",
        description: "Assign contacts and deals, share notes, and set reminders so nothing gets lost.",
      },
      {
        icon: "LineChart",
        title: "Simple, modern dashboard for instant insights",
        description: "One glance gives you clarity on your team’s progress, recent activity, and sales stats.",
      },
    ],
  },

  // ── Services ─────────────────────────────────────────────────────────────
  services: {
    eyebrow: "Services",
    heading: "LeadNest Capabilities",
    subtitle:
      "Your competitive edge—quick setup, reliable infrastructure, and features that work for teams of any size.",
    items: [
      { title: "Contact Management", description: "Store, edit, and search your leads and customers with ease.", pro: false },
      { title: "Deals & Pipeline", description: "Track every deal step and stage. Celebrate more wins.", pro: false },
      { title: "Team Collaboration", description: "Invite teammates, assign deals, and keep everyone aligned.", pro: false },
      { title: "Dashboard Analytics", description: "Visualize sales, pipeline health, and team performance.", pro: true },
    ],
  },

  // ── Testimonials ─────────────────────────────────────────────────────────
  testimonials: {
    eyebrow: "Why Sales Teams Love LeadNest",
    heading: "Why Sales Teams Love LeadNest",
    reviews: [
      { image: "/demo-img.jpg", name: "Aarav Shah", role: "Founder, FinchFlow", comment: "LeadNest makes it easy to stay on top of deals and translate conversations into revenue.", rating: 5.0 },
      { image: "/demo-img.jpg", name: "Maya Patel", role: "Sales Manager, OrbitDesk", comment: "Our team loves how quick it is to assign contacts, log calls, and see our pipeline progress.", rating: 4.9 },
      { image: "/demo-img.jpg", name: "Emma Brooks", role: "Head of Growth, Nimbus", comment: "The daily reminders and dashboard summaries keep us sharp and sales-focused.", rating: 5.0 },
      { image: "/demo-img.jpg", name: "Daniel Kim", role: "CS Lead, PulseOps", comment: "Getting started was instant—no training required, but tons of productivity gained.", rating: 5.0 },
      { image: "/demo-img.jpg", name: "Sofia Green", role: "Founder, LaunchPad AI", comment: "LeadNest keeps our workflow smooth and our customer details organized. Highly recommend!", rating: 4.9 },
    ],
  },

  // ── Team ─────────────────────────────────────────────────────────────────
  team: {
    eyebrow: "Team",
    heading: "Built for teams by teams",
    members: [
      {
        imageUrl: "/team1.jpg",
        firstName: "Chirag",
        lastName: "Dodiya",
        positions: ["Founder", "Product & Growth"],
        socialNetworks: [
          { name: "LinkedIn", url: "https://www.linkedin.com/in/chiragdodiya/" },
          { name: "X", url: "https://x.com/chiragdodiya" },
        ],
      },
      // Feel free to add other team members if needed.
    ],
  },

  // ── Pricing ──────────────────────────────────────────────────────────────
  pricing: {
    eyebrow: "Pricing",
    heading: "Simple plans for growing teams",
    subtitle: "Start free—upgrade with your business. No credit card required.",
    priceSuffix: "/month",
    plans: [
      {
        title: "Starter",
        popular: false,
        price: 0,
        description: "Try LeadNest for free with unlimited contacts and basic deal tracking.",
        buttonText: "Get Started Free",
        benefits: ["Unlimited contacts", "Basic pipeline", "Team collaboration", "Essential reports", "Email support"],
      },
      {
        title: "Growth",
        popular: true,
        price: 39,
        description: "For sales teams growing their customer base and wanting more analytics.",
        buttonText: "Start 14-day trial",
        benefits: ["Advanced analytics", "Deal forecasting", "Calendar integration", "Priority support", "Custom fields"],
      },
      {
        title: "Enterprise",
        popular: false,
        price: 129,
        description: "Tailored to larger teams needing integrations, API access, and support SLAs.",
        buttonText: "Contact sales",
        benefits: ["API & Integrations", "Custom onboarding", "SSO support", "Dedicated CSM", "99.9% uptime SLA"],
      },
    ],
  },

  // ── Contact ──────────────────────────────────────────────────────────────
  contact: {
    eyebrow: "Contact",
    heading: "Connect with the LeadNest Team",
    description:
      "Questions, support, or demo requests? We'd love to help you succeed with LeadNest.",
    mailtoAddress: "chirag@bidx.ai",
    info: {
      address: { label: "Find us", value: "Remote-first • Mumbai, India" },
      phone: { label: "Call us", value: "" },
      email: { label: "Email us", value: "chirag@bidx.ai" },
      hours: { label: "Hours", value: ["Monday - Friday", "10AM - 6PM IST"] },
    },
    formSubjects: ["Product Demo", "Sales Inquiry", "Integration Support", "Pricing FAQ", "Other"],
    formSubmitLabel: "Send message",
  },

  // ── FAQ ──────────────────────────────────────────────────────────────────
  faq: {
    eyebrow: "FAQ",
    heading: "LeadNest Basics",
    items: [
      { question: "How do I get started?", answer: "Just sign up for free and you’ll be managing your leads in minutes." },
      { question: "Is LeadNest really free?", answer: "Yep—our Starter Plan is free forever, no credit card required." },
      { question: "Can I upgrade or downgrade at any time?", answer: "Absolutely! Plans are flexible and you’re in control." },
      { question: "How secure is my data?", answer: "Security is our priority. Your CRM data is encrypted and access-controlled." },
      { question: "Who do I contact for support?", answer: "Message us directly from your dashboard or email chirag@bidx.ai." },
    ],
  },

  // ── Footer ───────────────────────────────────────────────────────────────
  footer: {
    brandName: "LeadNest",
    columns: [
      {
        heading: "Contact",
        links: [
          { label: "chirag@bidx.ai", href: "mailto:chirag@bidx.ai" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/chiragdodiya/" },
          { label: "X", href: "https://x.com/chiragdodiya" },
        ],
      },
      {
        heading: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        heading: "Help",
        links: [
          { label: "Contact Us", href: "#contact" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        heading: "Socials",
        links: [
          { label: "LinkedIn", href: "https://www.linkedin.com/in/chiragdodiya/" },
          { label: "X", href: "https://x.com/chiragdodiya" },
        ],
      },
    ],
    copyright: "\u00a9 2026 LeadNest CRM.",
    attribution: { label: "Built on Next.js", href: "https://nextjs.org" },
  },

  // ── Navbar ───────────────────────────────────────────────────────────────
  navbar: {
    brandName: "LeadNest",
    routes: [
      { href: "/#features", label: "Features" },
      { href: "/#testimonials", label: "Testimonials" },
      { href: "/#team", label: "Team" },
      { href: "/#contact", label: "Contact" },
      { href: "/#faq", label: "FAQ" },
    ],
    featureDropdownLabel: "Features",
    featureImage: { src: "/demo-img.jpg", alt: "LeadNest dashboard preview" },
    features: [
      { title: "Contact Management", description: "All your leads and contacts organized in a single, searchable space." },
      { title: "Deals & Pipeline", description: "Visual pipeline stages and easy deal tracking from start to close." },
      { title: "Collaboration", description: "Assign, share, and keep everyone on the same page." },
    ],
    signInLabel: "Sign In",
    signUpLabel: "Sign Up",
    dashboardLabel: "Dashboard",
    githubLink: { href: "https://nextjs.org/docs", ariaLabel: "View on GitHub" },
  },
};

export const homeContent: HomeContent = defaultHomeContent;

// Keep this function export for backward compatibility with older imports.
// Primary consumers should import `homeContent` directly.
export function getHomeContent(): HomeContent {
  return homeContent;
}