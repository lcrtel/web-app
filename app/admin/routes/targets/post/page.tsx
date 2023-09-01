import { AddRouteTable } from "./AddRoutes";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HiArrowLeft } from "react-icons/hi";
import { supabaseAdmin } from "@/lib/supabase-admin";

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
