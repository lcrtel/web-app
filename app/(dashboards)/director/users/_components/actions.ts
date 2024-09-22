"use server"

import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function updateAccountDetails(user: any) {
  const supabase = supabaseAdminServer();
  const { error } = await supabase
    .from("profiles")
    .update({
      name: user.name,
      company_name: user.company_name,
      phone: user.phone,
      skype_id: user.skype_id,
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }
  return
}