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
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text("Invoice", 105, 20, { align: "center" });

    // Add billing information
    pdf.setFontSize(14);
    pdf.text("Bill To:", 20, 40);
    pdf.text("Customer Name", 20, 50);
    pdf.text("123 Main Street", 20, 60);
    pdf.text("City, Country", 20, 70);

    // Add invoice details
    pdf.setFontSize(10);
    pdf.text("Invoice Date: August 28, 2023", 140, 40);
    pdf.text("Due Date: September 10, 2023", 140, 50);
    pdf.text("Invoice #: 12345", 140, 60);

    // Add table header
    pdf.setFillColor(200);
    pdf.rect(20, 90, 170, 10, "F");
    pdf.setTextColor(255);
    pdf.text("Description", 25, 95);
    pdf.text("Quantity", 95, 95);
    pdf.text("Unit Price", 125, 95);
    pdf.text("Total", 165, 95);

    // Add invoice items
    const items = [
        { description: "Item 1", quantity: 2, unitPrice: 50 },
        { description: "Item 2", quantity: 3, unitPrice: 30 },
    ];

    let y = 105;
    let total = 0;
    items.forEach((item) => {
        const itemTotal = item.quantity * item.unitPrice;
        total += itemTotal;

        pdf.setTextColor(0);
        pdf.text(item.description, 25, y);
        pdf.text(item.quantity.toString(), 95, y);
        pdf.text("$" + item.unitPrice.toFixed(2), 125, y);
        pdf.text("$" + itemTotal.toFixed(2), 165, y);

        y += 10;
    });

    // Add total
    pdf.setTextColor(0);
    pdf.text("Total:", 125, y);
    pdf.text("$" + total.toFixed(2), 165, y);
    const pdfDataUri = pdf.output("datauristring");

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
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: "pkmymoonpk@gmail.com",
            subject: `Invoice`,
            attachments: [
                {
                    filename: "generated.pdf",
                    path: pdfDataUri,
                },
            ],
        });
    } catch (error) {
        console.log(error);
    }
    return NextResponse.json(invoiceData);
}
