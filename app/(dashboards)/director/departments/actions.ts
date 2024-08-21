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
  const supabase = supabaseAdminServer();
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
  let role = "";
  if (department === "sales") {
    role = "sales_manager";
  } else if (department === "purchases") {
    role = "purchases_manager";
  } else if (department === "finance") {
    role = "finance_manager";
  } else if (department === "noc") {
    role = "noc_manager";
  } else if (department === "tech") {
    role = "tech_manager";
  }
  if (error) {
    return { error: error.message };
  } else if (user) {
    const { error } = await supabase
      .from("user_roles")
      .update({ role })
      .eq("user_id", user.id);
    if (error) {
      return { error: error.message };
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
  const supabase = supabaseAdminServer();
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
  let role = "";
  if (department === "sales") {
    role = "sales_executive";
  } else if (department === "purchases") {
    role = "purchases_executive";
  } else if (department === "finance") {
    role = "finance_executive";
  } else if (department === "noc") {
    role = "noc_executive";
  } else if (department === "tech") {
    role = "tech_executive";
  }
  if (error) {
    return { error: error.message };
  } else if (user) {
    const { error } = await supabase
      .from("user_roles")
      .update({ role })
      .eq("user_id", user.id);
    if (error) {
      return { error: error.message };
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
