import BackButton from "@/components/BackButton";
import Link from "next/link";
import { CreateDepartmentExecutive } from "@/components/departments/CreateDepartmentExecutive";

import ManagerInfo from "@/components/departments/ManagerInfo";
import ExecutivesList from "@/components/departments/ExecutivesList";
import DepartmentInfo from "../DepartmentInfo";


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
      <DepartmentInfo department="purchases" />
    </div>
  );
}
