import { supabaseServer } from "@/lib/supabase-server";

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = await supabaseServer();
    let { data: gateways, error } = await supabase
        .from("gateways")
        .select("*")
        .eq("client_id", params?.id);
    return (
        <div>
            <h1 className="text-lg font-bold tracking-tight">
               Gateways
            </h1>
        </div>
    );
}
