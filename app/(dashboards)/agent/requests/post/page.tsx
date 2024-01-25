import fetchUser from "@/app/(public)/post/fetchUser";
import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { AddRouteTable } from "./AddTargets";
export const revalidate = 0; // revalidate at most every hour

const page = async () => {
    const supabase = supabaseServer();
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
                        href="/agent/requests"
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
            <AddRouteTable users={clients} />
        </section>
    );
};

export default page;
