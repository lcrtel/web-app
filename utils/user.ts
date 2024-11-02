"use server";
import { supabaseServer } from "@/lib/supabase-server";

export async function getUser() {
  const supabase = await supabaseServer();
  const { data: user } = await supabase
    .from("profiles")
    .select("*, user_roles(*)")
    .single();
  return user;
}
export async function getUserRole() {
  const supabase = await supabaseServer();
  const { data: user } = await supabase
    .from("profiles")
    .select("*, user_roles(*)")
    .single();
  return user?.user_roles?.role_slug;
}
export async function getAuthUser() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return user;
  }
}
