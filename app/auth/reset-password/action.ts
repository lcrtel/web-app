"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export async function resetPassword(email: string) {
  const supabase = supabaseServer();
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    return { error: error?.message };
  }
  return redirect(
    "/auth/reset-password?message=Check email to continue reset password process",
  );
}
