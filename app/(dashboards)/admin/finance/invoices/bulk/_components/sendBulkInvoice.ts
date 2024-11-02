"use server"

import formatDate from "@/utils/formatDate";
import sendInvoice from "../../_components/actions";

export async function sendBulkInvoice(invoices: any) {
  try {
    invoices.invoices.map(
      async (invoice: any) =>
        await sendInvoice({
          invoice_details: {
            date_issued: invoices.date_issued,
            date_due: invoices.date_due,
            invoice_to: invoice.invoice_to.id,
            description: `Invoice period: ${formatDate(
              invoices.start_date,
            )} to ${formatDate(invoices.end_date)}. Calls: ${
              invoice.calls
            }. Duration: ${invoice.total_duration}mins.`,
            total_amount: invoice.total_amount,
            balance: invoice.total_amount,
            bill_to: invoices.bill_to,
          },
          to: invoice.invoice_to.email,
          cc: invoice.cc,
        }),
    );
  } catch (error) {
    return { success: false, error: JSON.stringify(error) };
  }

  return { success: true };
}

