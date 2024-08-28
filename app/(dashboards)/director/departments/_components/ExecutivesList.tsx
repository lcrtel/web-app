import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { ExecutivesTable } from "./ExecutivesTable";
import { Department } from "../actions";

export default async function ExecutivesList({
  department,
}: {
  department: Department;
}) {
  const supabase = supabaseAdminServer();
  const { data } = await supabase
    .from("executives")
    .select("profiles(*), departments!inner (slug)")
    .eq("departments.slug", department);
  let executives = data?.map((executive: any) => executive.profiles);
  return <ExecutivesTable data={executives} />;
}
