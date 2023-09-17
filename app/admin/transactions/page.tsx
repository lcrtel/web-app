import ReloadButton from "@/components/ReloadButton";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { supabaseAdmin } from "@/lib/supabase-admin";
import formatDate from "@/utils/formatDate";
import formatString from "@/utils/formatString";
import Link from "next/link";
export const revalidate = 0;
const Transactions = async () => {
    const supabase = supabaseAdmin();

    const { data: payments } = await supabase
        .from("payments")
        .select(`*, profiles (*)`);
    return (
        <div className="">
            <div className="mb-5 ">
                <div className="flex items-center mb-3 justify-between ">
                    <h2 className="text-2xl font-bold text-primary">
                        Transactions
                    </h2>
                    <div className="flex items-center gap-2">
                        <ReloadButton />
                    </div>
                </div>
            </div>
            {payments?.length ? (
                <Table className="">
                    <TableCaption>A list of transactions.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Transaction ID</TableHead>

                            <TableHead className="max-w-[200px]">
                                User
                            </TableHead>
                            <TableHead>Invoice ID</TableHead>
                            <TableHead>Payment Amount</TableHead>
                            <TableHead>Payment Date</TableHead>
                            <TableHead>Payment Method</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments?.map((payment) => (
                            <TableRow key={payment.payment_id}>
                                <TableCell>#{payment.payment_id}</TableCell>
                                <TableCell className="font-medium">
                                    {payment.profiles?.email}
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/admin/invoices/${payment.invoice_id}`}
                                    >
                                        #{payment.invoice_id}
                                    </Link>
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
    );
};

export default Transactions;
