"use server";

import AddAccountEmail from "@/emails/AddAccountEmail";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { transporter } from "@/utils/smtp-transporter";
import { renderAsync } from "@react-email/render";

export async function addManager(salesman: any) {
    const supabase = supabaseAdminServer();
    const { error } = await supabase.auth.admin.createUser({
        email: salesman.email,
        password: salesman.password,
        email_confirm: true,
        user_metadata: {
            name: salesman.name,
            company_name: "LCRTel",
            email: salesman.email,
            phone: salesman.phone,
            skype_id: salesman.skype_id,
            role: "salesman",
            agent_id: "",
        },
    });

    if (error) {
        return { error: error.message };
    }
    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: salesman?.email,
        subject: "Welcome to LCRTel.com! Account Details Inside.",
        html: await renderAsync(AddAccountEmail({ user: salesman })),
    });
}
