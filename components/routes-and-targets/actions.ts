"use server";

import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function deleteTarget(targetId: any) {
  const supabase = await supabaseAdminServer();
  const { error } = await supabase.from("targets").delete().eq("id", targetId);
  if (error) {
    return {
      error: error.message,
    };
  }
}