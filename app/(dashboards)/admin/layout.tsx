import DashboardNav, { NavProps } from "@/components/navigation/DashboardNav";
import { fetchUserData } from "@/utils/user";
import {
  LayoutDashboard,
  Receipt,
  TrendingUp,
  Users,
  UsersRound,
  Waypoints
} from "lucide-react";
import { unstable_noStore } from "next/cache";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  unstable_noStore();
  const user = await fetchUserData();
  const NAV_ITEMS: NavProps = {
    root: {
      label: "Admin Panel",
      path: "/admin",
    },
    accountPage: "/admin/account",
    pages: [
      {
        title: "Dashboard",
        path: "/admin",
        icon: <LayoutDashboard width="18" height="18" />,
      },
      {
        title: "Routes",
        path: "/admin/routes",
        icon: <Waypoints width="18" height="18" />,
        submenu: true,
        subMenuItems: [
          {
            title: "Offers",
            path: "/admin/routes/offers",
          },
          {
            title: "Targets Routes",
            path: "/admin/routes/targets",
          },
          {
            title: "Purchase Requests",
            path: "/admin/routes/purchase_requests",
          },
        ],
      },

      {
        title: "Marketing",
        path: "/admin/marketing",
        icon: <TrendingUp width="18" height="18" />,
      },
      {
        title: "Users",
        path: "/admin/users",
        icon: <UsersRound width="18" height="18" />,
        submenu: true,
        subMenuItems: [
          {
            title: "Clients",
            path: "/admin/users/clients",
          },
          {
            title: "Vendors",
            path: "/admin/users/vendors",
          },
        ],
      },
      {
        title: "Team",
        path: "/admin/team",
        icon: <Users width="18" height="18" />,
        submenu: true,
        subMenuItems: [
          {
            title: "Managers",
            path: "/admin/team/managers",
          },
          {
            title: "Accounts",
            path: "/admin/team/accounts",
          },
          {
            title: "Sales",
            path: "/admin/team/sales",
          },
          {
            title: "NOC",
            path: "/admin/team/noc",
          },
          {
            title: "Tech",
            path: "/admin/team/tech",
          },
        ],
      },
      {
        title: "Finances",
        path: "/admin/finance",
        icon: <Receipt width="18" height="18" />,
        submenu: true,
        subMenuItems: [
          {
            title: "Invoices",
            path: "/admin/finance/invoices",
          },
        ],
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
