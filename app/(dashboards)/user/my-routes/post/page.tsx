import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { PostOffersTable } from "./PostRouteTable";
import { TargetsTable } from "../../targets/targets-table";
import { unstable_noStore } from "next/cache";
import fetchUser from "@/app/(public)/post/fetchUser";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import { Separator } from "@/components/ui/separator";

export default function PostRoutes() {
    return (
        <section className="">
            <Link
                href="/user/my-routes"
                className="inline-flex mt-3 items-center text-gray-400 hover:text-primary-500 transition-all ease-in-out mb-2"
            >
                <HiOutlineArrowCircleLeft className="mr-1.5" /> My Routes
            </Link>
            <PostOffersTable />
            <Separator className="my-4"/>
            <Suspense fallback={<Loader />}>
                <TargetRates />
            </Suspense>
        </section>
    );
}

async function TargetRates() {
    unstable_noStore();
    const user = await fetchUser();
    const supabase = supabaseServer();
    let { data: targets, error } = await supabase
        .from("targets")
        .select("*")
        .neq("client_id", user?.id);
    return targets?.length ? (
        <TargetsTable data={targets} />
    ) : (
        <div className="gap-2  h-12 text-center flex items-center justify-center bg-surface py-10 rounded-lg">
            <p>No target rates yet</p>
        </div>
    );
}
