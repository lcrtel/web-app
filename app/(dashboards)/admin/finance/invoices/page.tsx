import { Button, buttonVariants } from "@/components/ui/button";
import TableSkeleton from "@/components/ui/table-skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { SupabaseClient } from "@supabase/supabase-js";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { CreateInvoice } from "./CreateInvoice";
import { InvoiceTable } from "./InvoiceTable";

export default function InvoicesPage() {
    const supabase = supabaseServer();

    return (
        <div className=" ">
            <div className="mb-5 ">
                <div className="flex items-center mb-3 justify-between ">
                    <h2 className="text-2xl font-bold text-primary">
                        Invoices
                    </h2>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/finance/invoices/bulk"
                            className={buttonVariants({ variant: "ghost" })}
                        >
                            Bulk Invoice
                        </Link>
                        <Suspense
                            fallback={
                                <Button className="gap-2 " size="sm">
                                    Create Invoice{" "}
                                    <HiOutlinePlusCircle className="w-4 h-4" />
                                </Button>
                            }
                        >
                            <Create supabase={supabase} />
                        </Suspense>
                    </div>
                </div>
                <Suspense fallback={<TableSkeleton />}>
                    <Invoices supabase={supabase} />
                </Suspense>
            </div>
        </div>
    );
}

async function Create({ supabase }: { supabase: SupabaseClient }) {
    let { data: clients } = await supabase
        .from("profiles")
        .select("*")
        .or(`role.eq.client,role.eq.vendor`);

    let { data: payment_methods } = await supabase.from("config").select("*");
    return <CreateInvoice clients={clients} paymentMethods={payment_methods} />;
}

async function Invoices({ supabase }: { supabase: any }) {
    unstable_noStore();
    const { data: invoices } = await supabase
        .from("invoices")
        .select(`*, profiles (name)`);
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

    return invoices?.length ? (
        <InvoiceTable data={invoicesWithNames} />
    ) : (
        <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
            <p>No invoices created yet</p>
        </div>
    );
}
