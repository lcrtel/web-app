"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function updateBuyingTarget(id: string, data: any) {
  const supabaseAdmin = supabaseAdminServer();
  const { error } = await supabaseAdmin
    .from("targets")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();
  const supabase = supabaseServer();
  await supabase.from("user_actions").insert({
    action_type: "updated_target",
    action_details: `Updated client's buying target: ${JSON.stringify(data)}`,
  });
  if (error) {
    return { error: error.message };
  }
}
