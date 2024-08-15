"use server";

import { profileFormSchema } from "@/components/auth/CompleteProfileModal";
import { supabaseServer } from "@/lib/supabase-server";
import { z } from "zod";

export async function updateUser(
  userId: string,
  formData: z.infer<typeof profileFormSchema>,
) {
  const supabase = supabaseServer();
  const { error } = await supabase
    .from("profiles")
    .update(formData)
    .eq("id", userId);
  return { error: error?.message || null };
}
export async function updateUserProfile(attributes: any, userId: string) {
  const supabase = supabaseServer();
  const { error } = await supabase
    .from("profiles")
    .update(attributes)
    .eq("id", userId);
  return { error };
}

export async function signOut() {
  const supabase = supabaseServer();
  const { error } = await supabase.auth.signOut();
  return { error };
}
