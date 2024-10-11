import BackButton from "@/components/BackButton";
import Link from "next/link";
import ExecutivesList from "@/components/departments/ExecutivesList";
import { CreateDepartmentExecutive } from "@/components/departments/CreateDepartmentExecutive";


export default function ExecutivesPage() {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <BackButton />
        <Link href="/sales_manager" className="hover:underline">
          Dashboard
        </Link>
        /
        <Link href="/sales_manager/executives" className="hover:underline">
          Executives
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Executives</h2>
        <CreateDepartmentExecutive department="finance" />
      </div>
      <ExecutivesList department="finance" />
    </div>
  );
}
