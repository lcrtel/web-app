import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { TargetsTable } from "./TargetsTable";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 0; // revalidate this page every 60 seconds

export default async function Page() {
    const supabase = await supabaseAdminServer();
    let { data: pending_requests } = await supabase
        .from("targets")
        .select("*")
    return (
        <div className="">
            <div className="flex  gap-2  flex-wrap md:items-center mb-4 justify-between ">
                <h1 className="text-2xl font-bold text-primary">Targets</h1>
                <Link
                    passHref
                    href="/agent/targets/post"
                    className={buttonVariants({
                        variant: "default",
                        size: "sm",
                    })}
                >
                    <HiOutlinePlusCircle className="mr-2 h-5 w-5" />
                    Add Targets
                </Link>
            </div>
            <div className="w-full  overflow-y-auto">
                <TargetsTable data={pending_requests} />
            </div>
        </div>
    );
}
