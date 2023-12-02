import { buttonVariants } from "@/components/ui/button";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { AddRouteTable } from "./AddRoutes";
export const revalidate = 0;
const page = async () => {
    const supabase = await supabaseAdminServer();
    const {
        data: { users },
        error,
    } = await supabase.auth.admin.listUsers();
    return (
        <section className="">
            <div className="flex items-center gap-4 justify-between mb-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/routes"
                        className={buttonVariants({
                            variant: "secondary",
                            size: "icon",
                        })}
                    >
                        <HiArrowLeft />
                    </Link>
                    <h3 className="text-xl  font-bold text-primary">
                        Add routes
                    </h3>
                </div>
            </div>
            <AddRouteTable users={users} />
        </section>
    );
};

export default page;
