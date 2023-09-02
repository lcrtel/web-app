import { supabaseAdmin } from "@/lib/supabase-admin";
import formatTimestamptz from "@/utils/formatTimestamptz";
import Image from "next/image";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
    const supabase = supabaseAdmin();
    const { data: invoice } = await supabase
        .from("invoices")
        .select(`*, profiles (*)`)
        .eq("invoice_id", params.id)
        .single();
    const { data: offer } = await supabase
        .from("route_connections")
        .select(`*, route_offers (*)`)
        .eq("id", invoice?.connection_id)
        .single();

    return (
        <>
            <h3 className="text-2xl tracking-tight font-bold mb-4">
                Invoice Details
            </h3>
            <div className=" space-y-2 max-w-8xl mx-auto">
                <div className="bg-white border-2 border-white rounded-lg shadow-lg w-full">
                    <div className="flex justify-between p-8 border-b">
                        <div className="">
                            <Image
                                src="/lcrtelcom_logo.svg"
                                className=""
                                alt="LCRTel Logo"
                                width={160}
                                height={20}
                            />
                        </div>
                        <div className="w-[250px] flex flex-col gap-2">
                            <h2 className="text-xl font-bold">Invoice</h2>
                            <div className="flex gap-2 items-center justify-between">
                                <p className=" font-medium whitespace-nowrap">
                                    Date Issued:
                                </p>
                                <p>{formatTimestamptz(invoice?.date_issued)}</p>
                            </div>

                            <div className="flex gap-2 items-center justify-between">
                                <p className=" font-medium whitespace-nowrap">
                                    Date Due:
                                </p>
                                <p>{invoice?.date_due}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between p-8 border-b">
                        <div className="">
                            <h2 className="mb-2 font-semibold tracking-tight">
                                Invoice To:
                            </h2>{" "}
                            <div className="mt-2 text-slate-500">
                                <p>
                                    Name: {invoice?.profiles?.first_name}{" "}
                                    {invoice?.profiles?.last_name}
                                </p>
                                <p>Email: {invoice?.profiles?.email}</p>
                                <p>Phone: {invoice?.profiles?.phone}</p>
                            </div>
                        </div>
                        <div className="w-[250px] flex flex-col gap-2">
                            <h2 className="font-semibold tracking-tight mb-2">
                                Bill To:
                            </h2>
                        </div>
                    </div>
                    <div className="flex gap-4 p-8 border-b">
                        <div className="flex-1 space-y-2">
                            <h2 className="mb-2 font-semibold tracking-tight">
                                Route Connection
                            </h2>
                            <div className="mt-2 flex gap-4 flex-wrap text-slate-500">
                                <p>
                                    Prefix:{" "}
                                    <span className="text-primary-500 font-semibold">
                                        {offer?.route_offers?.prefix}
                                    </span>
                                </p>
                                <p>
                                    Destination:{" "}
                                    <span className="text-primary-500 font-semibold">
                                        {offer?.route_offers?.destination}
                                    </span>
                                </p>
                                <p>
                                    Route Type:{" "}
                                    <span className="text-primary-500 font-semibold">
                                        {offer?.route_offers?.route_type}
                                    </span>
                                </p>
                                <p>
                                    Rate:{" "}
                                    <span className="text-primary-500 font-semibold">
                                        ${offer?.route_offers?.selling_rate}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="space-y-2 text-right">
                            <p className=" font-medium">Total Calls</p>
                            <p>{invoice?.quantity}</p>
                        </div>
                    </div>
                    <div className="flex justify-between p-8 ">
                        <div className="">
                            <h2 className="font-semibold tracking-tight">
                                Agent:
                            </h2>
                        </div>
                        <div className="flex flex-col gap-2 w-[250px]">
                            <p className=" font-semibold">
                                Total Amount: $
                                <span>{invoice?.total_amount}</span>
                            </p>
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
            </div>
        </>
    );
};

export default page;
