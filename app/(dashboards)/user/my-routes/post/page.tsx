import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { PostOffersTable } from "./PostRouteTable";
import { TargetsTable } from "../../requests/targets-table";
export const revalidate = 0;
const page = async () => {
    const supabase = await supabaseServer();
    let { data: targets, error } = await supabase
        .from("targets")
        .select("*");
    return (
        <section className="">
            <Link
                href="/user/my-routes"
                className="inline-flex mt-3 items-center text-gray-400 hover:text-primary-500 transition-all ease-in-out mb-2"
            >
                <HiOutlineArrowCircleLeft className="mr-1.5" /> My Routes
            </Link>{" "}
            <PostOffersTable />{" "}
            {targets?.length ? (
                <>
                    <h3 className="text-xl pt-4 mb-2 font-semibold text-primary-500 flex items-center tracking-tight">
                        Our route requests
                    </h3>
                    <TargetsTable data={targets} />
                </>
            ) : null}
        </section>
    );
};

export default page;
