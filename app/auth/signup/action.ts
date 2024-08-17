"use server";
import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signupFormSchema } from "./signup-form";

type signUpInputs = z.infer<typeof signupFormSchema>;

export const signUp = async (formData: signUpInputs) => {
  const supabase = supabaseServer();
  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        name: formData.name,
        company_name: formData.company_name,
        phone: formData.phone,
        skype_id: formData.skype_id,
      },
    },
  });
  if (error) {
    return redirect(`/auth/signup?error=${error.message}`);
  }
  return redirect(
    // "/auth/login?message=Check email to continue sign in process",
    "/auth/verify?email=" + encodeURIComponent(formData.email),
  );
};
