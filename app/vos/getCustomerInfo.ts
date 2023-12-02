"use server";

import VOSLogin from "./VOSLogin";
import { JSDOM } from "jsdom";

export default async function getCustomerInfo({ name }: { name: string }) {
    const VOS = await VOSLogin();
    if (VOS?.details) {
        const customersPage = await fetch(
            `https://${VOS?.details?.ip}/customers`,
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
        const customers: any = [];
        // Process each row
        rows?.forEach((row) => {
            const cells = row.querySelectorAll("td");
            const rowData = Array.from(cells).map((cell: any) =>
                cell.textContent.trim()
            );
            // Create an object with the column headers as keys
            const rowObject = {
                name: rowData[0],
                balance: rowData[2],
                over_draft: rowData[3],
            };
            // Add the object to the array
            customers.push(rowObject);
        });
        const customer = customers.find(
            (customer: any) => customer.name === name
        );
        if (customer) {
            return { data: customer };
        } else return { error: "Customer not found" };
    } else return { data: [] };
}
