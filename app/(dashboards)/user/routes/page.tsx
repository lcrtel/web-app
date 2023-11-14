import Link from "next/link";

import { supabaseServer } from "@/lib/supabase-server";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { buttonVariants } from "@/components/ui/button";
import { OffersTable } from "./offers-table";
import TradeNav from "../nav";
import { fetchUserData } from "@/utils/user";

export const revalidate = 0; // revalidate this page every 60 seconds

export default async function Page() {
    const user = await fetchUserData();
    const supabase = await supabaseServer();
    let { data: routes, error } = await supabase
        .from("routes")
        .select("*")
        .eq("verification", "verified")
        .neq("vendor_id", user?.id);
    return (
        <div className="">
            <div className="flex mb-4 justify-between items-center">
                <h3 className="text-2xl  font-bold text-primary-500 flex items-center tracking-tight">
                    Routes
                </h3>
                <Link
                    href="/user/my-targets/post"
                    className={`${buttonVariants({
                        variant: "default",
                    })}`}
                >
                    Post yout target
                </Link>
            </div>
            {routes?.length ? (
                <OffersTable data={routes} />
            ) : (
                <div className="gap-2  h-12 text-center flex items-center justify-center bg-surface py-10 rounded-lg">
                    <p>No routes found</p>
                </div>
            )}
        </div>
    );
}
