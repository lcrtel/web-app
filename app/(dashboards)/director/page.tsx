import { Metadata } from "next";
import Overview from "./Overview";
import QuickActions from "./QuickActions";

export const metadata: Metadata = {
  title: "Dashboard - Director",
};
export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-primary text-2xl font-bold">Dashboard</h1>
      <Overview />
      <QuickActions />
    </div>
  );
}
