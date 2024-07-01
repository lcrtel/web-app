import { Separator } from "@/components/ui/separator";
import { fetchUser } from "@/utils/user";
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
    const user = await fetchUser();
    const NavItems = [
        {
            title: "Personal info",
            href: `/user/account`,
        },
        {
            title: "Company info",
            href: `/user/account/company`,
        },
        {
            title: "Password",
            href: `/user/account/password`,
        },
        // {
        //     title: "Payment methods",
        //     href: `/user/account/payment-methods`,
        // },
    ];

    return (
        <>
            <div className=" pb-16">
                    <h2 className="text-2xl pb-4 font-bold tracking-tight">
                        Account Settings
                    </h2>
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                    <aside className="lg:w-1/5">
                        <SidebarNav items={NavItems} />
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </div>
        </>
    );
}
