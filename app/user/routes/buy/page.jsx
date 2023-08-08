import Link from "next/link";
import { columns } from "./columns";
import { Routes } from "./routes";
import { supabaseServer } from "@/lib/supabase-server";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { buttonVariants } from "@/components/ui/button";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Page() {
    const supabase = supabaseServer();
    let { data: routes, error } = await supabase.from("routes").select("*");
    return (
        <div className="">
            <div className="flex mb-4 justify-between items-center">
                <h3 className="text-lg  font-semibold text-primary-500">
                    Buy VoIP Routes
                </h3>
            </div>
            {routes?.length ? (
                <Routes columns={columns} data={routes} />
            ) : (
                <div className="gap-2  h-12 text-center flex items-center justify-center bg-surface py-10 rounded-lg">
                    <p>No routes found</p>
                    <Link
                        href="/user/routes/requests/request"
                        className="bg-primary-500 px-3 ml-2 py-2 text-white rounded-md"
                    >
                        Request
                    </Link>
                </div>
            )}
        </div>
    );
}
