import Loader from "@/components/Loader";
import { supabaseServer } from "@/lib/supabase-server";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { AddTech } from "./AddTech";
import { TechTable } from "./TechTable";

export default function ManagersPage() {
    return (
        <div className="">
            <div className="flex pb-4 justify-between items-center">
                <h2 className="font-bold tracking-tight text-2xl">Tech</h2>
                <AddTech />
            </div>
            <div className="flex flex-col gap-3 xl:flex-row w-full overflow-x-auto">
                <Suspense fallback={<Loader />}>
                    <Techs />
                </Suspense>
            </div>
        </div>
    );
}
const Techs = async () => {
    unstable_noStore();
    const supabase = supabaseServer();
    let { data: tech, error } = await supabase
        .from("profiles")
        .select("*")
        .match({ role: "tech" });

    return <TechTable data={tech} />;
};
