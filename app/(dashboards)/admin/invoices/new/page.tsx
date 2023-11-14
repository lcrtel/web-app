import { supabaseServer } from "@/lib/supabase-server";
import InvoiceForm from "./InvoiceForm";
export const revalidate = 0;
export default async function page() {
    const supabase = await supabaseServer();
    let { data: users } = await supabase.from("profiles").select("*");
    let { data: conncetions } = await supabase
        .from("gateways")
        .select(`*, routes (*)`);
    let { data: Banks } = await supabase.from("bank_accounts").select("*");
    return (
        <section className="flex flex-col h-full">
            <h3 className="text-2xl tracking-tight font-bold mb-4">
                Create Invoice
            </h3>
            <div className="px-5 ">
                <InvoiceForm
                    users={users}
                    gateways={conncetions}
                    banks={Banks}
                />
            </div>
        </section>
    );
}
