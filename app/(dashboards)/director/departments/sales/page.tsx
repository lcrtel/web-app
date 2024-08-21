import BackButton from "@/components/BackButton";
import Link from "next/link";

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
      <div className="flex items-center justify-between border-b py-4">
        <h2 className="text-3xl font-bold tracking-tight">Sales Department</h2>
        {/* <Create /> */}
      </div>
    </div>
  );
}
