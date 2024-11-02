"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function addPayment(
  data: {
    amount: string;
    payment_method: string;
    paid_at: Date;
  },
  invoice: Invoice,
) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  const { error } = await supabaseAdmin.from("payments").insert([
    {
      amount: data.amount,
      payment_method: data.payment_method,
      paid_at: data.paid_at.toISOString(),
      invoice_id: invoice.invoice_id,
      user_id: invoice.invoice_to,
    },
  ]);

  if (error) {
    return { error: error.message };
  } else {
    await supabaseAdmin
      .from("invoices")
      .update({
        balance: (Number(invoice?.balance) - Number(data.amount)).toString(),
      })
      .eq("invoice_id", invoice.invoice_id);
    await supabase.from("user_actions").insert({
      action_type: "added_payment_to_invoice",
      action_details: `Added payment of $${data.amount} to invoice #${invoice.invoice_id}`,
    });
  }
}
