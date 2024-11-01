"use server";

import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export async function addPayment(
  data: {
    amount: string;
    payment_method: string;
    paid_at: Date;
  },
  invoice: Invoice,
) {
  const supabase = await supabaseAdminServer();
  const { data: payment, error } = await supabase
    .from("payments")
    .insert([
      {
        amount: data.amount,
        payment_method: data.payment_method,
        paid_at: data.paid_at.toISOString(),
        invoice_id: invoice.invoice_id,
        user_id: invoice.invoice_to,
      },
    ])
    .select("*")
    .single();

  if (error) {
    return { error: error.message };
  } else {
    await supabase
      .from("invoices")
      .update({
        balance: (Number(invoice?.balance) - Number(data.amount)).toString(),
      })
      .eq("invoice_id", invoice.invoice_id);
  }
}
