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
import { supabaseServer } from "@/lib/supabase-server";
export const revalidate = 0;

const page = async ({ params }: { params: { id: string } }) => {
    const supabase = await supabaseServer();

    const { data: invoice } = await supabase
        .from("invoices")
        .select(`*, profiles (*)`)
        .eq("invoice_id", params.id)
        .single();

    const { data: gateway } = await supabase
        .from("gateways")
        .select(`*, routes (*)`)
        .eq("id", invoice?.gateway)
        .single();

    const { data: payments } = await supabase
        .from("payments")
        .select(`*, profiles (*)`)
        .eq("invoice_id", params.id);


    return (
        <>
            <h1 className="text-2xl tracking-tight font-bold mb-4">
                Invoice Details
            </h1>
            <InvoiceDetails
                invoice={invoice}
                gateway={gateway}
                payments={payments}
            />
            <div className="max-w-8xl mx-auto ">
                <h2 className="text-lg tracking-tight mt-10 font-semibold mb-2">
                    Payments
                </h2>
                {payments?.length ? (
                    <Table className="">
                        <TableCaption>A list of payments.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="max-w-[200px]">
                                    User
                                </TableHead>
                                <TableHead>Payment Amount</TableHead>
                                <TableHead>Payment Date</TableHead>
                                <TableHead>Payment Method</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments?.map((payment) => (
                                <TableRow key={payment.payment_id}>
                                    <TableCell className="font-medium">
                                        {payment.profiles?.email}
                                    </TableCell>
                                    <TableCell>${payment.amount}</TableCell>

                                    <TableCell>
                                        {formatDate(payment.paid_at)}
                                    </TableCell>
                                    <TableCell className=" capitalize">
                                        {formatString(payment.payment_method)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                        <p>No payments yet</p>
                    </div>
                )}
            </div>

            {/* <pre>{JSON.stringify(gateway, null, 2)}</pre> */}
        </>
    );
};

export default page;
