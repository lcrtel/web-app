import { Chat } from "@/components/chat";
import DashboardNav, { NavProps } from "@/components/navigation/DashboardNav";
import { fetchUserData } from "@/utils/user";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const user = await fetchUserData();

  let publicNavItems = [
    {
      title: "Routes",
      path: "/user/routes",
    },
    {
      title: "Targets",
      path: "/user/targets",
    },
  ];
  let privateNavItems = [
    {
      title: "My Routes",
      path: "/user/my-routes",
    },
    {
      title: "My Targets",
      path: "/user/my-targets",
    },
    {
      title: "Purchases",
      path: "/user/purchases",
    },
  ];
  const NAV_ITEMS: NavProps = {
    root: {
      label: "User",
      path: "/user",
    },
    accountPage: "/user/account",
    pages: [],
  };
  if (user) {
    NAV_ITEMS.pages = [
      {
        title: "Dashboard",
        path: "/user",
      },
      ...publicNavItems,
      ...privateNavItems,
    ];
  } else {
    NAV_ITEMS.pages = [...publicNavItems];
  }

  return (
    <main className="px-2 md:px-4">
      <DashboardNav navItems={NAV_ITEMS} user={user} />
      <div className="p-4">
        {children}
        <Chat />
      </div>
    </main>
  );
}
