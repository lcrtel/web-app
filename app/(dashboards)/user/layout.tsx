import CompleteProfileModal from "@/components/auth/modals/CompleteProfileModal";
import { Chat } from "@/components/chat";
import DashboardNav, { NavProps } from "@/components/navigation/DashboardNav";
import { fetchUserRole, getUser } from "@/utils/user";
import { headers } from "next/headers";

export default async function DashboardLayout({
  children, // will be a page or nested layout
  params,
}: {
  children: React.ReactNode;
  params: {
    tag: string;
    item: string;
  };
}) {
  const user = await getUser();
  const res = await fetchUserRole();
  console.log(res)
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
      path: "/u",
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
  const isAccountPage = headers().get("referer")?.includes("/user/account");
  return (
    <main className="px-2 md:px-4">
      <DashboardNav navItems={NAV_ITEMS} user={user} />

      <div className={`relative p-4`}>
        {!isAccountPage && user && !user?.name ? (
          <CompleteProfileModal user={user} />
        ) : (
          children
        )}
        <Chat />
      </div>
    </main>
  );
}
