import { columns } from "./columns";
import { Routes } from "./routes";
import { supabaseServer } from "@/lib/supabase-server";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Page() {
    const supabase = supabaseServer();
    let { data: routes, error } = await supabase.from("routes").select("*");
    return (
        <div className="">
            {routes?.length ? (
                <Routes columns={columns} data={routes} />
            ) : (
                <p>No routes found</p>
            )}
        </div>
    );
}
