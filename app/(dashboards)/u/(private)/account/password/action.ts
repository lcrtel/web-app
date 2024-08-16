"use server";

import { supabaseServer } from "@/lib/supabase-server";

export async function updatePassword({ password }: { password: string }) {
  const supabase = supabaseServer();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: error.message };
  }
}
