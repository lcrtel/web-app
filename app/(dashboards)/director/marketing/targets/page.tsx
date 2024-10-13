import BackButton from "@/components/BackButton";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import Link from "next/link";
import { Suspense } from "react";
import TargetsMarketing from "./TargetsMarketing";

export default function RoutesMarketingPage() {
  return (
    <section className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <BackButton />
        <Link href="/director" className="hover:underline">
          Dashboard
        </Link>
        /
        <Link href="/director/marketing" className="hover:underline">
          Marketing
        </Link>
        /
        <Link href="/director/marketing/targets" className="hover:underline">
          Targets
        </Link>
      </div>
      <h2 className="text-2xl font-bold tracking-tight">Targets Marketing</h2>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <Marketing />
      </Suspense>
    </section>
  );
}

async function Marketing() {
  const supabase = supabaseAdminServer();
  let { data: targets } = await supabase
    .from("targets")
    .select("*, profiles(name, company_name)");
  let vendors: Profile[] = [];
  let { data } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*), routes(count)")
    .eq("user_roles.role_slug", "user");
  // @ts-ignore
  vendors = data?.filter((v) => v.routes[0].count > 0);
  return <TargetsMarketing targets={targets} vendors={vendors} />;
}
