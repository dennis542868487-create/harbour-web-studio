"use client";

import { useActionState } from "react";
import { createBooking, type BookingFormState } from "@/app/booking/actions";
import { formatTimeSlot } from "@/lib/booking-shared";

const initialState: BookingFormState = { status: "idle" };

type Props = {
  services: readonly string[];
  timeSlots: readonly string[];
  minDate: string;
};

const inputClass =
  "w-full rounded-2xl border border-[var(--card-border)] bg-white px-4 py-3 text-sm text-slate-900 shadow-[0_6px_18px_rgba(15,23,42,0.04)] outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-soft)]";

const labelClass = "mb-1.5 block text-sm font-semibold text-slate-800";

export default function BookingForm({ services, timeSlots, minDate }: Props) {
  const [state, formAction, pending] = useActionState(createBooking, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-3xl border border-[var(--card-border)] bg-white p-8 text-center shadow-[0_18px_45px_rgba(15,23,42,0.08)] motion-fade-up">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-soft)] text-2xl">
          ✓
        </div>
        <h2 className="mt-4 text-xl font-bold text-slate-950">Booking request received!</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Thanks for reaching out. We&apos;ll review your request and get back to you
          by email within one business day to confirm your consultation.
        </p>
        <a href="/" className="btn-dark mt-6 px-6 py-3 text-sm font-semibold">
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-3xl border border-[var(--card-border)] bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(604) 000-0000"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="service" className={labelClass}>
            Service you&apos;re interested in
          </label>
          <select id="service" name="service" defaultValue="" className={inputClass}>
            <option value="">Select a service…</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="booking_date" className={labelClass}>
            Preferred date <span className="text-rose-500">*</span>
          </label>
          <input
            id="booking_date"
            name="booking_date"
            type="date"
            required
            min={minDate}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="booking_time" className={labelClass}>
            Preferred time
          </label>
          <select id="booking_time" name="booking_time" defaultValue="" className={inputClass}>
            <option value="">Any time</option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>
                {formatTimeSlot(t)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell us about your project <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="What kind of website do you need? Any examples you like?"
          className={inputClass}
        />
      </div>

      {state.status === "error" && (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-dark w-full px-6 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending…" : "Request Booking"}
      </button>

      <p className="text-center text-xs text-slate-400">
        No payment needed — this is a free consultation request. We&apos;ll confirm by email.
      </p>
    </form>
  );
}
