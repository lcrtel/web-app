import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { AddRouteTable } from "./AddTargets";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HiArrowLeft } from "react-icons/hi";
export const revalidate = 0; // revalidate at most every hour

const page = async () => {
    const supabase = supabaseAdminServer();
    const {
        data: { users },
        error,
    } = await supabase.auth.admin.listUsers();
    return (
        <section className="">
            
            <div className="flex items-center gap-4 justify-between mb-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/routes/targets"
                        className={buttonVariants({
                            variant: "secondary",
                            size: "icon",
                        })}
                    >
                        <HiArrowLeft />
                    </Link>
                    <h1 className="text-xl  font-bold text-primary">
                        Add Route Requests
                    </h1>
                </div>
            </div>
            <AddRouteTable users={users} />
        </section>
    );
};

export default page;
