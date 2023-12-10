import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import formatDate from "@/utils/formatDate";
import { fetchUserData } from "@/utils/user";
import Link from "next/link";
import { HiDocumentText } from "react-icons/hi";
import { CreateInvoice } from "./CreateInvoice";
import { InvoiceTable } from "./InvoiceTable";

export const revalidate = 0;

const page = async () => {
    const supabase = await supabaseServer();

    const { data: invoices } = await supabase
        .from("invoices")
        .select(`*, profiles (name)`);

    let { data: clients } = await supabase
        .from("profiles")
        .select("*")
        .or(`role.eq.client,role.eq.vendor`);

    let { data: payment_methods } = await supabase.from("config").select("*");

    const invoicesWithNames = invoices?.map((invoice: any) => {
        const {
            profiles: { name },
            ...restInvoice
        } = invoice;

        return {
            ...restInvoice,
            client: name ? name : "",
        };
    });

    return (
        <div className=" ">
            <div className="mb-5 ">
                <div className="flex items-center mb-3 justify-between ">
                    <h2 className="text-2xl font-bold text-primary">
                        Invoices
                    </h2>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/invoices/bulk"
                            className={buttonVariants({ variant: "ghost" })}
                        >
                            Bulk Invoice
                        </Link>
                        <CreateInvoice
                            clients={clients}
                            paymentMethods={payment_methods}
                        />
                    </div>
                </div>
            </div>
            {invoices?.length ? (
                <InvoiceTable data={invoicesWithNames} />
            ) : (
                <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                    <p>No invoices created yet</p>
                    <CreateInvoice
                        clients={clients}
                        paymentMethods={payment_methods}
                    />
                </div>
            )}
        </div>
    );
};

export default page;
