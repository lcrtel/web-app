"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { transporter } from "@/utils/smtp-transporter";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 10 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export async function sendTREnquiry(
  trId: number,
  formData: z.infer<typeof formSchema>,
) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  const { data: trMessages } = await supabaseAdmin
    .from("tr_communication")
    .select("*")
    .eq("tr_request_id", trId);
  try {
    const res = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: formData.email,
      subject: `TR Enquiry`,
      text: formData.message,
      inReplyTo: trMessages?.[0]?.messageId || "",
    });
    if (res?.accepted.length > 0) {
      await supabaseAdmin.from("tr_communication").insert({
        to: formData.email,
        tr_request_id: trId,
        messageId: res.messageId,
        subject: formData.subject,
        message: formData.message,
      });
      return { error: null };
    }
  } catch (error) {
    return { error: "Failed to send email" };
  }
  await supabase.from("user_actions").insert({
    action_type: "send_tr_enquiry",
    action_details: `Sent TR Enquiry to ${formData.email}`,
  });
}

export async function updateStatus(trId: number, status: StatusEnum) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  const { error } = await supabaseAdmin
    .from("tr_verifications")
    .update({
      status,
    })
    .eq("id", trId);
  if (error) {
    return { error: error.message };
  }
  await supabase.from("user_actions").insert({
    action_type: "update_tr_verification",
    action_details: `Updated TR verification status to ${status}`,
  });
}
