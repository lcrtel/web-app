"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function updatePurchase(
  formData: PurchaseRequest,
  requestId: number,
) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  const { error } = await supabaseAdmin
    .from("purchases")
    .update({
      status: formData.status,
      communication_status: formData.communication_status,
      vos_status: formData.vos_status,
    })
    .eq("id", requestId)
    .select();
  if (error) {
    return { error: error.message };
  }

  await supabase.from("user_actions").insert({
    action_type: "update_purchase",
    action_details: `Updated a purchase with ID: ${requestId}`,
  });
}
