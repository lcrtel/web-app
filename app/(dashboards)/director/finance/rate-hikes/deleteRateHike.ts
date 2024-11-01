"use server";

import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export default async function deleteRateHike(id: string) {
  const supabase = await supabaseAdminServer();
  const { error } = await supabase.from("rate_hikes").delete().eq("id", id);
  if (error) {
    return { error: error.message };
  }
  return { success: "Rate hike deleted successfully." };
}
