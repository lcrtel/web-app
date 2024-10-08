import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { Suspense } from "react";
import { PostTargetsTable } from "./PostTargetsTable";
import { TargetsTable } from "./TargetsTable";

export default function RoutesPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-primary text-2xl font-bold">Buying targets</h1>
      <Suspense fallback={<Skeleton className="h-32 w-full" />}>
        <Targets />
      </Suspense>
      <AddTargets />
    </div>
  );
}

async function Targets() {
  const supabase = supabaseAdminServer();
  const { data } = await supabase.from("targets").select("*, profiles(*)");
  return <TargetsTable data={data} />;
}
async function AddTargets() {
  const supabase = supabaseAdminServer();
  let { data: users } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user");
  return <PostTargetsTable users={users} />;
}
