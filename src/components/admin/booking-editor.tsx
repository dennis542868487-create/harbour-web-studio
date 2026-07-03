import Link from "next/link";
import { adminCreateBooking, adminUpdateBooking } from "@/app/admin/actions";
import {
  BOOKING_SERVICES,
  BOOKING_STATUSES,
  BOOKING_TIME_SLOTS,
  formatTimeSlot,
  type Booking,
} from "@/lib/booking-shared";

const inputClass =
  "w-full rounded-xl border border-[var(--card-border)] bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand-soft)]";
const labelClass = "mb-1 block text-xs font-semibold text-slate-600";

type Props = {
  booking?: Booking;
  defaultDate: string;
  cancelHref: string;
};

export default function BookingEditor({ booking, defaultDate, cancelHref }: Props) {
  const isEdit = Boolean(booking);
  const services: string[] = [...BOOKING_SERVICES];
  if (booking?.service && !services.includes(booking.service)) {
    services.push(booking.service);
  }

  return (
    <form
      action={isEdit ? adminUpdateBooking : adminCreateBooking}
      className="space-y-4 rounded-2xl border border-[var(--brand)] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-950">
          {isEdit ? "Edit Booking" : "New Booking"}
        </h3>
        <Link href={cancelHref} className="text-xs font-semibold text-slate-400 hover:text-slate-600">
          Cancel
        </Link>
      </div>

      {isEdit && <input type="hidden" name="id" value={booking!.id} />}

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Name *</label>
          <input name="name" required defaultValue={booking?.name ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input
            name="email"
            type="email"
            required
            defaultValue={booking?.email ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input name="phone" defaultValue={booking?.phone ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Service</label>
          <select name="service" defaultValue={booking?.service ?? ""} className={inputClass}>
            <option value="">—</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Date *</label>
          <input
            name="booking_date"
            type="date"
            required
            defaultValue={booking?.booking_date ?? defaultDate}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Time</label>
          <select
            name="booking_time"
            defaultValue={booking?.booking_time ?? ""}
            className={inputClass}
          >
            <option value="">Any time</option>
            {BOOKING_TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {formatTimeSlot(t)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select name="status" defaultValue={booking?.status ?? "pending"} className={inputClass}>
            {BOOKING_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Notes / Message</label>
        <textarea
          name="message"
          rows={3}
          defaultValue={booking?.message ?? ""}
          className={inputClass}
        />
      </div>

      <button type="submit" className="btn-dark w-full px-5 py-2.5 text-sm font-semibold">
        {isEdit ? "Save Changes" : "Add Booking"}
      </button>
    </form>
  );
}
