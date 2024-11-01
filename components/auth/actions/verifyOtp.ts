"use server";

import { supabaseServer } from "@/lib/supabase-server";

export default async function verifyOtp(email: string, otp: string) {
  const supabase = await supabaseServer();
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });
  if (error) {
    return { error: error.message };
  }
}
