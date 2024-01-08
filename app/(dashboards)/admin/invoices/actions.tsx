"use server";
import InvoiceTemplate from "@/emails/Invoice";
import { supabaseServer } from "@/lib/supabase-server";
import formatDate from "@/utils/formatDate";
import { renderAsync } from "@react-email/render";
import nodemailer from "nodemailer";

export default async function sendInvoice(data: any) {
    const supabase = await supabaseServer();
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const { data: inv, error } = await supabase
        .from("invoices")
        .insert([data.invoice_details])
        .select(`*, profiles (*)`)
        .single();

    if (error) {
        return { success: false, error: error };
    } else {
        const emailHtml = await renderAsync(
            <InvoiceTemplate data={{ ...inv }} />
        );
        try {
            transporter.sendMail({
                from: process.env.SMTP_USER,
                to: data.to,
                cc: data.cc,
                subject: `Route Usage Invoice`,
                html: emailHtml,
            });
        } catch (error) {
            return error;
        }
        return { success: true };
    }

    console.log(data);
}

export async function sendBulkInvoice(invoices: any) {
    try {
        invoices.invoices.map(
            async (invoice: any) =>
                await sendInvoice({
                    invoice_details: {
                        date_issued: invoices.date_issued,
                        date_due: invoices.date_due,
                        invoice_to: invoice.invoice_to.id,
                        description: `Invoice period: ${formatDate(
                            invoices.start_date
                        )} to ${formatDate(invoices.end_date)}. Calls: ${
                            invoice.calls
                        }. Duration: ${invoice.total_duration}mins.`,
                        total_amount: invoice.total_amount,
                        balance: invoice.total_amount,
                        bill_to: invoices.bill_to,
                    },
                    to: invoice.invoice_to.email,
                    cc: invoice.cc,
                })
        );
    } catch (error) {
        return { success: false, error: error };
    }
    return { success: true };
}
