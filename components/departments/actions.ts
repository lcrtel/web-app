"use server";

import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

interface UserProps {
  name: string;
  email: string;
  phone: string;
  password: string;
  skype_id?: string;
}
export type Department = "sales" | "purchases" | "finance" | "noc" | "tech";
export async function createDepartmentManager(
  manager: UserProps,
  department: Department,
) {
  const supabase = await supabaseAdminServer();
  const {
    data: { user },
    error,
  } = await supabase.auth.admin.createUser({
    email: manager.email,
    password: manager.password,
    email_confirm: true,
    user_metadata: {
      name: manager.name,
      company_name: "LCRTel",
      email: manager.email,
      phone: manager.phone,
      skype_id: manager.skype_id,
    },
  });
  let role_slug = "";
  if (department === "sales") {
    role_slug = "sales_manager";
  } else if (department === "purchases") {
    role_slug = "purchase_manager";
  } else if (department === "finance") {
    role_slug = "finance_manager";
  } else if (department === "noc") {
    role_slug = "noc_manager";
  } else if (department === "tech") {
    role_slug = "tech_manager";
  }
  if (error) {
    return { error: error.message };
  } else if (user) {
    const { error } = await supabase
      .from("user_roles")
      .update({ role_slug })
      .eq("user_id", user.id);
    const { error: error2 } = await supabase
      .from("managers")
      .insert({ user_id: user.id, department });
    if (error && error2) {
      return { error: error.message || error2.message };
    } else {
      //   transporter.sendMail({
      //     from: process.env.SMTP_USER,
      //     to: salesman?.email,
      //     subject: "Welcome to LCRTel.com! Account Details Inside.",
      //     html: await renderAsync(AddAccountEmail({ user: salesman })),
      //   });
    }
  }
}
export async function createDepartmentExecutive(
  executive: UserProps,
  department: Department,
) {
  const supabase = await supabaseAdminServer();
  const {
    data: { user },
    error,
  } = await supabase.auth.admin.createUser({
    email: executive.email,
    password: executive.password,
    email_confirm: true,
    user_metadata: {
      name: executive.name,
      company_name: "LCRTel",
      email: executive.email,
      phone: executive.phone,
      skype_id: executive.skype_id,
    },
  });
  let role_slug = "";
  const departmentToRoleSlug: Record<Department, string> = {
    sales: "sales_executive",
    purchases: "purchase_executive",
    finance: "finance_executive",
    noc: "noc_executive",
    tech: "tech_executive",
  };
  role_slug = departmentToRoleSlug[department];
  if (error) {
    return { error: error.message };
  } else if (user) {
    const { error } = await supabase
      .from("user_roles")
      .update({ role_slug })
      .eq("user_id", user.id);
    const { error: error2 } = await supabase
      .from("executives")
      .insert({ user_id: user.id, department });
    if (error || error2) {
      return { error: error2?.message };
    } else {
      //   transporter.sendMail({
      //     from: process.env.SMTP_USER,
      //     to: salesman?.email,
      //     subject: "Welcome to LCRTel.com! Account Details Inside.",
      //     html: await renderAsync(AddAccountEmail({ user: salesman })),
      //   });
    }
  }
}

export async function deleteDepartmentExecutiveOrManager(executiveId: string) {
  const supabase = await supabaseAdminServer();
  const { error } = await supabase.auth.admin.deleteUser(executiveId);
  if (error) {
    return { error: error.message };
  }
}
