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
    const supabase = supabaseServer();
    let { data: BuyingTarget } = await supabase
        .from("buying_targets")
        .select("*")
        .match({ id: params.id });
    if (BuyingTarget === null) {
        redirect("/user/routes/targets");
    }
    let { data: route_offers, error } = await supabase
        .from("route_offers")
        .select("*")
        .match({ destination_code: BuyingTarget?.[0]?.destination_code })
        .eq("route_type", BuyingTarget?.[0]?.route_type);

    return (
        <div>
            <div className="">
                <div>
                    <Link
                        href="/user/routes/targets"
                        className="inline-flex items-center text-gray-400 hover:text-primary-500 transition-all ease-in-out mb-2"
                    >
                        <HiOutlineArrowCircleLeft className="mr-1.5" /> Manage
                        Targets
                    </Link>
                    <div className="mb-3 ">
                        <h2 className="text-2xl font-bold text-primary tracking-tight">
                            Target Details
                        </h2>
                    </div>
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex flex-wrap">
                            <p className="text-gray-500 mr-2">
                                Destination:{" "}
                                <span className="font-semibold capitalize text-primary-500">
                                    {BuyingTarget?.[0]?.destination}
                                </span>
                            </p>
                            <p className="text-gray-500 mr-2">
                                Type:{" "}
                                <span className="font-semibold uppercase text-primary-500">
                                    {BuyingTarget?.[0]?.route_type}
                                </span>
                            </p>
                            <p className="text-gray-500 mr-2">
                                Target Rate:{" "}
                                <span className="font-semibold uppercase text-primary-500">
                                    ${BuyingTarget?.[0]?.rate}
                                </span>
                            </p>
                        </div>
                        <Link
                            href={`/user/routes/targets/post/${BuyingTarget?.[0]?.id}`}
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
                            {BuyingTarget?.[0]?.prefix}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">
                            Destination Code
                        </p>
                        <p className=" font-semibold">
                            {BuyingTarget?.[0]?.destination_code}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">ASR</p>
                        <p className=" font-semibold">
                            {BuyingTarget?.[0]?.asr}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">ACD</p>
                        <p className=" font-semibold">
                            {BuyingTarget?.[0]?.acd}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">PDD</p>
                        <p className=" font-semibold">
                            {BuyingTarget?.[0]?.pdd}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Ports</p>
                        <p className=" font-semibold">
                            {BuyingTarget?.[0]?.ports}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Capacity</p>
                        <p className=" font-semibold">
                            {BuyingTarget?.[0]?.capacity}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Status</p>
                        <p className=" font-semibold">
                            {formatString(BuyingTarget?.[0]?.status)}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Posted on</p>
                        <p className=" font-semibold">
                            {BuyingTarget?.[0]?.created_at
                                ? formatTimestamptz(
                                      BuyingTarget?.[0]?.created_at
                                  )
                                : "_"}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Updated on</p>
                        <p className=" font-semibold">
                            {BuyingTarget?.[0]?.updated_at
                                ? formatTimestamptz(
                                      BuyingTarget?.[0]?.updated_at
                                  )
                                : "_"}
                        </p>
                    </div>
                </div>

                <Separator />
                <div className="my-5">
                    <RoutesTable data={route_offers} />
                </div>
            </div>
        </div>
    );
}
