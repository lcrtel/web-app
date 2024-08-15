"use server";

import AddAccountEmail from "@/emails/AddAccountEmail";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { transporter } from "@/utils/smtp-transporter";
import { renderAsync } from "@react-email/render";

export async function addManager(noc: any) {
    const supabase = supabaseAdminServer();
    const { error } = await supabase.auth.admin.createUser({
        email: noc.email,
        password: noc.password,
        email_confirm: true,
        user_metadata: {
            name: noc.name,
            company_name: "LCRTel",
            email: noc.email,
            phone: noc.phone,
            skype_id: noc.skype_id,
            role: "noc",
            agent_id: "",
        },
    });

    if (error) {
        return { error: error.message };
    }
    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: noc?.email,
        subject: "Welcome to LCRTel.com! Account Details Inside.",
        html: await renderAsync(AddAccountEmail({ user: noc })),
    });
}
