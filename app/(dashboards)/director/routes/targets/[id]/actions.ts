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
export async function editTarget(data: Target, targetId: any) {
  const supabase = await supabaseAdminServer();
  const { error } = await supabase
    .from("targets")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", targetId)
    .select();
  if (error) {
    return {
      error: error.message,
    };
  }
}
