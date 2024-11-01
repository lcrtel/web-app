import { Metadata } from "next";
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
  const NavItems = [
    {
      title: "Personal info",
      href: `/user/account`,
    },
    {
      title: "TR Verification",
      href: `/user/account/tr-verification`,
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
      <div className="pb-16">
        <h2 className="pb-4 text-2xl font-bold tracking-tight">
          Account Settings
        </h2>
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
          <aside className="lg:w-1/5">
            <SidebarNav items={NavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
