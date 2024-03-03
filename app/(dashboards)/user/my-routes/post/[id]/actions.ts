"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { renderAsync } from "@react-email/render";
import nodemailer from "nodemailer";
import RouteOfferUpdatesEmail from "./RouteOfferUpdatesEmail";
import { getUpdatedValues } from "@/utils/getUpdatedValuesOfObject";
import { add20Percent } from "@/utils/rateHikes";

export async function updateRoute(oldRoute: Route, updatedRoute: Route) {
    const supabase = supabaseServer();
    const { data: route, error }: any = await supabase
        .from("routes")
        .update({
            ...updatedRoute,
            updated_at: new Date().toISOString(),
            selling_rate: add20Percent(Number(updatedRoute.rate)),
        })
        .eq("id", oldRoute.id)
        .select(`*, profiles (*)`)
        .single();
    if (error) {
        return { error: error.message };
    } else {
        return {
            oldRecords: oldRoute,
            updatedRecords: updatedRoute,
            userDetails: route?.profiles,
        };
    }
}

export async function sendUpdateNotification(
    oldRoute: Route | undefined,
    updatedRoute: Route | undefined,
    user: any
) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    if (oldRoute && updatedRoute && user) {
        const emailHtml = await renderAsync(
            RouteOfferUpdatesEmail({
                newRoute: updatedRoute,
                oldRoute: oldRoute,
                username: user?.name,
            })
        );
        transporter.sendMail({
            from: process.env.SMTP_USER,
            to: user?.email,
            cc: [
                user?.finance_department?.email,
                user?.noc_department?.email,
                user?.sales_department?.email,
            ],
            subject: `Your route offer have been updated`,
            html: emailHtml,
        });
    }
}
