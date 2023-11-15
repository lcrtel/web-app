import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import formatTimestamptz from "@/utils/formatTimestamptz";
import { HiOutlineArrowCircleLeft, HiOutlinePencilAlt } from "react-icons/hi";
import Link from "next/link";
import { RoutesTable } from "./routes-table";
import { redirect } from "next/navigation";

import formatString from "@/utils/formatString";
export const revalidate = 0;
export default async function Page({ params }: { params: { id: string } }) {
    const supabase = await supabaseServer();
    let { data: route } = await supabase
        .from("routes")
        .select("*")
        .match({ id: params.id }).single();
    if (!route) {
        redirect("/user/my-routes");
    }
    let { data: targets, error } = await supabase
        .from("targets")
        .select("*")
        .match({ destination_code: route?.destination_code })
        .eq("route_type", route?.route_type);

    return (
        <div>
            <div className="">
                <div>
                    <Link
                        href="/user/my-routes"
                        className="inline-flex items-center text-gray-400 hover:text-primary-500 transition-all ease-in-out mb-2"
                    >
                        <HiOutlineArrowCircleLeft className="mr-1.5" />
                      My routes
                    </Link>
                    <div className="mb-3 ">
                        <h2 className="text-2xl font-bold text-primary tracking-tight">
                            Route Details
                        </h2>
                    </div>
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex flex-wrap">
                            <p className="  text-gray-500 mr-2">
                                Destination:{" "}
                                <span className="font-semibold capitalize text-primary-500">
                                    {route?.destination}
                                </span>
                            </p>
                            <p className="  text-gray-500 mr-2">
                                Type:{" "}
                                <span className="font-semibold uppercase text-primary-500">
                                    {route?.route_type}
                                </span>
                            </p>
                            <p className="  text-gray-500 mr-2">
                                Offer Rate:{" "}
                                <span className="font-semibold uppercase text-primary-500">
                                    ${route?.rate}
                                </span>
                            </p>
                        </div>{" "}
                        <Link
                            href={`/user/my-routes/post/${route?.id}`}
                            className=""
                        >
                            <HiOutlinePencilAlt className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 bg-surface rounded-lg p-4 mb-5">
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Prefix</p>
                        <p className=" font-semibold">
                            {route?.prefix}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">
                            Destination Code
                        </p>
                        <p className=" font-semibold">
                            {route?.destination_code}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">ASR</p>
                        <p className=" font-semibold">{route?.asr}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">ACD</p>
                        <p className=" font-semibold">{route?.acd}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">PDD</p>
                        <p className=" font-semibold">{route?.pdd}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Ports</p>
                        <p className=" font-semibold">
                            {route?.ports}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Capacity</p>
                        <p className=" font-semibold">
                            {route?.capacity}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Status</p>
                        <p className=" font-semibold">
                            {formatString(route?.verification)}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Posted on</p>
                        <p className=" font-semibold">
                            {route?.created_at
                                ? formatTimestamptz(route?.created_at)
                                : "_"}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Updated on</p>
                        <p className=" font-semibold">
                            {route?.updated_at
                                ? formatTimestamptz(route?.updated_at)
                                : "_"}
                        </p>
                    </div>
                </div>

                <Separator />
                <div className="my-5">
                    <RoutesTable data={targets} />
                </div>
            </div>
        </div>
    );
}
