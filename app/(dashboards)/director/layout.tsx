import DashboardNav, { NavProps } from "@/components/navigation/DashboardNav";
import { fetchUser } from "@/utils/user";
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
  const user = await fetchUser();
  const NAV_ITEMS: NavProps = {
    root: {
      label: "Admin Panel",
      path: "/director",
    },
    accountPage: "/director/account",
    pages: [
      {
        title: "Dashboard",
        path: "/director",
        icon: <LayoutDashboard width="18" height="18" />,
      },
      {
        title: "Routes",
        path: "/director/routes",
        icon: <Waypoints width="18" height="18" />,
        submenu: true,
        subMenuItems: [
          {
            title: "Offers",
            path: "/director/routes/offers",
          },
          {
            title: "Targets Routes",
            path: "/director/routes/targets",
          },
          {
            title: "Purchase Requests",
            path: "/director/routes/purchase_requests",
          },
        ],
      },

      {
        title: "Marketing",
        path: "/director/marketing",
        icon: <TrendingUp width="18" height="18" />,
      },
      {
        title: "Users",
        path: "/director/users",
        icon: <UsersRound width="18" height="18" />,
        submenu: true,
        subMenuItems: [
          {
            title: "Clients",
            path: "/director/users/clients",
          },
          {
            title: "Vendors",
            path: "/director/users/vendors",
          },
        ],
      },
      {
        title: "Team",
        path: "/director/team",
        icon: <Users width="18" height="18" />,
        submenu: true,
        subMenuItems: [
          {
            title: "Managers",
            path: "/director/team/managers",
          },
          {
            title: "Accounts",
            path: "/director/team/accounts",
          },
          {
            title: "Sales",
            path: "/director/team/sales",
          },
          {
            title: "NOC",
            path: "/director/team/noc",
          },
          {
            title: "Tech",
            path: "/director/team/tech",
          },
        ],
      },
      {
        title: "Finances",
        path: "/director/finance",
        icon: <Receipt width="18" height="18" />,
        submenu: true,
        subMenuItems: [
          {
            title: "Invoices",
            path: "/director/finance/invoices",
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
