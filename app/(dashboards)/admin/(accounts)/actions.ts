"use server";

import AddClientMailTemplate from "@/emails/AddClient";
import AddVendorMailTemplate from "@/emails/AddVendor";
import DeleteAccount from "@/emails/DeleteAccount";
import LoginCredentialsUpdate from "@/emails/LoginCredentialsUpdate";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { renderAsync } from "@react-email/render";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function deleteAccount(user: any, role: string) {
    const supabase = supabaseAdminServer();
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    revalidatePath(`/admin/${role}`);

    if (error) {
        return { error: error.message };
    }
    const emailHtml = await renderAsync(DeleteAccount({ user: user }));
    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user?.email,
        subject: `Account Deletion Notification`,
        html: emailHtml,
    });

    return { success: true };
}

export async function updateCredentials(user: any) {
    const supabase = supabaseAdminServer();
    const { error } = await supabase.auth.admin.updateUserById(user.id, {
        email: user.email,
        password: user.password,
    });

    if (error) {
        return { error: error.message };
    }
    const emailHtml = await renderAsync(LoginCredentialsUpdate({ user: user }));
    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user?.email,
        subject: `Your Login Credentials Has Been Updated`,
        html: emailHtml,
    });
    return { success: true };
}

export async function updateAccountDetails(user: any) {
    const supabase = supabaseAdminServer();
    const { error } = await supabase
        .from("profiles")
        .update({
            name: user.name,
            company_name: user.company_name,
            phone: user.phone,
            skype_id: user.skype_id,
            role: user.role,
            agent_id: user.agent_id,
        })
        .eq("id", user.id);

    if (error) {
        return { error: error.message };
    }
    return { success: true };
}

export async function addVendor(user: any) {
    const supabase = supabaseAdminServer();

    const { error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: {
            name: user.name,
            company_name: user.company_name,
            email: user.email,
            phone: user.phone,
            skype_id: user.skype_id,
            role: "vendor",
        },
    });

    if (error) {
        return { error: error.message };
    }
    const emailHtml = await renderAsync(AddVendorMailTemplate({ user: user }));
    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user?.email,
        subject: `Welcome to LCRTel.com! Account Details Inside.`,
        html: emailHtml,
    });
    return { success: true };
}
export async function addClient(user: any) {
    const supabase = supabaseAdminServer();

    const { error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: {
            name: user.name,
            company_name: user.company_name,
            email: user.email,
            phone: user.phone,
            skype_id: user.skype_id,
            role: "client",
        },
    });

    if (error) {
        return { error: error.message };
    }
    const emailHtml = await renderAsync(AddClientMailTemplate({ user: user }));
    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user?.email,
        subject: `Welcome to LCRTel.com! Account Details Inside.`,
        html: emailHtml,
    });
    return { success: true };
}

export async function updateFinanceDipartment(data: any) {
    const supabase = supabaseAdminServer();
    return await supabase
        .from("profiles")
        .update({ finance_department: data.finance_department })
        .eq("id", data.user_id);
}

export async function updateNOCDipartment(data: any) {
    const supabase = supabaseAdminServer();
    return await supabase
        .from("profiles")
        .update({ noc_department: data.noc_department })
        .eq("id", data.user_id);
}

export async function updateSalesDipartment(data: any) {
    const supabase = supabaseAdminServer();
    return await supabase
        .from("profiles")
        .update({ sales_department: data.sales_department })
        .eq("id", data.user_id);
}
