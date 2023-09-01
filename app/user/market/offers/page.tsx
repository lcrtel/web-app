import Link from "next/link";

import { supabaseServer } from "@/lib/supabase-server";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { buttonVariants } from "@/components/ui/button";
import { OffersTable } from "./offers-table";
import TradeNav from "../nav";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Page() {
    const supabase = supabaseServer();
    let { data: routes, error } = await supabase
        .from("route_offers")
        .select("*");
    return (
        <div className="">
            <div className="mb-5 pt-5 ">
                <h2 className="text-2xl font-bold text-primary mb-3 tracking-tight">
                    Market View
                </h2>
                <TradeNav />
            </div>
            <div className="flex mb-4 justify-between items-center">
                <h3 className="text-xl  font-semibold text-primary-500 flex items-center tracking-tight">
                    Route Offers{" "}
                    <span className="text-xs bg-primary-50 border border-primary-100 rounded-full px-2 py-1 ml-2">
                        {routes?.length} Routes
                    </span>
                </h3>
                <Link
                    href="/user/routes/offers/post"
                    className={`${buttonVariants({
                        variant: "default",
                    })}`}
                >
                    Post Route Offers
                </Link>
            </div>
            {routes?.length ? (
                <OffersTable data={routes} />
            ) : (
                <div className="gap-2  h-12 text-center flex items-center justify-center bg-surface py-10 rounded-lg">
                    <p>No route offers found</p>
                    {/* <Link
                        href="/user/routes/requests/request"
                        className="bg-primary-500 px-3 ml-2 py-2 text-white rounded-md"
                    >
                        Request
                    </Link> */}
                </div>
            )}
        </div>
    );
}
