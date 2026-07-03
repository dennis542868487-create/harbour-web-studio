-- Harbour Web Studio — bookings table
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query → Run)

create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text,
  message text,
  booking_date date not null,
  booking_time text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_date_idx on public.bookings (booking_date);

-- RLS on, no policies: the anon/publishable key gets zero access.
-- All reads/writes go through the Next.js server using the secret key.
alter table public.bookings enable row level security;
