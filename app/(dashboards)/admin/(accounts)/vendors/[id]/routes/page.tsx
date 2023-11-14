import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import formatDate from "@/utils/formatDate";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = await supabaseServer();
    let { data: routes, error } = await supabase
        .from("routes")
        .select("*")
        .eq("vendor_id", params?.id);
    return (
        <div>
            <h1 className="text-lg font-bold tracking-tight">Routes</h1>
            <div className="grid pt-4 md:grid-cols-2 lg:grid-cols-3">
                {routes?.length ? (
                    routes?.map((route) => (
                        <div
                            className="w-full flex flex-col justify-between p-4 bg-surface rounded-xl border "
                            key={route.id}
                        >
                            <p className="mb-2 text-xs text-gray-400">
                                Posted on: {formatDate(route.created_at)}
                            </p>
                            <div className="mb-2.5 grid grid-cols-2">
                                <div>
                                    <p className=" text-xs text-gray-400">
                                        Destination
                                    </p>
                                    <h4 className="text-base font-bold mr-3 uppercase text-primary">
                                        {route.destination}
                                    </h4>
                                </div>
                                <div>
                                    <p className=" text-xs text-gray-400">
                                        Code
                                    </p>
                                    <h4 className="text-base font-bold mr-3 uppercase text-primary">
                                        {route.destination_code}
                                    </h4>
                                </div>
                            </div>
                            <div>
                                <div className="mb-2.5 flex items-center">
                                    <div className="flex-1">
                                        <p className=" text-xs text-gray-400">
                                            Type
                                        </p>
                                        <h4 className="text-base font-bold text-primary uppercase">
                                            {route.route_type}
                                        </h4>
                                    </div>
                                    <div className="flex-1">
                                        <p className=" text-xs text-gray-400">
                                            Rate
                                        </p>
                                        <h4 className="text-base font-bold text-primary">
                                            $ {route.rate}
                                        </h4>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2.5 rounded-xl bg-white p-2.5">
                                    <div className="flex">
                                        <div className="flex-1">
                                            <p className=" text-[10px] text-gray-400">
                                                Prefix
                                            </p>
                                            <h4 className="text-sm font-semibold text-primary">
                                                {route.prefix}
                                            </h4>
                                        </div>{" "}
                                        <div className="flex-1">
                                            <p className=" text-[10px] text-gray-400">
                                                PDD
                                            </p>
                                            <h4 className="text-sm font-semibold text-primary ">
                                                {route.pdd}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-1">
                                            <p className=" text-[10px] text-gray-400">
                                                ASR %
                                            </p>
                                            <h4 className="text-sm font-semibold text-primary">
                                                {route.asr}
                                            </h4>
                                        </div>
                                        <div className="flex-1">
                                            <p className=" text-[10px] text-gray-400">
                                                ACD
                                            </p>
                                            <h4 className="text-sm font-semibold text-primary">
                                                {route.acd}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-1">
                                            <p className=" text-[10px] text-gray-400">
                                                Ports
                                            </p>
                                            <h4 className="text-sm font-semibold text-primary">
                                                {route.ports}
                                            </h4>
                                        </div>
                                        <div className="flex-1">
                                            <p className=" text-[10px] text-gray-400">
                                                Capacity
                                            </p>
                                            <h4 className="text-sm font-semibold text-primary">
                                                {route.capacity}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2.5 flex gap-2.5">
                                    <Link
                                        href={`/admin/routes/${route.id}`}
                                        className={`${buttonVariants({
                                            size: "sm",
                                        })} w-full gap-2`}
                                    >
                                        {" "}
                                        Edit <HiPencilAlt />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-slate-400">No routes posted</p>
                )}
            </div>
            {/* <pre>{JSON.stringify(targets, null, 2)}</pre> */}
        </div>
    );
}
