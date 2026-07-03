import type { Metadata } from "next";
import BookingForm from "@/components/booking-form";
import { BOOKING_SERVICES, BOOKING_TIME_SLOTS } from "@/lib/booking-shared";
import { business } from "../../../site-config/business";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description:
    "Book a free website consultation with Harbour Web Studio. Pick a date and time that works for you — we'll confirm by email.",
  alternates: { canonical: "/booking" },
};

function todayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export default function BookingPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 lg:px-8 lg:py-20">
      <div className="text-center motion-fade-up">
        <span className="inline-flex items-center rounded-full border border-[var(--card-border)] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--brand-dark)] shadow-sm">
          {business.heroBadge}
        </span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Book a Free Consultation
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
          Tell us a little about your business and pick a date that works for you.
          We&apos;ll get back to you by email within one business day to confirm.
        </p>
      </div>

      <div className="mt-10 motion-fade-up">
        <BookingForm
          services={BOOKING_SERVICES}
          timeSlots={BOOKING_TIME_SLOTS}
          minDate={todayString()}
        />
      </div>
    </main>
  );
}
