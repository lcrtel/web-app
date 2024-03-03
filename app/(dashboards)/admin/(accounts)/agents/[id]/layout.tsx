import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import { Metadata } from "next";
import { DropDownMenu } from "./dropdownMenu";
import { AgentNav } from "./AgentNav";
import { unstable_noStore } from "next/cache";
import Link from "next/link";

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
    unstable_noStore();
    const supabase = supabaseServer();
    let { data: agent, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", params.id)
        .single();

    const NavItems = [
        {
            title: "Overview",
            href: `/admin/agents/${params.id}`,
        },
        {
            title: "Clients",
            href: `/admin/agents/${params.id}/clients`,
        },
        {
            title: "Vendors",
            href: `/admin/agents/${params.id}/vendors`,
        },
        {
            title: "Account settings",
            href: `/admin/agents/${params.id}/account_settings`,
        },
    ];

    return (
        <div className="w-full">
            <p className="text-sm mb-2 font-medium text-slate-400">
                <Link href="/admin/agents/">Agents</Link> / {agent?.name}
            </p>
            <div className="flex flex-wrap gap-2 mb-4 justify-between">
                <div className="">
                    <h1 className="text-xl font-bold tracking-tight capitalize">
                        {agent?.name}
                    </h1>
                </div>
                {/* <div className="flex gap-2">
                    <a
                        href={`tel:${agent?.phone}`}
                        className={buttonVariants({
                            variant: "secondary",
                            size: "sm",
                        })}
                    >
                        {agent?.phone}
                    </a>
                    <a
                        href={`mailto:${agent?.email}`}
                        className={buttonVariants({
                            variant: "secondary",
                            size: "sm",
                        })}
                    >
                        {agent?.email}
                    </a>
                    {agent?.skype_id && (
                        <p
                            className={buttonVariants({
                                variant: "secondary",
                                size: "sm",
                            })}
                        >
                            {agent?.skype_id}
                        </p>
                    )}
                </div> */}
            </div>
            <DropDownMenu items={NavItems} />
            <AgentNav items={NavItems} />
            {children}
        </div>
    );
}
