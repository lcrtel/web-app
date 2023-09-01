import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import formatTimestamptz from "@/utils/formatTimestamptz";
import {
    HiOutlineArrowCircleLeft,
    HiOutlineExternalLink,
    HiOutlinePencilAlt,
} from "react-icons/hi";
import Link from "next/link";
import { redirect } from "next/navigation";
import formatString from "@/utils/formatString";
import { InvoiceTable } from "../../invoices/InvoiceTable";
import { fetchUserData } from "@/utils/user";

export default async function Page({ params }: { params: { id: string } }) {
    const user = await fetchUserData();
    const supabase = supabaseServer();
    let { data: connection, error } = await supabase
        .from("route_connections")
        .select(`*, route_offers (*)`)
        .match({ id: params.id })
        .single();
    const { data: invoices } = await supabase
        .from("invoices")
        .select(`*`)
        .match({ invoice_to: user?.id, connection_id: params.id });
    let { data: payments } = await supabase
        .from("payments")
        .select(`*`)
        .match({ user_id: user?.id, connection_id: params.id });
    return (
        <div>
            <div>
                <Link
                    href="/user/connections"
                    className="inline-flex items-center text-gray-400 hover:text-primary-500 transition-all ease-in-out mb-2"
                >
                    <HiOutlineArrowCircleLeft className="mr-1.5" /> Connections
                </Link>
                <div className="mb-3 ">
                    <h2 className="text-2xl font-bold text-primary tracking-tight">
                        Connection Details
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
                                {connection?.route_offers?.destination}
                            </span>
                        </p>
                        <p className="  text-gray-500 ">
                            Type:{" "}
                            <span className="font-semibold uppercase text-primary-500">
                                {connection?.route_offers?.route_type}
                            </span>
                        </p>
                        <p className="  text-gray-500 ">
                            Expires on:{" "}
                            <span className="font-semibold  text-primary-500">
                                {connection?.expiration_date
                                    ? formatTimestamptz(
                                          connection?.expiration_date
                                      )
                                    : "_"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 bg-surface rounded-lg p-4 mb-5">
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">Prefix</p>
                    <p className=" font-semibold">
                        {connection?.route_offers?.prefix}
                    </p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">Destination Code</p>
                    <p className=" font-semibold">
                        {connection?.route_offers?.destination_code}
                    </p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">ASR</p>
                    <p className=" font-semibold">
                        {connection?.route_offers?.asr}
                    </p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">ACD</p>
                    <p className=" font-semibold">
                        {connection?.route_offers?.acd}
                    </p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">PDD</p>
                    <p className=" font-semibold">
                        {connection?.route_offers?.pdd}
                    </p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">Ports</p>
                    <p className=" font-semibold">
                        {connection?.route_offers?.ports}
                    </p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">Capacity</p>
                    <p className=" font-semibold">
                        {connection?.route_offers?.capacity}
                    </p>
                </div>
            </div>
            <div className="flex gap-5">
                <div className="flex-1 ">
                    <h2 className="text-2xl mb-2 font-bold text-primary tracking-tight">
                        Invoices
                    </h2>
                    {invoices?.length ? (
                        <InvoiceTable data={invoices} />
                    ) : (
                        <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                            <p>No invoices created yet</p>
                        </div>
                    )}
                </div>
                <div className="flex-1 ">
                    <h2 className="text-2xl mb-2 font-bold text-primary tracking-tight">
                        Payments
                    </h2>
                    {payments?.length ? (
                        payments.map((item) => (
                            <Link
                                href={`/user/transactions/${item.payment_id}`}
                                passHref
                                key={item.payment_id}
                                className={`flex gap-5 shadow-sm hover:translate-x-1 cursor-pointer transition-all ease-in-out duration-500 items-center justify-between border rounded-md px-4 py-2  `}
                            >
                                <p>Amount: ${item.amount} </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium bg-slate-100 border-[1.5px] border-slate-200 text-slate-500 rounded-full px-2 py-1 ml-2 capitalize">
                                        {item.payment_status}
                                    </span>
                                    <div>
                                        <HiOutlineExternalLink className="-mt-[2px] w-5 h-5" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                            <p>No transaction yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
