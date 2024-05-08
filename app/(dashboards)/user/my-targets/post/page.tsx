import Link from "next/link";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { PostTargetTable } from "./PostTargetTable";
import { supabaseServer } from "@/lib/supabase-server";
import { OffersTable } from "../../routes/offers-table";
import { fetchUserData } from "@/utils/user";
export const revalidate = 0;
const page = async () => {
    const user = await fetchUserData();

    const supabase = supabaseServer();
    let { data: routes, error } = await supabase
        .from("routes")
        .select("*")
        .eq("verification", "verified")
        .neq("vendor_id", user?.id);
    return (
        <section className="">
            <Link
                href="/user/my-targets"
                className="inline-flex mt-3 items-center text-gray-400 hover:text-primary-500 transition-all ease-in-out mb-2"
            >
                <HiOutlineArrowCircleLeft className="mr-1.5" /> My Targets
            </Link>
            <PostTargetTable />
            {routes?.length ? (
                <>
                    <h3 className="border-t mt-4 text-xl pt-4 mb-2 font-bold text-primary-500 flex items-center tracking-tight">
                        Our Route Offers
                    </h3>
                    <OffersTable data={routes} />
                </>
            ) : null}
        </section>
    );
};

export default page;
