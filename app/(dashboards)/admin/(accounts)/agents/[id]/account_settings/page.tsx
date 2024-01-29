import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { Suspense } from "react";
import { AccountSettingsForm } from "../../../_components/AccountSettingsForm";

export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <Suspense
            fallback={<Skeleton className="w-full h-[421px]  max-w-3xl" />}
        >
            <VendorDetails id={params.id} />
        </Suspense>
    );
}

const VendorDetails = async ({ id }: { id: string }) => {
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
