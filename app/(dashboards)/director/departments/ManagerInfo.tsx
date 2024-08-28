import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { PlusCircle } from "lucide-react";
import { Department } from "./actions";
import { CreateDepartmentManager } from "./CreateDepartmentManager";

export default async function ManagerInfo({
  department,
}: {
  department: Department;
}) {
  const supabase = supabaseAdminServer();
  const { data: manager } = await supabase
    .from("managers")
    .select("profiles(*), departments!inner (slug)")
    .eq("departments.slug", department)
    .single();
  return manager ? (
    <div>
      <h4>
        <span>Name:</span> {manager?.profiles?.name}
      </h4>
      <h4>
        <span>Email:</span> {manager?.profiles?.email}
      </h4>
      <h4>
        <span>Phone:</span> {manager?.profiles?.phone}
      </h4>
    </div>
  ) : (
    <CreateDepartmentManager department={department}>
      <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed bg-white px-4 py-8 shadow">
        <PlusCircle className="size-4" />
        Add manager
      </div>
    </CreateDepartmentManager>
  );
}
