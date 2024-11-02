"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function deleteRoutesAsAdmin(ids: string[]) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();

  for (const id of ids) {
    const { error } = await supabaseAdmin.from("routes").delete().eq("id", id);
    if (error) {
      return { error: error.message };
    }
    await supabase.from("user_actions").insert({
      action_type: "delete_route",
      action_details: `Deleted route with ID: ${id}`,
    });
  }

  return { success: "Route(s) deleted successfully." };
}
