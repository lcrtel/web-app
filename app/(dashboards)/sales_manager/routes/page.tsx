import { RoutesTableReadOnlyAdmin } from "@/components/routes-and-targets/RoutesTableReadOnlyAdmin";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { Suspense } from "react";

export default function RoutesPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-primary text-2xl font-bold">Route Offers <span className="text-sm text-slate-500 font-normal">(Read only)</span></h1>
      <Suspense fallback={<Skeleton className="h-32 w-full" />}>
        <Routes />
      </Suspense>
    </div>
  );
}

async function Routes() {
  const supabase = supabaseAdminServer();
  const { data } = await supabase.from("routes").select("*, profiles(*)");
  return <RoutesTableReadOnlyAdmin data={data} />;
}
