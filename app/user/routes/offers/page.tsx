import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData } from "@/utils/user";
import { RoutesTable } from "./RoutesTable";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { HiOutlinePlusCircle } from "react-icons/hi";

const page = async () => {
    const supabase = supabaseServer();
    const user = await fetchUserData();
    let { data: routes, error } = await supabase
        .from("route_offers")
        .select("*")
        .match({ seller_id: user?.id });
    return (
        <section className="">
            <div className="flex my-5 justify-between items-center flex-wrap gap-2">
                <div>
                    <h3 className="text-2xl tracking-tight font-bold text-primary-500">
                        Your route offers
                    </h3>
                    <p className="text-gray-400 text-sm">
                        View and manage your route offers
                    </p>
                </div>
                <Link
                    href="/user/routes/offers/post"
                    className={`${buttonVariants({
                        variant: "default",
                        size: "icon",
                    })}`}
                >
                    <HiOutlinePlusCircle className="w-5 h-5" />
                </Link>
            </div>
            <RoutesTable data={routes} />
        </section>
    );
};

export default page;
