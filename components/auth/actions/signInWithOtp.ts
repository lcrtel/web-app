"use server";

import { supabaseServer } from "@/lib/supabase-server";

export default async function signInWithOtp(email: string) {
  const supabase = await supabaseServer();
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
  });
  if (error) {
    return { error: error?.message };
  }
}
