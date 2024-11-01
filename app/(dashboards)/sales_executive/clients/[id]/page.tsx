import Loader from "@/components/Loader";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { AccountSettingsForm } from "./AccountSettingsForm";
import { redirect } from "next/navigation";

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
  let { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
    if (error) {
      redirect("/sales_executive/clients");
    }
  return <AccountSettingsForm user={user} />;
};
