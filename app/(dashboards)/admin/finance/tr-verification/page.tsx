import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { Suspense } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import AddTRSheet from "./AddTRSheet";
import { TRTable } from "./tr-table";

export default function TRVerification() {
  return (
    <div className="space-y-4">
      <PageHeader>
        <PageHeaderHeading>TR Verification</PageHeaderHeading>
        <PageActions>
          <Suspense
            fallback={
              <Button>
                {" "}
                <HiOutlinePlusCircle className="mr-2 h-5 w-5" />
                Add
              </Button>
            }
          >
            <AddTRButton />
          </Suspense>
        </PageActions>
      </PageHeader>
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

async function AddTRButton() {
  const supabase = await supabaseAdminServer();
  let { data: users } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user");
  return users && <AddTRSheet users={users} />;
}
async function PendingVerification() {
  const supabase = await supabaseAdminServer();
  const { data } = await supabase
    .from("tr_verifications")
    .select("*, profiles(*)")
    .eq("status", "PENDING");

  return <TRTable data={data} />;
}

async function Verified() {
  const supabase = await supabaseAdminServer();
  const { data } = await supabase
    .from("tr_verifications")
    .select("*, profiles(*)")
    .eq("status", "VERIFIED");

  return <TRTable data={data} />;
}
async function Declined() {
  const supabase = await supabaseAdminServer();
  const { data } = await supabase
    .from("tr_verifications")
    .select("*, profiles(*)")
    .eq("status", "DECLINED");

  return <TRTable data={data} />;
}
