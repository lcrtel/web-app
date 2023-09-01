import { supabaseAdmin } from "@/lib/supabase-admin";
import { buttonVariants } from "@/components/ui/button";
import { HiOutlineExternalLink, HiOutlinePlusCircle } from "react-icons/hi";
import Link from "next/link";
import { ConnectionsTable } from "./ConnectionsTable";

export default async function Page() {
    const supabase = supabaseAdmin();
    let { data: route_connections } = await supabase
        .from("route_connections")
        .select(`*, route_offers (*)`);
    return (
        <div className=" ">
            <div className="mb-4 border-b pb-4 ">
                <h1 className="text-2xl font-bold text-primary">Connections</h1>
            </div>
            <div className="w-full">
                <h2 className="font-semibold text-lg mb-3">
                    Active Connections
                </h2>
                {route_connections?.map((connection) => (
                    <div
                        key={connection.id}
                        className={`flex gap-5 shadow items-center justify-between border-[1.5px] rounded-md p-4  ${
                            connection.status === "active"
                                ? "bg-gradient-to-l from-green-50 to-white border-green-50 shadow-green-50"
                                : "bg-slate-50"
                        }`}
                    >
                        <Link
                            href={`/admin/routes/${connection.route_id}`}
                            className="capitalize flex gap-2 group"
                        >
                            {connection?.route_offers?.destination} -{" "}
                            <span className="uppercase font-medium">
                                {connection?.route_offers?.route_type}
                            </span>{" "}
                            <HiOutlineExternalLink className=" w-5 h-5 hidden group-hover:block" />
                        </Link>

                        <Link
                            href={`/admin/users/${connection.buyer_id}`}
                            className="flex gap-2 group"
                        >
                            {" "}
                            Buyer:
                            {connection.buyer_id}
                            <HiOutlineExternalLink className="w-5 h-5 hidden group-hover:block" />
                        </Link>
                        <div className="flex items-center gap-2">
                            {connection.status === "active" ? (
                                <span className="text-xs font-medium bg-green-100 border-[1.5px] border-green-200 text-green-500 rounded-full px-2 py-1 ml-2">
                                    Active
                                </span>
                            ) : (
                                <span className="text-xs bg-slate-50 border-[1.5px] border-slate-100  text-slate-500 rounded-full px-2 py-1 ml-2">
                                    Expired
                                </span>
                            )}
                            <Link href={`/admin/connections/${connection.id}`}>
                                <HiOutlineExternalLink className="-mt-[2px] w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
