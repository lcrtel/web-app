import React, { Suspense } from "react";
import MailForm from "./MailForm";
import { supabaseServer } from "@/lib/supabase-server";
import Loader from "@/components/Loader";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <Suspense fallback={
                <div className=" h-[400px] flex items-center justify-center container">
                    <Loader />
                </div>
            }>
            <Notifications userId={params.id} />
        </Suspense>
    );
}

async function Notifications({ userId }: { userId: string }) {
    const supabase = supabaseAdminServer();

    let { data: vendor } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
    return <MailForm clientDetails={vendor} />;
}
