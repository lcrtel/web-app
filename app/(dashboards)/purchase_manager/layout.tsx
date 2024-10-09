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
      path: "/purchase_manager",
    },
    accountPage: "/purchase_manager/account",
    pages: [
      {
        title: "Dashboard",
        path: "/purchase_manager",
        icon: <LayoutDashboard width="18" height="18" />,
      },
      {
        title: "Routes",
        path: "/purchase_manager/routes",
      },
      {
        title: "Targets",
        path: "/purchase_manager/targets",
      },
      {
        title: "Executives",
        path: "/purchase_manager/executives",
      },
      {
        title: "Clients",
        path: "/purchase_manager/clients",
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
