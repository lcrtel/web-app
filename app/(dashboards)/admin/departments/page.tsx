import {
  PageHeader,
  PageHeaderHeading
} from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Departments() {
  return (
    <div className="space-y-2">
      <PageHeader>
        <PageHeaderHeading>Departments</PageHeaderHeading>
      </PageHeader>
      <Suspense fallback={<Skeleton className="h-32 w-full" />}>
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
            href={`/admin/departments/${department.slug}`}
            className="flex items-center justify-between rounded-2xl border bg-slate-50 p-4"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold">{department.name}</h3>
              <p className="text-sm text-slate-500">
                Executives: {department.executives[0].count || 0}
              </p>
            </div>
            <div className="rounded-full border bg-white p-4">
              <ExternalLink className="size-5 text-primary-900" />
            </div>
          </Link>
        ))}
      </div>
    )
  );
}
