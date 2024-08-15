"use server";

import AddAccountEmail from "@/emails/AddAccountEmail";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { transporter } from "@/utils/smtp-transporter";
import { renderAsync } from "@react-email/render";

export async function addManager(manager: any) {
    const supabase = supabaseAdminServer();
    const { error } = await supabase.auth.admin.createUser({
        email: manager.email,
        password: manager.password,
        email_confirm: true,
        user_metadata: {
            name: manager.name,
            company_name: "LCRTel",
            email: manager.email,
            phone: manager.phone,
            skype_id: manager.skype_id,
            role: "manager",
            agent_id: "",
        },
    });

    if (error) {
        return { error: error.message };
    }
    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: manager?.email,
        subject: "Welcome to LCRTel.com! Account Details Inside.",
        html: await renderAsync(AddAccountEmail({ user: manager })),
    });
}
