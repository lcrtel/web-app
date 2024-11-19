import DashboardNav, { NavProps } from "@/components/navigation/DashboardNav";
import navConfig, { Roles } from "@/components/navigation/navConfig";
import DurationTracker from "@/utils/duration-tracking/DurationTracker";
import { getUser } from "@/utils/user";
import { unstable_noStore } from "next/cache";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  unstable_noStore();
  const user = await getUser();
  const NAV_ITEMS: NavProps = navConfig[user?.user_roles?.role_slug as Roles];

  return (
    <main className="px-2 md:px-4">
      <DurationTracker />
      <DashboardNav navItems={NAV_ITEMS} user={user} />
      <div className="p-4">{children}</div>
    </main>
  );
}
