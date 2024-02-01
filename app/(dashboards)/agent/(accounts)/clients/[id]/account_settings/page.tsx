import Loader from "@/components/Loader";
import { supabaseServer } from "@/lib/supabase-server";
import { Suspense } from "react";
import { unstable_noStore } from "next/cache";
import { AccountSettingsForm } from "@/app/(dashboards)/admin/(accounts)/_components/AccountSettingsForm";

export default function Page({ params }: { params: { id: any } }) {
    return (
        <Suspense
            fallback={
                <div className=" h-[400px] flex items-center justify-center container">
                    <Loader />
                </div>
            }
        >
            <ClientDetails id={params.id} />
        </Suspense>
    );
}

const ClientDetails = async ({ id }: { id: string }) => {
    unstable_noStore();
    const supabase = supabaseServer();
    let { data: client, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
    return <AccountSettingsForm user={client} type="agent" />;
};
