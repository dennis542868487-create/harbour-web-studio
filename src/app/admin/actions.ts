"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  createAdminSession,
  destroyAdminSession,
  requireAdmin,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import {
  BOOKING_STATUSES,
  BOOKING_TIME_SLOTS,
  type BookingStatus,
} from "@/lib/booking-shared";

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!password || !verifyAdminPassword(password)) {
    return { error: "Incorrect password." };
  }
  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroyAdminSession();
  redirect("/admin/login");
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

type BookingInput = {
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string | null;
  booking_date: string;
  booking_time: string | null;
  status: BookingStatus;
};

function parseBookingForm(formData: FormData): BookingInput | string {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const bookingDate = String(formData.get("booking_date") ?? "").trim();
  const bookingTime = String(formData.get("booking_time") ?? "").trim();
  const status = String(formData.get("status") ?? "pending").trim() as BookingStatus;

  if (!name || !email || !DATE_RE.test(bookingDate)) {
    return "Name, email, and a valid date are required.";
  }
  if (!BOOKING_STATUSES.includes(status)) return "Invalid status.";
  if (bookingTime && !(BOOKING_TIME_SLOTS as readonly string[]).includes(bookingTime)) {
    return "Invalid time slot.";
  }

  return {
    name,
    email,
    phone: phone || null,
    service: service || null,
    message: message || null,
    booking_date: bookingDate,
    booking_time: bookingTime || null,
    status,
  };
}

function adminRedirect(date: string): never {
  const month = date.slice(0, 7);
  revalidatePath("/admin");
  redirect(`/admin?month=${month}&date=${date}`);
}

export async function adminCreateBooking(formData: FormData): Promise<void> {
  await requireAdmin();
  const parsed = parseBookingForm(formData);
  if (typeof parsed === "string") throw new Error(parsed);

  const { error } = await supabaseAdmin.from("bookings").insert(parsed);
  if (error) throw new Error(`Failed to create booking: ${error.message}`);
  adminRedirect(parsed.booking_date);
}

export async function adminUpdateBooking(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing booking id.");
  const parsed = parseBookingForm(formData);
  if (typeof parsed === "string") throw new Error(parsed);

  const { error } = await supabaseAdmin
    .from("bookings")
    .update({ ...parsed, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(`Failed to update booking: ${error.message}`);
  adminRedirect(parsed.booking_date);
}

export async function adminUpdateStatus(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as BookingStatus;
  const date = String(formData.get("date") ?? "");
  if (!id || !BOOKING_STATUSES.includes(status)) throw new Error("Invalid request.");

  const { error } = await supabaseAdmin
    .from("bookings")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(`Failed to update status: ${error.message}`);
  adminRedirect(date);
}

export async function adminDeleteBooking(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const date = String(formData.get("date") ?? "");
  if (!id) throw new Error("Missing booking id.");

  const { error } = await supabaseAdmin.from("bookings").delete().eq("id", id);
  if (error) throw new Error(`Failed to delete booking: ${error.message}`);
  adminRedirect(date);
}
