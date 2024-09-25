"use server";

import { supabaseServer } from "@/lib/supabase-server";

export default async function signInWithOtp(email: string) {
  const supabase = supabaseServer();
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
  });
  if (error) {
    return { error: error?.message };
  }
}
