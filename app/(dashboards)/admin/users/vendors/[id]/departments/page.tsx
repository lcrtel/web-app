import Loader from "@/components/Loader";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { Suspense } from "react";
import { CompanyForm } from "./_components/CompanyForm";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <Suspense
      fallback={
        <div className="container flex h-[400px] items-center justify-center">
          <Loader />
        </div>
      }
    >
      <Departments userId={params.id} />
    </Suspense>
  );
}

async function Departments({ userId }: { userId: string }) {
  const supabaseAdmin = await supabaseAdminServer();
  let { data: vendor } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return <CompanyForm user={vendor} />;
}
