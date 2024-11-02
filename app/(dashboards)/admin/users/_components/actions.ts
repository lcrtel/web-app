"use server";

import AddAccountEmail from "@/emails/AddAccountEmail";
import DeleteAccount from "@/emails/DeleteAccount";
import LoginCredentialsUpdate from "@/emails/LoginCredentialsUpdate";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { transporter } from "@/utils/smtp-transporter";
import { getUser } from "@/utils/user";
import { renderAsync } from "@react-email/render";

export async function updateAccountDetails(user: any) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  const { error } = await supabaseAdmin
    .from("profiles")
    .update({
      name: user.name,
      company_name: user.company_name,
      phone: user.phone,
      skype_id: user.skype_id,
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }
  await supabase.from("user_actions").insert({
    action_type:
      user.user_type === "VENDOR" ? "updated_vendor" : "updated_client",
    action_details: "Updated account details of " + user.name,
  });
  return;
}
export async function deleteAccount(user: Profile) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();

  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (error) {
    return { error: error.message };
  }
  transporter.sendMail({
    from: process.env.SMTP_USER,
    to: user?.email ?? "",
    subject: "Account Deletion Notification",
    html: await renderAsync(DeleteAccount({ user: user })),
  });

  await supabase.from("user_actions").insert({
    action_type:
      user.user_type === "VENDOR" ? "deleted_vendor" : "deleted_client",
    action_details: `Deleted ${user.user_type.toLowerCase()}: ${user.name}`,
  });
}

export async function updateCredentials(user: any) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();

  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
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

  await supabase.from("user_actions").insert({
    action_type:
      user.user_type === "VENDOR" ? "updated_vendor" : "updated_client",
    action_details: `Updated ${user.name}'s credentials`,
  });
}

export async function addAccount(formData: any, userType: UserTypesEnum) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
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
      action_type: userType === "VENDOR" ? "added_vendor" : "added_client",
      action_details: `Added ${userType.toLowerCase()}: ${formData.name}`,
    });
  }
  transporter.sendMail({
    from: process.env.SMTP_USER,
    to: formData?.email,
    subject: "Welcome to LCRTel.com! Account Details Inside.",
    html: await renderAsync(AddAccountEmail({ user: formData })),
  });
}
