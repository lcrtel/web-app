import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { AddRouteTable } from "./AddTargets";
export const revalidate = 0; // revalidate at most every hour

const page = async () => {
    const supabase = await supabaseAdminServer();
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
