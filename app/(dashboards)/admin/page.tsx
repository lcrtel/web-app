import { Metadata } from "next";
import Overview from "./Overview";
import QuickActions from "./QuickActions";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Dashboard - Director",
};
export default function Dashboard() {
  return (
    <div className="space-y-4">
      <PageHeaderHeading>Dashboard</PageHeaderHeading>
      <Overview />
      <QuickActions />
    </div>
  );
}
