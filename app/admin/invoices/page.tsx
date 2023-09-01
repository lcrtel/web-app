import React, { use } from "react";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { InvoiceTable } from "./InvoiceTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const page = async () => {
    const supabase = supabaseAdmin();
    const { data: invoices } = await supabase
        .from("invoices")
        .select(`*, users`);
    return (
        <div className=" ">
            <div className="mb-5 ">
                <div className="flex items-center mb-3 justify-between ">
                    <h2 className="text-2xl font-bold text-primary">
                        Invoices
                    </h2>
                    <Link
                        href="/admin/invoices/new"
                        className={`${buttonVariants({ variant: "default" })}`}
                    >
                        Create Invoice
                    </Link>
                </div>
            </div>
            <div className="">
                {invoices?.length ? (
                    <InvoiceTable data={invoices} />
                ) : (
                    <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                        <p>No invoices created yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;
