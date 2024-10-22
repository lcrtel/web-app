"use server";

import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function updatePurchase(
  formData: PurchaseRequest,
  requestId: number,
) {
  const supabase = supabaseAdminServer();
  const { error } = await supabase
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
}
