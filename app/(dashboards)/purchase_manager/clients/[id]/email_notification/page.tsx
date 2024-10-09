import Loader from "@/components/Loader";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { Suspense } from "react";
import MailForm from "./MailForm";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense
      fallback={
        <div className="container flex h-[400px] items-center justify-center">
          <Loader />
        </div>
      }
    >
      <Notifications userId={params.id} />
    </Suspense>
  );
}

async function Notifications({ userId }: { userId: string }) {
  const supabase = supabaseAdminServer();

  let { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return <MailForm clientDetails={user} />;
}
