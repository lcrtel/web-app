"use server";

import { z } from "zod";
import { supabaseServer } from "@/lib/supabase-server";

export async function signInWithPassword(formData: any) {
  const supa = supabaseServer();
  const { error } = await supa.auth.signInWithPassword(formData);
  if (error) {
    return { error: error.message };
  }
}
