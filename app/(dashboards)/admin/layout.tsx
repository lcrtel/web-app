import DashboardNav, { NavProps } from "@/components/navigation/DashboardNav";
import navConfig, { Roles } from "@/components/navigation/navConfig";
import { fetchUserRole, getUser } from "@/utils/user";
import { unstable_noStore } from "next/cache";

export default async function DashboardLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  unstable_noStore();
  const user = await getUser();
  const userRole = await fetchUserRole()
  const NAV_ITEMS: NavProps = navConfig[userRole as Roles];

  return (
    <main className="px-2 md:px-4">
      <DashboardNav navItems={NAV_ITEMS} user={user} />
      <div className="p-4">{children}</div>
    </main>
  );
}
