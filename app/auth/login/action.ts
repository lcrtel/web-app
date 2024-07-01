"use server";

import { z } from "zod";
import { loginFormSchema } from "./login-form";
import { supabaseServer } from "@/lib/supabase-server";

type inputs = z.infer<typeof loginFormSchema>;
export async function signInWithPassword(formData: inputs) {
  const supa = supabaseServer();
  const { error } = await supa.auth.signInWithPassword(formData);
  if (error) {
    return { error: error.message };
  }
}
