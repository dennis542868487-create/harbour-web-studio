import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Booking } from "@/lib/booking-shared";

export * from "@/lib/booking-shared";

export async function getBookingsForMonth(
  year: number,
  month: number // 1-12
): Promise<Booking[]> {
  const first = `${year}-${String(month).padStart(2, "0")}-01`;
  const nextMonth = month === 12 ? { y: year + 1, m: 1 } : { y: year, m: month + 1 };
  const next = `${nextMonth.y}-${String(nextMonth.m).padStart(2, "0")}-01`;

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .gte("booking_date", first)
    .lt("booking_date", next)
    .order("booking_date", { ascending: true })
    .order("booking_time", { ascending: true });

  if (error) throw new Error(`Failed to load bookings: ${error.message}`);
  return (data ?? []) as Booking[];
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Failed to load booking: ${error.message}`);
  return (data as Booking) ?? null;
}
