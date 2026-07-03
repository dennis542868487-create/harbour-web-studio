import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import LoginForm from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="mx-auto flex max-w-md flex-col justify-center px-6 py-24">
      <div className="rounded-3xl border border-[var(--card-border)] bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)] motion-fade-up">
        <h1 className="text-xl font-bold text-slate-950">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Enter the admin password to manage bookings.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
