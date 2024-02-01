import Link from "next/link";

import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData } from "@/utils/user";
import { HiArrowRight } from "react-icons/hi";
import { OffersTable } from "./offers-table";

export const revalidate = 0; // revalidate this page every 60 seconds

export default async function Page() {
    const user = await fetchUserData();
    const supabase = supabaseServer();
    let { data: routes, error } = await supabase
        .from("routes")
        .select("*")
        .eq("verification", "verified")
        .neq("vendor_id", user?.id);
    return (
        <div className="">
            <h3 className="text-2xl  font-bold text-primary-500 flex items-center tracking-tight">
                Route Offers
            </h3>
            <p className="text-sm text-slate-400 mb-4">
                Explore our route offers
            </p>

            {routes?.length ? (
                <div className="max-h-[67vh] ">
                    <OffersTable data={routes} />
                </div>
            ) : (
                <div className="gap-2  h-12 text-center flex items-center justify-center bg-surface py-10 rounded-lg">
                    <p>No routes found</p>
                </div>
            )}
            <Link
                href="/user/my-targets/post"
                passHref
                className="bg-slate-50 mt-4 w-full block hover:bg-slate-100 transition-all ease-in border rounded-xl  p-5 active:scale-[99%]"
            >
                <div className="flex justify-between items-center">
                    <div className="">

                    <p className=" text-slate-500 font-medium">No routes meet your needs?</p>
                    <h3 className="font-bold  text-xl">
                        Request for a route
                    </h3>
                    <p className=" text-sm text-slate-400">We will let you know when there is a route matching your request</p>
                    </div>
                    <HiArrowRight className="w-5 h-5" />
                </div>
            </Link>
        </div>
    );
}
