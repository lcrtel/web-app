"use client";
import { supabaseClient } from "@/lib/supabase-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";

const RealTimePurchaseRequests = ({
    purchaseRequests,
}: {
    purchaseRequests: PurchaseRequest[];
}) => {
    const supabase = supabaseClient();
    const router = useRouter();
    useEffect(() => {
        const realtimeRequests = supabase
            .channel("realtime-requests")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "purchase_requests" },
                () => {
                    router.refresh();
                }
            )
            .subscribe();
        return () => {
            supabase.removeChannel(realtimeRequests);
        };
    }, [supabase, router]);
    return (
        <>
            {purchaseRequests?.map((purchaseRequest) => (
                <Link
                    href={`/user/purchase_requests/${purchaseRequest.id}`}
                    passHref
                    key={purchaseRequest.id}
                    className={`flex gap-5 shadow hover:translate-x-1 cursor-pointer transition-all ease-in-out items-center justify-between border-[1.5px] rounded-md px-4 py-2  ${
                        purchaseRequest.status === "approved"
                            ? "bg-gradient-to-l from-green-100 to-green-50 border-green-100 shadow-green-100"
                            : "bg-gradient-to-l from-slate-100 to-slate-50 border-slate-100 shadow-slate-100"
                    }`}
                >
                    <p className="capitalize">
                        {purchaseRequest.route_offers?.destination} -{" "}
                        <span className="uppercase font-medium">
                            {purchaseRequest?.route_offers?.route_type}
                        </span>{" "}
                    </p>
                    <div className="flex items-center gap-2">
                        {purchaseRequest.status === "approved" ? (
                            <span className="text-xs font-medium bg-green-100 border-[1.5px] border-green-200 text-green-500 rounded-full px-2 py-1 ml-2">
                                Approved
                            </span>
                        ) : (
                            <span className="text-xs bg-slate-100 border-[1.5px] border-slate-200  text-slate-500 rounded-full px-2 py-1 ml-2">
                                Pending
                            </span>
                        )}
                        <div>
                            <HiOutlineExternalLink className="-mt-[2px] w-5 h-5" />
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
};

export default RealTimePurchaseRequests;
