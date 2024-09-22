import Loader from "@/components/Loader";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { AccountSettingsForm } from "../../../_components/AccountSettingsForm";

export default function Page({ params }: { params: { id: any } }) {
  return (
    <Suspense
      fallback={
        <div className="container flex h-[400px] items-center justify-center">
          <Loader />
        </div>
      }
    >
      <VendorDetails id={params.id} />
    </Suspense>
  );
}

const VendorDetails = async ({ id }: { id: string }) => {
  unstable_noStore();
  const supabase = supabaseAdminServer();
  let { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  return <AccountSettingsForm user={user} />;
};
