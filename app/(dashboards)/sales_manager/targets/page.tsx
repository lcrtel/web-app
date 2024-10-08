import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { Suspense } from "react";
import { TargetsTable } from "./TargetsTable";

export default function RoutesPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-primary text-2xl font-bold">Buying targets</h1>
      <Suspense fallback={<Skeleton className="h-32 w-full" />}>
        <Targets />
      </Suspense>
    </div>
  );
}

async function Targets() {
  const supabase = supabaseAdminServer();
  const { data } = await supabase.from("targets").select("*, profiles(*)");
  return <TargetsTable data={data} />;
}
