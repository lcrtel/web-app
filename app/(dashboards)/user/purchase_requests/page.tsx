import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData } from "@/utils/user";
import Link from "next/link";
import React from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
export const revalidate = 0;

const page = async () => {
    const user = await fetchUserData();
    const supabase = supabaseServer();
    let { data: purchase_requests, error } = await supabase
        .from("purchase_requests")
        .select(`*, routes (*)`)
        .match({ client_id: user?.id, status: "pending" });
        
    return (
        <div>
            {" "}
            <div className="flex my-5 justify-between">
                <h3 className="text-2xl tracking-tight font-bold">
                    Purchase Requests
                </h3>
            </div>
            {purchase_requests?.length ? (
                <div className=" space-y-2">
                    {purchase_requests?.map((purchaseRequest) => (
                        <Link
                            href={`/user/purchase_requests/${purchaseRequest.id}`}
                            passHref
                            key={purchaseRequest.id}
                            className={`flex gap-5 shadow-sm hover:translate-x-1 cursor-pointer transition-all ease-in-out duration-500 items-center justify-between border rounded-md px-4 py-2  ${
                                purchaseRequest.status === "active"
                                    ? "bg-green-50"
                                    : "bg-slate-50"
                            }`}
                        >
                            <p className="capitalize">
                                {purchaseRequest?.routes?.destination} -{" "}
                                <span className="uppercase font-medium">
                                    {purchaseRequest?.routes?.route_type}
                                </span>{" "}
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium bg-slate-100 border-[1.5px] border-slate-200 text-slate-500 rounded-full px-2 py-1 ml-2 capitalize">
                                    {purchaseRequest.status}
                                </span>
                                <div>
                                    <HiOutlineExternalLink className="-mt-[2px] w-5 h-5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                    <p>No purchase requests found</p>
                    {/* <Link
                            href="/user/routes"
                            className="bg-primary-500 px-2 ml-2 py-1 text-white rounded-md"
                        >
                            Add now
                        </Link> */}
                </div>
            )}
            {/* <p className="mt-2 text-gray-500">No active gateways</p> */}
        </div>
    );
};

export default page;
