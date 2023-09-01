import Link from "next/link";

import { supabaseServer } from "@/lib/supabase-server";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { buttonVariants } from "@/components/ui/button";
import { TargetsTable } from "./targets-table";
import TradeNav from "../nav";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Page() {
    const supabase = supabaseServer();
    let { data: routes, error } = await supabase
        .from("buying_targets")
        .select("*");
    return (
        <div className="">
            <div className="mb-5 pt-5 ">
                <h2 className="text-2xl font-bold text-primary mb-3 tracking-tight">
                    Market View{" "}
                </h2>
                <TradeNav />
            </div>
            <div className="flex mb-4 justify-between items-center">
                <h3 className="text-xl font-semibold text-primary-500 tracking-tight flex items-center">
                    Buying Targets
                </h3>
                <Link
                    href="/user/routes/targets/post"
                    className={`${buttonVariants({
                        variant: "default",
                    })}`}
                >
                    Post your Target
                </Link>
            </div>
            {routes?.length ? (
                <TargetsTable data={routes} />
            ) : (
                <div className="gap-2  h-12 text-center flex items-center justify-center bg-surface py-10 rounded-lg">
                    <p>No buying targets found</p>
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
