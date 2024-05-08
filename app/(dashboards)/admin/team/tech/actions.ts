"use server";

import AddAccountEmail from "@/emails/AddAccountEmail";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { transporter } from "@/utils/smtp-transporter";
import { renderAsync } from "@react-email/render";

export async function addManager(tech: any) {
    const supabase = supabaseAdminServer();
    const { error } = await supabase.auth.admin.createUser({
        email: tech.email,
        password: tech.password,
        email_confirm: true,
        user_metadata: {
            name: tech.name,
            company_name: "LCRTel",
            email: tech.email,
            phone: tech.phone,
            skype_id: tech.skype_id,
            role: "tech",
            agent_id: "",
        },
    });

    if (error) {
        return { error: error.message };
    }
    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: tech?.email,
        subject: "Welcome to LCRTel.com! Account Details Inside.",
        html: await renderAsync(AddAccountEmail({ user: tech })),
    });
}
