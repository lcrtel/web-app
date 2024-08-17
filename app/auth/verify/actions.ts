"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export async function verifyOtp(email: string, otp: string) {
  const supabase = supabaseServer();
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });
  if (error) {
    return { error: error.message };
  }
  redirect("/u");
}
