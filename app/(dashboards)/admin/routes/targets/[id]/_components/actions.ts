"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function deleteTarget(targetId: any) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  const { error } = await supabaseAdmin
    .from("targets")
    .delete()
    .eq("id", targetId);
  if (error) {
    return {
      error: error.message,
    };
  }
  await supabase.from("user_actions").insert({
    action_type: "delete_target",
    action_details: `Deleted target with ID: ${targetId}`,
  });
}
export async function editTarget(data: Target, targetId: any) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  const { error } = await supabaseAdmin
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
  await supabase.from("user_actions").insert({
    action_type: "edit_target",
    action_details: `Edited target with ID: ${targetId}`,
  });
}
