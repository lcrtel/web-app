import { supabaseServer } from "@/lib/supabase-server";
import formatTimestamptz from "@/utils/formatTimestamptz";
import { fetchUserData } from "@/utils/user";
import Link from "next/link";
import {
    HiOutlineArrowCircleLeft,
    HiOutlineExternalLink
} from "react-icons/hi";
import { InvoiceTable } from "../../invoices/InvoiceTable";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import formatDate from "@/utils/formatDate";
import formatString from "@/utils/formatString";
export const revalidate = 0;
export default async function Page({ params }: { params: { id: string } }) {
    const user = await fetchUserData();
    const supabase = await supabaseServer();
    let { data: connection, error } = await supabase
        .from("gateways")
        .select(`*, routes (*)`)
        .match({ id: params.id })
        .single();
    const { data: invoices } = await supabase
        .from("invoices")
        .select(`*`)
        .match({ invoice_to: user?.id, gateway: params.id });
    let { data: payments } = await supabase
        .from("payments")
        .select(`*`)
        .match({ user_id: user?.id, gateway: params.id });
    return (
        <div>
            <div>
                <Link
                    href="/user/gateways"
                    className="inline-flex items-center text-gray-400 hover:text-primary-500 transition-all ease-in-out mb-2"
                >
                    <HiOutlineArrowCircleLeft className="mr-1.5" /> Gateways
                </Link>
                <div className="mb-3 ">
                    <h2 className="text-2xl font-bold text-primary tracking-tight">
                        Gateway Details
                    </h2>
                </div>
                <div className="flex justify-between items-center mb-5">
                    <div className="flex flex-wrap gap-4">
                        <p className="  text-gray-500 ">
                            Status:{" "}
                            <span className="font-semibold capitalize text-primary-500">
                                {connection?.status}
                            </span>
                        </p>{" "}
                        <p className="  text-gray-500 ">
                            Destination:{" "}
                            <span className="font-semibold capitalize text-primary-500">
                                {connection?.routes?.destination}
                            </span>
                        </p>
                        <p className="  text-gray-500 ">
                            Type:{" "}
                            <span className="font-semibold uppercase text-primary-500">
                                {connection?.routes?.route_type}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex gap-5">
                <div className="flex-1 ">
                    <h2 className="text-xl mb-2 font-bold text-primary tracking-tight">
                        Invoices
                    </h2>
                    {invoices?.length ? (
                        <InvoiceTable data={invoices} />
                    ) : (
                        <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                            <p>No invoices yet</p>
                        </div>
                    )}
                </div>
                <div className="flex-1 ">
                    <h2 className="text-xl mb-2 font-bold text-primary tracking-tight">
                        Payments
                    </h2>
                    {payments?.length ? (
                        <Table className="">
                            <TableCaption>A list of payments.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Payment Amount</TableHead>
                                    <TableHead>Payment Date</TableHead>
                                    <TableHead>Payment Method</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments?.map((payment) => (
                                    <TableRow key={payment.payment_id}>
                                        <TableCell>${payment.amount}</TableCell>

                                        <TableCell>
                                            {formatDate(payment.paid_at)}
                                        </TableCell>
                                        <TableCell className=" capitalize">
                                            {formatString(
                                                payment.payment_method
                                            )}
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
            </div>
        </div>
    );
}
