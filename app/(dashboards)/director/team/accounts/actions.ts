"use server";

import AddAccountEmail from "@/emails/AddAccountEmail";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { transporter } from "@/utils/smtp-transporter";
import { renderAsync } from "@react-email/render";

export async function addManager(accountant: any) {
    const supabase = supabaseAdminServer();
    const { error } = await supabase.auth.admin.createUser({
        email: accountant.email,
        password: accountant.password,
        email_confirm: true,
        user_metadata: {
            name: accountant.name,
            company_name: "LCRTel",
            email: accountant.email,
            phone: accountant.phone,
            skype_id: accountant.skype_id,
            role: "accountant",
            agent_id: "",
        },
    });

    if (error) {
        return { error: error.message };
    }
    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: accountant?.email,
        subject: "Welcome to LCRTel.com! Account Details Inside.",
        html: await renderAsync(AddAccountEmail({ user: accountant })),
    });
}
