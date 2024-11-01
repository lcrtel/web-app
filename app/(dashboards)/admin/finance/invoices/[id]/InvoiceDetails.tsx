"use client";

import { Button } from "@/components/ui/button";
import formatDate from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { createRef, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { AddPayment } from "./AddPayment";


const InvoiceDetails = ({
    invoice,
    payments,
}: {
    invoice: any;
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

    // const sendEmail = () => {
    //     // fetch("/api/emails/invoice", {
    //     //     method: "POST",
    //     //     body: JSON.stringify({ ...invoice }),
    //     // });
    //     toast.success("Email sent successfully");
    // };

    return (
        <div className="  flex items-starts max-w-8xl mx-auto gap-5 mb-5">
            <Link href="/admin/finance/invoices">
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
                            width={140}
                            height={20}
                        />
                        <p className="text-slate-400 text-sm pt-2">
                            lcrtelweb@gmail.com
                        </p>
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
                        <p className="mt-2 text-lg font-semibold">
                            {invoice?.profiles?.company_name}
                        </p>
                        <p className="text-sm text-slate-500">
                            {invoice?.profiles?.email}
                        </p>{" "}
                    </div>
                    <div className="min-w-[200px] flex flex-col gap-2">
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
                <div className="grid grid-cols-5  p-8 border-b">
                    <div className=" col-span-4">
                        <h2 className="font-semibold tracking-tight">
                            Description
                        </h2>
                        <div className="text-slate-500 text-base">
                            <p
                                className="mt-3"
                                dangerouslySetInnerHTML={{
                                    __html: invoice.description,
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between p-8 ">
                    <div className="space-y-2">
                        <h2 className="font-semibold tracking-tight">Pay to</h2>
                        <div className=" text-sm text-slate-500">
                            <p>Bank Name: {invoice?.bill_to?.bankName}</p>
                            <p>
                                Account Name:{" "}
                                {invoice?.bill_to?.accountHolderName}
                            </p>
                            <p>
                                Account Number:{" "}
                                {invoice?.bill_to?.accountNumber}
                            </p>
                            <p>IFSC Code: {invoice?.bill_to?.IFSCCode}</p>
                            <p>Branch: {invoice?.bill_to?.branchName}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 max-w-[250px] w-full">
                        <div className="flex justify-between text-slate-500 font-medium">
                            <p className=" ">Total:</p>
                            <p className="text-end">${invoice?.total_amount}</p>
                        </div>
                        <div className="flex justify-between text-slate-500 font-medium">
                            <p className=" ">Amount Paid:</p>
                            <p className="text-end">
                                -${amountPaid.toFixed(5)}
                            </p>
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
                <Button disabled className=" w-full">
                    Send
                </Button>
                <Button
                    onClick={handlePrint}
                    variant="outline"
                    className=" w-full"
                >
                    Print
                </Button>
                <AddPayment invoice={invoice} />
            </div>
        </div>
    );
};

export default InvoiceDetails;
