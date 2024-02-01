import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { Suspense } from "react";
import { AccountSettingsForm } from "../../../_components/AccountSettingsForm";

export const revalidate = 0;

export default function Page({ params }: { params: { id: string } }) {
    return (
        <Suspense
            fallback={<Skeleton className="w-full h-[421px]  max-w-3xl" />}
        >
            <AgentDetails id={params.id} />
        </Suspense>
    );
}

const AgentDetails = async ({ id }: { id: string }) => {
    const supabase = supabaseServer();
    let { data: agent, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
    return <AccountSettingsForm user={agent} type="admin" />;
};
