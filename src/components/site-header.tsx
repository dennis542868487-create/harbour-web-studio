import Image from "next/image";
import Link from "next/link";
import { business } from "../../site-config/business";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/82 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/74">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2.5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-3.5">
        <div className="flex items-center gap-3 lg:gap-3.5">
          <Link href="/" className="overflow-hidden rounded-[1.2rem] border border-[var(--card-border)] bg-white p-1 shadow-[0_14px_35px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5">
            <Image
              src={business.logoPath}
              alt={`${business.name} logo`}
              width={72}
              height={72}
              className="h-10 w-10 rounded-[0.95rem] object-cover sm:h-12 sm:w-12 lg:h-14 lg:w-14"
              priority
            />
          </Link>
          <div className="min-w-0">
            <Link href="/" className="block truncate text-[15px] font-bold tracking-tight text-slate-950 sm:text-base lg:text-lg">
              {business.name}
            </Link>
            <p className="text-[11px] leading-4 text-slate-500 lg:text-xs">{business.tagline}</p>
          </div>
        </div>

        <nav className="grid grid-cols-5 gap-1 text-center text-xs font-medium text-slate-600 sm:flex sm:flex-nowrap sm:items-center sm:gap-1.5 sm:text-sm lg:gap-2 lg:text-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="btn-light rounded-xl px-2 py-2 text-xs font-medium sm:rounded-full sm:px-3 sm:py-2 sm:text-sm lg:px-4 lg:py-2.5 lg:text-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
