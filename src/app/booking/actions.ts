"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { BOOKING_SERVICES, BOOKING_TIME_SLOTS } from "@/lib/bookings";

export type BookingFormState = {
  status: "idle" | "success" | "error";
  error?: string;
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function createBooking(
  _prev: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const bookingDate = String(formData.get("booking_date") ?? "").trim();
  const bookingTime = String(formData.get("booking_time") ?? "").trim();

  if (!name || !email || !bookingDate) {
    return { status: "error", error: "Please fill in your name, email, and preferred date." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", error: "Please enter a valid email address." };
  }
  if (!DATE_RE.test(bookingDate)) {
    return { status: "error", error: "Please pick a valid date." };
  }
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  if (bookingDate < todayStr) {
    return { status: "error", error: "Please pick a date from today onwards." };
  }
  if (service && !(BOOKING_SERVICES as readonly string[]).includes(service)) {
    return { status: "error", error: "Please choose a service from the list." };
  }
  if (bookingTime && !(BOOKING_TIME_SLOTS as readonly string[]).includes(bookingTime)) {
    return { status: "error", error: "Please choose a time from the list." };
  }

  const { error } = await supabaseAdmin.from("bookings").insert({
    name,
    email,
    phone: phone || null,
    service: service || null,
    message: message || null,
    booking_date: bookingDate,
    booking_time: bookingTime || null,
    status: "pending",
  });

  if (error) {
    console.error("createBooking failed:", error.message);
    return {
      status: "error",
      error: "Something went wrong on our end. Please try again or email us directly.",
    };
  }

  return { status: "success" };
}
