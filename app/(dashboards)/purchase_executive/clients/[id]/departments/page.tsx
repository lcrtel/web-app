import Loader from "@/components/Loader";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { Suspense } from "react";
import { CompanyForm } from "./CompanyForm";

export default function Page({ params }: { params: { id: string } }) {
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
  const supabase = supabaseAdminServer();

  let { data: vendor, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return <CompanyForm user={vendor} />;
}
