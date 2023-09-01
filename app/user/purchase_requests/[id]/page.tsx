import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import formatTimestamptz from "@/utils/formatTimestamptz";
import {
    HiClock,
    HiOutlineArrowCircleLeft,
    HiOutlineClock,
    HiOutlinePencilAlt,
} from "react-icons/hi";
import Link from "next/link";
import { redirect } from "next/navigation";
import formatString from "@/utils/formatString";

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = supabaseServer();
    let { data: requests, error } = await supabase
        .from("purchase_requests")
        .select(`*, route_offers (*)`)
        .match({ id: params.id })
        .single();
    return (
        <div>
            <div>
                <Link
                    href="/user/purchase_requests"
                    className="inline-flex items-center text-gray-400 hover:text-primary-500 transition-all ease-in-out mb-2"
                >
                    <HiOutlineArrowCircleLeft className="mr-1.5" /> Purchase
                    Requests
                </Link>
                <div className="mb-3 ">
                    <h2 className="text-2xl font-bold text-primary tracking-tight">
                        Purchase Request Details
                    </h2>
                </div>
                <div className="flex justify-between items-center mb-5">
                    <div className="flex flex-wrap gap-4 items-center">
                        <p className="  text-gray-500 flex items-center gap-2">
                            Status:{" "}
                            <span className="font-semibold text-sm items-center capitalize border flex gap-1 rounded-full text-slate-500 border-slate-500 bg-slate-100 px-1.5 py-1">
                                <HiOutlineClock className="w-5 h-5" />{" "}
                                {requests?.status}
                            </span>
                        </p>
                        <p className="  text-gray-500 ">
                            Destination:{" "}
                            <span className="font-semibold capitalize text-primary-500">
                                {requests?.route_offers?.destination}
                            </span>
                        </p>
                        <p className="  text-gray-500 ">
                            Type:{" "}
                            <span className="font-semibold uppercase text-primary-500">
                                {requests?.route_offers?.route_type}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 bg-surface rounded-lg p-4 mb-5">
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">Prefix</p>
                    <p className=" font-semibold">
                        {requests?.route_offers?.prefix}
                    </p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">Destination Code</p>
                    <p className=" font-semibold">
                        {requests?.route_offers?.destination_code}
                    </p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">ASR</p>
                    <p className=" font-semibold">
                        {requests?.route_offers?.asr}
                    </p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">ACD</p>
                    <p className=" font-semibold">
                        {requests?.route_offers?.acd}
                    </p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">PDD</p>
                    <p className=" font-semibold">
                        {requests?.route_offers?.pdd}
                    </p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">Ports</p>
                    <p className=" font-semibold">
                        {requests?.route_offers?.ports}
                    </p>
                </div>
                <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                    <p className=" text-sm text-gray-500">Capacity</p>
                    <p className=" font-semibold">
                        {requests?.route_offers?.capacity}
                    </p>
                </div>
            </div>
        </div>
    );
}