import BackButton from "@/components/BackButton";
import Link from "next/link";
import { CreateDepartmentExecutive } from "../_components/CreateDepartmentExecutive";
import ManagerInfo from "../_components/ManagerInfo";
import ExecutivesList from "../_components/ExecutivesList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ManagersPage() {
  return (
    <div className="">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <BackButton />
        <Link href="/director" className="hover:underline">
          Dashboard
        </Link>
        /
        <Link href="/director/departments" className="hover:underline">
          Departments
        </Link>
        /
        <Link
          href="/director/departments/finance"
          className="font-semibold hover:underline"
        >
          Finance Department
        </Link>
      </div>
      <div className="flex items-center justify-between py-4">
        <h2 className="text-3xl font-bold tracking-tight">
          Finance Department
        </h2>
        <CreateDepartmentExecutive department="finance" />
      </div>
      <div className="grid gap-5 lg:grid-cols-4">
        <div className="h-fit space-y-2 rounded-2xl border bg-slate-50 px-4 py-3 lg:col-span-1">
          <h3 className="text-2xl font-bold">Manager</h3>
          <ManagerInfo department="finance" />
        </div>
        <Tabs defaultValue="list" className="w-full lg:col-span-3">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Executives</h3>
            <TabsList>
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="list">
            <ExecutivesList department="finance" />
          </TabsContent>
          <TabsContent value="leaderboard">Coming soon</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
