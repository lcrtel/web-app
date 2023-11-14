import { Separator } from "@/components/ui/separator";
import { fetchUserData } from "@/utils/user";
import { Metadata } from "next";
import { DropDownMenu } from "./dropdownMenu";
import { SidebarNav } from "./sidebar";

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
    const user = await fetchUserData();
    const NavItems = [
        {
            title: "My details",
            href: `/user/account`,
        },
        {
            title: "Company details",
            href: `/user/account/company`,
        },
        {
            title: "Password",
            href: `/user/account/password`,
        },
        {
            title: "Payment methods",
            href: `/user/account/payment-methods`,
        },
    ];

    return (
        <>
            <div className=" pb-16">
                <div className="flex my-5 items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Account Settings
                    </h2>
                    <DropDownMenu items={NavItems} />
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col lg:flex-row ">
                    <aside className="lg:w-1/5 mr-6">
                        <SidebarNav items={NavItems} />
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </div>
        </>
    );
}
