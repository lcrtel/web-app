"use server";

import { JSDOM } from "jsdom";
import * as XLSX from "xlsx";
import VOSLogin from "./VOSLogin";

export default async function getCDRReport({
    startDate,
    endDate,
}: {
    startDate: string;
    endDate: string;
}) {
    const VOS = await VOSLogin();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const date = new Date();
    const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
    )}-${String(date.getDate()).padStart(2, "0")}%2000:00:00`;
    
    if (VOS?.details) {
        let rates: any[] = [];
        const mappingGatewayPage = await fetch(
            `https://${VOS?.details?.ip}/reports?export=csv&search=1&page=1&call_status=1&timezone=Select%20Time%20Zone&starttime=2023-11-28%2000:00:00&stoptime=2023-12-01%2023:59:59&customeraccount=VOICE3LINK&separator=comma`,
            {
                headers: { Cookie: VOS?.details?.cookie },
            }
        );
        const blob = await mappingGatewayPage.blob();
        const workbook = XLSX.read(await blob.arrayBuffer(), { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        if (jsonData) {
            return { count: jsonData.length };
        } else return { error: "no rates found" };
    } else return { data: [] };
}
