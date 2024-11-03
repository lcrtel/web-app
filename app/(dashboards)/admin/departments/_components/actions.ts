"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

interface UserProps {
  manager_id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  skype_id?: string;
}
export type Department = "sales" | "purchases" | "finance" | "noc" | "tech";

export async function getManagers(department: Department) {
  const supabaseAdmin = await supabaseAdminServer();
  const { data: manager, error } = await supabaseAdmin
    .from("managers")
    .select("*, profiles(*)")
    .eq("department", department);

  if (error) {
    return { error: error.message };
  }
  return { data: manager };
}
export async function createDepartmentManager(
  manager: UserProps,
  department: Department,
) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.admin.createUser({
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
  const departmentToRoleSlug: Record<Department, string> = {
    sales: "sales_manager",
    purchases: "purchase_manager",
    finance: "finance_manager",
    noc: "noc_manager",
    tech: "tech_manager",
  };
  role_slug = departmentToRoleSlug[department];

  if (error) {
    return { error: error.message };
  } else if (user) {
    const { error } = await supabaseAdmin
      .from("user_roles")
      .update({ role_slug })
      .eq("user_id", user.id);

    const { error: error2 } = await supabaseAdmin
      .from("managers")
      .insert({ user_id: user.id, department });

    if (error && error2) {
      return { error: error.message || error2.message };
    } else {
      await supabase.from("user_actions").insert({
        action_type: "created_manager",
        action_details:
          "Created manager " + manager.name + " for " + department,
      });
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
  console.log(executive);
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.admin.createUser({
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
    const { error } = await supabaseAdmin
      .from("user_roles")
      .update({ role_slug })
      .eq("user_id", user.id);
    const { error: error2 } = await supabaseAdmin.from("executives").insert({
      user_id: user.id,
      department,
      manager_id: executive.manager_id ? +executive.manager_id : null,
    });
    if (error || error2) {
      return { error: error2?.message || error?.message };
    } else {
      await supabase.from("user_actions").insert({
        action_type: "created_executive",
        action_details:
          "Created executive " + executive.name + " for " + department,
      });
      //   transporter.sendMail({
      //     from: process.env.SMTP_USER,
      //     to: salesman?.email,
      //     subject: "Welcome to LCRTel.com! Account Details Inside.",
      //     html: await renderAsync(AddAccountEmail({ user: salesman })),
      //   });
    }
  }
}

export async function deleteManager(managerId: string, managerName: string) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  const { error } = await supabaseAdmin.auth.admin.deleteUser(managerId);
  if (error) {
    return { error: error.message };
  }
  await supabase.from("user_actions").insert({
    action_type: "deleted_manager",
    action_details: "Deleted manager: " + managerName,
  });
}
export async function deleteExecutive(
  executiveId: string,
  executiveName: string,
) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  const { error } = await supabaseAdmin.auth.admin.deleteUser(executiveId);
  if (error) {
    return { error: error.message };
  }
  await supabase.from("user_actions").insert({
    action_type: "deleted_executive",
    action_details: "Deleted executive: " + executiveName,
  });
}

export async function updateExecutiveManager(
  executiveId: string,
  managerId: string | null,
) {
  const supabaseAdmin = await supabaseAdminServer();
  const supabase = await supabaseServer();
  const { error } = await supabaseAdmin
    .from("executives")
    .update({ manager_id: managerId ? +managerId : null })
    .eq("user_id", executiveId);
  if (error) {
    return { error: error.message };
  }
  await supabase.from("user_actions").insert({
    action_type: "updated_executive",
    action_details: "Updated executive's manager",
  });
}
