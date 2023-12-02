import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import { Metadata } from "next";
import { ClientNav } from "./ClientNav";
import { DropDownMenu } from "./dropdownMenu";

export const metadata: Metadata = {
    title: "Account Settings | LCRTel",
    description: "Advanced form example using react-hook-form and Zod.",
};

interface SettingsLayoutProps {
    children: React.ReactNode;
    params: { id: string };
}

export default async function SettingsLayout({
    children,
    params,
}: SettingsLayoutProps) {
    const supabase = await supabaseServer();

    let { data: client, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", params.id)
        .single();

    const NavItems = [
        {
            title: "Overview",
            href: `/agent/clients/${params.id}`,
        },
        {
            title: "Requests",
            href: `/agent/clients/${params.id}/requests`,
        },
        {
            title: "Purchased Routes",
            href: `/agent/clients/${params.id}/purchased_routes`,
        },

        {
            title: "Account Settings",
            href: `/agent/clients/${params.id}/account_settings`,
        },
    ];

    return (
        <div className="w-full">
            <p className="text-sm mb-2 font-medium text-slate-400">
                Clients / {client?.name}
            </p>
            <div className="flex flex-wrap gap-2 mb-4 justify-between">
                <div className="">
                    <h1 className="text-xl font-bold tracking-tight">
                        {client?.name}
                    </h1>
                    {client?.company_name && (
                        <p className="font-medium text-base text-slate-400">
                            Company: {client?.company_name}
                        </p>
                    )}
                </div>
                {/* <div className="flex gap-2">
                    <a
                        href={`tel:${client?.phone}`}
                        className={buttonVariants({
                            variant: "secondary",
                            size: "sm",
                        })}
                    >
                        {client?.phone}
                    </a>
                    <a
                        href={`mailto:${client?.email}`}
                        className={buttonVariants({
                            variant: "secondary",
                            size: "sm",
                        })}
                    >
                        {client?.email}
                    </a>
                    {client?.skype_id && (
                        <p
                            className={buttonVariants({
                                variant: "secondary",
                                size: "sm",
                            })}
                        >
                            {client?.skype_id}
                        </p>
                    )}
                </div> */}
            </div>
            <DropDownMenu items={NavItems} />
            <ClientNav items={NavItems} />
            {children}
        </div>
    );
}
