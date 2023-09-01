import React, { use } from "react";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { InvoiceTable } from "./InvoiceTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const page = async () => {
    const supabase = supabaseAdmin();
    const { data: invoice } = await supabase
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
            <div className="flex flex-col gap-3 xl:flex-row w-full overflow-x-auto">
                {/* <InvoiceTable data={invoice}/> */}
                <div className="w-full xl:w-1/3 px-4"></div>
            </div>
        </div>
    );
};

export default page;
