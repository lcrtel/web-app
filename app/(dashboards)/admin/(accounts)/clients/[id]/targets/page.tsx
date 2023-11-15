import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import formatDate from "@/utils/formatDate";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = await supabaseServer();
    let { data: targets, error } = await supabase
        .from("targets")
        .select("*")
        .eq("client_id", params?.id);
    return (
        <div>
            <h1 className="text-lg font-bold tracking-tight">Targets</h1>
            <div className="grid pt-4 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {targets?.length ? (
                    targets?.map((target) => (
                        <div
                            className="w-full flex flex-col justify-between p-4 bg-surface rounded-xl border "
                            key={target.id}
                        >
                            <p className="mb-2 text-xs text-gray-400">
                                Posted on: {formatDate(target.created_at)}
                            </p>
                            <div className="mb-2.5 grid grid-cols-2">
                                <div>
                                    <p className=" text-xs text-gray-400">
                                        Destination
                                    </p>
                                    <h4 className="text-base font-bold mr-3 uppercase text-primary">
                                        {target.destination}
                                    </h4>
                                </div>
                                <div>
                                    <p className=" text-xs text-gray-400">
                                        Code
                                    </p>
                                    <h4 className="text-base font-bold mr-3 uppercase text-primary">
                                        {target.destination_code}
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
                                            {target.route_type}
                                        </h4>
                                    </div>
                                    <div className="flex-1">
                                        <p className=" text-xs text-gray-400">
                                            Rate
                                        </p>
                                        <h4 className="text-base font-bold text-primary">
                                            $ {target.rate}
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
                                                {target.prefix}
                                            </h4>
                                        </div>{" "}
                                        <div className="flex-1">
                                            <p className=" text-[10px] text-gray-400">
                                                PDD
                                            </p>
                                            <h4 className="text-sm font-semibold text-primary ">
                                                {target.pdd}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-1">
                                            <p className=" text-[10px] text-gray-400">
                                                ASR %
                                            </p>
                                            <h4 className="text-sm font-semibold text-primary">
                                                {target.asr}
                                            </h4>
                                        </div>
                                        <div className="flex-1">
                                            <p className=" text-[10px] text-gray-400">
                                                ACD
                                            </p>
                                            <h4 className="text-sm font-semibold text-primary">
                                                {target.acd}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-1">
                                            <p className=" text-[10px] text-gray-400">
                                                Ports
                                            </p>
                                            <h4 className="text-sm font-semibold text-primary">
                                                {target.ports}
                                            </h4>
                                        </div>
                                        <div className="flex-1">
                                            <p className=" text-[10px] text-gray-400">
                                                Capacity
                                            </p>
                                            <h4 className="text-sm font-semibold text-primary">
                                                {target.capacity}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2.5 flex gap-2.5">
                                    <Link
                                        href={`/admin/targets/${target.id}`}
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
                    <p className="text-slate-400">No targets posted</p>
                )}
            </div>
            {/* <pre>{JSON.stringify(targets, null, 2)}</pre> */}
        </div>
    );
}
