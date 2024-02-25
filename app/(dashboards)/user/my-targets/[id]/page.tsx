import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import formatTimestamptz from "@/utils/formatTimestamptz";
import { fetchUserData } from "@/utils/user";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiOutlineArrowCircleLeft, HiOutlinePencilAlt } from "react-icons/hi";
import { RoutesTable } from "./routes-table";
import { Suspense } from "react";
import Loader from "@/components/Loader";
export const revalidate = 0;

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div>
            <div>
                <Link
                    href="/user/my-targets"
                    className="inline-flex items-center text-gray-400 hover:text-primary-500 transition-all ease-in-out mb-2"
                >
                    <HiOutlineArrowCircleLeft className="mr-1.5" /> My Targets
                </Link>
                <div className="mb-3 ">
                    <h2 className="text-2xl font-bold text-primary tracking-tight">
                        Target Details
                    </h2>
                </div>
            </div>
            <Suspense fallback={<Loader />}>
                <TargetDetails id={params.id} />
            </Suspense>
        </div>
    );
}

async function TargetDetails({ id }: { id: string }) {
    const supabase = supabaseServer();
    const user = await fetchUserData();
    let { data: target } = await supabase
        .from("targets")
        .select("*")
        .match({ id: id })
        .single();
    if (target === null) {
        redirect("/user/my-targets");
    }

    let { data: routes, error } = await supabase
        .from("routes")
        .select("*")
        .match({ destination_code: target?.destination_code })
        .eq("route_type", target?.route_type)
        .neq("vendor_id", user?.id);

    return (
        <>
            <div className="flex justify-between items-center mb-5">
                <div className="flex flex-wrap">
                    <p className="text-gray-500 mr-2">
                        Destination:{" "}
                        <span className="font-semibold capitalize text-primary-500">
                            {target?.destination}
                        </span>
                    </p>
                    <p className="text-gray-500 mr-2">
                        Type:{" "}
                        <span className="font-semibold uppercase text-primary-500">
                            {target?.route_type}
                        </span>
                    </p>
                    <p className="text-gray-500 mr-2">
                        Requested Rate:{" "}
                        <span className="font-semibold uppercase text-primary-500">
                            ${target?.rate}
                        </span>
                    </p>
                </div>
                <Link href={`/user/my-targets/post/${target?.id}`} className="">
                    <HiOutlinePencilAlt className="w-5 h-5" />
                </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 bg-surface rounded-lg p-4 mb-5">
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">Destination Code</p>
                    <p className=" font-semibold">{target?.destination_code}</p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">ASR</p>
                    <p className=" font-semibold">{target?.asr}</p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">ACD</p>
                    <p className=" font-semibold">{target?.acd}</p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">PDD</p>
                    <p className=" font-semibold">{target?.pdd}</p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">Ports</p>
                    <p className=" font-semibold">{target?.ports}</p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">Capacity</p>
                    <p className=" font-semibold">{target?.capacity}</p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">Posted on</p>
                    <p className=" font-semibold">
                        {target?.created_at
                            ? formatTimestamptz(target?.created_at)
                            : "_"}
                    </p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">Updated on</p>
                    <p className=" font-semibold">
                        {target?.updated_at
                            ? formatTimestamptz(target?.updated_at)
                            : "_"}
                    </p>
                </div>
            </div>

            <Separator />
            <div className="my-5">
                <RoutesTable data={routes} />
            </div>
        </>
    );
}
