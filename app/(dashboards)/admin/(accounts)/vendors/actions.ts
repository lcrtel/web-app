"use server";
import AddClientMailTemplate from "@/emails/AddClient";
import AddVendorMailTemplate from "@/emails/AddVendor";
import { renderAsync } from "@react-email/render";
import { createServerClient } from "@supabase/ssr";
import nodemailer from "nodemailer";

export async function addVendor(formData: any) {
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            cookies: {},
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );

    const { error } = await supabase.auth.admin.createUser({
        email: formData.email,
        password: formData.password,
        email_confirm: true,
        user_metadata: {
            name: formData.name,
            company_name: formData.company_name,
            email: formData.email,
            phone: formData.phone,
            skype_id: formData.skype_id,
            role: "vendor",
        },
    });

    if (error) {
        return { error: error.message };
    }
}

export async function sendVendorGreetingMail(formData: any) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const emailHtml = await renderAsync(
        AddVendorMailTemplate({ user: formData })
    );

    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: formData?.email,
        subject: `Welcome to LCRTel.com! Account Details Inside.`,
        html: emailHtml,
    });
}
