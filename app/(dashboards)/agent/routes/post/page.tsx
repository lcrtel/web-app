import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { AddRouteTable } from "./AddRoutes";
import { supabaseServer } from "@/lib/supabase-server";
import fetchUser from "@/app/(public)/post/fetchUser";
export const revalidate = 0;
const page = async () => {
    const supabase = await supabaseServer();
   const user = await fetchUser();
   let { data: clients, error } = await supabase
       .from("profiles")
       .select("*")
       .eq("agent_id", user?.id ? user.id : "");

    return (
        <section className="">
            <div className="flex items-center gap-4 justify-between mb-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/agent/routes"
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
            <AddRouteTable users={clients} />
        </section>
    );
};

export default page;
