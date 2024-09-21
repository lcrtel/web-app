import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { Suspense } from "react";
import TRVerificationForm from "./TRVerificationForm";
import { Badge } from "@/components/ui/badge";

export default async function Page() {
  return (
    <div className="">
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2">
          <h2 className="text-xl font-bold tracking-tight"> TR Verification</h2>
          <VerificationStatus />
        </div>
        <p className="text-sm text-slate-500">
          You need to complete at least two TR Verification to get verified
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-40" />}>
        <TRVerifications />
      </Suspense>
      <div className="mb-5 rounded-lg border p-5">
        <h3 className="mb-4 text-xl font-bold tracking-tight">
          {" "}
          TR Verification Request
        </h3>
        <TRVerificationForm />
      </div>
    </div>
  );
}

async function VerificationStatus() {
  const supabase = supabaseServer();
  const { data } = await supabase
    .from("tr_verifications")
    .select("status")
    .eq("status", "VERIFIED");

  return data && data?.length > 1 ? (
    <div className="rounded-full border border-green-400 bg-green-50 px-3 py-1 text-sm text-green-500">
      Verified
    </div>
  ) : (
    <div className="rounded-full border border-amber-400 bg-amber-50 px-3 py-1 text-sm text-amber-500">
      Pending
    </div>
  );
}
async function TRVerifications() {
  const supabase = supabaseServer();
  const { data: trVerifications, error } = await supabase
    .from("tr_verifications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    return [];
  }
  return trVerifications.length > 0 ? (
    <div className="mb-4 grid gap-2 sm:grid-cols-2">
      {trVerifications.map((trVerification: TRVerification) => (
        <TRCard key={trVerification.id} details={trVerification} />
      ))}
    </div>
  ) : (
    <div className="mb-4 rounded-lg bg-slate-50 p-5 text-center text-slate-500">
      No TR Verifications found
    </div>
  );
}
function TRCard({ details }: { details: TRVerification }) {
  return (
    <div className="space-y-3 rounded-lg border bg-slate-50 p-5 text-slate-500">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
        <h4 className="font-medium text-primary-900">Name:</h4>
        <p>{details.name}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
        <h4 className="font-medium text-primary-900">Company Name:</h4>
        <p>{details.company_name}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
        <h4 className="font-medium text-primary-900">Company Email:</h4>
        <p>{details.company_email}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
        <h4 className="font-medium text-primary-900">Website:</h4>
        <p>{details.website}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
        <h4 className="font-medium text-primary-900">Verification:</h4>
       <Badge variant={details.status}>{details.status?.toLowerCase()}</Badge>
      </div>
    </div>
  );
}
