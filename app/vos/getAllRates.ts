"use server";

import VOSLogin from "./VOSLogin";
import { JSDOM } from "jsdom";

export default async function getAllRates() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const VOS = await VOSLogin();
    const extractIdFromUrl = (url: string | null) => {
        const match = url?.match(/\/(\d+)$/); // Extracts the last digits after the last '/'
        return match ? match[1] : null;
    };
    if (VOS?.details) {
        const rateGroups: any[] = [];
        let rates: any[] = [];
        const ratesPage = await fetch(
            `https://${VOS?.details?.ip}/rate_management`,
            {
                headers: { Cookie: VOS?.details?.cookie },
            }
        );
        const html = await ratesPage.text();
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
            const rowData = Array.from(cells).map((cell) => {
                const anchor = cell.querySelector("a");
                return anchor
                    ? extractIdFromUrl(anchor.getAttribute("href"))
                    : cell.textContent?.trim();
            });
            // Create an object with the column headers as keys
            const rowObject = {
                name: rowData[0],
                rates_url: rowData[2],
            };
            // Add the object to the array
            rateGroups.push(rowObject);
        });

        const fetchRateGroups = async (id: number, name: string) => {
            await fetch(
                `https://${VOS?.details?.ip}/rate_management/viewrates/${id}`,
                {
                    headers: { Cookie: VOS?.details?.cookie },
                }
            ).then(async (response) => {
                const html = await response.text();
                // Parse HTML using jsdom
                const dom = new JSDOM(html);
                const document = dom.window.document;
                // Access the table and its rows
                const table = document.querySelector("table");
                const rows = table?.querySelectorAll("tbody tr");
                rows?.forEach((row) => {
                    const cells = row.querySelectorAll("td");
                    const rowData = Array.from(cells).map((cell: any) =>
                        cell.textContent.trim()
                    );
                    // Create an object with the column headers as keys
                    const rowObject = {
                        client: name,
                        prefix: rowData[1],
                        area_prefix: rowData[2],
                        rate: rowData[6],
                    };
                    // Add the object to the array
                    rates.push(rowObject);
                });
            });
        };

        if (rateGroups) {
            return { count: rateGroups.length, data: rateGroups };
        } else return { error: "no rates found" };
    } else return { data: [] };
}
