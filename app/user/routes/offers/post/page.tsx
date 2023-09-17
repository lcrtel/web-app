import { TargetsTable } from "@/app/user/market/targets/targets-table";
import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { PostRouteTable } from "./PostRouteTable";
export const revalidate = 0;
const page = async () => {
    const supabase = supabaseServer();
    let { data: targets, error } = await supabase
        .from("buying_targets")
        .select("*");
    return (
        <section className="">
            <Link
                href="/user/routes/offers"
                className="inline-flex mt-3 items-center text-gray-400 hover:text-primary-500 transition-all ease-in-out mb-2"
            >
                <HiOutlineArrowCircleLeft className="mr-1.5" /> Manage Offers
            </Link>{" "}
            <PostRouteTable />{" "}
            {targets?.length ? (
                <>
                    <h3 className="text-xl pt-4 mt-5 mb-2 border-t font-semibold text-primary-500 flex items-center tracking-tight">
                        Our buying targets
                    </h3>
                    <TargetsTable data={targets} />
                </>
            ) : null}
        </section>
    );
};

export default page;
