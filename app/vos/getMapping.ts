"use server";

import { JSDOM } from "jsdom";
import VOSLogin from "./VOSLogin";

export default async function getMapping() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const VOS = await VOSLogin();
    
    if (VOS?.details) {
        const mappingGateways: any[] = [];
        let rates: any[] = [];
        const mappingGatewayPage = await fetch(
            `https://${VOS?.details?.ip}/mapping_management`,
            {
                headers: { Cookie: VOS?.details?.cookie },
            }
        );
        const html = await mappingGatewayPage.text();
        // Parse HTML using jsdom
        const dom = new JSDOM(html);
        const document = dom.window.document;
        // Access the table and its rows
        const table = document.querySelector("table");
        const rows = table?.querySelectorAll("tbody tr");
        // Create an array to store the parsed data
        // Process each row
        rows?.forEach((row) => {
            const cells = row.querySelectorAll("td");
             const rowData = Array.from(cells).map((cell: any) =>
                 cell.textContent.trim()
             );
            // Create an object with the column headers as keys
            const rowObject = {
                client: rowData[0],
                name: rowData[1],
                capacity: rowData[2],
                ip: rowData[6].replace(" ", ", "),
            };
            // Add the object to the array
            mappingGateways.push(rowObject);
        });

        if (mappingGateways) {
            return { count: mappingGateways.length, data: mappingGateways };
        } else return { error: "no rates found" };
    } else return { data: [] };
}
