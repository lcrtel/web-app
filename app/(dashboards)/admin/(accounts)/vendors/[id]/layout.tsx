import { supabaseServer } from "@/lib/supabase-server";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { VendorNav } from "./VendorNav";
import { DropDownMenu } from "./dropdownMenu";
import { Skeleton } from "@/components/ui/skeleton";

interface SettingsLayoutProps {
    children: React.ReactNode;
    params: { id: string };
}

export default function SettingsLayout({
    children,
    params,
}: SettingsLayoutProps) {
    const basePath = "/admin/vendors"
    const NavItems = [
        {
            title: "Overview",
            href: `${basePath}/${params.id}`,
        },

        {
            title: "Route Offers",
            href: `${basePath}/${params.id}/routes`,
        },
        {
            title: "Purchased Routes",
            href: `${basePath}/${params.id}/purchased_routes`,
        },
        {
            title: "Requests",
            href: `${basePath}/${params.id}/requests`,
        },
        {
            title: "Departments",
            href: `${basePath}/${params.id}/departments`,
        },
        {
            title: "Notification",
            href: `${basePath}/${params.id}/email_notification`,
        },
        {
            title: "Account Settings",
            href: `${basePath}/${params.id}/account_settings`,
        },
    ];

    return (
        <div className="w-full">
            <Suspense
                fallback={
                    <>
                        <p className="text-sm mb-2 font-medium text-slate-400 flex gap-2 items-center">
                            Vendors /{" "}
                            <Skeleton className="w-full max-w-xs h-4" />
                        </p>
                        <div className="flex flex-col gap-2 mb-4">
                            <div className="">
                                <Skeleton className="w-full max-w-xs h-7" />
                            </div>
                            <Skeleton className="w-full max-w-xs h-6" />
                        </div>
                    </>
                }
            >
                <VendorDetails userId={params.id} />
            </Suspense>
            <DropDownMenu items={NavItems} />
            <VendorNav items={NavItems} />
            {children}
        </div>
    );
}

async function VendorDetails({ userId }: { userId: any }) {
    const supabase = supabaseServer();

    let { data: vendor, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
    if (!vendor) {
        redirect("/admin/vendors");
    }
    return (
        vendor && (
            <>
                <p className="text-sm mb-2 font-medium text-slate-400">
                    Vendors / {vendor?.name}
                </p>
                <div className="flex flex-col gap-2 mb-4">
                    <div className="">
                        <h1 className="text-xl font-bold tracking-tight capitalize">
                            {vendor?.name}
                        </h1>
                        {vendor?.company_name && (
                            <p className="font-medium text-base text-slate-400">
                                Company: {vendor?.company_name}
                            </p>
                        )}
                    </div>
                </div>
            </>
        )
    );
}
