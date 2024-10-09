import BackButton from "@/components/BackButton";
import Link from "next/link";
import { CreateDepartmentExecutive } from "../../director/departments/_components/CreateDepartmentExecutive";
import ExecutivesList from "../../director/departments/_components/ExecutivesList";

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
        <CreateDepartmentExecutive department="purchases" />
      </div>
      <ExecutivesList department="purchases" />
    </div>
  );
}
