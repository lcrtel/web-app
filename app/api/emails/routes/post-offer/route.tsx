import SubmitRoutes from "@/emails/SubmitRoutes";
import { fetchUserMetadata } from "@/utils/user";
import { render } from "@react-email/render";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import XLSX from "xlsx";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const routeOffers = await request.json();
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const user = await fetchUserMetadata();
    if (user?.role === "buyer") {
        await supabase.auth.updateUser({
            data: { role: "seller" },
        });
    }
    const routeDetailsForExcel = routeOffers.map((route: RouteOffer) => {
        const { id, ...rest } = route;
        return rest;
    });
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(routeDetailsForExcel);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Route Details");
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
        <SubmitRoutes data={routeOffers.slice(0, 10)} user={user} />
    );
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: user?.email,
            subject: `Your Route Offers Have Been Submitted`,
            html: emailHtml,
            attachments: [
                {
                    filename: "Route Details.xlsx",
                    content: excelBuffer,
                },
            ],
        });
    } catch (error) {
        console.log(error);
    }

    return NextResponse.json(routeOffers);
}
