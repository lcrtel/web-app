import InvoiceTemplate from "@/emails/Invoice";
import { fetchUserMetadata } from "@/utils/user";
import { render } from "@react-email/render";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const invoiceDetails = await request.json();

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    console.log(invoiceDetails);

    const demo = {
        id: "11384a23-afbf-4de5-94cc-921646ccdeaa",
        buyer_id: "9f6bb439-1c92-4b60-b8ba-364fc6387214",
        route_id: "c30fc848-125d-442d-a443-9fd8bcb1acc8",
        status: "pending",
        expiration_date: null,
        payment_type: "postpaid",
        rate: null,
        route_offers: {
            id: "c30fc848-125d-442d-a443-9fd8bcb1acc8",
            seller_id: "b77a2da6-5d7a-4040-a84b-d14e20ac8c17",
            destination: "bd",
            rate: "0.0085",
            route_type: "non-cli",
            prefix: "95",
            asr: "20",
            acd: "3",
            ports: "30",
            capacity: "300",
            verification: "verified",
            verification_by: null,
            verified_at: null,
            created_at: "2023-10-15T16:25:46.231302+00:00",
            updated_at: "2023-10-15T16:30:08.03+00:00",
            destination_code: "8801",
            pdd: "1",
            selling_rate: "0.009",
        },
        invoice_id: 57,
        date_issued: "2023-10-23T14:31:37.129+00:00",
        total_amount: 0.036,
        paid_at: null,
        description: "Mon Oct 16 2023 - Mon Oct 23 2023",
        date_due: "2023-10-30T14:31:37.129+00:00",
        bill_to: {
            id: 1,
            name: "Test",
            branch: "Calicut",
            bank_name: "HDFC",
            ifsc_code: "HDFC65465465465",
            account_no: "646546549864216545",
            account_type: "Current",
        },
        agent: null,
        invoice_to: "9f6bb439-1c92-4b60-b8ba-364fc6387214",
        note: "",
        balance: 0.036,
        connection_id: "11384a23-afbf-4de5-94cc-921646ccdeaa",
        quantity: 4,
        profiles: {
            id: "9f6bb439-1c92-4b60-b8ba-364fc6387214",
            first_name: "d2call",
            last_name: "",
            email: "billing@d2call.com",
            phone: "9567294135",
            skype_id: "",
            role: "seller",
            finance_department: null,
            noc_dipartment: null,
            sales_dipartment: null,
            payment_method: null,
        },
    };


    const emailHtml = render(
        <InvoiceTemplate data={invoiceDetails}  />
    );

    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            // to: invoiceDetails.profiles.email,
            to: "pkmymoonpk@gmail.com",
            subject: `Route Usage Invoice`,
            html: emailHtml,
        });
    } catch (error) {
        console.log(error);
    }

    return NextResponse.json(null);
}
