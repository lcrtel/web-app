import SubmitRoutes from "@/emails/SubmitRoutes";
import { fetchUserMetadata } from "@/utils/user";
import { render } from "@react-email/render";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { error } from "console";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import { jsPDF } from "jspdf";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    const invoiceData = await req.json();
console.log(req);

    // const transporter = nodemailer.createTransport({
    //     host: "smtp.gmail.com",
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: process.env.SMTP_USER,
    //         pass: process.env.SMTP_PASSWORD,
    //     },
    // });
    // try {
    //     await transporter.sendMail({
    //         from: process.env.SMTP_USER,
    //         to: "pkmymoonpk@gmail.com",
    //         subject: `Invoice`,
    //         attachments: [
    //             {
    //                 filename: "generated.pdf",
    //             },
    //         ],
    //     });
    // } catch (error) {
    //     console.log(error);
    // }
    return NextResponse.json("Hi");
}
