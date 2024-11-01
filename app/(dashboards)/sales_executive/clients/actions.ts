"use server";
import AddAccountEmail from "@/emails/AddAccountEmail";
import DeleteAccount from "@/emails/DeleteAccount";
import LoginCredentialsUpdate from "@/emails/LoginCredentialsUpdate";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { transporter } from "@/utils/smtp-transporter";
import { renderAsync } from "@react-email/render";

export async function deleteAccount(user: any) {
  const supabaseAdmin = await supabaseAdminServer();
  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (error) {
    return { error: error.message };
  }
  const supabase = await supabaseServer();
  await supabase.from("user_actions").insert({
    action_type: "delete_client",
    action_details: `Deleted ${user.name}'s account`,
  });
  transporter.sendMail({
    from: process.env.SMTP_USER,
    to: user?.email,
    subject: "Account Deletion Notification",
    html: await renderAsync(DeleteAccount({ user: user })),
  });
}

export async function updateCredentials(user: any) {
  const supabaseAdmin = await supabaseAdminServer();
  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
    email: user.email,
    password: user.password,
  });
  if (error) {
    return { error: error.message };
  }
  const supabase = await supabaseServer();
  await supabase.from("user_actions").insert({
    action_type: "updated_client",
    action_details: `Updated ${user.name}'s login credentials `,
  });
  transporter.sendMail({
    from: process.env.SMTP_USER,
    to: user?.email,
    subject: `Your Login Credentials Has Been Updated`,
    html: await renderAsync(LoginCredentialsUpdate({ user: user })),
  });
}

export async function updateAccountDetails(user: any) {
  const supabaseAdmin = await supabaseAdminServer();
  const { error } = await supabaseAdmin
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
  const supabase = await supabaseServer();
  await supabase.from("user_actions").insert({
    action_type: "updated_client",
    action_details: `Updated ${user.name}'s profile`,
  });
  return { success: true };
}

export async function addAccount(formData: any, userType: UserTypesEnum) {
  const supabaseAdmin = await supabaseAdminServer();
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
      .update({ user_type: userType })
      .eq("id", user?.id);
  }
  const supabase = await supabaseServer();
  await supabase.from("user_actions").insert({
    action_type: "created_client",
    action_details: `Created ${formData.name}'s account`,
  });
  transporter.sendMail({
    from: process.env.SMTP_USER,
    to: formData?.email,
    subject: "Welcome to LCRTel.com! Account Details Inside.",
    html: await renderAsync(AddAccountEmail({ user: formData })),
  });
}

export async function updateFinanceDipartment(data: any) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  await supabase.from("user_actions").insert({
    action_type: "updated_client",
    action_details: `Updated client's finance department`,
  });
  return await supabaseAdmin
    .from("profiles")
    .update({ finance_department: data.finance_department })
    .eq("id", data.user_id);
}

export async function updateNOCDipartment(data: any) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  await supabase.from("user_actions").insert({
    action_type: "updated_client",
    action_details: `Updated client's NOC department`,
  });
  return await supabaseAdmin
    .from("profiles")
    .update({ noc_department: data.noc_department })
    .eq("id", data.user_id);
}

export async function updateSalesDipartment(data: any) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  await supabase.from("user_actions").insert({
    action_type: "updated_client",
    action_details: `Updated client's sales department`,
  });
  return await supabaseAdmin
    .from("profiles")
    .update({ sales_department: data.sales_department })
    .eq("id", data.user_id);
}
