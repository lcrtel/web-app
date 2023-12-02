import fetchUser from "@/app/post/fetchUser";
import { supabaseServer } from "@/lib/supabase-server";
import BulkInvoiceForm from "./BulkInvoiceForm";
export const revalidate = 0;



export default async function page() {
    const supabase = await supabaseServer();
    const agent: any = await fetchUser();

    let { data: clients } = await supabase
        .from("profiles")
        .select("*")
        .eq("agent_id", agent.id)

        .or(`role.eq.client,role.eq.vendor`);
    let { data: payment_methods } = await supabase.from("config").select("*");
    return (
        <section className="flex flex-col h-full">
            <h3 className="text-2xl tracking-tight font-bold mb-4">
                Bulk Invoice
            </h3>
            <BulkInvoiceForm
                clients={clients}
                paymentMethods={payment_methods}
            />
        </section>
    );
}
