"use server";
import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export const signUp = async (formData: any) => {
  const supabase = await supabaseServer();
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
    return { error: error.message };
  }
  return redirect(
    "/auth/verify-otp?email=" + encodeURIComponent(formData.email),
  );
};
