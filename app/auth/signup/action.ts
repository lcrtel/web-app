"use server";
import { supabaseServer } from "@/lib/supabase-server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUp = async (formData: any) => {
    const origin = headers().get("origin");
    const supabase = supabaseServer();

    const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
            data: {
                name: formData.name,
                company_name: formData.company_name,
                email: formData.email,
                phone: formData.phone,
                skype_id: formData.skype_id,
                role: "client",
                agent_id: "",
                finance_department: {},
                noc_department: {},
                sales_department: {},
            },
            emailRedirectTo: `${origin}/api/auth/callback`,
        },
    });

    if (error) {
        return redirect(`/auth/signup?message=${error.message}`);
    }
    fetch(`${origin}/api/emails/auth/signup`, {
        method: "POST",
        body: JSON.stringify({
            name: formData.name,
            company_name: formData.company_name,
            email: formData.email,
            password: formData.password,
        }),
    });
    return redirect(
        "/auth/login?message=Check email to continue sign in process"
    );
};
