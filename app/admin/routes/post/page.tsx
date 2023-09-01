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
            <AddRouteTable users={users} />
        </section>
    );
};

export default page;
