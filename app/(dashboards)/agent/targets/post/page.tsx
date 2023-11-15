import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { AddRouteTable } from "./AddTargets";
import { supabaseServer } from "@/lib/supabase-server";
import fetchUser from "@/app/post/fetchUser";
export const revalidate = 0; // revalidate at most every hour

const page = async () => {
     const supabase = await supabaseServer();
     const user = await fetchUser();
     let { data: clients, error } = await supabase
         .from("profiles")
         .select("*")
         .eq("agent_id", user?.id)
         .or(`role.eq.client,role.eq.vendor`);
    return (
        <section className="">
            <AddRouteTable users={clients} />
        </section>
    );
};

export default page;
