"use server"

import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function deleteTargets(ids:string[]) {
  const supabase = await supabaseAdminServer();
  return await supabase.from("targets").delete().in("id", ids);
}