import BackButton from "@/components/BackButton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import Link from "next/link";
import { CreateDepartmentExecutive } from "../CreateDepartmentExecutive";
import { ExecutivesTable } from "../ExecutivesTable";

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
      <div className="flex items-center justify-between py-4">
        <h2 className="text-3xl font-bold tracking-tight">Sales Department</h2>
        <CreateDepartmentExecutive department="sales" />
      </div>
      <div className="grid gap-5 lg:grid-cols-4">
        <div className="h-fit rounded-2xl border bg-slate-50 px-4 py-3 lg:col-span-1">
          <h3 className="text-2xl font-bold">Manager</h3>
          <p>Comin soon</p>
        </div>
        <div className="lg:col-span-3">
          <h3 className="text-2xl font-bold">Executives</h3>
          <Executives />
        </div>
      </div>
    </div>
  );
}

async function Manager() {
  return <div></div>;
}
async function Executives() {
  const supabase = supabaseAdminServer();
  const { data } = await supabase
    .from("executives")
    .select("profiles(*), departments!inner (slug)")
    .eq("departments.slug", "sales");
  let executives = data?.map((executive: any) => executive.profiles);
  return <ExecutivesTable data={executives} />;
}
