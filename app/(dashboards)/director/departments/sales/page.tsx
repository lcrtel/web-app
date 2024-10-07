import BackButton from "@/components/BackButton";
import Link from "next/link";
import { CreateDepartmentExecutive } from "../_components/CreateDepartmentExecutive";
import ExecutivesList from "../_components/ExecutivesList";
import ManagerInfo from "../_components/ManagerInfo";

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
          href="/director/departments/sales"
          className="font-semibold hover:underline"
        >
          Sales Department
        </Link>
      </div>
      <div className="flex items-center justify-between py-2">
        <h2 className="text-2xl font-bold tracking-tight">Sales Department</h2>
        <CreateDepartmentExecutive department="sales" />
      </div>
      <div className="grid gap-5 lg:grid-cols-4">
        <div className="h-fit space-y-2 rounded-2xl border bg-slate-50 px-4 py-3 lg:col-span-1">
          <h3 className="text-xl font-semibold">Manager</h3>
          <ManagerInfo department="sales" />
        </div>
        <div className="space-y-2 lg:col-span-3">
          <h3 className="text-xl font-semibold">Executives</h3>
          <ExecutivesList department="sales" />
        </div>
      </div>
    </div>
  );
}
