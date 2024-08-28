import BackButton from "@/components/BackButton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { CreateDepartmentExecutive } from "../CreateDepartmentExecutive";
import { CreateDepartmentManager } from "../CreateDepartmentManager";
import { ExecutivesTable } from "../ExecutivesTable";
import ManagerInfo from "../ManagerInfo";

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
          href="/director/departments/tech"
          className="font-semibold hover:underline"
        >
          Tech Department
        </Link>
      </div>
      <div className="flex items-center justify-between py-4">
        <h2 className="text-3xl font-bold tracking-tight">Tech Department</h2>
        <CreateDepartmentExecutive department="tech" />
      </div>
      <div className="grid gap-5 lg:grid-cols-4">
        <div className="h-fit space-y-2 rounded-2xl border bg-slate-50 px-4 py-3 lg:col-span-1">
          <h3 className="text-2xl font-bold">Manager</h3>
          <ManagerInfo department="tech" />
        </div>
        <div className="lg:col-span-3">
          <h3 className="text-2xl font-bold">Executives</h3>
          <Executives />
        </div>
      </div>
    </div>
  );
}

async function Executives() {
  const supabase = supabaseAdminServer();
  const { data } = await supabase
    .from("executives")
    .select("profiles(*), departments!inner (slug)")
    .eq("departments.slug", "tech");
  let executives = data?.map((executive: any) => executive.profiles);
  return <ExecutivesTable data={executives} />;
}
