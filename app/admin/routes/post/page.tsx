import { buttonVariants } from "@/components/ui/button";
import { supabaseAdmin } from "@/lib/supabase-admin";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { AddRouteTable } from "./AddRoutes";

const page = async () => {
    const supabase = supabaseAdmin();
    const {
        data: { users },
        error,
    } = await supabase.auth.admin.listUsers();
    return (
        <section className="">
            <div className="flex items-center gap-4 mb-4">
                <Link
                    href="/admin/routes"
                    className={buttonVariants({ variant: "secondary" })}
                >
                    <HiArrowLeft className="mr-1.5" /> Back
                </Link>
                <h3 className="text-lg  font-semibold text-primary">
                    Post route offers!
                </h3>
            </div>
            <AddRouteTable users={users} />
        </section>
    );
};

export default page;
