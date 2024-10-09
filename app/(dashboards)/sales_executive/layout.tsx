import DashboardNav, { NavProps } from "@/components/navigation/DashboardNav";
import DurationTracker from "@/utils/DurationTracker";
import { getUser } from "@/utils/user";
import { LayoutDashboard } from "lucide-react";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";

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
      path: "/sales_executive",
    },
    accountPage: "/sales_executive/account",
    pages: [
      {
        title: "Dashboard",
        path: "/sales_executive",
        icon: <LayoutDashboard width="18" height="18" />,
      },
      {
        title: "Routes",
        path: "/sales_executive/routes",
      },
      {
        title: "Targets",
        path: "/sales_executive/targets",
      },
      {
        title: "Clients",
        path: "/sales_executive/clients",
      },
    ],
  };

  return (
    <main className="px-2 md:px-4">
      <DashboardNav navItems={NAV_ITEMS} user={user} />
      <div className="p-4">{children}</div>
      <Suspense>
        <DurationTracker />
      </Suspense>
    </main>
  );
}
