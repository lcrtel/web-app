import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { TargetsTable } from "./TargetsTable";

export const revalidate = 0; // revalidate this page every 60 seconds

export default async function Page() {
    const supabase = await supabaseServer();
    let { data: clients } = await supabase.from("profiles").select("*");
    let { data: targets } = await supabase
        .from("targets")
        .select("*")

        function addClientNameToTargets(targets: any, users: any) {
            return targets
                .filter((target: any) =>
                    users.some((user: any) => user.id === target.client_id)
                )
                .map((target: any) => {
                    const { client_id } = target;
                    const user = users.find(
                        (user: any) => user.id === client_id
                    );
                    const clientName = user ? user.name : null;
                    const clientCompany = user ? user.company_name : null;

                    return {
                        ...target,
                        client: clientName,
                        client_company: clientCompany,
                    };
                });
        }
    return (
        <div className="">
            <div className="flex  gap-2  flex-wrap md:items-center mb-4 justify-between ">
                <h1 className="text-2xl font-bold text-primary">Targets</h1>
                <Link
                    passHref
                    href="/admin/targets/post"
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
                <TargetsTable data={addClientNameToTargets(targets, clients)} />
            </div>
            {/* <pre>
                {JSON.stringify(addClientNameToTargets(targets, clients),null,2)}
            </pre> */}
        </div>
    );
}
