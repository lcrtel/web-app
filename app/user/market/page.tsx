import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData } from "@/utils/user";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { OffersTable } from "./offers/offers-table";
import { TargetsTable } from "./targets/targets-table";
export const revalidate = 0;
const page = async () => {
    const user = await fetchUserData();
    const supabase = supabaseServer();
    async function Offers() {
        let { data: routes, error } = await supabase
            .from("route_offers")
            .select("*")
            .eq("verification", "verified")
            .neq("seller_id", user?.id)
            .range(0, 4);
        return (
            <>
                <div className="flex mb-4 justify-between items-center">
                    <h3 className="text-lg  font-semibold text-primary-500">
                        Selling Rates
                    </h3>
                    <Link
                        href="/user/market/offers"
                        className={`${buttonVariants({
                            variant: "ghost",
                        })}`}
                    >
                        View All <HiArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
                {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
                {routes?.length ? (
                    <OffersTable data={routes} />
                ) : (
                    <div className="gap-2  h-12 text-center flex items-center justify-center bg-surface py-10 rounded-lg">
                        <p>No selling rates found</p>
                        {/* <Link
                        href="/user/routes/requests/request"
                        className="bg-primary-500 px-3 ml-2 py-2 text-white rounded-md"
                    >
                        Request
                    </Link> */}
                    </div>
                )}
            </>
        );
    }
    async function Targets() {
        let { data: routes, error } = await supabase
            .from("buying_targets")
            .select("*")
            .neq("buyer_id", user?.id)
            .range(0, 4);
        return (
            <div className="mt-5">
                <div className="flex mb-4 justify-between items-center">
                    <h3 className="text-lg  font-semibold text-primary-500">
                        Buying Targets
                    </h3>
                    <Link
                        href="/user/market/targets"
                        className={`${buttonVariants({
                            variant: "ghost",
                        })}`}
                    >
                        View All <HiArrowRight className="ml-2 h-4 w-4" />
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
    return (
        <div>
            <div className="mb-5 pt-5 ">
                <h2 className="text-2xl font-bold text-primary mb-3">
                    Market View
                </h2>
            </div>
            <Offers />
            <Targets />
        </div>
    );
};

export default page;
