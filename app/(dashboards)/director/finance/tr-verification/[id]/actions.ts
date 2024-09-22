"use server";

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
  const supabase = supabaseAdminServer();
  const { data: trMessages } = await supabase
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
      await supabase.from("tr_communication").insert({
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
}

export async function updateStatus(trId: number, status: StatusEnum) {
  const supabase = supabaseAdminServer();
  const { error } = await supabase
    .from("tr_verifications")
    .update({
      status,
    })
    .eq("id", trId);
  if (error) {
    return { error: error.message };
  }
}
