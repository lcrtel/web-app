"use server";

import VOSLogin from "./VOSLogin";
import { JSDOM } from "jsdom";

export default async function getPayments({ name }: { name: string | null }) {
    const VOS = await VOSLogin();
    if (VOS?.details) {
        const payments: any[] = [];
        const paymentsPage = await fetch(
            `https://${VOS?.details?.ip}/finances/invoices`,
            {
                headers: { Cookie: VOS?.details?.cookie },
            }
        );
        //  const paymentsPage = await fetch(
        //      `https://${VOS?.details?.ip}/finances/invoices/search`,
        //      {
        //          method: "POST",
        //          headers: {
        //              Cookie: VOS?.details?.cookie,
        //              "Content-Type": "application/json",
        //          },
        //          body: JSON.stringify({
        //              starttime: "2020-01-01",
        //              stoptime: new Date().toLocaleDateString("en-US", {
        //                  year: "numeric",
        //                  month: "2-digit",
        //                  day: "2-digit",
        //              }),
        //          }),
        //      }
        //  );
        const html = await paymentsPage.text();
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
                customer_name: rowData[0],
                amount: rowData[1],
                account_balance: rowData[2],
                memo: rowData[3],
                date: rowData[4],
            };
            // Add the object to the array
            payments.push(rowObject);
        });

        const customerPayments = payments.filter(
            (payment: any) => payment.customer_name === name
        );

        if (customerPayments) {
            return { data: customerPayments };
        } else return { error: "no rates found" };
    } else return { data: [] };
}
