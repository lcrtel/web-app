import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData } from "@/utils/user";
import Link from "next/link";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { RoutesTable } from "./RoutesTable";
export const revalidate = 0;
const page = async () => {
    const supabase = await supabaseServer();
    const user = await fetchUserData();
    let { data: routes, error } = await supabase
        .from("routes")
        .select("*")
        .match({ vendor_id: user?.id });
    return (
        <section className="">
            <div className="flex mb-5 justify-between items-center flex-wrap gap-2">
                <div>
                    <h3 className="text-2xl tracking-tight font-bold text-primary-500 flex items-center">
                        My Route Offers
                    </h3>
                    <p className="text-gray-400 text-sm">
                        View and manage your route offers
                    </p>
                </div>
                <Link
                    href="/user/my-routes/post"
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
