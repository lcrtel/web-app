"use client";

import { Button } from "@/components/ui/button";
import formatDate from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { createRef, useState } from "react";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

const InvoiceDetails = ({
    invoice,
    connection,
    paymentInfo,
    payments,
}: {
    invoice: any;
    connection: any;
    paymentInfo: any;
    payments: any;
}) => {
    const [isPrinting, setIsPrinting] = useState(false);
    const printContentsRef = createRef<HTMLDivElement>();
    let amountPaid: number = 0;

    if (payments) {
        for (const item of payments) {
            amountPaid += parseFloat(item.amount);
        }
    }
    const handlePrint = () => {
        if (!isPrinting) {
            setIsPrinting(true);

            const printContents = printContentsRef.current;
            const originalContents = document.body.innerHTML;

            if (printContents) {
                document.body.innerHTML = printContents.innerHTML;

                window.print();

                document.body.innerHTML = originalContents;
                setIsPrinting(false);
                window.location.reload();
            }
        }
    };

    return (
        <div className="  flex items-starts max-w-8xl mx-auto gap-5 mb-5">
            <Link href="/user/invoices">
                <HiOutlineArrowCircleLeft className="w-6 h-6 mt-2 text-slate-400" />
            </Link>
            <div
                ref={printContentsRef}
                id="print-content"
                className="bg-white flex-1 rounded-2xl shadow-xl border w-full"
            >
                <div className="flex justify-between rounded-t-2xl bg-surface  p-8">
                    <div className="">
                        <Image
                            src="/lcrtelcom_logo.svg"
                            className=""
                            alt="LCRTel Logo"
                            width={160}
                            height={20}
                        />
                    </div>
                    <h2 className="text-4xl uppercase font-bold tracking-tight">
                        Invoice
                    </h2>
                </div>

                <div className="flex justify-between p-8 border-b">
                    <div className="">
                        <h2 className="mb-2 font-semibold tracking-tight">
                            Invoice To:
                        </h2>{" "}
                        <div className="mt-2 text-slate-500">
                            <p>
                                Name: {invoice?.profiles?.name}{" "}
                                {invoice?.profiles?.company_name}
                            </p>
                            <p>Email: {invoice?.profiles?.email}</p>
                            <p>WhatsApp No: {invoice?.profiles?.phone}</p>
                        </div>
                    </div>
                    <div className="w-[200px] flex flex-col gap-2">
                        <div className="flex gap-2 items-center justify-between">
                            <p className=" font-medium whitespace-nowrap">
                                Date Issued:
                            </p>
                            <p className="text-slate-500">
                                {formatDate(invoice?.date_issued)}
                            </p>
                        </div>

                        <div className="flex gap-2 items-center justify-between">
                            <p className=" font-medium whitespace-nowrap">
                                Date Due:
                            </p>
                            <p className="text-slate-500">
                                {formatDate(invoice?.date_due)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 p-8 border-b">
                    <div className="flex-1 space-y-2">
                        <h2 className="mb-2 font-semibold tracking-tight">
                            Route Connection
                        </h2>
                        <div className="mt-2 flex flex-wrap text-slate-500">
                            <p>
                                Area Code:{" "}
                                <span className="text-primary-900 mr-4 font-semibold">
                                    {connection?.routes?.destination_code}
                                </span>
                            </p>
                            <p>
                                Destination:{" "}
                                <span className="text-primary-900 mr-4 font-semibold capitalize">
                                    {connection?.routes?.destination}
                                </span>
                            </p>
                            <p>
                                Route Type:{" "}
                                <span className="text-primary-900 mr-4 font-semibold uppercase">
                                    {connection?.routes?.route_type}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className=" font-semibold tracking-tight text-primary-900">
                            Date Range
                        </p>
                        <p className=" text-slate-500">
                            {invoice?.description}
                        </p>
                    </div>
                    <div className="w-[84px] space-y-2">
                        <p className=" font-semibold tracking-tight text-primary-900">
                            Rate
                        </p>
                        <p className=" text-slate-500">
                            ${connection?.routes?.selling_rate}
                        </p>
                    </div>
                    <div className="space-y-2 w-[100px]">
                        <p className=" font-semibold tracking-tight text-primary-900">
                            Total Calls
                        </p>
                        <p className=" text-slate-500 text-left">
                            {invoice?.quantity}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between p-8 ">
                    <div className="space-y-2">
                        <h2 className="font-semibold tracking-tight">
                            Payment Method
                        </h2>
                        <div className=" text-sm text-slate-500">
                            <p>Bank Name: {paymentInfo?.bank_name}</p>
                            <p>Account Name: {paymentInfo?.name}</p>
                            <p>Account Number: {paymentInfo?.account_no}</p>
                            <p>Account Type: {paymentInfo?.account_type}</p>
                            <p>IFSC Code: {paymentInfo?.ifsc_code}</p>
                            <p>Branch: {paymentInfo?.branch}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-[200px]">
                        <div className="flex justify-between text-slate-500 font-medium">
                            <p className=" ">Total:</p>
                            <p className="text-end">${invoice?.total_amount}</p>
                        </div>
                        <div className="flex justify-between text-slate-500 font-medium">
                            <p className=" ">Amount Paid:</p>
                            <p className="text-end">-${amountPaid}</p>
                        </div>
                        <div className="flex justify-between text-lg border-t pt-2 font-semibold">
                            <p className="">Balance Due:</p>
                            <p className="text-end">${invoice?.balance}</p>
                        </div>
                    </div>
                </div>
                {invoice?.note ? (
                    <div className="p-8 w-full border-t">
                        <div className="space-y-2">
                            <p className="font-semibold tracking-tight">
                                Notes
                            </p>
                            <p>{invoice?.note}</p>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className=" w-[200px] space-y-2">
                <Button
                    onClick={handlePrint}
                    variant="outline"
                    className=" w-full"
                >
                    Print
                </Button>
            </div>
        </div>
    );
};

export default InvoiceDetails;
