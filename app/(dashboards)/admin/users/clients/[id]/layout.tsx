import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import { Metadata } from "next";
import { ClientNav } from "./ClientNav";
import { DropDownMenu } from "./dropdownMenu";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";

interface SettingsLayoutProps {
    children: React.ReactNode;
    params: { id: string };
}

export default function SettingsLayout({
    children,
    params,
}: SettingsLayoutProps) {
    const basePath = "/admin/clients";
    const NavItems = [
        {
            title: "Overview",
            href: `${basePath}/${params.id}`,
        },
        {
            title: "Requests",
            href: `${basePath}/${params.id}/requests`,
        },
        {
            title: "Purchased Routes",
            href: `${basePath}/${params.id}/purchased_routes`,
        },
        {
            title: "Departments",
            href: `${basePath}/${params.id}/departments`,
        },
        {
            title: "Notifications",
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
                            Clients /{" "}
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
                <ClientDetails userId={params.id} />
            </Suspense>
            <DropDownMenu items={NavItems} />
            <ClientNav items={NavItems} />
            {children}
        </div>
    );
}
async function ClientDetails({ userId }: { userId: any }) {
    const supabase = supabaseServer();

    let { data: user, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
    if (!user) {
        redirect("/admin/clients");
    }
    return (
        user && (
            <>
                <p className="text-sm mb-2 font-medium text-slate-400">
                    Clients / {user?.name}
                </p>
                <div className="flex flex-col gap-2 mb-4">
                    <div className="">
                        <h1 className="text-xl font-bold tracking-tight capitalize">
                            {user?.name}
                        </h1>
                        {user?.company_name && (
                            <p className="font-medium text-base text-slate-400">
                                Company: {user?.company_name}
                            </p>
                        )}
                    </div>
                </div>
            </>
        )
    );
}
