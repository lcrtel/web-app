import DashboardNav, { NavProps } from "@/components/navigation/DashboardNav";
import { fetchUser, getUser } from "@/utils/user";
import {
  LayoutDashboard
} from "lucide-react";
import { unstable_noStore } from "next/cache";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  unstable_noStore();
  const user = await getUser();
  const NAV_ITEMS: NavProps = {
    root: {
      label: "Admin Panel",
      path: "/sales_manager",
    },
    accountPage: "/sales_manager/account",
    pages: [
      {
        title: "Dashboard",
        path: "/sales_manager",
        icon: <LayoutDashboard width="18" height="18" />,
      },
      {
        title: "Routes",
        path: "/sales_manager/routes",
      },
      {
        title: "Targets",
        path: "/sales_manager/targets",
      },
      {
        title: "Executives",
        path: "/sales_manager/executives",
      },
      {
        title: "Clients",
        path: "/sales_manager/clients",
      },
    ],
  };

  return (
    <main className="px-2 md:px-4">
      <DashboardNav navItems={NAV_ITEMS} user={user} />
      <div className="p-4">{children}</div>
    </main>
  );
}
