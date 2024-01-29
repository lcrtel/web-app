import { AccountSettingsForm } from "@/app/(dashboards)/admin/(accounts)/_components/AccountSettingsForm";
import Loader from "@/components/Loader";
import { supabaseServer } from "@/lib/supabase-server";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";

export default function Page({ params }: { params: { id: any } }) {
    return (
        <Suspense
            fallback={
                <div className=" h-[400px] flex items-center justify-center container">
                    <Loader />
                </div>
            }
        >
            <VendorDetails id={params.id} />
        </Suspense>
    );
}

const VendorDetails = async ({ id }: { id: string }) => {
    unstable_noStore();
    const supabase = supabaseServer();
    let { data: vendor, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
    let { data: agents } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "agent");

    return <AccountSettingsForm user={vendor} agents={agents} />;
};
