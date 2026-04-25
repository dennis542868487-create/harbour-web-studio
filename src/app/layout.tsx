import Image from "next/image";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import { business } from "../../site-config/business";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.heroTitle} | ${business.name}`,
    template: `%s | ${business.name}`,
  },
  description:
    "Harbour Web Studio builds clean, mobile-friendly websites for local businesses in Vancouver, Richmond, and across Canada.",
  keywords: [
    "web design Vancouver",
    "web design Richmond BC",
    "local business website Canada",
    "small business website design",
    "one page website package",
    "website redesign services",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${business.heroTitle} | ${business.name}`,
    description:
      "Simple websites, clear pricing, Google-friendly setup, and fast delivery for local businesses.",
    url: business.siteUrl,
    siteName: business.name,
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[radial-gradient(circle_at_top,#dceff1_0%,#f8fbfc_24%,#ffffff_60%)] text-slate-900">
        <div className="min-h-screen">
          <SiteHeader />

          {children}

          <footer className="border-t border-slate-200/80 bg-slate-950 text-slate-300">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 text-sm lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
              <div>
                <div className="flex items-center gap-3">
                  <div className="overflow-hidden rounded-[1.2rem] border border-white/10 bg-white p-1 shadow-[0_14px_35px_rgba(15,23,42,0.18)]">
                    <Image
                      src={business.logoPath}
                      alt={`${business.name} logo`}
                      width={72}
                      height={72}
                      className="h-14 w-14 rounded-[0.95rem] object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">{business.name}</p>
                    <p className="text-xs text-slate-400">{business.tagline}</p>
                  </div>
                </div>
                <p className="mt-5 max-w-md leading-7 text-slate-400">
                  {business.heroSubtitle}
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">Contact</p>
                <ul className="mt-4 space-y-3 text-slate-400">
                  <li>{business.addressLine}</li>
                  <li>{business.phoneDisplay}</li>
                  <li>{business.hoursDisplay}</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white">Quick Links</p>
                <ul className="mt-4 space-y-3 text-slate-400">
                  <li><a className="transition hover:text-white" href="#services">Services</a></li>
                  <li><a className="transition hover:text-white" href="#pricing">Pricing</a></li>
                  <li><a className="transition hover:text-white" href="#portfolio">Portfolio</a></li>
                  <li><a className="transition hover:text-white" href="#faq">FAQ</a></li>
                  <li><a className="transition hover:text-white" href="#contact">Contact</a></li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
