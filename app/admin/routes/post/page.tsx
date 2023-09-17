import { supabaseAdmin } from "@/lib/supabase-admin";
import { AddRouteTable } from "./AddRoutes";
export const revalidate = 0;
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
