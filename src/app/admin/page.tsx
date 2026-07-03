import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { getBookingsForMonth } from "@/lib/bookings";
import {
  formatTimeSlot,
  vancouverToday,
  type Booking,
  type BookingStatus,
} from "@/lib/booking-shared";
import {
  adminDeleteBooking,
  adminUpdateStatus,
  logoutAction,
} from "@/app/admin/actions";
import BookingEditor from "@/components/admin/booking-editor";
import DeleteButton from "@/components/admin/delete-button";

export const metadata: Metadata = {
  title: "Bookings Dashboard",
  robots: { index: false, follow: false },
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-800",
  confirmed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  cancelled: "border-slate-200 bg-slate-100 text-slate-500",
};

const STATUS_DOTS: Record<BookingStatus, string> = {
  pending: "bg-amber-400",
  confirmed: "bg-emerald-500",
  cancelled: "bg-slate-400",
};

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function parseMonth(raw: string | undefined): { year: number; month: number } {
  const m = raw?.match(/^(\d{4})-(\d{2})$/);
  if (m) {
    const year = Number(m[1]);
    const month = Number(m[2]);
    if (month >= 1 && month <= 12) return { year, month };
  }
  const today = vancouverToday();
  return { year: Number(today.slice(0, 4)), month: Number(today.slice(5, 7)) };
}

type SearchParams = Promise<{
  month?: string;
  date?: string;
  edit?: string;
  new?: string;
}>;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await requireAdmin();

  const params = await searchParams;
  const { year, month } = parseMonth(params.month);
  const monthKey = `${year}-${pad(month)}`;
  const selectedDate =
    params.date && params.date.startsWith(monthKey) ? params.date : undefined;

  const bookings = await getBookingsForMonth(year, month);
  const byDate = new Map<string, Booking[]>();
  for (const b of bookings) {
    const list = byDate.get(b.booking_date) ?? [];
    list.push(b);
    byDate.set(b.booking_date, list);
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const today = vancouverToday();

  const prev = month === 1 ? `${year - 1}-12` : `${year}-${pad(month - 1)}`;
  const next = month === 12 ? `${year + 1}-01` : `${year}-${pad(month + 1)}`;

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const dayBookings = selectedDate ? (byDate.get(selectedDate) ?? []) : [];
  const editing =
    params.edit && selectedDate
      ? dayBookings.find((b) => b.id === params.edit)
      : undefined;
  const showNewForm = params.new === "1" && selectedDate;
  const panelBaseHref = selectedDate
    ? `/admin?month=${monthKey}&date=${selectedDate}`
    : `/admin?month=${monthKey}`;

  const activeCount = bookings.filter((b) => b.status !== "cancelled").length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Admin toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Bookings Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {activeCount} active booking{activeCount === 1 ? "" : "s"} in{" "}
            {MONTH_NAMES[month - 1]} {year}
          </p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="btn-light px-4 py-2 text-xs font-semibold"
          >
            Sign Out
          </button>
        </form>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Calendar */}
        <div className="rounded-3xl border border-[var(--card-border)] bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-6">
          <div className="flex items-center justify-between">
            <Link
              href={`/admin?month=${prev}`}
              className="btn-light h-9 w-9 rounded-full text-sm"
              aria-label="Previous month"
            >
              ←
            </Link>
            <h2 className="text-base font-bold text-slate-950 sm:text-lg">
              {MONTH_NAMES[month - 1]} {year}
            </h2>
            <Link
              href={`/admin?month=${next}`}
              className="btn-light h-9 w-9 rounded-full text-sm"
              aria-label="Next month"
            >
              →
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (day === null) {
                return <div key={`empty-${i}`} className="min-h-[72px] rounded-xl" />;
              }
              const dateStr = `${monthKey}-${pad(day)}`;
              const list = byDate.get(dateStr) ?? [];
              const isSelected = dateStr === selectedDate;
              const isToday = dateStr === today;

              return (
                <Link
                  key={dateStr}
                  href={`/admin?month=${monthKey}&date=${dateStr}`}
                  className={`flex min-h-[72px] flex-col rounded-xl border p-1.5 text-left transition hover:border-[var(--brand)] hover:bg-[var(--brand-soft)]/40 sm:min-h-[84px] sm:p-2 ${
                    isSelected
                      ? "border-[var(--brand)] bg-[var(--brand-soft)]/60 ring-2 ring-[var(--brand)]/40"
                      : "border-slate-100 bg-white"
                  }`}
                >
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                      isToday
                        ? "bg-[var(--brand-dark)] text-white"
                        : "text-slate-700"
                    }`}
                  >
                    {day}
                  </span>
                  {list.length > 0 && (
                    <div className="mt-1 space-y-0.5">
                      <div className="flex flex-wrap gap-0.5">
                        {list.slice(0, 4).map((b) => (
                          <span
                            key={b.id}
                            className={`h-1.5 w-1.5 rounded-full ${STATUS_DOTS[b.status]}`}
                          />
                        ))}
                      </div>
                      <p className="truncate text-[10px] font-medium text-slate-600 sm:text-[11px]">
                        {list.length} booking{list.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-400" /> Pending
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Confirmed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-400" /> Cancelled
            </span>
          </div>
        </div>

        {/* Day panel */}
        <div className="rounded-3xl border border-[var(--card-border)] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-6">
          {!selectedDate ? (
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center">
              <p className="text-sm font-semibold text-slate-700">
                Select a day on the calendar
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Click any date to see its bookings, or add one manually.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-slate-950 sm:text-base">
                  {new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-CA", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h2>
                {!showNewForm && !editing && (
                  <Link
                    href={`${panelBaseHref}&new=1`}
                    className="btn-dark px-3.5 py-1.5 text-xs font-semibold"
                  >
                    + Add
                  </Link>
                )}
              </div>

              <div className="mt-4 space-y-4">
                {showNewForm && (
                  <BookingEditor defaultDate={selectedDate} cancelHref={panelBaseHref} />
                )}

                {dayBookings.length === 0 && !showNewForm && (
                  <p className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-400">
                    No bookings on this day.
                  </p>
                )}

                {dayBookings.map((b) =>
                  editing?.id === b.id ? (
                    <BookingEditor
                      key={b.id}
                      booking={b}
                      defaultDate={selectedDate}
                      cancelHref={panelBaseHref}
                    />
                  ) : (
                    <div
                      key={b.id}
                      className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-slate-950">{b.name}</p>
                          <p className="text-xs text-slate-500">
                            {b.booking_time ? formatTimeSlot(b.booking_time) : "Any time"}
                            {b.service ? ` · ${b.service}` : ""}
                          </p>
                        </div>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${STATUS_STYLES[b.status]}`}
                        >
                          {b.status}
                        </span>
                      </div>

                      <dl className="mt-3 space-y-1.5 text-xs text-slate-600">
                        <div className="flex gap-2">
                          <dt className="w-14 shrink-0 font-semibold text-slate-400">Email</dt>
                          <dd className="break-all">
                            <a href={`mailto:${b.email}`} className="text-[var(--brand-dark)] underline-offset-2 hover:underline">
                              {b.email}
                            </a>
                          </dd>
                        </div>
                        {b.phone && (
                          <div className="flex gap-2">
                            <dt className="w-14 shrink-0 font-semibold text-slate-400">Phone</dt>
                            <dd>
                              <a href={`tel:${b.phone}`} className="text-[var(--brand-dark)] underline-offset-2 hover:underline">
                                {b.phone}
                              </a>
                            </dd>
                          </div>
                        )}
                        {b.message && (
                          <div className="flex gap-2">
                            <dt className="w-14 shrink-0 font-semibold text-slate-400">Notes</dt>
                            <dd className="whitespace-pre-wrap">{b.message}</dd>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <dt className="w-14 shrink-0 font-semibold text-slate-400">Created</dt>
                          <dd>
                            {new Date(b.created_at).toLocaleString("en-CA", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
                        <form action={adminUpdateStatus} className="flex flex-wrap gap-1.5">
                          <input type="hidden" name="id" value={b.id} />
                          <input type="hidden" name="date" value={selectedDate} />
                          {b.status !== "confirmed" && (
                            <button
                              type="submit"
                              name="status"
                              value="confirmed"
                              className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                            >
                              Confirm
                            </button>
                          )}
                          {b.status !== "cancelled" && (
                            <button
                              type="submit"
                              name="status"
                              value="cancelled"
                              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                          )}
                          {b.status !== "pending" && (
                            <button
                              type="submit"
                              name="status"
                              value="pending"
                              className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                            >
                              Mark Pending
                            </button>
                          )}
                        </form>
                        <div className="ml-auto flex gap-1.5">
                          <Link
                            href={`${panelBaseHref}&edit=${b.id}`}
                            className="rounded-full border border-[var(--card-border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--brand-dark)] transition hover:bg-[var(--brand-soft)]/50"
                          >
                            Edit
                          </Link>
                          <DeleteButton
                            action={adminDeleteBooking}
                            id={b.id}
                            date={selectedDate}
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
