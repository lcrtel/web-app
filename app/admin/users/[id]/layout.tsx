import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import Image from "next/image";
import { SidebarNav } from "./sidebar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiArrowLeft, HiMail, HiPhoneOutgoing } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import SellerApplication from "./SellerApplication";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const metadata: Metadata = {
    title: "Forms",
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
    const adminSupabase = supabaseAdmin();

    const {
        data: { user },
    } = await adminSupabase.auth.admin.getUserById(params.id);

    const sidebarNavItems = [
        {
            title: "Account Settings",
            href: `/admin/users/${params.id}`,
        },
        // {
        //     title: "Activity log (Coming soon)",
        //     href: `/admin/users/${params.id}/activity`,
        // },
        // {
        //     title: "Trade History (Coming soon)",
        //     href: `/admin/users/${params.id}/trade-history`,
        // },
    ];

    return (
        <>
            <div className=" space-y-6 pb-16">
                <Link
                    href="/admin/users"
                    className={cn(buttonVariants({ variant: "secondary" }))}
                >
                    <HiArrowLeft className="mr-2" /> Back to users
                </Link>
                <div className="space-y-0.5">
                    <h2 className="text-xl mb-3 font-bold tracking-tight">
                        User Details
                    </h2>
                    <section className="flex gap-2 md:gap-5 flex-col md:flex-row flex-wrap tracking-tight">
                        <div className="">
                            <p className=" text-gray-400">Name </p>
                            <p className="text-lg font-semibold text-primary-500">
                                {user?.user_metadata.first_name}
                            </p>
                        </div>
                        <div className="">
                            <p className="text-gray-400">Email </p>
                            <p className="text-lg font-semibold text-primary-500">
                                {user?.user_metadata.email}
                            </p>
                        </div>
                        <div className="">
                            <p className="text-gray-400">Phone </p>
                            <p className="text-lg font-semibold text-primary-500">
                                {user?.user_metadata.phone}{" "}
                            </p>
                        </div>
                        {user?.user_metadata.skype_id && (
                            <div className="">
                                <p className="text-gray-400">Skype ID </p>
                                <p className="text-lg font-semibold text-primary-500">
                                    {user?.user_metadata.skype_id}
                                </p>
                            </div>
                        )}
                    </section>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </div>
        </>
    );
}
