import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import Link from "next/link";
import {
    HiDocumentText,
    HiOutlineExclamationCircle,
    HiOutlineExternalLink,
} from "react-icons/hi";
export const revalidate = 0; // revalidate at most every hour

import { EditGateway } from "../edit/EditGateway";
import { CreateInvoice } from "./CreateInvoice";
import formatDate from "@/utils/formatDate";
import { supabaseServer } from "@/lib/supabase-server";

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = await supabaseServer();

    let { data: gateway } = await supabase
        .from("gateways")
        .select(`*, routes (*), profiles (*)`)
        .eq("id", params.id)
        .single();

    let { data: invoices } = await supabase
        .from("invoices")
        .select("*")
        .eq("gateway", params.id);
    let { data: payment_methods } = await supabase
        .from("payment_methods")
        .select("*");

    return (
        <div>
            <div className="space-y-6">
                <div>
                    <div className="flex gap-2 mb-2 items-center text-sm font-medium text-slate-400">
                        <Link
                            href="/admin/gateways"
                            className="hover:underline"
                        >
                            Gateways
                        </Link>
                        <p className="">/ {gateway?.name}</p>
                    </div>

                    <h1 className="text-xl font-bold tracking-tight ">
                        {gateway?.name}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        View and edit gateway details
                    </p>
                </div>
                {/* {JSON.stringify(gateway?.routes)} */}
                <div className="flex justify-between items-start">
                    <div className="flex gap-5 flex-wrap">
                        <div>
                            <HoverCard openDelay={200} closeDelay={100}>
                                <HoverCardTrigger>
                                    <div className="text-sm text-gray-500 flex cursor-pointer items-center gap-1">
                                        <span> Route</span>{" "}
                                        <HiOutlineExclamationCircle />
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent align="start">
                                    <h4 className="text-gray-500 text-sm flex  justify-between items-center">
                                        Route Details
                                        <Link
                                            href={`/admin/routes/${gateway?.routes?.id}`}
                                            className=""
                                        >
                                            <HiOutlineExternalLink className="w-4 h-4" />
                                        </Link>
                                    </h4>
                                    <div className="text-primary-500 text-sm font-medium">
                                        <p>
                                            Destination:{" "}
                                            {gateway?.routes?.destination}-
                                            Code:{" "}
                                            {gateway?.routes?.destination_code}
                                        </p>
                                        <p>
                                            Type: {gateway?.routes?.route_type}
                                        </p>
                                        <p>
                                            Rate: $
                                            {Number(
                                                gateway?.routes?.rate
                                            ).toFixed(3)}
                                        </p>
                                        <p>
                                            Selling Rate: $
                                            {Number(
                                                gateway?.routes?.selling_rate
                                            ).toFixed(3)}
                                        </p>
                                        <p>Prefix: {gateway?.routes?.prefix}</p>
                                        <p>ASR: {gateway?.routes?.asr}</p>
                                        <p>ACD: {gateway?.routes?.acd}</p>
                                        <p>Ports: {gateway?.routes?.ports}</p>
                                        <p>
                                            Capacity:{" "}
                                            {gateway?.routes?.capacity}
                                        </p>
                                        <p>PDD: {gateway?.routes?.pdd}</p>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                            <p className=" font-semibold capitalize ">
                                {gateway?.routes?.destination}-
                                <span className="uppercase">
                                    {gateway?.routes?.route_type}
                                </span>
                            </p>
                        </div>
                        <div className="">
                            <p className=" text-sm text-gray-500">Rate</p>
                            <p className=" font-semibold "> ${gateway?.rate}</p>
                        </div>
                        <div>
                            <p className=" text-sm text-gray-500">Client</p>
                            <Link
                                href={`/admin/users/${gateway?.client_id}`}
                                className="flex items-center font-semibold capitalize gap-2 group"
                            >
                                {gateway?.profiles?.name}{" "}
                                <span className="text-slate-400">
                                    ({gateway?.profiles?.company_name})
                                </span>
                                <HiOutlineExternalLink className="w-4 h-4 text-slate-400" />
                            </Link>
                        </div>
                        <div>
                            <p className=" text-sm text-gray-500">Status</p>
                            {gateway?.status === "active" ? (
                                <span className="text-xs font-medium bg-green-100 border-[1.5px] border-green-200 text-green-500 rounded-full px-2 py-1 ">
                                    Active
                                </span>
                            ) : gateway?.status === "pending" ? (
                                <span className="text-xs bg-slate-50 border-[1.5px] border-slate-100  text-slate-500 rounded-full px-2 py-1">
                                    Pending
                                </span>
                            ) : gateway?.status === "expired" ? (
                                <span className="text-xs bg-slate-50 border-[1.5px] border-slate-100  text-slate-500 rounded-full px-2 py-1">
                                    Expired
                                </span>
                            ) : null}
                        </div>
                        <div>
                            <p className=" text-sm text-gray-500">
                                Payment Type
                            </p>
                            <p className="flex gap-2 group capitalize  font-semibold ">
                                {gateway?.payment_type}
                            </p>
                        </div>
                    </div>
                    <EditGateway gateway={gateway} />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold tracking-tight">
                            Invoices
                        </h3>
                        <CreateInvoice
                            gateway={gateway}
                            paymentMethods={payment_methods}
                        />
                    </div>
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {invoices?.length ? (
                            invoices.map((invoice: any) => (
                                <Link
                                    href={`/admin/invoices/${invoice.invoice_id}`}
                                    key={invoice.invoice_id}
                                    className="border rounded-lg  bg-slate-50"
                                >
                                    <div className="flex items-center justify-between border-b p-3">
                                        <div className="flex items-center gap-2">
                                            <HiDocumentText className="w-5 h-5" />
                                            <h4 className="text-base font-semibold ">
                                                Invoice #{invoice.invoice_id}
                                            </h4>
                                        </div>
                                        <p className="capitalize text-slate-400 text-sm">
                                            {invoice.status}
                                        </p>
                                    </div>
                                    <div className="p-3 text-sm">
                                        <div className="flex  gap-2">
                                            <p className="font-medium">
                                                Date Issued:{" "}
                                            </p>
                                            <p>
                                                {formatDate(
                                                    invoice.date_issued
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex  gap-2 mb-2">
                                            <p className="font-medium">
                                                Date Due:{" "}
                                            </p>
                                            <p>
                                                {formatDate(invoice.date_due)}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: invoice.description?.replace(
                                                        /\./g,
                                                        ".<br>"
                                                    ),
                                                }}
                                            />
                                        </div>
                                        <div className="flex font-medium text-base items-center mt-2 gap-2 ">
                                            <p className="">Total Amount: </p>
                                            <p>${invoice.total_amount}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="border rounded-lg p-4 text-center text-gray-400">
                                No Invoices
                            </div>
                        )}
                    </div>
                </div>
                {/* <div>
                    <h3 className="text-lg font-semibold tracking-tight mb-2">
                        Call Detail Records (CDR)
                    </h3>
                    <div className="border rounded-lg p-4 text-center text-gray-400">
                        No Records
                    </div>
                </div> */}
                {/* <div className="flex justify-between items-center border border-red-500 rounded-lg p-4 text-red-500">
                    <div>
                        <h3 className="font-semibold tracking-tight">
                            Delete this Route
                        </h3>
                        <p className="text-sm">
                            Once deleted, it will be gone forever. Please be
                            certain.
                        </p>
                    </div>
                    <button className="p-2 bg-red-500 rounded-md text-white rou">
                        <DeleteRoute routeID={params.id} />
                    </button>
                </div> */}
            </div>
        </div>
    );
}
