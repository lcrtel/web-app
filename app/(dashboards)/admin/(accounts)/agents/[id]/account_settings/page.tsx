import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { AccountSettingsForm } from "../../../_components/AccountSettingsForm";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <Suspense
            fallback={<Skeleton className="w-full h-[421px] max-w-3xl" />}
        >
            <AgentDetails id={params.id} />
        </Suspense>
    );
}

const AgentDetails = async ({ id }: { id: string }) => {
    unstable_noStore();
    const supabase = supabaseServer();
    let { data: agent } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
    return <AccountSettingsForm user={agent} type="admin" />;
};
