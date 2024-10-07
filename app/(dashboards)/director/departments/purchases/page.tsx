import BackButton from "@/components/BackButton";
import Link from "next/link";
import { CreateDepartmentExecutive } from "../_components/CreateDepartmentExecutive";
import ManagerInfo from "../_components/ManagerInfo";
import ExecutivesList from "../_components/ExecutivesList";

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
          href="/director/departments/purchases"
          className="font-semibold hover:underline"
        >
          Purchases Department
        </Link>
      </div>
      <div className="flex items-center justify-between py-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Purchases Department
        </h2>
        <CreateDepartmentExecutive department="purchases" />
      </div>
      <div className="grid gap-5 lg:grid-cols-4">
        <div className="h-fit space-y-2 rounded-2xl border bg-slate-50 px-4 py-3 lg:col-span-1">
          <h3 className="text-xl font-semibold">Manager</h3>
          <ManagerInfo department="purchases" />
        </div>
        <div className="lg:col-span-3 space-y-2">
          <h3 className="text-xl font-semibold">Executives</h3>
          <ExecutivesList department="purchases" />
        </div>
      </div>
    </div>
  );
}
