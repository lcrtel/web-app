"use server";
import AddAccountEmail from "@/emails/AddAccountEmail";
import DeleteAccount from "@/emails/DeleteAccount";
import LoginCredentialsUpdate from "@/emails/LoginCredentialsUpdate";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { getUser } from "@/utils/user";
import { renderAsync } from "@react-email/render";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function deleteAccount(user: any) {
  const supabase = supabaseAdminServer();
  const { error } = await supabase.auth.admin.deleteUser(user.id);

  if (error) {
    return { error: error.message };
  }
  transporter.sendMail({
    from: process.env.SMTP_USER,
    to: user?.email,
    subject: "Account Deletion Notification",
    html: await renderAsync(DeleteAccount({ user: user })),
  });
}

export async function updateCredentials(user: any) {
  const supabase = supabaseAdminServer();
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
    subject: `Your Login Credentials Has Been Updated`,
    html: await renderAsync(LoginCredentialsUpdate({ user: user })),
  });
}

export async function updateAccountDetails(user: any) {
  const supabase = supabaseAdminServer();
  const { error } = await supabase
    .from("profiles")
    .update({
      name: user.name,
      company_name: user.company_name,
      phone: user.phone,
      skype_id: user.skype_id,
      role: user.role,
      agent_id: user.agent_id,
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }
  return { success: true };
}

export async function addAccount(formData: any, userType: UserTypesEnum) {
  const supabaseAdmin = supabaseAdminServer();
  const supabase = supabaseServer();
  const adminUser = await getUser();
  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.admin.createUser({
    email: formData.email,
    password: formData.password,
    email_confirm: true,
    user_metadata: {
      name: formData.name,
      company_name: formData.company_name,
      email: formData.email,
      phone: formData.phone,
      skype_id: formData.skype_id,
    },
  });

  if (error) {
    return { error: error.message };
  } else if (user) {
    await supabaseAdmin
      .from("profiles")
      .update({ user_type: userType, added_by: adminUser?.id })
      .eq("id", user?.id);
    await supabase.from("user_actions").insert({
      action_type: "created_user",
      action_details: `Created ${formData.name}'s account`,
    });
  }
  transporter.sendMail({
    from: process.env.SMTP_USER,
    to: formData?.email,
    subject: "Welcome to LCRTel.com! Account Details Inside.",
    html: await renderAsync(AddAccountEmail({ user: formData })),
  });
}

export async function updateFinanceDipartment(data: any) {
  const supabase = supabaseAdminServer();
  return await supabase
    .from("profiles")
    .update({ finance_department: data.finance_department })
    .eq("id", data.user_id);
}

export async function updateNOCDipartment(data: any) {
  const supabase = supabaseAdminServer();
  return await supabase
    .from("profiles")
    .update({ noc_department: data.noc_department })
    .eq("id", data.user_id);
}

export async function updateSalesDipartment(data: any) {
  const supabase = supabaseAdminServer();
  return await supabase
    .from("profiles")
    .update({ sales_department: data.sales_department })
    .eq("id", data.user_id);
}

export async function getAgents() {
  const supabase = supabaseServer();
  const { data: agents } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "agent");
  if (agents) {
    return agents;
  }
  return [];
}
