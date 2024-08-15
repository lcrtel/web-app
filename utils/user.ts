"use server";
import { supabaseServer } from "@/lib/supabase-server";
export async function fetchUserRole() {
  const supabase = supabaseServer();
  const { data } = await supabase.from("user_roles").select("role").single();
  if (data?.role) {
    return data.role;
  }
}

export async function fetchUserMetadata() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return user.user_metadata;
  }
}
export async function getUser() {
  const supabase = supabaseServer();
  const { data: user } = await supabase.from("profiles").select("*").single();
  return user;
}
export async function fetchUser() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return user;
  }
}
export async function checkIsUserAnonymous() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user?.is_anonymous) {
    return true;
  } else {
    return false;
  }
}

