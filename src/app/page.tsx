import Image from "next/image";
import type { Metadata } from "next";
import { business } from "../../site-config/business";
import { faqs } from "../../site-config/faq";
import { homepageConfig } from "../../site-config/homepage";
import { getLocalBusinessSchema } from "../../site-config/schema";

export const metadata: Metadata = {
  title: homepageConfig.metadata.title,
  description: homepageConfig.metadata.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homepageConfig.metadata.ogTitle,
    description: homepageConfig.metadata.ogDescription,
    url: `${business.siteUrl}/`,
  },
};

const localBusinessSchema = getLocalBusinessSchema(homepageConfig.metadata.description);

const serviceItems = [
  {
    title: "Local Business Websites",
    text: "Professional websites for small businesses that need a clear online presence, strong first impression, and easy contact options.",
  },
  {
    title: "One-Page Landing Pages",
    text: "A simple, focused page for businesses that need to get online quickly with services, contact information, and a clear call to action.",
  },
  {
    title: "Website Redesigns",
    text: "Improve an outdated or confusing website with a cleaner layout, better mobile experience, clearer messaging, and stronger customer flow.",
  },
  {
    title: "Basic Local SEO Setup",
    text: "Set up essential website structure to help search engines understand your business, including page titles, descriptions, sitemap, and local content structure.",
  },
  {
    title: "Google Maps & Contact Setup",
    text: "Make it easier for customers to call, message, find your location, or request a quote directly from your website.",
  },
  {
    title: "Website Maintenance",
    text: "Ongoing website updates are available for businesses that need help changing text, images, pricing, hours, or basic content after launch.",
  },
] as const;

const packageDetails = [
  {
    name: "Starter",
    price: "$799 CAD",
    description: "For small businesses that need a simple, professional online presence.",
    points: [
      "1-page website",
      "Mobile-friendly design",
      "Click-to-call button",
      "Google Maps button",
      "Contact section",
      "Basic SEO title and meta description",
      "1 revision round",
    ],
    bestFor: "Best for new businesses, solo service providers, simple local services, or businesses that need a clean page to share with customers.",
    cta: "Start with Starter",
    featured: false,
  },
  {
    name: "Business",
    price: "$1,499 CAD",
    description: "For businesses that need a more complete local website with clear service pages and stronger customer trust.",
    points: [
      "3–5 pages",
      "Home page",
      "Services page",
      "Pricing or About page",
      "Contact / FAQ page",
      "Google Maps embed",
      "Basic on-page SEO",
      "Sitemap setup",
      "Google Search Console setup",
      "2 revision rounds",
    ],
    bestFor: "Best for local shops, service businesses, restaurants, trades, clinics, rental businesses, and businesses that want a more complete website.",
    cta: "Choose Business",
    featured: true,
  },
  {
    name: "Growth",
    price: "$2,499 CAD",
    description: "For businesses that want a stronger website structure and better local search visibility.",
    points: [
      "5–8 pages",
      "Individual service pages",
      "Location-focused pages",
      "FAQ section",
      "Image optimization",
      "Sitemap setup",
      "Robots.txt setup",
      "Google Search Console setup",
      "Google Business Profile website link support",
      "30 days of small post-launch edits",
    ],
    bestFor: "Best for businesses with multiple services, multiple service areas, or stronger interest in local Google visibility.",
    cta: "Build for Growth",
    featured: false,
  },
] as const;

const maintenancePlans = [
  {
    title: "Basic Updates",
    price: "$99/month",
    text: "For small text, image, pricing, hours, or contact updates.",
  },
  {
    title: "Updates + Content Support",
    price: "$199/month",
    text: "For regular updates plus small content and SEO-related improvements.",
  },
  {
    title: "Local SEO Support",
    price: "$300+/month",
    text: "For businesses that want ongoing support with local pages, search-focused content, and website improvements.",
  },
] as const;

const portfolioItems = [
  {
    title: "Local Rental Website Case Study",
    label: "Local Business Website",
    text: "A mobile-friendly website for a local rental business, designed to help customers quickly view services, pricing, location details, FAQs, and contact information.",
    points: [
      "Homepage structure",
      "Pricing sections",
      "Service-focused layout",
      "FAQ content",
      "Google Maps and contact buttons",
      "Mobile-friendly layout",
      "Basic SEO structure",
    ],
    result: "Built to make the business look more professional online and help customers quickly understand the offer before calling or visiting.",
    cta: "Case Study",
  },
  {
    title: "Sample Auto Detailing Website",
    label: "Concept Project",
    text: "A sample website concept for an auto detailing business that needs to show service packages, pricing, before-and-after photos, location, and quote request options.",
    points: [
      "Service package sections",
      "Ceramic coating / detailing pages",
      "Photo gallery",
      "Quote request form",
      "Google Maps embed",
      "Mobile call button",
      "Basic local SEO setup",
    ],
    result: "Designed to help a local auto service business turn website visitors into quote requests and phone calls.",
    cta: "View Sample",
  },
  {
    title: "Sample Handyman Website",
    label: "Concept Project",
    text: "A simple website concept for a handyman or home repair business, focused on services, trust, service areas, and easy quote requests.",
    points: [
      "Service list",
      "About section",
      "Service area page",
      "FAQ section",
      "Customer trust section",
      "Contact form",
      "Click-to-call button",
    ],
    result: "Designed to make it easier for homeowners to understand available services and request help.",
    cta: "View Sample",
  },
] as const;

const processSteps = [
  "Share your business details, services, pricing, photos, contact information, location, and any existing website or social links.",
  "I organize your information into a clear website structure and prepare the main page sections.",
  "Your website is designed and built with a clean, mobile-friendly layout that fits your business.",
  "You review the website and request changes based on the revision rounds included in your package.",
  "Once approved, the website is launched with the appropriate technical setup depending on the package.",
] as const;

export default function Home() {
  return (
    <main className="pb-20 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <section className="relative overflow-hidden border-b border-white/60 motion-fade-soft">
        <div className="glass-orb motion-float left-[-4rem] top-[5rem] h-40 w-40 bg-[#dceff1]" />
        <div className="glass-orb motion-float right-[6%] top-[3rem] h-28 w-28 bg-[#d8e6fb]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(110,169,176,0.24),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(15,43,87,0.10),transparent_34%)]" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.15fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-3xl space-y-7 motion-fade-up">
            <div className="inline-flex rounded-full border border-[#b8d4d9] bg-white/90 px-4 py-2 text-sm font-semibold text-[var(--brand-dark)] shadow-sm">
              Serving Vancouver, Richmond, and Canadian small businesses.
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[1.05]">
                {business.heroTitle}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                {business.heroSubtitle}
              </p>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                Ideal for restaurants, service businesses, rental shops, trades, clinics, beauty studios, and small local businesses that need a professional online presence without overcomplicating the process.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[var(--brand-dark)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(15,43,87,0.22)] transition hover:-translate-y-0.5 hover:opacity-95"
              >
                Get a Quote
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-full border border-[var(--card-border)] bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
              >
                View Packages
              </a>
            </div>

            <div className="grid gap-4 pt-2 sm:grid-cols-3">
              {homepageConfig.heroStats.map((item) => (
                <div key={item.label} className="hover-lift rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 lg:pl-8 motion-fade-up">
            <div className="hover-lift overflow-hidden rounded-[2rem] border border-white/80 bg-white/95 shadow-[0_25px_70px_rgba(15,23,42,0.10)] backdrop-blur">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[linear-gradient(135deg,#eef7f8_0%,#f8fbfc_45%,#eef3fb_100%)]">
                <div className="absolute inset-0 flex items-center justify-center p-10">
                  <Image
                    src={business.logoPath}
                    alt={`${business.name} logo`}
                    width={260}
                    height={260}
                    className="motion-float h-auto w-full max-w-[220px] object-contain"
                    priority
                  />
                </div>
              </div>
              <div className="p-7">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Core message
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">
                    A clear website helps customers find you, understand your business, and contact you with confidence.
                  </p>
                </div>

                <div className="mt-7 rounded-2xl bg-[var(--brand-soft)] p-5 text-sm leading-7 text-slate-700">
                  Clean, direct, trustworthy websites for local businesses. No bloated features, no messy structure, and no overcomplicated process.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-18 lg:px-8 motion-fade-up">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-dark)]">What We Do</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Websites built to be clear, useful, and easy to launch.
          </h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-slate-600">
            <p>
              A good small business website does not need to be complicated. It needs to clearly show what you offer, where you are located, how customers can contact you, and why they should trust you.
            </p>
            <p>
              Harbour Web Studio helps local businesses create simple, professional websites with clear service information, pricing sections, Google Maps, contact buttons, mobile-friendly layouts, and basic search visibility setup.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {homepageConfig.highlights.map((item) => (
            <div key={item.title} className="hover-lift rounded-[2rem] border border-[var(--card-border)] bg-white p-7 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
              <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-6 py-18 lg:px-8 motion-fade-up">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-dark)]">Services</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Website services for small businesses.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            Whether you need a simple one-page website or a more complete local business website, Harbour Web Studio focuses on practical websites that are easy for customers to use and easy for business owners to maintain.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {serviceItems.map((item) => (
            <div key={item.title} className="hover-lift rounded-[2rem] border border-[var(--card-border)] bg-white p-7 shadow-[0_14px_34px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
              <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 py-18 lg:px-8 motion-fade-up">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-dark)]">Pricing</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Clear website packages for local businesses.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            Every business is different, but most local websites fall into one of the packages below. Each package is designed to help your business look professional, explain your services clearly, and make it easier for customers to contact you.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {packageDetails.map((item) => (
            <div
              key={item.name}
              className={[
                "hover-lift rounded-[2rem] border bg-white p-7 shadow-[0_14px_34px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]",
                item.featured ? "border-[var(--brand)] ring-1 ring-[var(--brand-soft)]" : "border-[var(--card-border)]",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold text-slate-950">{item.name}</h3>
                {item.featured ? (
                  <span className="rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand-dark)]">
                    Recommended
                  </span>
                ) : null}
              </div>
              <p className="mt-5 text-4xl font-bold tracking-tight text-[var(--brand-dark)]">{item.price}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[var(--brand)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                <span className="font-semibold text-slate-900">Best for: </span>
                {item.bestFor}
              </div>
              <a
                href="#contact"
                className={[
                  "mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
                  item.featured
                    ? "bg-[var(--brand-dark)] text-white hover:opacity-95"
                    : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
                ].join(" ")}
              >
                {item.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-18 lg:px-8 motion-fade-up">
        <div className="hover-lift rounded-[2.25rem] border border-[var(--card-border)] bg-[linear-gradient(180deg,#f8fbfc_0%,#eef6f8_100%)] px-8 py-12 shadow-sm">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-dark)]">Maintenance</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Need updates after launch?</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Websites often need small updates after they go live. Harbour Web Studio offers simple monthly maintenance options for businesses that want help keeping their website current.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {maintenancePlans.map((item) => (
              <div key={item.title} className="hover-lift rounded-[2rem] border border-white/90 bg-white/90 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-2xl font-bold text-[var(--brand-dark)]">{item.price}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-600">Maintenance is optional. You can also request one-time updates when needed.</p>
        </div>
      </section>

      <section className="bg-slate-950 py-18 text-white motion-fade-up">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b7d8dd]">Why Choose Harbour Web Studio</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Built for small businesses, not big corporate websites.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
              Many small business websites are either too basic, too confusing, or too expensive. Harbour Web Studio focuses on clean, practical websites that help customers quickly understand your business and take action.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Clear structure", "Your website will be organized around what customers actually need: services, location, pricing, photos, contact options, and trust."],
              ["Local business focus", "The website is designed for real local businesses that rely on phone calls, quote requests, walk-ins, bookings, or customer inquiries."],
              ["Simple process", "You provide your business details, photos, services, and contact information. I help organize everything into a clean, professional website."],
              ["No unnecessary complexity", "You get a website that looks good, works well on mobile, and supports your business goals without bloated features you do not need."],
            ].map(([title, text]) => (
              <div key={title} className="hover-lift rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="mx-auto max-w-6xl px-6 py-18 lg:px-8 motion-fade-up">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-dark)]">Portfolio</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Sample work and website concepts.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            Below are examples of the type of local business websites Harbour Web Studio can create. These projects are designed around clear information, mobile-friendly layouts, customer trust, and simple contact flow.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <div key={item.title} className="hover-lift rounded-[2rem] border border-[var(--card-border)] bg-white p-7 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
              <span className="rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand-dark)]">{item.label}</span>
              <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                {item.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                <span className="font-semibold text-slate-900">Result: </span>{item.result}
              </p>
              <div className="mt-6 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
                {item.cta}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-18 lg:px-8 motion-fade-up">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hover-lift rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-dark)]">Process</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              A simple process from start to launch.
            </h2>
            <div className="mt-8 space-y-5">
              {processSteps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand-dark)] text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hover-lift rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#f8fffd_0%,#eff6ff_100%)] p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Project input</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-950">What to send to get started</h3>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
              <li>1. Logo</li>
              <li>2. Store or business information</li>
              <li>3. Services and pricing</li>
              <li>4. FAQ</li>
              <li>5. Domain</li>
              <li>6. Images</li>
            </ul>
            <div className="mt-8 rounded-2xl bg-white p-5 text-sm leading-7 text-slate-600 shadow-sm">
              Typical client responsibilities include buying the domain, providing logo and business details, providing a Vercel account or approving one created on their behalf, and confirming GitHub repository ownership.
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-6xl px-6 py-18 lg:px-8 motion-fade-up">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-dark)]">FAQ</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Frequently asked questions.
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <div
              key={question}
              className="hover-lift rounded-[2rem] border border-[var(--card-border)] bg-white p-7 shadow-[0_14px_34px_rgba(15,23,42,0.06)]"
            >
              <h3 className="text-lg font-semibold text-slate-950">{question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 lg:px-8 motion-fade-up">
        <div className="hover-lift rounded-[2.25rem] bg-slate-950 px-8 py-14 text-white shadow-[0_30px_80px_rgba(15,23,42,0.30)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b7d8dd]">Contact</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Ready to build a better website for your business?
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                If your business needs a clean, mobile-friendly website that clearly explains your services and makes it easier for customers to contact you, Harbour Web Studio can help.
              </p>
              <div className="mt-6 space-y-2 text-sm text-slate-300">
                <p>Email: hello@yourdomain.com</p>
                <p>Phone/Text: {business.phoneDisplay}</p>
                <p>Location: Vancouver & Richmond, BC</p>
              </div>
              <p className="mt-4 text-sm text-slate-400">
                Tell me a bit about your business, what kind of website you need, and whether you already have photos, pricing, and service information ready.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:hello@yourdomain.com"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-200"
              >
                Get a Quote
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Send a Message
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
