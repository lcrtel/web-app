"use server";

import { JSDOM } from "jsdom";
import VOSLogin from "./VOSLogin";

export default async function getRouting() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const VOS = await VOSLogin();
    
    if (VOS?.details) {
        const routingGateways: any[] = [];
        let rates: any[] = [];
        const routingGatewayPage = await fetch(
            `https://${VOS?.details?.ip}/routing_management/view_routing_gateway`,
            {
                headers: { Cookie: VOS?.details?.cookie },
            }
        );
        const html = await routingGatewayPage.text();
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
                vendor: rowData[0],
                name: rowData[1],
                ports: rowData[3],
                ip: rowData[6],
            };
            // Add the object to the array
            routingGateways.push(rowObject);
        });

        if (routingGateways) {
            return { count: routingGateways.length, data: routingGateways };
        } else return { error: "no rates found" };
    } else return { data: [] };
}
