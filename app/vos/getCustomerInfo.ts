"use server";

import VOSLogin from "./VOSLogin";
import { JSDOM } from "jsdom";

export default async function getCustomerInfo({ name }: { name: string }) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const VOS = await VOSLogin();
    if (VOS?.details) {
        try {
            const customersPage = await fetch(
                `https://${VOS?.details?.ip}/customers`,
                {
                    headers: { Cookie: VOS?.details?.cookie },
                }
            );
            const html = await customersPage.text();
            const dom = new JSDOM(html);
            const document = dom.window.document;
            const table = document.querySelector("table");
            const rows = table?.querySelectorAll("tbody tr");
            const customers: any = [];
            rows?.forEach((row) => {
                const cells = row.querySelectorAll("td");
                const rowData = Array.from(cells).map((cell: any) =>
                    cell.textContent.trim()
                );
                const rowObject = {
                    name: rowData[0],
                    balance: rowData[2],
                    over_draft: rowData[3],
                };
                customers.push(rowObject);
            });
            const customer = customers.find(
                (customer: any) => customer.name === name
            );
            if (customer) {
                return { data: customer };
            } else return { error: "Customer not found" };
        } catch (error) {
            return { error: error };
        }
    } else return { data: [] };
}
