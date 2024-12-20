import { Metadata } from "next";
import { SidebarNav } from "./_components/SidebarNav";

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
      href: `/admin/account`,
    },
    {
      title: "Reset Password",
      href: `/admin/account/password`,
    },
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
