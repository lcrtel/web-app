"use server";

import VOSLogin from "./VOSLogin";
import { JSDOM } from "jsdom";

export default async function getRates({ name }: { name: string | null }) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const VOS = await VOSLogin();
    const extractIdFromUrl = (url: string | null) => {
        const match = url?.match(/\/(\d+)$/); // Extracts the last digits after the last '/'
        return match ? match[1] : null;
    };
    if (VOS?.details) {
        try {
            const customers: any[] = [];
            let rates: any[] = [];
            const customersPage = await fetch(
                `https://${VOS?.details?.ip}/rate_management`,
                {
                    headers: { Cookie: VOS?.details?.cookie },
                }
            );
            const html = await customersPage.text();
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
                customers.push(rowObject);
            });

            const customer = customers.find(
                (customer: any) => customer?.name === name
            );

            const res = await fetch(
                `https://${VOS?.details?.ip}/rate_management/viewrates/${customer?.rates_url}`,
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
                        area_prefix: rowData[2],
                        rate: rowData[6],
                    };
                    // Add the object to the array
                    rates.push(rowObject);
                });
            });

            if (customer) {
                return { data: rates };
            } else return { error: "no rates found" };
        } catch (error) {
            return { error: error };
        }
    } else return { data: [] };
}
