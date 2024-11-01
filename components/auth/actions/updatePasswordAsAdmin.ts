"use server";

import LoginCredentialsUpdate from "@/emails/LoginCredentialsUpdate";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { transporter } from "@/utils/smtp-transporter";
import { renderAsync } from "@react-email/render";

export async function updatePasswordAsAdmin(user: any) {
  const supabase = await supabaseAdminServer();
  const { error } = await supabase.auth.admin.updateUserById(user.id, {
    email: user.email,
    password: user.password,
  });
  if (error) {
    return { error: error.message };
  }
  transporter.sendMail({
    from: process.env.SMTP_USER,
    to: user?.email,
    subject: `Your Password Has Been Updated`,
    html: await renderAsync(LoginCredentialsUpdate({ user: user })),
  });
}