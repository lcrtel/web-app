import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData } from "@/utils/user";
import BulkInvoiceForm from "./BulkInvoiceForm";
import fetchUser from "@/app/post/fetchUser";
export const revalidate = 0;

export default async function page() {
    const supabase = await supabaseServer();
    const user = await fetchUser()
    const { data: invoices } = await supabase.from("invoices").select(`*`);
    const agent: any = await fetchUserData();
    let { data: gateways } = await supabase
        .from("gateways")
        .select(`*, routes (*), profiles (*)`);

    let { data: clients } = await supabase
        .from("profiles")
        .select("*")
        .eq("agent_id", agent?.id)
        .or(`role.eq.client,role.eq.vendor`);
    let { data: payment_methods } = await supabase
        .from("payment_methods")
        .select("*");
    return (
        <section className="flex flex-col h-full">
            <h3 className="text-2xl tracking-tight font-bold mb-4">
                Bulk Invoice
            </h3>
            <BulkInvoiceForm
                clients={clients}
                gateways={gateways}
                paymentMethods={payment_methods}
                agentID={user?.id}
            />
        </section>
    );
}
