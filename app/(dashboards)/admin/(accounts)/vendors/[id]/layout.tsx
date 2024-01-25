import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import { Metadata } from "next";
import { DropDownMenu } from "./dropdownMenu";
import { VendorNav } from "./VendorNav";

export const metadata: Metadata = {
    title: "Account Settings | LCRTel",
    description: "",
};

interface SettingsLayoutProps {
    children: React.ReactNode;
    params: { id: string };
}

export default async function SettingsLayout({
    children,
    params,
}: SettingsLayoutProps) {
    const supabase = supabaseServer();

    let { data: vendor, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", params.id)
        .single();

    const NavItems = [
        {
            title: "Overview",
            href: `/admin/vendors/${params.id}`,
        },

        {
            title: "Route Offers",
            href: `/admin/vendors/${params.id}/routes`,
        },
        {
            title: "Purchased Routes",
            href: `/admin/vendors/${params.id}/purchased_routes`,
        },
        {
            title: "Requests",
            href: `/admin/vendors/${params.id}/requests`,
        },
        {
            title: "Account Settings",
            href: `/admin/vendors/${params.id}/account_settings`,
        },
    ];

    return (
        <div className="w-full">
            <p className="text-sm mb-2 font-medium text-slate-400">
                Vendors / {vendor?.name}
            </p>
            <div className="flex flex-col gap-2 mb-4">
                <div className="">
                    <h1 className="text-xl font-bold tracking-tight">
                        {vendor?.name}
                    </h1>
                    {vendor?.company_name && (
                        <p className="font-medium text-base text-slate-400">
                            Company: {vendor?.company_name}
                        </p>
                    )}
                </div>
                {/* <div className="flex flex-wrap gap-2">
                    <a
                        href={`tel:${vendor?.phone}`}
                        className=''
                    >
                        {vendor?.phone}
                    </a>
                    <a
                        href={`mailto:${vendor?.email}`}
                        className=''
                    >
                        {vendor?.email}
                    </a>
                    {vendor?.skype_id && (
                        <p
                            className=''
                        >
                            {vendor?.skype_id}
                        </p>
                    )}
                </div> */}
            </div>
            <DropDownMenu items={NavItems} />
            <VendorNav items={NavItems} />
            {children}
        </div>
    );
}
