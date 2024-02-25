"use server";

import DeleteTargetEmail from "@/emails/DeleteTargetEmail";
import SubmitTargets from "@/emails/SubmitTargets";
import UpdateTargetRate from "@/emails/target-rate/UpdateTargetRate";
import { supabaseServer } from "@/lib/supabase-server";
import { transporter } from "@/utils/smtp-transporter";
import { fetchUserData, fetchUserMetadata } from "@/utils/user";
import { renderAsync } from "@react-email/render";
import XLSX from "xlsx";

export async function postTargets(data: any) {
    const user = await fetchUserMetadata();
    const supabase = supabaseServer();
    const targetDetailsForExcel = data.map((route: Route) => {
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
    const { error } = await supabase.from("targets").insert(
        data.map((route: any) => ({
            destination: route.destination,
            destination_code: route.destination_code,
            rate: route.rate,
            buying_rate: dec20Percent(Number(route.rate)),
            route_type: route.route_type,
            asr: route.asr,
            acd: route.acd,
            ports: route.ports,
            capacity: route.capacity,
            pdd: route.pdd,
        }))
    );
    if (error) {
        return { error: error.message };
    }
    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user?.email,
        subject: `Your Buying Targets Have Been Posted`,
        html: await renderAsync(
            SubmitTargets({ data: data.slice(0, 10), user: user })
        ),
        attachments: [
            {
                filename: "Target Details.xlsx",
                content: excelBuffer,
            },
        ],
    });
}
function dec20Percent(rate: number) {
    const commission = rate * 0.2;
    const result = rate - commission;
    return result.toFixed(5).toString();
}

export async function deleteTarget(routeId: string) {
    const user = await fetchUserMetadata();
    const supabase = supabaseServer();
    const { data: target } = await supabase
        .from("targets")
        .select("*")
        .eq("id", routeId)
        .single();
    const { error } = await supabase
        .from("targets")
        .delete()
        .eq("id", routeId)
        .select();
    if (error) {
        return { error: error.message };
    }
    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user?.email,
        subject: "Confirmation: Your Buying Target Has Been Deleted",
        html: await renderAsync(
            DeleteTargetEmail({ target: target, user: user })
        ),
    });
}

export async function updateTarget(oldTarget: Target, newTarget: any) {
    const updatedValues = getUpdatedValues(oldTarget, newTarget);
    if (updatedValues) {
        const user = await fetchUserMetadata();
        const supabase = supabaseServer();
        const { error } = await supabase
            .from("targets")
            .update(newTarget)
            .eq("id", oldTarget.id)
            .select();
        if (error) {
            return { error: error.message };
        }
        transporter.sendMail({
            from: process.env.SMTP_USER,
            to: user?.email,
            subject: "Confirmation: Your Target Rate Has Been Updated",
            html: await renderAsync(
                UpdateTargetRate({ updatedValues: updatedValues, user: user })
            ),
        });
    }
    return
}
function getUpdatedValues(oldObj: any, newObj: any) {
    const updatedValues: any = {};

    // Iterate through the properties of the new object
    for (const key in newObj) {
        // Check if the property exists in the old object and has been updated
        if (oldObj.hasOwnProperty(key) && oldObj[key] !== newObj[key]) {
            updatedValues[key] = {
                oldValue: oldObj[key],
                newValue: newObj[key],
            };
        }
    }

    return updatedValues;
}
