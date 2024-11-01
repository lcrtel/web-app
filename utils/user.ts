"use server";
import { supabaseServer } from "@/lib/supabase-server";
export async function fetchUserRole() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("user_roles")
    .select("role_slug")
    .single();
  return data?.role_slug;
}

export async function fetchUserMetadata() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return user.user_metadata;
  }
}
export async function getUser() {
  const supabase = await supabaseServer();
  const { data: user } = await supabase
    .from("profiles")
    .select("*, user_roles(*)")
    .single();
  return user;
}
export async function fetchUser() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return user;
  }
}
export async function checkIsUserAnonymous() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user?.is_anonymous) {
    return true;
  } else {
    return false;
  }
}
