import { supabaseRouteHandler } from "@/lib/supabaseRouteHandler";
import nodemailer from "nodemailer";
import InvoiceTemplate from "@/emails/Invoice";
import { renderAsync } from "@react-email/render";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const formData = await request.json();

    const supabase = await supabaseRouteHandler();
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    try {
        for (const invoice of formData) {
            const { data: inv, error } = await supabase
                .from("invoices")
                .insert([invoice])
                .select(`*, profiles (*)`)
                .single();

            if (error) {
                throw new Error(`Supabase error: ${error.message}`);
            }

            const emailHtml = await renderAsync(
                <InvoiceTemplate data={{ ...inv }} />
            );
            transporter.sendMail({
                from: process.env.SMTP_USER,
                to: inv?.profiles?.email || process.env.SMTP_USER,
                subject: `Route Usage Invoice`,
                html: emailHtml,
            });
        }

        return new Response("Invoice Sent successfully", { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
