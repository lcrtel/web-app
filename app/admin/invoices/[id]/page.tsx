import { supabaseAdmin } from "@/lib/supabase-admin";
import formatDate from "@/utils/formatDate";
import formatTimestamptz from "@/utils/formatTimestamptz";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import InvoiceDetails from "./InvoiceDetails";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import formatString from "@/utils/formatString";

const page = async ({ params }: { params: { id: string } }) => {
    const supabase = supabaseAdmin();
    const { data: invoice } = await supabase
        .from("invoices")
        .select(`*, profiles (*)`)
        .eq("invoice_id", params.id)
        .single();
    const { data: connection } = await supabase
        .from("route_connections")
        .select(`*, route_offers (*)`)
        .eq("id", invoice?.connection_id)
        .single();
    const { data: payments } = await supabase
        .from("payments")
        .select(`*, profiles (*)`)
        .eq("invoice_id", params.id);
    let paymentInfo: any = invoice?.bill_to;
    return (
        <>
            <h1 className="text-2xl tracking-tight font-bold mb-4">
                Invoice Details
            </h1>
            <InvoiceDetails
                invoice={invoice}
                connection={connection}
                paymentInfo={paymentInfo}
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
        </>
    );
};

export default page;
