import { Department } from "./actions";
import ExecutivesList from "./ExecutivesList";
import ManagerInfo from "./ManagerInfo";


export default function DepartmentInfo({
  department,
}: {
  department: Department;
}) {
  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <div className="h-fit min-w-[300px] space-y-2 rounded-2xl border bg-slate-50 px-4 py-3 lg:col-span-1">
        <h3 className="text-xl font-semibold">Manager</h3>
        <ManagerInfo department={department} />
      </div>
      <div className="flex-1 space-y-2">
        <h3 className="text-xl font-semibold">Executives</h3>
        <ExecutivesList department={department} />
      </div>
    </div>
  );
}
