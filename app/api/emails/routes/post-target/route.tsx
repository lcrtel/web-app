import SubmitTargets from "@/emails/SubmitTargets";
import { fetchUserMetadata } from "@/utils/user";
import { render } from "@react-email/render";
import XLSX from "xlsx";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(request: Request) {
    const buyingTargets = await request.json();
    const user = await fetchUserMetadata();
    const targetDetailsForExcel = buyingTargets.map((route: RouteOffer) => {
        const { id, ...rest } = route;
        return rest;
    });
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(targetDetailsForExcel);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Target Details");
    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "buffer",
    });
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    const emailHtml = render(
        <SubmitTargets data={buyingTargets.slice(0, 10)} user={user} />
    );
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: user?.email,
            subject: `Your Buying Targets Have Been Posted`,
            html: emailHtml,
            attachments: [
                {
                    filename: "Target Details.xlsx",
                    content: excelBuffer,
                },
            ],
        });
    } catch (error) {
        console.log(error);
    }

    return NextResponse.json(buyingTargets);
}
