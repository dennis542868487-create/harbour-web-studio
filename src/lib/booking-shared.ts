// Shared between server and client — keep free of server-only imports.

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string | null;
  booking_date: string; // YYYY-MM-DD
  booking_time: string | null; // HH:MM (24h) or null
  status: BookingStatus;
  created_at: string;
  updated_at: string;
};

export const BOOKING_SERVICES = [
  "Local Business Websites",
  "One-Page Landing Pages",
  "Website Redesigns",
  "Basic Local SEO Setup",
  "Google Maps & Contact Setup",
  "Website Maintenance",
  "Other / Not sure yet",
] as const;

export const BOOKING_TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
] as const;

export const BOOKING_STATUSES: BookingStatus[] = [
  "pending",
  "confirmed",
  "cancelled",
];

// The business operates in Vancouver; Vercel servers run in UTC, so
// "today" must be computed in the business timezone, not server time.
export function vancouverToday(): string {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Vancouver",
  }); // en-CA gives YYYY-MM-DD
}

export function formatTimeSlot(slot: string): string {
  const [h, m] = slot.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}
