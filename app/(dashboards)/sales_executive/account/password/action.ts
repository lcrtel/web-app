"use server";

import { supabaseServer } from "@/lib/supabase-server";

export async function updatePassword({ password }: { password: string }) {
  const supabase = supabaseServer();
  const { error } = await supabase.auth.updateUser({ password });
  if (!error) {
    await supabase.from("user_actions").insert({
      action_type: "updated_password",
      action_details: "Updated password",
    })
  }
  if (error) {
    return { error: error.message };
  }
}
