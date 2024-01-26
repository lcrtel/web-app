"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { z } from "zod";
import nodemailer from "nodemailer";
import AddAgentMailTemplate from "@/emails/AddAgent";
import { renderAsync } from "@react-email/render";

const profileFormSchema = z.object({
    name: z.string(),
    company_name: z.string().optional(),
    email: z.string().email(),
    phone: z.number().min(10),
    password: z.string(),
    skype_id: z.string().optional(),
    email_confirm: z.boolean().default(false),
});

export async function addAgent(formData: any) {
    const validatedFields = profileFormSchema.safeParse({
        email: formData.email,
    });
    const cookieStore = cookies();
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
            company_name: "",
            email: formData.email,
            phone: formData.phone,
            skype_id: formData.skype_id,
            role: "agent",
        },
    });

    if (error) {
        return { error: error.message };
    }
}

export async function sendAgentGreetingMail(formData: any) {
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
        AddAgentMailTemplate({ user: formData })
    );

    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: formData?.email,
        subject: `Welcome to LCRTel.com! Account Details Inside.`,
        html: emailHtml,
    });
}
