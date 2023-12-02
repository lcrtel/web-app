"use server";

import VOSLogin from "./VOSLogin";
import { JSDOM } from "jsdom";

export default async function getVendorInfo({ name }: { name: string }) {
    const VOS = await VOSLogin();
    if (VOS?.details) {
        const vendorsPage = await fetch(
            `https://${VOS?.details?.ip}/routing_management`,
            {
                headers: { Cookie: VOS?.details?.cookie },
            }
        );
        const vendorsPageHtml = await vendorsPage.text();

        const dom = new JSDOM(vendorsPageHtml);
        const document = dom.window.document;
        // Access the table and its rows
        const table = document.querySelector("table");
        const rows = table?.querySelectorAll("tbody tr");
        // Create an array to store the parsed data
        const vendors: any = [];
        // Process each row
        rows?.forEach((row) => {
            const cells = row.querySelectorAll("td");
            const rowData = Array.from(cells).map((cell: any) =>
                cell.textContent.trim()
            );
            // Create an object with the column headers as keys
            const rowObject = {
                name: rowData[0],
                balance: rowData[3],
                over_draft: rowData[4],
            };
            // Add the object to the array
            vendors.push(rowObject);
        });
        const vendor = vendors.find((vendor: any) => vendor.name === name);
        if (vendor) {
            return { data: vendor };
        } else return { error: "Vendor not found" };
    } else return { data: [] };
}
