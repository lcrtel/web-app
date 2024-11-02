"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function updateFinanceDipartment(data: any) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();

  const { error } = await supabaseAdmin
    .from("profiles")
    .update({ finance_department: data.finance_department })
    .eq("id", data.user_id);

  if (error) {
    return { error: error.message };
  }

  await supabase.from("user_actions").insert({
    action_type:
      data.user_type === "VENDOR" ? "updated_vendor" : "updated_client",
    action_details: `Updated ${data.name}'s finance department`,
  });
}

export async function updateNOCDipartment(data: any) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();

  const { error } = await supabaseAdmin
    .from("profiles")
    .update({ noc_department: data.noc_department })
    .eq("id", data.user_id);

  if (error) {
    return { error: error.message };
  }

  await supabase.from("user_actions").insert({
    action_type:
      data.user_type === "VENDOR" ? "updated_vendor" : "updated_client",
    action_details: `Updated ${data.name}'s noc department`,
  });
}

export async function updateSalesDipartment(data: any) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();

  const { error } = await supabaseAdmin
    .from("profiles")
    .update({ sales_department: data.sales_department })
    .eq("id", data.user_id);

  if (error) {
    return { error: error.message };
  }

  await supabase.from("user_actions").insert({
    action_type:
      data.user_type === "VENDOR" ? "updated_vendor" : "updated_client",
    action_details: `Updated ${data.name}'s sales department`,
  });
}
