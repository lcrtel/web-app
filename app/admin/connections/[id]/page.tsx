import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { supabaseAdmin } from "@/lib/supabase-admin";
import Link from "next/link";
import {
    HiOutlineExclamationCircle,
    HiOutlineExternalLink
} from "react-icons/hi";
export const revalidate = 0; // revalidate at most every hour

import { InvoicesTable } from "./InvoicesTable";

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = supabaseAdmin();

    let { data: route_connection } = await supabase
        .from("route_connections")
        .select(`*, route_offers (*)`)
        .eq("id", params.id)
        .single();
    const userID = route_connection?.buyer_id;
    const {
        data: { user },
    } = await supabase.auth.admin.getUserById(userID as string);

    let { data: invoices, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("connection_id", params.id);

    return (
        <div>
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-bold tracking-tight">
                        Connection Details
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        View and edit connection details
                    </p>
                </div>
                {/* {JSON.stringify(route_connection?.route_offers)} */}
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
                                            href={`/admin/routes/${route_connection?.route_offers?.id}`}
                                            className=""
                                        >
                                            <HiOutlineExternalLink className="w-4 h-4" />
                                        </Link>
                                    </h4>
                                    <div className="text-primary-500 text-sm font-medium">
                                        <p>
                                            Destination:{" "}
                                            {
                                                route_connection?.route_offers
                                                    ?.destination
                                            }
                                            - Code:{" "}
                                            {
                                                route_connection?.route_offers
                                                    ?.destination_code
                                            }
                                        </p>
                                        <p>
                                            Type:{" "}
                                            {
                                                route_connection?.route_offers
                                                    ?.route_type
                                            }
                                        </p>
                                        <p>
                                            Rate: $
                                            {
                                                route_connection?.route_offers
                                                    ?.rate
                                            }
                                        </p>
                                        <p>
                                            Selling Rate: $
                                            {
                                                route_connection?.route_offers
                                                    ?.selling_rate
                                            }
                                        </p>
                                        <p>
                                            Prefix:{" "}
                                            {
                                                route_connection?.route_offers
                                                    ?.prefix
                                            }
                                        </p>
                                        <p>
                                            ASR:{" "}
                                            {
                                                route_connection?.route_offers
                                                    ?.asr
                                            }
                                        </p>
                                        <p>
                                            ACD:{" "}
                                            {
                                                route_connection?.route_offers
                                                    ?.acd
                                            }
                                        </p>
                                        <p>
                                            Ports:{" "}
                                            {
                                                route_connection?.route_offers
                                                    ?.ports
                                            }
                                        </p>
                                        <p>
                                            Capacity:{" "}
                                            {
                                                route_connection?.route_offers
                                                    ?.capacity
                                            }
                                        </p>
                                        <p>
                                            PDD:{" "}
                                            {
                                                route_connection?.route_offers
                                                    ?.pdd
                                            }
                                        </p>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                            <p className=" font-semibold ">
                                {route_connection?.route_offers?.destination}-
                                <span className="uppercase">
                                    {route_connection?.route_offers?.route_type}
                                </span>
                            </p>
                        </div>
                        <div>
                            <p className=" text-sm text-gray-500">Buyer</p>
                            <Link
                                href={`/admin/users/${route_connection?.buyer_id}`}
                                className="flex gap-2 group"
                            >
                                {user?.email}
                                <HiOutlineExternalLink className="w-5 h-5 hidden group-hover:block" />
                            </Link>
                        </div>
                        <div>
                            <p className=" text-sm text-gray-500">Status</p>
                            {route_connection?.status === "active" ? (
                                <span className="text-xs font-medium bg-green-100 border-[1.5px] border-green-200 text-green-500 rounded-full px-2 py-1 ">
                                    Active
                                </span>
                            ) : (
                                <span className="text-xs bg-slate-50 border-[1.5px] border-slate-100  text-slate-500 rounded-full px-2 py-1">
                                    Expired
                                </span>
                            )}
                        </div>
                    </div>{" "}
                    {/* <EditRoute route={route_connection} /> */}
                </div>

                <div>
                    <h3 className="text-lg font-semibold tracking-tight mb-2">
                        Invoices
                    </h3>
                    {invoices?.length ? (
                        <InvoicesTable data={invoices} />
                    ) : (
                        <div className="border rounded-lg p-4 text-center text-gray-400">
                            No Invoices
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-semibold tracking-tight mb-2">
                        Call Detail Records (CDR)
                    </h3>
                    <div className="border rounded-lg p-4 text-center text-gray-400">
                        No Records
                    </div>
                </div>
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
