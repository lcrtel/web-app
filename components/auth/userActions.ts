"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
type Department = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  skype_id?: string | null;
};
interface userProps {
  id?: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  skype_id?: string | null;
  company_name?: string | null;
  finance_department?: Department;
  noc_department?: Department;
  sales_department?: Department;
}
export async function updateUserAsAdmin(userId: string, formData: userProps) {
  const supabase = supabaseAdminServer();
  const { error } = await supabase
    .from("profiles")
    .update(formData)
    .eq("id", userId);
  return { error: error?.message || null };
}
export async function updateUser(userId: string, formData: userProps) {
  const supabase = supabaseServer();
  const { error } = await supabase
    .from("profiles")
    .update(formData)
    .eq("id", userId);
  await supabase.from("user_actions").insert({
    action_type: "updated_profile",
    action_details: `Updated ${formData.name}'s profile`,
  });
  return { error: error?.message || null };
}

export async function signOut() {
  const supabase = supabaseServer();
  const { error } = await supabase.auth.signOut();
  return { error: error?.message };
}

export async function changeEmail(email: string) {
  const supabase = supabaseServer();
  const { error } = await supabase.auth.updateUser({
    email: email,
  });
  if (!error) {
    await supabase.from("user_actions").insert({
      action_type: "updated_email",
      action_details: "Updated email",
    })
  }
  if (error) {
    return { error: error.message };
  }
}
