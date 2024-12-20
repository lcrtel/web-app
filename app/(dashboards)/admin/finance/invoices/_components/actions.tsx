"use server";
import InvoiceTemplate from "@/emails/Invoice";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { renderAsync } from "@react-email/render";
import nodemailer from "nodemailer";

export default async function sendInvoice(data: any) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { data: inv, error } = await supabaseAdmin
    .from("invoices")
    .insert([data.invoice_details])
    .select(`*, profiles (*)`)
    .single();
  if (error) {
    return { success: false, error: error };
  } else {
    const emailHtml = await renderAsync(<InvoiceTemplate data={{ ...inv }} />);
    try {
      transporter.sendMail({
        from: process.env.SMTP_USER,
        to: data.to,
        cc: data.cc,
        subject: `Route Usage Invoice`,
        html: emailHtml,
      });
    } catch (error) {
      return error;
    }
    await supabase.from("user_actions").insert({
      action_type: "sent_invoice",
      action_details: `Sent invoice to ${data.to}`,
    });
    return { success: true };
  }
}
