import { PageHeaderHeading } from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserRole } from "@/utils/user";
import { Metadata } from "next";
import { Suspense } from "react";
import Overview from "./Overview";
import QuickActions from "./QuickActions";

export const metadata: Metadata = {
  title: "Dashboard - Director",
};
export default function Dashboard() {
  return (
    <div className="space-y-4">
      <PageHeaderHeading>Dashboard</PageHeaderHeading>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <DashboardItems />
      </Suspense>
    </div>
  );
}

async function DashboardItems() {
  const userRole = (await getUserRole()) as UserRolesEnum;
  return (
    <>
      <Overview userRole={userRole} />
      <QuickActions userRole={userRole} />
    </>
  );
}
