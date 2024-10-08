import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import formatDate from "@/utils/formatDate";
import formatString from "@/utils/formatString";
import InvoiceDetails from "./InvoiceDetails";
export const revalidate = 0;

const page = async ({ params }: { params: { id: string } }) => {
  const supabase = supabaseAdminServer();

  const { data: invoice } = await supabase
    .from("invoices")
    .select(`*, profiles (*)`)
    .eq("invoice_id", params.id)
    .single();

  const { data: payments } = await supabase
    .from("payments")
    .select(`*, profiles (*)`)
    .eq("invoice_id", params.id);

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold tracking-tight">
        Invoice Details
      </h1>
      <InvoiceDetails invoice={invoice} payments={payments} />
      <div className="mx-auto max-w-8xl">
        <h2 className="mb-2 mt-10 text-lg font-semibold tracking-tight">
          Payments
        </h2>
        {payments?.length ? (
          <Table className="">
            <TableCaption>A list of payments.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-[200px]">User</TableHead>
                <TableHead>Payment Amount</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Payment Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments?.map((payment) => (
                <TableRow key={payment.payment_id}>
                  <TableCell className="font-medium">
                    {payment.profiles?.name}
                  </TableCell>
                  <TableCell>${payment.amount}</TableCell>

                  <TableCell>{formatDate(payment.paid_at)}</TableCell>
                  <TableCell className="capitalize">
                    {formatString(payment.payment_method)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex h-12 items-center justify-center gap-2 rounded-lg border py-10 text-center text-sm">
            <p>No payments yet</p>
          </div>
        )}
      </div>

      {/* <pre>{JSON.stringify(gateway, null, 2)}</pre> */}
    </>
  );
};

export default page;
