import { supabaseAdmin } from "@/lib/supabase-admin";
import InvoiceForm from "./InvoiceForm";

export default async function page() {
    const supabase = supabaseAdmin();
    const {
        data: { users },
        error,
    } = await supabase.auth.admin.listUsers();
    return (
        <>
            <h3 className="text-2xl tracking-tight font-bold mb-4">
                Create Invoice
            </h3>
            <div className="p-5 bg-slate-50 rounded-lg">
                <InvoiceForm users={users} />
            </div>
        </>
    );
}
