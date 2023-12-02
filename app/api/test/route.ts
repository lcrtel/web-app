import { NextRequest } from "next/server";
import { JSDOM } from "jsdom";
import VOSLogin from "@/app/vos/VOSLogin";
import getCustomerInfo from "@/app/vos/getCustomerInfo";
export async function GET(request: NextRequest) {
    const VOS = await VOSLogin();
    console.log(VOS);

    if (VOS?.details) {
        const customersPage = await fetch(
            `https://${VOS?.details?.ip}/routing_management/view_routing_gateway`,
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
        const customers: any[] = [];
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
        return Response.json({ costomers: customers.length})
    }

    return new Response();
}
