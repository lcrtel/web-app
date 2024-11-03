import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { CreateDepartmentExecutive } from "../_components/CreateDepartmentExecutive";
import { CreateDepartmentManager } from "../_components/CreateDepartmentManager";

export default function ManagersPage() {
  return (
    <div className="space-y-2">
      <PageHeader>
        <PageHeaderHeading>Sales Department</PageHeaderHeading>
        <PageActions>
          <CreateDepartmentManager department="sales" />
          <CreateDepartmentExecutive department="sales" />
        </PageActions>
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Link
          href={`/admin/departments/sales/managers`}
          className="flex items-center justify-between rounded-2xl border bg-slate-50 p-4 pl-6"
        >
          <h3 className="text-2xl font-bold">Managers</h3>
          <div className="rounded-full border bg-white p-3">
            <ExternalLink className="size-5 text-primary-900" />
          </div>
        </Link>
        <Link
          href={`/admin/departments/sales/executives`}
          className="flex items-center justify-between rounded-2xl border bg-slate-50 p-4 pl-6"
        >
          <h3 className="text-2xl font-bold">Executives</h3>
          <div className="rounded-full border bg-white p-3">
            <ExternalLink className="size-5 text-primary-900" />
          </div>
        </Link>
      </div>
    </div>
  );
}
