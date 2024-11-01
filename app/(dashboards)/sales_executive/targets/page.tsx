import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { getUser } from "@/utils/user";
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
  const supabase = await supabaseAdminServer();
  const user = await getUser();
  if (!user) return null;
  const { data: targets } = await supabase
    .from("targets")
    .select("*, profiles(*)")
    .eq("added_by", user?.id);
  return targets ? <TargetsTable data={targets} /> : <p>No targets</p>;
}
async function AddTargets() {
  const supabase = await supabaseAdminServer();
  const user = await getUser();
  let { data: users } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user")
    .match({ added_by: user?.id });
  return users && <PostTargetsTable users={users} />;
}
