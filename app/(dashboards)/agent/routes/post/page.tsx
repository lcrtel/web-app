import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { AddRouteTable } from "./AddRoutes";
import { supabaseServer } from "@/lib/supabase-server";
import fetchUser from "@/app/post/fetchUser";
export const revalidate = 0;
const page = async () => {
    const supabase = await supabaseServer();
     const user = await fetchUser();
     let { data: vendors, error } = await supabase
         .from("profiles")
         .select("*")
         .match({ agent_id: user?.id, role: "vendor" });
    return (
        <section className="">
            <AddRouteTable users={vendors} />
        </section>
    );
};

export default page;
