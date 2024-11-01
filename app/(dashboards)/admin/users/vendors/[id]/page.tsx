import { AccountSettingsForm } from "@/app/(dashboards)/admin/users/_components/AccountSettingsForm";
import Loader from "@/components/Loader";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";

export default async function Page(props: { params: Promise<{ id: any }> }) {
  const params = await props.params;
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
  const supabase = await supabaseAdminServer();
  let { data: vendor } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  return <AccountSettingsForm user={vendor} />;
};
