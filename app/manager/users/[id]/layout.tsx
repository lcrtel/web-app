import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import Image from "next/image";
import { SidebarNav } from "./sidebar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Forms",
    description: "Advanced form example using react-hook-form and Zod.",
};

interface SettingsLayoutProps {
    children: React.ReactNode;
    params: { id: string };
}

export default function SettingsLayout({
    children,
    params,
}: SettingsLayoutProps) {
    const sidebarNavItems = [
        {
            title: "Account",
            href: `/dashboard/admin/users/${params.id}`,
        },
        {
            title: "Activity log",
            href: `/dashboard/admin/users/${params.id}/activity`,
        },
        {
            title: "Trade History",
            href: `/dashboard/admin/users/${params.id}/trade-history`,
        },
    ];

    return (
        <>
            <div className=" space-y-6 pb-16">
                <Link
                    href="/dashboard/admin/users"
                    className={cn(buttonVariants({ variant: "secondary" }))}
                >
                    <HiArrowLeft className="mr-2" /> Back to users
                </Link>
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                        User Settings
                    </h2>
                    <p className="text-muted-foreground">
                        Manage user details.
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </div>
        </>
    );
}
