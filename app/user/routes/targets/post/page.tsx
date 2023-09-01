import Link from "next/link";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { PostTargetTable } from "./PostTargetTable";
import { supabaseServer } from "@/lib/supabase-server";
import { OffersTable } from "@/app/user/market/offers/offers-table";

const page = async () => {
    const supabase = supabaseServer();
    let { data: routes, error } = await supabase
        .from("route_offers")
        .select("*");
    return (
        <section className="">
            <Link
                href="/user/routes/targets"
                className="inline-flex mt-3 items-center text-gray-400 hover:text-primary-500 transition-all ease-in-out mb-2"
            >
                <HiOutlineArrowCircleLeft className="mr-1.5" /> Manage targets
            </Link>
            <PostTargetTable />
            {routes?.length ? (
                <>
                    <h3 className="text-xl pt-4 mt-5 mb-2 border-t font-semibold text-primary-500 flex items-center tracking-tight">
                        Our selling rates
                    </h3>
                    <OffersTable data={routes} />
                </>
            ) : null}
        </section>
    );
};

export default page;
