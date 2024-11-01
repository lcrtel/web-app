import BackButton from "@/components/BackButton";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Departments() {
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
      </div>
      <div className="flex items-center justify-between py-2">
        <h2 className="text-2xl font-bold tracking-tight">Departments</h2>
      </div>
      <Suspense fallback={<Skeleton className="h-32 w-full"/>}>
        <DepartmentsList />
      </Suspense>
    </div>
  );
}

async function DepartmentsList() {
  const supabase = await supabaseAdminServer();
  const { data } = await supabase
    .from("departments")
    .select("*, executives(count)");
  return (
    data && (
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.map((department, idx: number) => (
          <Link
            key={idx}
            href={`/director/departments/${department.slug}`}
            className="rounded-2xl flex items-center justify-between border bg-slate-50 p-4"
          >
            <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold">{department.name}</h3>
            <p className="text-sm text-slate-500">
              Executives: {department.executives[0].count || 0}
            </p></div>
            <div className="p-4 rounded-full bg-white border">
              <ExternalLink className="size-5 text-primary-900" />
            </div>
          </Link>
        ))}
      </div>
    )
  );
}
