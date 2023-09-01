import { supabaseAdmin } from "@/lib/supabase-admin";
import InvoiceForm from "./InvoiceForm";

export default async function page() {
    const supabase = supabaseAdmin();
    const {
        data: { users },
        error,
    } = await supabase.auth.admin.listUsers();
     let { data: conncetions } = await supabase
         .from("route_connections")
         .select(`*, route_offers (*)`);
     return (
         <>
             <h3 className="text-2xl tracking-tight font-bold mb-4">
                 Create Invoice
             </h3>
             <div className="p-5 ">
                 <InvoiceForm users={users} connections={conncetions} />
             </div>
         </>
     );
}
