import { supabaseServer } from "@/lib/supabase-server";
import formatTimestamptz from "@/utils/formatTimestamptz";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import AddToCart from "../AddToCart";

export const revalidate = 0;
export default async function Page({ params }: { params: { id: string } }) {
    const supabase = supabaseServer();
    let { data: route } = await supabase
        .from("routes")
        .select("*")
        .match({ id: params.id });
    if (route === null) {
        redirect("/user/routes");
    }

    return (
        <div>
            <Link
                href="/user/routes"
                className="inline-flex items-center text-gray-400 hover:text-primary-500 transition-all ease-in-out"
            >
                <HiOutlineArrowCircleLeft className="mr-1.5" /> Routes
            </Link>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between">
                        <h3 className="text-xl font-bold">Route Details</h3>
                        <AddToCart routeID={params.id} />
                    </div>
                    <div className="flex flex-wrap">
                        <p className=" text-sm text-gray-500 mr-2">
                            Destination:{" "}
                            <span className="font-semibold capitalize text-primary-500">
                                {route?.[0]?.destination}
                            </span>
                        </p>
                        <p className=" text-sm text-gray-500 mr-2">
                            Type:{" "}
                            <span className="font-semibold uppercase text-primary-500">
                                {route?.[0]?.route_type}
                            </span>
                        </p>
                        <p className=" text-sm text-gray-500 mr-2">
                            Rate:{" "}
                            <span className="font-semibold uppercase text-primary-500">
                                ${route?.[0]?.selling_rate}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 bg-surface rounded-lg p-4">
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Prefix</p>
                        <p className=" font-semibold">{route?.[0]?.prefix}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">
                            Destination Code
                        </p>
                        <p className=" font-semibold">
                            {route?.[0]?.destination_code}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">ASR</p>
                        <p className=" font-semibold">{route?.[0]?.asr}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">ACD</p>
                        <p className=" font-semibold">{route?.[0]?.acd}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">PDD</p>
                        <p className=" font-semibold">{route?.[0]?.pdd}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Ports</p>
                        <p className=" font-semibold">{route?.[0]?.ports}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Capacity</p>
                        <p className=" font-semibold">{route?.[0]?.capacity}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Posted on</p>
                        <p className=" font-semibold">
                            {route?.[0]?.created_at
                                ? formatTimestamptz(route?.[0]?.created_at)
                                : "_"}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Updated on</p>
                        <p className=" font-semibold">
                            {route?.[0]?.updated_at
                                ? formatTimestamptz(route?.[0]?.updated_at)
                                : "_"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
