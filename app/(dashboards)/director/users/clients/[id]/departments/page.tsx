import { supabaseServer } from "@/lib/supabase-server";
import { Suspense } from "react";
import { CompanyForm } from "./CompanyForm";
import Loader from "@/components/Loader";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <Suspense
            fallback={
                <div className=" h-[400px] flex items-center justify-center container">
                    <Loader />
                </div>
            }
        >
            <Departments userId={params.id} />
        </Suspense>
    );
}

async function Departments({ userId }: { userId: string }) {
    const supabase = supabaseAdminServer();

    let { data: vendor, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
    return <CompanyForm user={vendor} />;
}
