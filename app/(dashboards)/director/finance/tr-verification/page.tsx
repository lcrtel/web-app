import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { Suspense } from "react";
import { TRTable } from "./tr-table";

export default function TRVerification() {
  return (
    <div className="space-y-4">
      <h1 className="text-primary text-2xl font-bold">TR Verification</h1>
      <div className="">
        <h1 className="text-primary mb-2 text-xl font-semibold">
          Pending Verification
        </h1>
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <PendingVerification />
        </Suspense>
      </div>
      <div className="">
        <h1 className="text-primary mb-2 text-xl font-semibold">Verified</h1>
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <Verified />
        </Suspense>
      </div>
      <div className="">
        <h1 className="text-primary mb-2 text-xl font-semibold">Declined</h1>
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <Declined />
        </Suspense>
      </div>
    </div>
  );
}

async function PendingVerification() {
  const supabase = supabaseAdminServer();
  const { data } = await supabase
    .from("tr_verifications")
    .select("*, profiles(*)")
    .eq("status", "PENDING");

  return <TRTable data={data} />;
}

async function Verified() {
  const supabase = supabaseAdminServer();
  const { data } = await supabase
    .from("tr_verifications")
    .select("*, profiles(*)")
    .eq("status", "VERIFIED");

  return <TRTable data={data} />;
}
async function Declined() {
  const supabase = supabaseAdminServer();
  const { data } = await supabase
    .from("tr_verifications")
    .select("*, profiles(*)")
    .eq("status", "DECLINED");

  return <TRTable data={data} />;
}
