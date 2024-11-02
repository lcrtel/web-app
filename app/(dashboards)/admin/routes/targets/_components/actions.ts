"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function deleteTargetsAsAdmin(ids: string[]) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();

  for (const id of ids) {
    const { error } = await supabaseAdmin.from("targets").delete().eq("id", id);
    if (error) {
      return { error: error.message };
    }
    await supabase.from("user_actions").insert({
      action_type: "delete_target",
      action_details: `Deleted target with ID: ${id}`,
    });
  }

  return { success: "Target(s) deleted successfully." };
}
